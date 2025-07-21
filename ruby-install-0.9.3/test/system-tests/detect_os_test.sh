. ./test/helper.sh
. ./share/ruby-install/system.sh

function oneTimeSetup()
{
	detect_os
}

function test_os_platform()
{
	assertNotEquals "did not set \$os_platform" "" "$os_platform"
}

function test_os_arch()
{
	assertNotEquals "did not set \$os_arch" "" "$os_arch"
}

SHUNIT_PARENT=$0 . $SHUNIT2
