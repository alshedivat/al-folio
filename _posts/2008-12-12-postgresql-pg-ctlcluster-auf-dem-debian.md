---
layout: post
title: postgreSQL pg_ctlcluster auf dem Debian System
date: '2008-12-12T00:00:00+01:00'
tags:
- postgresql
- pg_ctlcluster
- debian
category: 'PostgreSQL'

---
Moin Moin,

es führen bekanntlich viele Wege nach Rom. So ist es auch beim Starten und Stoppen der
PostgreSQL. Das ganze sieht auf einem Debian System folgendermaßen aus.

<h3>1. Per init Script</h3>

Das ist so ziemlich der einfachste Weg.

<pre>root@seven:~# /etc/init.d/postgresql-8.1
Usage: /etc/init.d/postgresql-8.1
{start|stop|restart|reload|force-reload|status|autovac-start|autovac-stop|autovac-restart}</pre>

<h3>2. Per pg_ctlcluster </h3>

Das ist ein Distributions Tool von Debian. Im Ordner /usr/bin/ gibt es folgende tools:

<pre>root@seven:~# ll /usr/bin/pg_*
- -rwxr-xr-x 1 root root 23704  4. Nov 22:37 /usr/bin/pg_config
- -rwxr-xr-x 1 root root 24118 21. Jul 10:47 /usr/bin/pg_createcluster
- -rwxr-xr-x 1 root root 18980 21. Jul 10:46 /usr/bin/pg_ctlcluster
- -rwxr-xr-x 1 root root  3552  3. Feb 2008  /usr/bin/pg_dropcluster
lrwxrwxrwx 1 root root    37 24. Nov 14:37 /usr/bin/pg_dump -&gt;
../share/postgresql-common/pg_wrapper
lrwxrwxrwx 1 root root    37 24. Nov 14:37 /usr/bin/pg_dumpall -&gt;
../share/postgresql-common/pg_wrapper
- -rwxr-xr-x 1 root root  1293 17. Okt 2007  /usr/bin/pg_lsclusters
lrwxrwxrwx 1 root root    37 24. Nov 14:37 /usr/bin/pg_restore -&gt;
../share/postgresql-common/pg_wrapper
- -rwxr-xr-x 1 root root 22253 31. Mär 2008  /usr/bin/pg_upgradecluster</pre>

Und so wird&#8217;s genutzt:

<pre>root@seven:~# pg_ctlcluster which pg_ctluster
Usage: /usr/bin/pg_ctlcluster &lt; version &gt; &lt; cluster &gt; &lt; action &gt;</pre>

wobei action = start|stop|restart|reload|autovac-start|autovac-stop|autovac-restart

Beispiel:

<pre>root@seven:~# pg_ctlcluster 8.1 main start</pre>

<h3>3. Mit Postgres&#8217;schen hauseigenen tool pg_ctl</h3>
Das geht natürlich auch. Dafür muss man allerdings einige Dinge vorbereiten. Zuerstmal
muss man der User postgres sein und wechselt in das Homeverzeichnis:

<pre>root@seven:~# su postgres
postgres@seven:/root$ cd
postgres@seven:~$</pre>

Dort bearbeitet man zuerst die .bashrc Datei oder legt diese an. Der Inhalt sollte
mindestens dieser sein:

<pre>export PATH=/usr/lib/postgresql/8.1/bin:$PATH
export PGDATA=/var/lib/postgresql/8.1/main/
export PGPORT=5432</pre>

Zum einen fürgen wir der Umgebungsvariablen PATH den Eintrag zu pg_ctl hinzu. AUsserdem
legen wir noch das Data Directory der PostgreSQL und den Port fest. Wenn wir eine andere
PostgreSQL laufen lassen wollen, z.B. auf Port 5433&#160;müsste das geändert werden. Das war&#8217;s
erstmal.

Wechseln wir jetzt in das main Verzeichnis und setzen pg_ctl start ab, wird das nicht
klappen, weil die postgresql.conf noch fehlt:

<pre>postgres@seven:~$ cd 8.1/main/
postgres@seven:~$ cd 8.1/main$pg_ctl start
postgres@seven:~$ cd 8.1/main$postmaster kann nicht auf die Serverkonfigurationsdatei
»/var/lib/postgresql/8.1/main/postgresql.conf« zugreifen: Datei oder Verzeichnis nicht
gefunden</pre>

Also setzen wir einen Symlink:
<pre>
postgres@seven:~$ cd 8.1/main$ln -s /etc/postgresql/postgresql.conf
</pre>

Wichtig ist noch zu erwähnen, dass pg_ctl auf jeden Fall die Datei PG_VERSION in diesem
Verzeichnis erwartet. Übrigens kann man diesen Befehl auch im Verzeichnis /etc/postgresql/
erfolgreich absetzen. Dort sind bereits alle Verweise vorhanden.

So, das war&#8217;s. An dieser Stelle mal wieder ganz herzlichen Dank an unseren Sysadmin
Andreas Putzo der wie immer mit Rat und Tat zur Verfügung stand  ;-)

Andreas
