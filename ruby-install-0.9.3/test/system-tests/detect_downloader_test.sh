. ./test/helper.sh
. ./share/ruby-install/system.sh

function oneTimeSetup()
{
	detect_downloader
}

function test_downloader_with_wget_but_without_curl()
{
	(command -v wget >/dev/null && ! command -v curl >/dev/null) || return 0

	assertEquals "did not detect wget" "wget" "$downloader" 
}

function test_downloader_without_wget_but_with_curl()
{
	(! command -v wget >/dev/null && command -v curl >/dev/null) || return 0

	assertEquals "did not detect curl" "curl" "$downloader" 
}

SHUNIT_PARENT=$0 . $SHUNIT2
