#!/usr/bin/env bash
set -euo pipefail

# Regression guard for the production CSS pipeline.
#
# In production (JEKYLL_ENV=production) the build runs jekyll-minifier. Its CSS
# compressor (cssminify2) mangles Tailwind v4 spacing tokens inside calc(),
# rewriting `calc(var(--spacing)*N)` to the invalid `calc(var( -  - spacing)*N)`.
# That breaks every spacing/positioning utility (e.g. `.fixed-top` -> the navbar
# is no longer pinned). The starter disables redundant CSS minification
# (`jekyll-minifier.compress_css: false` in _config.yml) because tailwind.css and
# the Sass-compiled main.css are already minified upstream.
#
# This bug only surfaces in PRODUCTION builds, so the other integration tests
# (dev-mode builds) and the visual-regression workflow (serves in dev mode)
# never caught it. This test builds in production mode on purpose.

tmp_dir="$(mktemp -d)"
cleanup() {
  rm -rf "${tmp_dir}"
}
trap cleanup EXIT

site="${tmp_dir}/site"
override_file="${tmp_dir}/im-off.yml"

# Disable ImageMagick responsive-image generation: it is unrelated to CSS and is
# by far the slowest build step. CSS output is identical with it on or off.
cat >"${override_file}" <<'YAML'
imagemagick:
  enabled: false
YAML

JEKYLL_ENV=production bundle exec jekyll build \
  --config "_config.yml,${override_file}" -d "${site}" >/dev/null

tailwind_css="${site}/assets/css/tailwind.css"
main_css="${site}/assets/css/main.css"

[ -f "${tailwind_css}" ] || {
  echo "tailwind.css missing from production build" >&2
  exit 1
}

# The smoking gun: a corrupted custom-property reference anywhere in the CSS.
if grep -qF 'var( -  - ' "${tailwind_css}" "${main_css}"; then
  echo "corrupted CSS variable reference 'var( -  - ...)' found in production CSS" >&2
  echo "  -> jekyll-minifier is re-minifying already-minified CSS; keep compress_css: false" >&2
  exit 1
fi

# Positive assertions: Tailwind's spacing scale and the fixed navbar survive.
grep -qF 'var(--spacing)' "${tailwind_css}" || {
  echo "expected intact 'var(--spacing)' tokens in tailwind.css" >&2
  exit 1
}
if ! grep -oE '\.fixed-top[^{]*\{[^}]*\}' "${tailwind_css}" | grep -q 'position:fixed'; then
  echo ".fixed-top rule is missing or malformed in production tailwind.css" >&2
  exit 1
fi

# main.css carries the navbar's visual theming (hamburger bars, toggles); it must
# be non-empty (a Sass compile failure would silently emit an empty file).
main_bytes="$(wc -c <"${main_css}" 2>/dev/null || echo 0)"
if [ "${main_bytes}" -lt 1000 ]; then
  echo "main.css is empty/too small (${main_bytes} bytes) in production build" >&2
  exit 1
fi

echo "css minify integration checks passed"
