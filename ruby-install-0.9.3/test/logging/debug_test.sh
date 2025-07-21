#!/usr/bin/env bash

. ./test/helper.sh
. ./share/ruby-install/logging.sh

function test_debug_when_enable_debug_is_not_set()
{
	assertEquals "did not silence debug messages" \
		     "" "$(debug "$message" 2>&1)"
}

function test_debug_when_enable_debug_is_set()
{
	enable_debug=1

	local message="foo bar baz"
	local expected_output="[DEBUG] $message"

	assertEquals "did not output '[DEBUG] ...' to stderr" \
		     "$expected_output" "$(debug "$message" 2>&1)"
}

function tearDown()
{
	unset enable_debug
}

SHUNIT_PARENT=$0 . $SHUNIT2
