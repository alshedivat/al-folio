. ./test/helper.sh
. ./share/ruby-install/system.sh

function oneTimeSetUp()
{
	detect_sudo
}

function test_sudo()
{
	if (( UID == 0 )); then
		assertEquals "did not omit sudo" "" "$sudo"
	else
		assertEquals "did not enable sudo" "sudo" "$sudo"
	fi
}

SHUNIT_PARENT=$0 . $SHUNIT2
