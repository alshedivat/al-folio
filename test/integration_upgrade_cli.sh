#!/usr/bin/env bash
set -euo pipefail

tmp_dir="$(mktemp -d)"
cleanup() {
  rm -rf "${tmp_dir}"
}
trap cleanup EXIT

mkdir -p "${tmp_dir}/_includes"
cat >"${tmp_dir}/_config.yml" <<'YAML'
title: test
YAML
cat >"${tmp_dir}/_includes/sample.liquid" <<'LIQUID'
<div class="font-weight-bold" data-toggle="tooltip">hello</div>
LIQUID

bundle exec ruby -e 'require "al_folio_upgrade"; exit AlFolioUpgrade::CLI.new(root: ARGV[0]).run(%w[upgrade apply --safe])' "${tmp_dir}" >/dev/null

grep -q '^al_folio:' "${tmp_dir}/_config.yml"
grep -q 'font-bold' "${tmp_dir}/_includes/sample.liquid"

bundle exec ruby -e 'require "al_folio_upgrade"; exit AlFolioUpgrade::CLI.new(root: ARGV[0]).run(%w[upgrade audit --no-fail])' "${tmp_dir}" >/dev/null

grep -q '^# al-folio upgrade report' "${tmp_dir}/al-folio-upgrade-report.md"
grep -q 'Non-blocking findings' "${tmp_dir}/al-folio-upgrade-report.md"

echo "upgrade cli integration checks passed"
