#!/usr/bin/env ruby

if !defined?(RUBY_ENGINE) || RUBY_ENGINE == 'ruby' || RUBY_ENGINE == 'rbx'
  require 'mkmf'
  require 'rbconfig'

  def system_libffi_usable?
    # We need pkg_config or ffi.h
    libffi_ok = pkg_config("libffi") ||
        have_header("ffi.h") ||
        find_header("ffi.h", "/usr/local/include", "/usr/include/ffi")

    # Ensure we can link to ffi_call
    libffi_ok &&= have_library("ffi", "ffi_call", [ "ffi.h" ]) ||
                  have_library("libffi", "ffi_call", [ "ffi.h" ])

    # And we need a libffi version recent enough to provide ffi_closure_alloc
    libffi_ok &&= have_func("ffi_closure_alloc")
  end

  dir_config("ffi_c")

  # recent versions of ruby add restrictive ansi and warning flags on a whim - kill them all
  $warnflags = ''
  $CFLAGS.gsub!(/[\s+]-ansi/, '')
  $CFLAGS.gsub!(/[\s+]-std=[^\s]+/, '')
  # solaris 10 needs -c99 for <stdbool.h>
  $CFLAGS << " -std=c99" if RbConfig::CONFIG['host_os'] =~ /solaris(!?2\.11)/

  # Check whether we use system libffi
  system_libffi = enable_config('system-libffi', :try)

  if system_libffi == :try
    system_libffi = ENV['RUBY_CC_VERSION'].nil? && system_libffi_usable?
  elsif system_libffi
    abort "system libffi is not usable" unless system_libffi_usable?
  end

  have_header('shlwapi.h')
  have_func('rb_thread_call_without_gvl') || abort("Ruby C-API function `rb_thread_call_without_gvl` is missing")
  have_func('ruby_native_thread_p')
  if RUBY_VERSION >= "2.3.0"
    # On OSX and Linux ruby_thread_has_gvl_p() is detected but fails at runtime for ruby < 2.3.0
    have_func('ruby_thread_has_gvl_p')
  end

  if system_libffi
    have_func('ffi_prep_cif_var')
    $defs << "-DHAVE_RAW_API" if have_func("ffi_raw_call") && have_func("ffi_prep_raw_closure")
  else
    $defs << "-DHAVE_FFI_PREP_CIF_VAR"
    $defs << "-DUSE_INTERNAL_LIBFFI"
  end

  $defs << "-DHAVE_EXTCONF_H" if $defs.empty? # needed so create_header works
  $defs << "-DRUBY_1_9" if RUBY_VERSION >= "1.9.0"
  $defs << "-DFFI_BUILDING" if RbConfig::CONFIG['host_os'] =~ /mswin/ # for compatibility with newer libffi

  create_header

  $LOCAL_LIBS << " ./libffi/.libs/libffi_convenience.lib" if !system_libffi && RbConfig::CONFIG['host_os'] =~ /mswin/

  create_makefile("ffi_c")
  unless system_libffi
    File.open("Makefile", "a") do |mf|
      mf.puts "LIBFFI_HOST=--host=#{RbConfig::CONFIG['host_alias']}" if RbConfig::CONFIG.has_key?("host_alias")
      if RbConfig::CONFIG['host_os'].downcase =~ /darwin/
        mf.puts "include ${srcdir}/libffi.darwin.mk"
      elsif RbConfig::CONFIG['host_os'].downcase =~ /bsd/
        mf.puts '.include "${srcdir}/libffi.bsd.mk"'
      elsif RbConfig::CONFIG['host_os'].downcase =~ /mswin64/
        mf.puts '!include $(srcdir)/libffi.vc64.mk'
      elsif RbConfig::CONFIG['host_os'].downcase =~ /mswin32/
        mf.puts '!include $(srcdir)/libffi.vc.mk'
      else
        mf.puts "include ${srcdir}/libffi.mk"
      end
    end
  end

else
  File.open("Makefile", "w") do |mf|
    mf.puts "# Dummy makefile for non-mri rubies"
    mf.puts "all install::\n"
  end
end
