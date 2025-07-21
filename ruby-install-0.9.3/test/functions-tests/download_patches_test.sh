#!/usr/bin/env bash

. ./test/helper.sh
. ./share/ruby-install/functions.sh

src_dir="$test_fixtures_dir/download_patches_test"
ruby_dir_name="ruby-1.9.3-p448"
ruby_build_dir="$src_dir/$ruby_dir_name"

patches=("https://gist.github.com/funny-falcon/2981959/raw/ary-queue.diff" "local.patch")

function setUp()
{
	mkdir -p "$ruby_build_dir"
}

function test_download_patches()
{
	download_patches 2>/dev/null

	assertTrue "did not download patches to \$src_dir/\$ruby_dir_name" \
		   '[[ -f "${ruby_build_dir}/ary-queue.diff" ]]'

	assertEquals "did not update \$patches" \
		     "${patches[0]}" "$ruby_build_dir/ary-queue.diff"
}

function tearDown()
{
	rm -rf "$src_dir"
}

SHUNIT_PARENT=$0 . $SHUNIT2
