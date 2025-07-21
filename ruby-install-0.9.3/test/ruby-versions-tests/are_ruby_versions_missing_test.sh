#!/usr/bin/env bash

. ./test/helper.sh
. ./share/ruby-install/ruby-versions.sh

ruby="ruby"

function oneTimeSetUp()
{
	rm -rf "$ruby_install_cache_dir"
}

function test_are_ruby_versions_missing_with_no_parent_dir()
{
	are_ruby_versions_missing "$ruby"

	assertEquals "did not return 0" 0 $?
}

function test_are_ruby_versions_missing_with_no_ruby_dir()
{
	mkdir -p "$ruby_install_cache_dir"

	are_ruby_versions_missing "$ruby"

	assertEquals "did not return 0" 0 $?
}

function test_are_ruby_versions_missing_with_no_files()
{
	mkdir -p "$ruby_install_cache_dir/$ruby"

	are_ruby_versions_missing "$ruby"

	assertEquals "did not return 0" 0 $?
}

function test_are_ruby_versions_missing_with_some_files()
{
	mkdir -p "$ruby_install_cache_dir/$ruby"
	touch "$ruby_install_cache_dir/$ruby/stable.txt"

	are_ruby_versions_missing "$ruby"

	assertEquals "did not return 0" 0 $?
}

function test_are_ruby_versions_missing_with_all_files()
{
	mkdir -p "$ruby_install_cache_dir/$ruby"

	for file in "${ruby_versions_files[@]}"; do
		touch "$ruby_install_cache_dir/$ruby/$file"
	done

	are_ruby_versions_missing "$ruby"

	assertEquals "did not return 1" 1 $?
}

function tearDown()
{
	rm -rf "$ruby_install_cache_dir"
}

SHUNIT_PARENT=$0 . $SHUNIT2
