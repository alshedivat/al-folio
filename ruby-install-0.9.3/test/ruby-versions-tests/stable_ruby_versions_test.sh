#!/usr/bin/env bash

. ./test/helper.sh
. ./share/ruby-install/ruby-versions.sh

ruby="ruby"

function oneTimeSetUp()
{
	download_ruby_versions_file "$ruby" "stable.txt"
}

function test_stable_ruby_versions()
{
	local expected_output="$(cat "$ruby_install_cache_dir/$ruby/stable.txt")"
	local output="$(stable_ruby_versions "$ruby")"

	assertEquals "did not read stable.txt" "$expected_output" "$output"
}

SHUNIT_PARENT=$0 . $SHUNIT2
