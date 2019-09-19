#!/bin/bash
set -x

if [[ $TRAVIS_OS_NAME != 'linux' ]]; then
  brew update
  # fix an issue with libtool on travis by reinstalling it
  brew uninstall libtool;
  brew install libtool dejagnu;
else
  sudo apt-get update
  sudo apt-get install dejagnu texinfo
  case "$HOST" in
    i386-pc-linux-gnu)
	sudo apt-get install gcc-multilib g++-multilib
	;;
    moxie-elf)
	echo 'deb http://repos.moxielogic.org:7114/MoxieLogic moxiedev main' | sudo tee -a /etc/apt/sources.list
	sudo apt-get update -qq
	sudo apt-get install -y --allow-unauthenticated moxielogic-moxie-elf-gcc moxielogic-moxie-elf-gcc-c++ moxielogic-moxie-elf-gcc-libstdc++ moxielogic-moxie-elf-gdb-sim
	;;
  esac
fi
