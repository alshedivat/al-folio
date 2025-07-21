#!/usr/bin/env bash

. ./test/helper.sh

test_install_dir="$test_fixtures_dir/no_reinstall_test"

function setUp()
{
	mkdir -p "$test_install_dir/bin"
	touch -m "$test_install_dir/bin/ruby"
	chmod +x "$test_install_dir/bin/ruby"
}

function test_no_reinstall_when_ruby_executable_exists()
{
	local output="$(ruby-install --install-dir "$test_install_dir" --no-reinstall ruby)"

	assertEquals "did not return 0" 0 $?
	assertTrue "did not print a message to STDOUT" \
		'[[ "$output" == *"already installed"* ]]'
}

function tearDown()
{
	rm -rf "$test_install_dir"
}

SHUNIT_PARENT=$0 . $SHUNIT2
