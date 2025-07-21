#!/usr/bin/env bash

. ./test/helper.sh
. ./share/ruby-install/system.sh

function test_os_platform()
{
	assertNotEquals "did not set \$os_platform" "" "$os_platform"
}

function test_os_arch()
{
	assertNotEquals "did not set \$os_arch" "" "$os_arch"
}

function test_downloader()
{
	assertNotEquals "did not detect wget or curl" "" "$downloader" 
}

function test_sudo()
{
	(( UID == 0 )) && return

	assertEquals "did not enable sudo" "sudo" "$sudo"
}

SHUNIT_PARENT=$0 . $SHUNIT2
