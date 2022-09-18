---
layout: post
title: svn - commit E-Mails einrichten
date: '2008-11-23T00:00:00+01:00'
tags:
- svn
- commitmails
category: 'Server'

---
Moin Moin,

na weil das Thema svn so spannend ist, hier gleich noch ein kleines HOW TO für das Einrichten von commit E-Mails. Das heisst, jedes mal wenn ein svn commit ausgeführt wird, wird eine E-Mail an eine oder mehrere Personen geschickt.

<h3>1. subversion-tools installieren</h3>

Zuerst muss eine Erweiterung für Subversion installiert werden. Auf einem Debian System nutzen wir wieder den Paketmanager apt oder aptitude.

<pre>
root@server: apt-get install subversion-tools
</pre>

<h3>2. email Adresse in commit-email.pl angeben</h3>

Nun suchen wir den Ordner in welchem die Datei commit-email.pl liegt. Der Ordner heisst hook-scripts.

<pre>root@server: dpgk -L subversion-tools
[...]
/usr/share/subversion/hook-scripts/commit-email.pl
[...]
</pre>

Das merken wir uns. Als nächstes wechseln wir in das Verzeichnis, in welchem unser svn Repository liegt und dort in den Ordner hooks:

<pre>
root@server:cd /var/lib/svn/repo1/hooks
root@server:/var/lib/svn/repo1/hooks#
</pre>

Dort kopieren wir jetzt die Datei post-commit.tmpl zu post-commit und bearbeiten diese:

<pre>
root@server:/var/lib/svn/repo1/hooks# cp post-commit.tmpl post-commit
root@server:/var/lib/svn/repo1/hooks# chmod 755 post-commit
root@server:/var/lib/svn/repo1/hooks# vi post-commit
</pre>

Letztendlich müssen wir nur ein paar Zeilen am Ende der Datei einfügen:

<pre>
#!/bin/sh
# POST-COMMIT HOOK
#
# The post-commit hook is invoked after a commit.  Subversion runs
# this hook by invoking a program (script, executable, binary, etc.)
# named 'post-commit' (for which this file is a template) with the
# following ordered arguments:
#
#   [1] REPOS-PATH   (the path to this repository)
#   [2] REV          (the number of the revision just committed)
#
[...]

REPOS="$1"
REV="$2"

/usr/share/subversion/hook-scripts/commit-email.pl $REPOS $REV --from svn@emailadr.com meine@mailadr.com
</pre>

Was passiert hier? Nach dem subversion einen commit abgefeuert hat, wird dieses script post-commit aufgerufen. Dem script werden zwei Parameter übergeben. Erstens der Pfad zum repositroy in $1 und zweitens die Revision Nummer in $2. Danach wird das Perl script commit-email.pl aufgerufen (deshalb haben wir uns den Pfad dorthin gemerkt) wobei wiederum Parameter übergeben werden. Zuerst der Pfad zum Repository, die revision Nummer, eine &#8220;From:&#8221; E-Mail Adresse und den Empfänger. Es können noch weitere Parameter angegeben werden. Um alle Optionen zu sehen, einfach mal in das verzeichnis wechseln in welchem das PERL Script liegt und ausführen:

<pre>
root@server: cd /usr/share/subversion/hook-scripts/
root@server:/usr/share/subversion/hook-scripts# perl ./commit-email.pl
./commit-email.pl: too few arguments.
usage (commit mode):
  ./commit-email.pl REPOS REVNUM [[-m regex] [options] [email_addr ...]] ...
usage: (revprop-change mode):
  ./commit-email.pl --revprop-change REPOS REVNUM USER PROPNAME [-d diff_file] \
    [[-m regex] [options] [email_addr ...]] ...
options are:
  --from email_address  Email address for 'From:' (overrides -h)
  -h hostname           Hostname to append to author for 'From:'
  -l logfile            Append mail contents to this log file
  -m regex              Regular expression to match committed path
  -r email_address      Email address for 'Reply-To:'
  -s subject_prefix     Subject line prefix
  --diff y|n            Include diff in message (default: y)
                        (applies to commit mode only)

[... weiter Erklärungen]
</pre>

<h3>Verbesserung</h3>

Momentan ist das ganze so eingestellt, dass die E-Mail an einen Empfänger geht. Denkbar bzw. sinvoller ist es aber, das an eine Mailinglist E-Mail Adresse zu senden. Dann erhalten alle Beteiligten Entwickler die E-mail und können nachverfolgen, wer was wann geändert oder gecoded hat.

Andreas
