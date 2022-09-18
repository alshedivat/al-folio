---
layout: post
title: git - squashing commits
date: '2011-04-04T12:13:00+02:00'
tags:
- git
- git-rebase
category: 'Server'

---
<p>Moin Moin,</p>

<p>because I can&#8217;t fuckin&#8217; remember this cool git feature, I have to write it down shortly.</p>

<p>Let&#8217;s say you have some commits made to a specific branch. Firing git log could return something like this:</p>

<pre>
commit dfc1aa75553b796e94a0927575721f8b1938e53a
Author: Andreas Wenk <andreas.wenk>
Date:   Mon Apr 4 11:44:50 2011

    fourth line

commit 873a784e13b8d333f17ba805260cdd275ec962b2
Author: Andreas Wenk <andreas.wenk>
Date:   Mon Apr 4 11:44:10 2011

    third line

commit fe1eb9eab73062256bc1e6131826c8698c090f70
Author: Andreas Wenk <andreas.wenk>
Date:   Mon Apr 4 11:43:34 2011

    second line

commit f3ea5367b7c20334b5844b5eabb450374db57501
Author: Andreas Wenk <andreas.wenk>
Date:   Mon Apr 4 11:43:00 2011

    first line
</andreas.wenk></andreas.wenk></andreas.wenk></andreas.wenk></pre>

<p>Now these commits are kind of the same and I decide to put some of them into one commit to not flooding the git log history. The command you&#8217;re looking for is <i>git rebase -i</i></p>

The target is to make one commit out of the three newest commits. git-rebase needs one commit point, after which the operations shall be done. So what we write is:

<pre>
git rebase -i e2148eac05
</pre>

The resulting output is:

<pre>
pick fe1eb9e second line
pick 873a784 third line
pick dfc1aa7 fourth line

# Rebase f3ea536..dfc1aa7 onto f3ea536
#
# Commands:
#  p, pick = use commit
#  r, reword = use commit, but edit the commit message
#  e, edit = use commit, but stop for amending
#  s, squash = use commit, but meld into previous commit
#  f, fixup = like "squash", but discard this commit's log message
#
# If you remove a line here THAT COMMIT WILL BE LOST.
# However, if you remove everything, the rebase will be aborted.
#
</pre>

The first thing you should recognize is that the commit history is in reverse order. So the oldest is on top. Now we wanna squash these three commits to one. git-rebase offers some commands you can put in front of each commit line. What we need is s for squash or f for fixup. The commands are slightly different. squash will not discard the commit but meld it into the previous one. Let&#8217;s do it:

<pre>
pick fe1eb9e second line
s 873a784 third line
s dfc1aa7 fourth line

# Rebase f3ea536..dfc1aa7 onto f3ea536
#
# Commands:
#  p, pick = use commit
#  r, reword = use commit, but edit the commit message
#  e, edit = use commit, but stop for amending
#  s, squash = use commit, but meld into previous commit
#  f, fixup = like "squash", but discard this commit's log message
#
# If you remove a line here THAT COMMIT WILL BE LOST.
# However, if you remove everything, the rebase will be aborted.
#
</pre>

<p>Here, we tell git, that the commit fe1eb9e is the one we wanna keep. You could also use another one. After saving this file git is providing another view:</p>

<pre>
# This is a combination of 3 commits.
# The first commit's message is:
second line

# This is the 2nd commit message:

third line

# This is the 3rd commit message:

fourth line

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
# Not currently on any branch.
# Changes to be committed:
#   (use "git reset HEAD <file>..." to unstage)
#
# modified:   test
#
</file></pre>

<p>Now, you have the opportunity to change the commit message. Use your fantasy to write a meaningful commit message. E.g:</p>

<pre>
# This is a combination of 3 commits.
squashing togehter three commits

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
# Not currently on any branch.
# Changes to be committed:
#   (use "git reset HEAD <file>..." to unstage)
#
# modified:   test
#
</file></pre>

<p>Yeah - very meaningful ;-). Now save the file and git will do the work for you:</p>

<pre>
$ git rebase -i f3ea5367b7
[detached HEAD a17cc44] squashing togehter three commits
 1 files changed, 6 insertions(+), 1 deletions(-)
Successfully rebased and updated refs/heads/master.
</pre>

<p>And finally git log is telling us:</p>
<pre>
commit a17cc448869b0b092601f59da76970e1dd8e94e7
Author: Andreas Wenk <andreas.wenk>
Date:   Mon Apr 4 11:43:34 2011

    squashing togehter three commits

commit f3ea5367b7c20334b5844b5eabb450374db57501
Author: Andreas Wenk <andreas.wenk>
Date:   Mon Apr 4 11:43:00 2011

    first line
</andreas.wenk></andreas.wenk></pre>

<p>Important note: this is a real powerful tool for manipulating the commit history. So you should <i>think</i> before <i>doing</i>. Especially when pushing the changed commits to an origin master where other people have worked on. Probably you will be told, that the pushing is rejected and you will have to use &#8212;force. This can imply damage &#8230;</p>

<p>Happy squashing!</p>
