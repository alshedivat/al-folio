---
layout: post
title: 'Start eclipse from the command line '
date: '2010-09-09T10:28:00+02:00'
tags:
- eclipse
category: 'Programming'

---
Hi,

just a short tip if you want to start eclipse from the command line. You can find the possible options here:

<a href="http://help.eclipse.org/ganymede/index.jsp?topic=/org.eclipse.platform.doc.user/tasks/running_eclipse.htm" target="_blank"><a href="http://help.eclipse.org/ganymede/index.jsp?topic=/org.eclipse.platform.doc.user/tasks/running_eclipse.htm" target="_blank">http://help.eclipse.org/ganymede/index.jsp?topic=/org.eclipse.platform.doc.user/tasks/running_eclipse.htm</a></a>

Example:
<pre>
#!/bin/bash

$HOME/applications/ver/eclipse/eclipse -clean -nosplash \
-data $HOME/project/ver/
</pre>
Cheers

Andy
