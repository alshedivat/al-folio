#!/usr/bin/env bash

case "$os_platform" in
	Linux)   truffleruby_platform="linux" ;;
	Darwin)  truffleruby_platform="macos" ;;
	*)       fail "Unsupported platform $os_platform" ;;
esac

case "$os_arch" in
	x86_64)  truffleruby_arch="amd64" ;;
	aarch64) truffleruby_arch="aarch64" ;;
	arm64)   truffleruby_arch="aarch64" ;;
	*)       fail "Unsupported platform $os_arch" ;;
esac

ruby_dir_name="truffleruby-$ruby_version-$truffleruby_platform-$truffleruby_arch"
ruby_archive="${ruby_archive:-$ruby_dir_name.tar.gz}"
truffleruby_major="${ruby_version%%.*}"
truffleruby_without_major="${ruby_version#*.}"
truffleruby_minor="${truffleruby_without_major%%.*}"

if [[ "$ruby_version" == "23.0.0" ]]; then
	log "TruffleRuby 23.0 and later installed by ruby-install use the faster Oracle GraalVM distribution"
	log "Oracle GraalVM uses the GFTC license, which is free for development and production use, see https://medium.com/graalvm/161527df3d76"

	ruby_mirror="${ruby_mirror:-https://gds.oracle.com/api/20220101/artifacts}"
	truffleruby_artifact_id=""

	case "$truffleruby_platform-$truffleruby_arch" in
		linux-amd64)    truffleruby_artifact_id="FD4AB182EA4CEDFDE0531518000AF13E" ;;
		linux-aarch64)  truffleruby_artifact_id="FD40BA2367C226B6E0531518000AE71A" ;;
		macos-amd64)   truffleruby_artifact_id="FD4AB182EA51EDFDE0531518000AF13E" ;;
		macos-aarch64) truffleruby_artifact_id="FD40BBF6750C366CE0531518000ABEAF" ;;
		*)              fail "Unsupported platform $truffleruby_platform-$truffleruby_arch" ;;
	esac

	ruby_url="${ruby_url:-$ruby_mirror/$truffleruby_artifact_id/content}"
elif (( truffleruby_major > 23 || (truffleruby_major == 23 && truffleruby_minor >= 1) )); then # 23.1+
	ruby_mirror="${ruby_mirror:-https://github.com/oracle/truffleruby/releases/download}"
	ruby_url="${ruby_url:-$ruby_mirror/graal-$ruby_version/$ruby_archive}"
else
	ruby_mirror="${ruby_mirror:-https://github.com/oracle/truffleruby/releases/download}"
	ruby_url="${ruby_url:-$ruby_mirror/vm-$ruby_version/$ruby_archive}"
fi

#
# Install TruffleRuby into $install_dir.
#
function install_ruby()
{
	if [[ "$install_dir" == '/usr/local' ]]; then
		error "Unsupported see https://github.com/oracle/truffleruby/issues/1389"
		return 1
	fi

	log "Installing truffleruby $ruby_version ..."
	copy_into "$ruby_build_dir" "$install_dir" || return $?
}

#
# Post-install tasks.
#
function post_install()
{
	log "Running truffleruby post-install hook ..."
	run "$install_dir/lib/truffle/post_install_hook.sh" || return $?
}
