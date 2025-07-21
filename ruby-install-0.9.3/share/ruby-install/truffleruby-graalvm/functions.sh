#!/usr/bin/env bash

case "$os_platform" in
	Linux)   graalvm_platform="linux" ;;
	Darwin)  graalvm_platform="darwin" ;;
	*)       fail "Unsupported platform $os_platform" ;;
esac

case "$os_arch" in
	x86_64)  graalvm_arch="amd64" ;;
	aarch64) graalvm_arch="aarch64" ;;
	arm64)   graalvm_arch="aarch64" ;;
	*)       fail "Unsupported platform $os_arch" ;;
esac

truffleruby_major="${ruby_version%%.*}"
truffleruby_without_major="${ruby_version#*.}"
truffleruby_minor="${truffleruby_without_major%%.*}"

if [[ "$ruby_version" == "23.0.0" ]]; then
	log "TruffleRuby-GraalVM 23.0 and later installed by ruby-install use the faster Oracle GraalVM distribution"
	log "Oracle GraalVM uses the GFTC license, which is free for development and production use, see https://medium.com/graalvm/161527df3d76"

	ruby_dir_name="graalvm-jdk-17.0.7+8.1"
	ruby_archive="${ruby_archive:-graalvm-jdk-17.0.7_${graalvm_platform/darwin/macos}-${graalvm_arch/amd64/x64}_bin.tar.gz}"
	ruby_mirror="${ruby_mirror:-https://download.oracle.com/graalvm/17/archive}"
	ruby_url="${ruby_url:-$ruby_mirror/$ruby_archive}"
elif (( truffleruby_major > 23 || (truffleruby_major == 23 && truffleruby_minor >= 1) )); then # 23.1+
	ruby_dir_name="truffleruby-$ruby_version-${graalvm_platform/darwin/macos}-$graalvm_arch"
	ruby_archive="${ruby_archive:-truffleruby-jvm-$ruby_version-${graalvm_platform/darwin/macos}-$graalvm_arch.tar.gz}"
	ruby_mirror="${ruby_mirror:-https://github.com/oracle/truffleruby/releases/download}"
	ruby_url="${ruby_url:-$ruby_mirror/graal-$ruby_version/$ruby_archive}"
else
	ruby_dir_name="graalvm-ce-java11-$ruby_version"
	ruby_archive="${ruby_archive:-graalvm-ce-java11-$graalvm_platform-$graalvm_arch-$ruby_version.tar.gz}"
	ruby_mirror="${ruby_mirror:-https://github.com/graalvm/graalvm-ce-builds/releases/download}"
	ruby_url="${ruby_url:-$ruby_mirror/vm-$ruby_version/$ruby_archive}"
fi

#
# Install TruffleRuby GraalVM into $install_dir.
#
function install_ruby()
{
	if [[ "$install_dir" == '/usr/local' ]]; then
		error "Unsupported see https://github.com/oracle/truffleruby/issues/1389"
		return 1
	fi

	log "Installing TruffleRuby GraalVM $ruby_version ..."

	if (( truffleruby_major > 23 || (truffleruby_major == 23 && truffleruby_minor >= 1) )); then # 23.1+
		copy_into "$ruby_build_dir" "$install_dir" || return $?
	else
		copy_into "$ruby_build_dir" "$install_dir/graalvm" || return $?
	fi
}

#
# Post-install tasks.
#
function post_install()
{
	if (( truffleruby_major > 23 || (truffleruby_major == 23 && truffleruby_minor >= 1) )); then # 23.1+
		log "Running truffleruby post-install hook ..."
		run "$install_dir/lib/truffle/post_install_hook.sh" || return $?
	else
		cd "$install_dir/graalvm" || return $?

		if [[ "$graalvm_platform" == "darwin" ]]; then
			run cd Contents/Home || return $?
		fi

		log "Installing the Ruby component ..."
		run ./bin/gu install ruby || return $?

		local ruby_home="$(./bin/ruby -e 'print RbConfig::CONFIG["prefix"]')"

		if [[ -z "$ruby_home" ]]; then
			error "Could not determine TruffleRuby home"
			return 1
		fi

		# Make gu available in PATH (useful to install other languages)
		run ln -fs "$PWD/bin/gu" "$ruby_home/bin/gu" || return $?

		run cd "$install_dir" || return $?
		run ln -fs "${ruby_home#"$install_dir/"}/bin" . || return $?

		log "Running truffleruby post-install hook ..."
		run "$ruby_home/lib/truffle/post_install_hook.sh" || return $?
	fi
}
