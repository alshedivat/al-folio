#!/usr/bin/env bash

. ./test/helper.sh
. ./share/ruby-install/versions.sh

test_dir="$test_fixtures_dir/versions_test"

versions_file="$test_dir/versions.txt"
stable_file="$test_dir/stable.txt"

function oneTimeSetUp()
{
	mkdir -p "$test_dir"

	local commit="08cb86b18210e58fb9f85c0b4403e0a83f64fbf3"
	local download_url="https://raw.githubusercontent.com/postmodern/ruby-versions/$commit"

	wget -q -O "$versions_file" "$download_url/ruby/versions.txt"
	wget -q -O "$stable_file" "$download_url/ruby/stable.txt"
}

function test_is_known_version()
{
	local version="2.0.0-p576"

	is_known_version "$versions_file" "$version"

	assertEquals "did not find the version within the file" \
		     0 $?
}

function test_is_known_version_with_invalid_file()
{
	local version="2.0.0-p576"

	is_known_version "./test/foo/bar" "$version"

	assertEquals "did not return an error" 1 $?
}

function test_is_known_version_with_empty_version()
{
	local version=""

	is_known_version "$versions_file" "$version"

	assertEquals "did not return an error" 1 $?
}

function test_is_known_version_with_invalid_version()
{
	local version="1.2.3"

	is_known_version "$versions_file" "$version"

	assertEquals "did not return an error" 1 $?
}

function test_latest_version()
{
	local version="2.0"
	local expected_version="2.0.0-p481"

	assertEquals "did not return the last matching version" \
		     "$expected_version" \
		     "$(latest_version "$stable_file" "$version")"
}

function test_latest_version_with_empty_string()
{
	local expected_version="2.1.3"

	assertEquals "did not return the last version" \
		     "$expected_version" \
		     "$(latest_version "$stable_file" "")"
}

function test_latest_version_with_unknown_version()
{
	local unknown_version="1.2.3"

	latest_version "$stable_file" "$unknown_version"

	assertEquals "did not return an error" 1 $?
}

function oneTimeTearDown()
{
	rm -rf "$test_dir"
}

SHUNIT_PARENT=$0 . $SHUNIT2
