#!/usr/bin/env bash

. ./test/helper.sh
. ./share/ruby-install/ruby-versions.sh

ruby="ruby"

function setUp()
{
	rm -rf "$ruby_install_cache_dir/$ruby"
}

function test_download_ruby_versions()
{
	download_ruby_versions "$ruby"

	for file in {stable,versions}.txt checksums.{md5,sha1,sha256,sha512}; do
		assertTrue "did not create the $file file" \
			   "[[ -f \"\$ruby_install_cache_dir/\$ruby/$file\" ]]"
		assertTrue "did not write data to the $file file" \
			   "[[ -s \"\$ruby_install_cache_dir/\$ruby/$file\" ]]"
	done
}

function tearDown()
{
	rm -rf "$ruby_install_cache_dir/$ruby"
}

SHUNIT_PARENT=$0 . $SHUNIT2
