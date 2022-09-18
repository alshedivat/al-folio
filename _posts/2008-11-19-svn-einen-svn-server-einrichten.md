---
layout: post
title: svn - einen svn Server einrichten
date: '2008-11-19T00:00:00+01:00'
tags:
- svn
- repository
- dav_svn
- apache2
category: 'Server'

---
Moin Moin,

mal wieder was zu svn. Es geht darum wie ich einen svn Server - ich nenn das mal so - mit Apache2 einrichte. Der Witz dabei ist, dass der Apache2 so konfiguriert wird, dass wir sehr einfach per http Schnittstelle auf das Repository zugreifen können. Also Abfahrt.

<h3>1. svn installieren</h3>

Wie immer betrachte ich die Installation unter einem Debian Linux als User root. Die Installation ist denkbar einfach, wobei wir zum einen svn und zum anderen die Erweiterung für den Apache2 installieren müssen:

<pre>
root@server: aptitude install subversion libapache2-svn
</pre>

<h3>2. Modul dav_svn aktivieren</h3>

Jetzt aktivieren wir das Apache2 Modul dav_svn. Dazu wechseln wir in das Modul Verzeichnis des Apache und aktivieren es mit dem Apache Programm a2enmod:

<pre>
root@server: cd /etc/apache2/mods-available/
root@server:/etc/apache2/mods-available# a2enmod dav_svn
</pre>

<h3>3. Das Modul dav_svn konfigurieren</h3>

Nachdem alles installiert und aktiviert ist, geht&#8217;s jetzt an die Konfiguration. Dazu bearbeiten wir die Datei dav_svn.conf.

<pre>
root@server: cd /etc/apache2/mods-enabled/
root@server:/etc/apache2/mods-enabled# vi dav_svn.conf
</pre>

Der Inhalt der Datei sieht prinzipiell so aus. Ich lasse alle Kommentar weg und schreibe eigen dazu:

<pre>&lt;Location /svn&gt;
# muss auskommentiert werden, damit das Repository aktiviert wird
DAV svn

# wir wollen mehrere Repositorys verwalten
SVNParentPath /var/lib/svn

# Die Authentifizierung erfolgt über die Datei dav_svn.passwd
AuthType Basic
AuthName "Subversion Repository"
AuthUserFile /etc/apache2/dav_svn.passwd

# Wir wollen über mod_authz_svn die Rechte für den Zugriff auf die Repositorys steuern
AuthzSVNAccessFile /etc/apache2/dav_svn.authz

# Um die Repositorys auschecken zu können, muss ein gültiger User existieren
Require valid-user
&lt;/Location&gt;</pre>

Ich habe in einem früheren Post schon erklärt, wie man mod_authz_svn einrichtet. Den Post <a href="http://blog.netzmeister-st-pauli.de/index.php/2008/09/22/svn-authentifizierung-mit-mod_authz_svn" target="_blank">findest Du hier</a>.

Wenn wir alles erledigt haben starten wir den Webserver neu.

<h3>4. Einen User anlegen</h3>

Einen user legen wir an, indem wir diesen mit dem Program htpasswd in die Datei dav_svn.passwd eintragen. Dazu wechseln wir zuerst ins entsprechende Verzeichnis:

<pre>
root@server: cd /etc/apache2/
&lt;em&gt;wenn die Datei noch nicht existiert&lt;/em&gt;
root@server:/etc/apache2/htpasswd -c dav_svn.passwd
root@server:/etc/apache2# htpasswd dav_svn.passwd [user]
</pre>

-&gt; Dann zweimal Passwort eingeben

<h3>5. Ein Repository erstellen</h3>

So, alles eingestellt. Jetzt erstellen wir ein Repository. Dazu wechseln wir in das Verzeichnis, in welchem die Repository&#8217;s liegen sollen und nutzen das Program svnadmin wiederum als User root:

<pre>
root@server: cd /var/lib/svn
root@server:/var/lib/svn# svnadmin create repositroy_neu
</pre>

Damit haben wir ein Repository namens repository_neu erstellt. Aber Achtung. Damit das Repository über das web betrachtet werden kann, müssen wir die Rechte ändern. Ich gehe davon aus, dass der Apache2 User und die Group www-data heisst:

<pre>
root@server:/var/lib/svn# chown -R www-data repository_neu/
</pre>

Testen wir das Ganze und geben wir die URL des Repository&#8217;s im Browser ein:

<em><a href="http://www.server.de/svn/repository_neu" target="_blank">http://www.server.de/svn/repository_neu</a></em>

Wir müssen eine http Authentifizerung machen. Und danach sehen wir so was wie das hier:

<img src="http://media.tumblr.com/tumblr_kyf21ql3FB1qa0m1w.png"/>

Damit haben wir&#8217;s auch schon geschafft.

<h3>6. Ein Projekt auschecken</h3>

Hier noch ganz kurz, wie man ein svn Repository auf der Shell auscheckt:

<pre>
user@server: cd /tmp
user@server:/tmp/ svn co htp://www.server.de/svn/repository_neu -username [user]
Anmeldebereich: <a href="http://www.server.de:80" target="_blank">http://www.server.de:80</a> Subversion Repository
Passwort für »[user]«: *********

Ausgecheckt, Revision 0.
user@root:/tmp/
</pre>

Für Hilfe zu svn einfach svn help oder svn help [Befehl] eingeben.

Dann viel Spass

Andreas
