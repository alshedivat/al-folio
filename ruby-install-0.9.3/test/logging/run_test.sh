#!/usr/bin/env bash

. ./test/helper.sh
. ./share/ruby-install/logging.sh

function test_run_when_enable_debug_is_not_set()
{
	local command=(echo foo bar baz)
	local expected_output="foo bar baz"

	assertEquals "did not silence debug messages" \
		     "$expected_output" "$(run "${command[@]}" 2>&1)"
}

function test_run_with_implicit_string_splitting()
{
	local command=(echo "foo   bar   baz")
	local expected_output="foo   bar   baz"

	assertEquals "did not preserve spaces in the command's arguments" \
		     "$expected_output" "$(run "${command[@]}" 2>&1)"
}

function test_run_when_enable_debug_is_set()
{
	enable_debug=1

	local command=("echo" "foo" "bar" "baz")
	local command_output="foo bar baz"
	local expected_output="[DEBUG] ${command[@]}
$command_output"

	assertEquals "did not output '[DEBUG] ...' to stderr" \
		     "$expected_output" "$(run "${command[@]}" 2>&1)"
}

function test_run_when_the_command_fails()
{
	local command=("false")

	run "${command[@]}"

	assertEquals "did not return the exit status" 1 $?
}

function tearDown()
{
	unset enable_debug
}

SHUNIT_PARENT=$0 . $SHUNIT2
