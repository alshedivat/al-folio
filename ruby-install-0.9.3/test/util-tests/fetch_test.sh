#!/usr/bin/env bash

. ./test/helper.sh

ruby_install_dir="$test_fixtures_dir/fetch_test"

test_file="$ruby_install_dir/db.txt"

function setUp()
{
	mkdir -p "$ruby_install_dir"
}

function test_fetch()
{
	local key="1.9.3"
	local expected="1.9.3-p484"

	echo "$key: $expected" > "$test_file"

	local value=$(fetch "db" "$key")

	assertEquals "did not fetch the correct value" "$expected" "$value"
}

function test_fetch_with_tabs()
{
	local key="ruby-1.9.3-p484.tar.bz2"
	local expected="03f5b08804927ceabe5122cb90f5d0a9"

	echo -e "$key:\t$expected" > "$test_file"

	local value=$(fetch "db" "$key")

	assertEquals "did not remove the trailing tabs" "$expected" "$value"
}

function test_fetch_with_excess_whitespace()
{
	local key="ruby-1.9.3-p484.tar.bz2"
	local expected="03f5b08804927ceabe5122cb90f5d0a9"

	echo "$key:     $expected" > "$test_file"

	local value=$(fetch "db" "$key")

	assertEquals "did not fetch the correct value" "$expected" "$value"
}

function test_fetch_with_unknown_key()
{
	local key="foo"
	local expected=""

	echo "bar: bar" > "$test_file"

	local value=$(fetch "db" "$key")

	assertEquals "returned the wrong value" "$expected" "$value"
}

function tearDown()
{
	rm -rf "$ruby_install_dir"
}

SHUNIT_PARENT=$0 . $SHUNIT2
