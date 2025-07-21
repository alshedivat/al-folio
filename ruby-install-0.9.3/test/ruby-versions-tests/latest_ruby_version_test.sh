#!/usr/bin/env bash

. ./test/helper.sh
. ./share/ruby-install/ruby-versions.sh

ruby="ruby"
stable_file="$ruby_install_cache_dir/$ruby/stable.txt"

function oneTimeSetUp()
{
	download_ruby_versions_file "$ruby" "stable.txt"
}

function test_latest_ruby_version_with_no_empty_string()
{
	local last_version="$(tail -n 1 "$stable_file")"
	local output="$(latest_ruby_version "$ruby" "")"

	assertEquals "did not return the last version" \
		     "$last_version" \
		     "$output"
}

function test_latest_ruby_version_with_partial_version()
{
	local expected_version="$(grep -E '^2\.2\.' "$stable_file")"
	local partial_version="2.2"
	local output="$(latest_ruby_version "$ruby" "$partial_version")"

	assertEquals "did not return the matching version" \
		     "$expected_version" \
		     "$output"
}

SHUNIT_PARENT=$0 . $SHUNIT2
