#!/usr/bin/env bash

. ./test/helper.sh

function test_ruby_install_version()
{
	assertTrue "did not set \$ruby_install_version" \
		   '[[ -n "$ruby_install_version" ]]'
}

function test_ruby_install_dir()
{
	local expected_ruby_install_dir="$PWD/share/ruby-install"

	assertEquals "was not ./share/ruby-install" \
		     "$expected_ruby_install_dir" \
		     "$ruby_install_dir"
}

function test_ruby_install_cache_dir()
{
	if [[ -n "$XDG_CACHE_HOME" ]]; then
		assertTrue "did not use \$XDG_CACHE_HOME/" \
			   '[[ "$ruby_install_cache_dir" == "$XDG_CACHE_HOME/"* ]]'
	else
		assertTrue "did not use \$HOME/.cache/" \
			   '[[ "$ruby_install_cache_dir" == "$HOME/.cache/"* ]]'
	fi
}

function test_rubies()
{
	for ruby in ruby jruby truffleruby mruby; do
		assertTrue "did not contain $ruby" \
			   "[[ \" \${rubies[@]} \" == *\" $ruby \"* ]]"
	done
}

function test_patches()
{
	assertEquals "\$patches was not empty" 0 "${#patches[@]}"
}

function test_configure_opts()
{
	assertEquals "\$configure_opts was not empty" 0 "${#configure_opts[@]}"
}

function test_make_opts()
{
	assertEquals "\$make_opts was not empty" 0 "${#make_opts[@]}"
}

function test_src_dir()
{
	if (( UID == 0 )); then
		assertEquals "did not set \$src_dir correctly" \
			     "/usr/local/src" "$src_dir"
	else
		assertEquals "did not set \$src_dir correctly" \
			     "$HOME/src" "$src_dir"
	fi
}

function test_rubies_dir()
{
	if (( UID == 0 )); then
		assertEquals "did not set \$rubies_dir correctly" \
			     "/opt/rubies" "$rubies_dir"
	else
		assertEquals "did not set \$rubies_dir correctly" \
			     "$HOME/.rubies" "$rubies_dir"
	fi
}

function test_src_dir_with_RUBY_INSTALL_SRC_DIR()
{
	export RUBY_INSTALL_SRC_DIR="/path/to/src/dir"
	. ./share/ruby-install/ruby-install.sh

	assertEquals "did not set \$src_dir to \$RUBY_INSTALL_SRC_DIR" \
		     "$RUBY_INSTALL_SRC_DIR" "$src_dir"

	unset RUBY_INSTALL_SRC_DIR
}

function test_rubies_dir_with_RUBY_INSTALL_SRC_DIR()
{
	export RUBY_INSTALL_RUBIES_DIR="/path/to/rubies/dir"
	. ./share/ruby-install/ruby-install.sh

	assertEquals "did not set \$rubies_dir to \$RUBY_INSTALL_RUBIES_DIR" \
		     "$RUBY_INSTALL_RUBIES_DIR" "$rubies_dir"

	unset RUBY_INSTALL_RUBIES_DIR
}

SHUNIT_PARENT=$0 . $SHUNIT2
