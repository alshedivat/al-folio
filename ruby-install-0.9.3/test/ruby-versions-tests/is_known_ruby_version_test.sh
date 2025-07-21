#!/usr/bin/env bash

. ./test/helper.sh
. ./share/ruby-install/ruby-versions.sh

ruby="ruby"

function oneTimeSetUp()
{
	download_ruby_versions_file "$ruby" "versions.txt"
}

function test_is_known_ruby_version()
{
	local version="2.7.2"

	is_known_ruby_version "$ruby" "$version"

	assertEquals "did not return 0" 0 $?
}

function test_is_known_ruby_version_with_unknown_version()
{
	local version="9.9.9"

	is_known_ruby_version "$ruby" "$version"

	assertEquals "did not return 1" 1 $?
}

SHUNIT_PARENT=$0 . $SHUNIT2
