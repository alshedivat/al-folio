#!/usr/bin/env bash

. ./test/helper.sh

function test_list_rubies()
{
	local output="$(list_rubies)"

	assertTrue "did not include ruby" '[[ "$output" == *ruby:* ]]'
	assertTrue "did not include jruby" '[[ "$output" == *jruby:* ]]'
	assertTrue "did not include truffleruby" '[[ "$output" == *truffleruby:* ]]'
	assertTrue "did not include mruby" '[[ "$output" == *mruby:* ]]'
}

SHUNIT_PARENT=$0 . $SHUNIT2
