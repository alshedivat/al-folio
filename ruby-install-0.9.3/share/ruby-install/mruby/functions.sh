#!/usr/bin/env bash

ruby_archive="${ruby_archive:-mruby-$ruby_version.tar.gz}"
ruby_dir_name="mruby-$ruby_version"
ruby_mirror="${ruby_mirror:-https://github.com/mruby/mruby/archive}"
ruby_url="${ruby_url:-$ruby_mirror/$ruby_version/$ruby_archive}"

#
# Cleans mruby.
#
function clean_ruby()
{
	log "Cleaning mruby $ruby_version ..."
	run make clean || return $?
}

#
# Compile mruby.
#
function compile_ruby()
{
	log "Compiling mruby $ruby_version ..."
	run make "${make_opts[@]}" || return $?
}

#
# Install mruby into $install_dir.
#
function install_ruby()
{
	log "Installing mruby $ruby_version ..."
	run cp -R "$ruby_build_dir" "$install_dir" || return $?
}

#
# Post-install tasks.
#
function post_install()
{
	log "Symlinking bin/ruby to bin/mruby ..."
	run ln -fs mruby "$install_dir/bin/ruby" || return $?

	log "Symlinking bin/irb to bin/mirb ..."
	run ln -fs mirb "$install_dir/bin/irb" || return $?
}
