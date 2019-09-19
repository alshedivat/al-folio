#!/bin/bash

# exit this script if any commmand fails
# set -e

function build_linux()
{
    ./autogen.sh
    ./configure ${HOST+--host=$HOST} ${CONFIGURE_OPTIONS}
    make
    make dist
    make check RUNTESTFLAGS="-a $RUNTESTFLAGS"
    cat */testsuite/libffi.log
}

function build_ios()
{
    which python
# export PYTHON_BIN=/usr/local/bin/python
    ./generate-darwin-source-and-headers.py
    xcodebuild -showsdks
    xcodebuild -project libffi.xcodeproj -target "libffi-iOS" -configuration Release -sdk iphoneos10.3
    find ./ 
}

./autogen.sh
case "$HOST" in
    arm-apple-darwin*)
	build_ios
	;;
    *)
	build_linux
	;;
esac
