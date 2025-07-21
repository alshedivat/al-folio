%define name ruby-install
%define version 0.9.2
%define release 1

%define buildroot %{_topdir}/BUILDROOT

BuildRoot: %{buildroot}
Source0: https://github.com/postmodern/%{name}/releases/download/v%{version}/%{name}-%{version}.tar.gz
Summary: Installs Ruby, JRuby, TruffleRuby (native / GraalVM), or mruby
Name: %{name}
Version: %{version}
Release: %{release}
License: MIT
URL: https://github.com/postmodern/ruby-install#readme
AutoReqProv: no
BuildArch: noarch
Requires: bash, grep, wget > 1.12, tar, bzip2, xz, patch

%description
Installs Ruby, JRuby, TruffleRuby (native / GraalVM), or mruby

%prep
%setup -q

%build

%install
make install PREFIX=%{buildroot}/usr

%files
%defattr(-,root,root)
%{_bindir}/ruby-install
%{_datadir}/%{name}/*
%{_mandir}/man1/*
%doc
%{_defaultdocdir}/%{name}-%{version}/*

%changelog
* Tue Sep 19 2023 Postmodern <postmodern.mod3@gmail.com> - 0.9.2-1
- Rebuilt for version 0.9.2.

* Fri Jun 23 2023 Postmodern <postmodern.mod3@gmail.com> - 0.9.1-1
- Rebuilt for version 0.9.1.

* Mon Jan 30 2023 Postmodern <postmodern.mod3@gmail.com> - 0.9.0-1
- Rebuilt for version 0.9.0.

* Mon Aug 22 2022 Postmodern <postmodern.mod3@gmail.com> - 0.8.5-1
- Rebuilt for version 0.8.5.

* Mon Aug 03 2022 Postmodern <postmodern.mod3@gmail.com> - 0.8.4-2
- Added xz as a dependency.

* Mon Aug 01 2022 Postmodern <postmodern.mod3@gmail.com> - 0.8.4-1
- Rebuilt for version 0.8.4.

* Sat Sep 25 2021 Postmodern <postmodern.mod3@gmail.com> - 0.8.3-1
- Rebuilt for version 0.8.3.

* Sun Jul 04 2021 Postmodern <postmodern.mod3@gmail.com> - 0.8.2-1
- Rebuilt for version 0.8.2.
- Updated the package summary and description.
- Added grep as a dependency.

* Sun Dec 20 2020 Postmodern <postmodern.mod3@gmail.com> - 0.8.1-1
- Rebuilt for version 0.8.1.

* Wed Dec 09 2020 Postmodern <postmodern.mod3@gmail.com> - 0.8.0-1
- Rebuilt for version 0.8.0.

* Wed Jul 22 2020 Postmodern <postmodern.mod3@gmail.com> - 0.7.1-1
- Rebuilt for version 0.7.1.

* Sat Aug 04 2018 Postmodern <postmodern.mod3@gmail.com> - 0.7.0-1
- Rebuilt for version 0.7.0.

* Sat Dec 24 2016 Postmodern <postmodern.mod3@gmail.com> - 0.6.1-1
- Rebuilt for version 0.6.1.
- Added patch as dependency.

* Fri Dec 25 2015 Postmodern <postmodern.mod3@gmail.com> - 0.6.0-1
- Rebuilt for version 0.6.0.

* Thu May 08 2014 Postmodern <postmodern.mod3@gmail.com> - 0.4.3-1
- Rebuilt for version 0.4.3.

* Thu Apr 17 2014 Postmodern <postmodern.mod3@gmail.com> - 0.4.2-1
- Rebuilt for version 0.4.2.

* Mon Mar 03 2014 Postmodern <postmodern.mod3@gmail.com> - 0.4.1-1
- Rebuilt for version 0.4.1.

* Thu Feb 13 2014 Postmodern <postmodern.mod3@gmail.com> - 0.4.0-1
- Rebuilt for version 0.4.0.

* Wed Dec 25 2013 Postmodern <postmodern.mod3@gmail.com> - 0.3.4-1
- Rebuilt for version 0.3.4.

* Wed Dec 04 2013 Postmodern <postmodern.mod3@gmail.com> - 0.3.3-1
- Rebuilt for version 0.3.3.

* Fri Nov 22 2013 Postmodern <postmodern.mod3@gmail.com> - 0.3.2-1
- Rebuilt for version 0.3.2.

* Fri Oct 18 2013 Postmodern <postmodern.mod3@gmail.com> - 0.3.1-1
- Rebuilt for version 0.3.1.

* Tue Aug 06 2013 Postmodern <postmodern.mod3@gmail.com> - 0.3.0-1
- Rebuilt for version 0.3.0.

* Sat Jun 29 2013 Postmodern <postmodern.mod3@gmail.com> - 0.2.1-1
- Rebuilt for version 0.2.1.

* Mon Jun 24 2013 Postmodern <postmodern.mod3@gmail.com> - 0.2.0-1
- Rebuilt for version 0.2.0.
