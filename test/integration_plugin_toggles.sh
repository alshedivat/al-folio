#!/usr/bin/env bash
set -euo pipefail

tmp_dir="$(mktemp -d)"
cleanup() {
  rm -rf "${tmp_dir}"
}
trap cleanup EXIT

remove_plugin_and_build() {
  local plugin="$1"
  local override="${tmp_dir}/${plugin}-override.yml"
  local output_site="${tmp_dir}/site-${plugin}"

  ruby -rpsych -e "cfg = Psych.unsafe_load_file('_config.yml'); plugins = Array(cfg['plugins']).reject { |p| p == '${plugin}' }; puts({ 'plugins' => plugins }.to_yaml)" >"${override}"

  bundle exec jekyll build --config "_config.yml,${override}" -d "${output_site}" >/dev/null
  if [ ! -f "${output_site}/index.html" ]; then
    echo "expected site output for plugin toggle ${plugin}" >&2
    exit 1
  fi
}

remove_plugin_and_build "al_analytics"
remove_plugin_and_build "al_img_tools"
remove_plugin_and_build "al_search"

echo "plugin toggle integration checks passed"
