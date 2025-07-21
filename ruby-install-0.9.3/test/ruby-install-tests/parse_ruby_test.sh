#!/usr/bin/env bash

. ./test/helper.sh

function setUp()
{
	unset ruby
	unset ruby_cache_dir
}

function test_parse_ruby_with_a_single_name()
{
	local expected_ruby="jruby"

	parse_ruby "$expected_ruby"

	assertEquals "did not return successfully" 0 $?
	assertEquals "did not set \$ruby" "$expected_ruby" "$ruby"
}

function test_parse_ruby_with_a_name_dash_version()
{
	local expected_ruby="jruby"
	local expected_version="9.0.0"

	parse_ruby "${expected_ruby}-${expected_version}"

	assertEquals "did not return successfully" 0 $?
	assertEquals "did not set \$ruby" "$ruby" "$expected_ruby"
	assertEquals "did not set \$ruby_version" "$expected_version" \
						  "$ruby_version"
}

function test_parse_ruby_with_just_a_version()
{
	local expected_version="2.7.0"

	parse_ruby "$expected_version"

	assertEquals "did not return successfully" 0 $?
	assertEquals "did not set \$ruby to ruby" "$ruby" "ruby"
	assertEquals "did not set \$ruby_version" "$expected_version" \
	                                          "$ruby_version"
}

function test_parse_ruby_when_the_ruby_name_contains_multiple_dashes()
{
	local expected_ruby="truffleruby-graalvm"
	local expected_version="1.2.3"

	parse_ruby "$expected_ruby-$expected_version"

	assertEquals "did not return successfully" 0 $?
	assertEquals "did not match the ruby name" "$expected_ruby" "$ruby"
	assertEquals "did not match the ruby version" "$expected_version" \
	                                               "$ruby_version"
}

function test_parse_ruby_with_an_unknown_ruby()
{
	local unknown_ruby="foo"
	local output="$(parse_ruby "$unknown_ruby" 2>&1)"

	assertEquals "did not print an error for an unknwon ruby" \
		     "ruby-install: unknown ruby: $unknown_ruby" \
		     "$output"
}

SHUNIT_PARENT=$0 . $SHUNIT2
