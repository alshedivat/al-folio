---
layout:     post
title:      Non-root Docker containers.
date:       2019-12-24 08:00
summary:    
categories: docker
tags:       [docker, linux, bash]
---

When running a Docker container, root privileges are required to manipulate
namespaces and file descriptors. This leads to a common issue when users are
not in the `docker` group and thus prevented from performing any action requiring
assistance from the docker daemon. Let's assume we configured our installation
correctly, and we run the docker container as a local user.
Since Docker containers share the same kernel with the host system, the host and container
worlds of users and groups are the same. Users are identified by their ids and
not by their names, ensuring that the same user id corresponds to the same user
in different containers. We should expect our user to own files and processes
created in the container, right? 

```console
docker run -ti --entrypoint "/bin/bash" ubuntu
root@822ff39102a8:/# ls -l .
total 64
drwxr-xr-x   2 root root 4096 Dec  2 12:43 bin
drwxr-xr-x   2 root root 4096 Apr 24  2018 boot
drwxr-xr-x   5 root root  360 Dec 24 13:26 dev
drwxr-xr-x   1 root root 4096 Dec 24 13:26 etc
```

Surprise! We can confirm further that the entire process is owned by root:

{% raw %}
```console
PID=$(docker inspect --format='{{ .State.Pid }}' ${DOCKER_ID})
ps -fe | grep $PID
root      7694  7668  0 14:26 pts/0    00:00:00 /bin/bash
```
{% endraw %}

In the default configuration, Docker build and containers are executed
with root as the user. Thus, all files created are owned by root, and Docker processes are root
processes, as seen from the host. This result is often quite surprising and might be a potential
security threat - container processes can escape the sandbox environment through
multiple loopholes, as [demonstrated here](https://blog.dragonsector.pl/2019/02/cve-2019-5736-escape-from-docker-and.html?m=1).
Although many projects use the default settings in their images, it is recommended
by Docker [to run containers as a non-root process](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#user)
and [Red Hat's OpenShift](https://access.redhat.com/documentation/en-us/openshift_container_platform/3.11/html/creating_images/creating-images-guidelines)
to configure containers as executable by an arbitrary user ID.


What happens if we try to define the user id when starting a standard container?
```console
USER=$(id -u)
GROUP=$(id -g)
docker run -ti --entrypoint "/bin/bash" --user="$USER:$GROUP" ubuntu

groups: cannot find name for group ID 1000
I have no name!
```

An unexpected result but an easy one to understand - there's no corresponding
entry in neither `/etc/passwd` nor `/etc/group` for ids provided by us.
And it gets even worse: now we not only have no home directory, but we can't even touch the filesystem
since root owns all files.
Thus, this solution is not sufficient. What we need is to make the Docker image aware
of a non-root user by explicitly specifying it during the build. We manually
create a new user and use Dockerfile command [USER](https://docs.docker.com/engine/reference/builder/#user)
to specify to default user for `RUN`, `ENTRYPOINT`, and `CMD` operations.

```bash
FROM ubuntu

RUN useradd docker_user
WORKDIR /home/docker_user
USER docker_user:docker_user
COPY test.py .
```

If we build and run this image as before, checking the permissions of `/home/docker_user`
can only lead to a disappointment - the directory is still owned by root! Unfortunately,
user change affects only consequent commands, and changing permissions
manually with `chown -R docker_user:docker_user /home/docker_user` is necessary.
Finally, we notice that while the user home directory has correct permissions,
the test Python file is still owned by the root. For some reason, `COPY` commands
are unaffected by user changes. We can provide file ownership as an optional argument
to the command, and finally, we obtain the correct Dockerfile:

```
FROM ubuntu

RUN useradd docker_user
WORKDIR /home/docker_user
RUN chown -R docker_user:docker_user /home/docker_user

USER docker_user:docker_user
COPY --chown=docker_user:docker_user test.py .
```

Creating a standard instance of the container, without additional overriding of
user, executes the container with the user `docker_user` with user ID equal to
the one used by user starting the container.

```console
docker run -ti --entrypoint "/bin/bash" ubuntu-user-test
docker_user@e53ebf506d92:~$ id
uid=1000(docker_user) gid=1000(docker_user) groups=1000(docker_user) 
docker_user@e53ebf506d92:~$ ls -l . 
total 0
-rw-r--r-- 1 docker_user docker_user 0 Dec 24 16:24 test.py
docker_user@e53ebf506d92:~$ rm test.py
docker_user@e53ebf506d92:~$ ls | wc -l
0
```

While on the host we observe the following:

{% raw %}
```console
mcopik@mcopik-ThinkPad-T480s id
uid=1000(mcopik) gid=1000(mcopik) [...]
mcopik@mcopik-ThinkPad-T480s ps -fe | grep $(docker inspect --format='{{ .State.Pid }}' e53)
mcopik   21399 21375  0 21:29 pts/0    00:00:00 /bin/bash
```
{% endraw %}

We can test this change by mounting a volume to observe permissions of files
created while executing in the container process.

```console
mcopik@mcopik-ThinkPad-T480s docker run -ti --entrypoint "/bin/bash" --volume $(pwd)/input-data:/mnt/data ubuntu-user-test
docker_user@379cedf1dd24:~$ touch /mnt/data/write_file
docker_user@379cedf1dd24:~$ exit
mcopik@mcopik-ThinkPad-T480s ls -l input-data
-rw-r--r-- 1 mcopik mcopik 0 Dec 24 21:35 write_file
```

This solution is not perfect by any means - it works as long as the user ID on the host
and inside the container match. 
Furthermore, the process is executing as a non-root
user, leading to a scenario where we can't modify the container's virtual filesystem
freely. But we achieved a situation that is entirely sufficient for many scenarios: we can
inspect container processes from the host, and all files and directories created 
in mounted volumes will no longer be root-owned.

