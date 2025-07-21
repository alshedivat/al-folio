#!/usr/bin/env bash

. ./test/helper.sh
. ./share/ruby-install/system.sh

test_dir="$test_fixtures_dir/download_test"
test_url="https://raw.github.com/postmodern/ruby-install/master/README.md"
test_dest="$test_dir/download.txt"

function test_download()
{
	download "$test_url" "$test_dest" 2>/dev/null

	assertFalse "did not remove the .part file" '[[ -f "$test_dest.part" ]]'
	assertTrue "did not download the file" '[[ -f "$test_dest" ]]'
}

function test_download_with_a_directory()
{
	local dir="test/subdir"
	mkdir -p "$dir"

	download "$test_url" "$dir" 2>/dev/null

	assertTrue "did not download the file to the directory" \
	           '[[ -f "$dir/README.md" ]]'

	rm -r "$dir"
}

function test_download_using_wget()
{
	command -v wget >/dev/null || return 0

	downloader="wget" download "$test_url" "$test_dest" 2>/dev/null

	assertTrue "did not download the file" '[[ -f "$test_dest" ]]'
}

function test_download_using_curl()
{
	command -v curl >/dev/null || return 0

	downloader="curl" download "$test_url" "$test_dest" 2>/dev/null

	assertTrue "did not download the file" '[[ -f "$test_dest" ]]'
}

function tearDown()
{
	rm -rf "$test_dir"
}

SHUNIT_PARENT=$0 . $SHUNIT2
