#!/usr/bin/env bash

. ./test/helper.sh
. ./share/ruby-install/package_manager.sh

function test_set_package_manager_with_apt()
{
	local arg1="apt"

	set_package_manager "$arg1"

	assertEquals "did not return 0" $? 0
	assertEquals "did not set package_manager to $arg1" "$arg1" "$package_manager"
}

function test_set_package_manager_with_dnf()
{
	local arg1="dnf"

	set_package_manager "$arg1"

	assertEquals "did not return 0" $? 0
	assertEquals "did not set package_manager to $arg1" "$arg1" "$package_manager"
}

function test_set_package_manager_with_yum()
{
	local arg1="yum"

	set_package_manager "$arg1"

	assertEquals "did not return 0" $? 0
	assertEquals "did not set package_manager to $arg1" "$arg1" "$package_manager"
}

function test_set_package_manager_with_zypper()
{
	local arg1="zypper"

	set_package_manager "$arg1"

	assertEquals "did not return 0" $? 0
	assertEquals "did not set package_manager to $arg1" "$arg1" "$package_manager"
}

function test_set_package_manager_with_pacman()
{
	local arg1="pacman"

	set_package_manager "$arg1"

	assertEquals "did not return 0" $? 0
	assertEquals "did not set package_manager to $arg1" "$arg1" "$package_manager"
}

function test_set_package_manager_with_pkg()
{
	local arg1="pkg"

	set_package_manager "$arg1"

	assertEquals "did not return 0" $? 0
	assertEquals "did not set package_manager to $arg1" "$arg1" "$package_manager"
}

function test_set_package_manager_with_homebrew()
{
	local arg1="brew"

	set_package_manager "$arg1"

	assertEquals "did not return 0" $? 0
	assertEquals "did not set package_manager to $arg1" "$arg1" "$package_manager"
}


function test_set_package_manager_with_macports()
{
	local arg1="port"

	set_package_manager "$arg1"

	assertEquals "did not return 0" $? 0
	assertEquals "did not set package_manager to $arg1" "$arg1" "$package_manager"
}

function test_set_package_manager_with_xbps()
{
	local arg1="xbps"

	set_package_manager "$arg1"

	assertEquals "did not return 0" $? 0
	assertEquals "did not set package_manager to $arg1" "$arg1" "$package_manager"
}

function test_set_package_manager_with_unknown_package_manager()
{
	set_package_manager "foo" 2>/dev/null

	assertEquals "did not return 1" $? 1
}

SHUNIT_PARENT=$0 . $SHUNIT2
