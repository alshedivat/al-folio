---
layout: post
title:  "Sonatype and Scala: A Relationship of Trickery"
date:   2012-06-02
description: Dealing with scala challenges 
tags: scala
---

Open source projects are amazing. They let you easily share the work you do
with others so that they can iterate and improve upon your ideas, an especially
invaluable quality when you later move on to other things. [Maven](https://maven.apache.org/) in a very
similar fashion makes sharing open source (or even closed source) java projects
super easy. If you structure your codebase in a Maven way and register an
account with [Sonatype](https://oss.sonatype.org/#welcome), you can get your
project’s jars distributed worldwide so that anyone and everyone can used your
stuff without having to download and
compile your code.

For pure java projects, this process is utterly trivial, just follow some
instructions and it all works out beautifully. But java is verbose and often
prefer to use [Scala](https://www.scala-lang.org/), especially for small
prototype systems. But how do you deploy a mavenized scala project with
Sonatype? Well, it all pretty much works out except that you need to create a
jar of javadocs before Sonatype will let you publish anything. Not being java
and all, scala does not do this out of the box, and maven won’t either. But,
there’s a cute hack you can do if you’re using maven 3.0. Just add this snippet
to your pom file and watch the deployment rock:

```xml
  <build>
    <plugins>
      ...
      <plugin>
        <groupId>net.alchim31.maven</groupId>
        <artifactId>scala-maven-plugin</artifactId>
        <version>3.0.2</version>
        <executions>
          <execution>
            <id>javadoc-jar</id>
            <phase>package</phase>
            <goals>
              <goal>doc-jar</goal>
            </goals>
          </execution>
        </executions>
      </plugin>
    </plugins>
  </build>
```

This uses the versitile scala maven plugin and runs the `doc-jar` goal to build
scala docs every time you type `mvn package` or some command that depends on
`mvn package`, this includes `mvn deploy`. The id bit creates a `javadoc.jar`
containing the scaladoc. So with just that tidbit, you can deploy your maven
projects to Sonatype with no issues at all.
