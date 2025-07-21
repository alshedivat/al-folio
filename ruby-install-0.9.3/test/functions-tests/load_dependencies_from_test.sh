#!/usr/bin/env bash

. ./test/helper.sh
. ./share/ruby-install/functions.sh

function setUp()
{
	ruby="ruby"
	ruby_version="3.0.0"
	package_manager="dnf"
}

function test_load_dependencies_from()
{
	load_dependencies_from "dependencies"

	assertEquals "did not correctly set \$ruby_dependencies from \$ruby/dependencies.txt for \$package_manager" \
		     "${ruby_dependencies[*]}" "xz gcc automake bison zlib-devel libyaml-devel openssl-devel gdbm-devel readline-devel ncurses-devel libffi-devel"
}

function tearDown()
{
	unset ruby ruby_version package_manager
}

SHUNIT_PARENT=$0 . $SHUNIT2
