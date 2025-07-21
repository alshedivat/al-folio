#!/usr/bin/env bash

. ./test/helper.sh
. ./share/ruby-install/ruby-versions.sh

ruby="ruby"
stable_file="$ruby_install_cache_dir/$ruby/stable.txt"

function oneTimeSetUp()
{
	download_ruby_versions_file "$ruby" "stable.txt"
	download_ruby_versions_file "$ruby" "versions.txt"
}

function test_look_ruby_version_with_known_version()
{
	local known_version="2.6.0"
	local output="$(lookup_ruby_version "$ruby" "$known_version")"

	assertEquals "did not return the same version" \
		     "$known_version" \
		     "$output"
}

function test_lookup_ruby_version_with_empty_string()
{
	local last_version="$(tail -n 1 "$stable_file")"
	local output="$(lookup_ruby_version "$ruby" "")"

	assertEquals "did not return the latest version" \
		     "$last_version" \
		     "$output"
}

function test_lookup_ruby_version_with_partial_version()
{
	local partial_version="2.7"
	local expected_version="$(grep -E '^2\.7\.' "$stable_file")"
	local output="$(lookup_ruby_version "$ruby" "$partial_version")"

	assertEquals "did not return the matching version" \
		     "$expected_version" \
		     "$output"
}

SHUNIT_PARENT=$0 . $SHUNIT2
