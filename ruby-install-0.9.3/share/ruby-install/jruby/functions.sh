#!/usr/bin/env bash

ruby_archive="${ruby_archive:-jruby-dist-$ruby_version-bin.tar.gz}"
ruby_dir_name="jruby-$ruby_version"
ruby_mirror="${ruby_mirror:-https://repo1.maven.org/maven2/org/jruby/jruby-dist}"
ruby_url="${ruby_url:-$ruby_mirror/$ruby_version/$ruby_archive}"

#
# Install JRuby into $install_dir.
#
function install_ruby()
{
	log "Installing jruby $ruby_version ..."
	copy_into "$ruby_build_dir" "$install_dir" || return $?
}

#
# Post-install tasks.
#
function post_install()
{
	log "Symlinking bin/ruby to bin/jruby ..."
	run ln -fs jruby "$install_dir/bin/ruby" || return $?

	if ! command -v java >/dev/null; then
		warn "In order to use JRuby you must install OracleJDK:"
		warn "  http://www.oracle.com/technetwork/java/javase/downloads/index.html"
	fi
}
