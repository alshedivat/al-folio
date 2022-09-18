---
layout: post
title: "Running local vm's with Packer, Bento and Vagrant"
description: "Running local vm's with Packer, Bento and Vagrant"
category: 'Server'
tags: [packer, bento, vagrant]
---

Inspired by [Bob Newson](https://twitter.com/rnewson) while following the CouchDB [dev IRC chat](freenode.net#couchdb-dev), I gave [Packer](http://www.packer.io/) and [Bento](https://github.com/opscode/bento) a try. The idea is to build [Vagrant](http://www.vagrantup.com/) boxes or use existing ones and start them locally for testing purposes. In this article I will show how to get a Centos 6.5 box running.

Packer is supporting many different _Builders_ like VirtualBox, VMware, and Amazon EC2. We will use VirtualBox in this article. If you are not using it already, please [download](https://www.virtualbox.org/wiki/Downloads) it. The usage is free of charge.

##Install Packer

This step is easy. The packer project is providing various [installer](http://www.packer.io/downloads.html) for the most important platforms (Mac OS X, Linux, Windows, FreeBSD, OPenBSD). As we are using Mac OS X, we download and installed it. Easy!

##Clone the Bento repository

The Bento project is providing _Templates_ for creating machine images. To be able to use these templates, the easiest way is to clone the Bento repository. Before that, we create a directory where all the vms will live.

    ~: mkdir vm && cd vm
    ~/vm: git clone https://github.com/opscode/bento.git

The repository will be cloned into the directory _~/vm/bento_. Within the Bento repository, you will also find pre-built _Base-Boxes_ you can download and use with Vagrant.

__side note:__ I really like, that the Packer project has defined and written down the [terminology](http://www.packer.io/docs/basics/terminology.html) they are using. This helps a lot while speaking about Packer, because everybody is using the same wording. You should definitely read the page above.

##Building a box

Now it's time to create our first box. The Packer API is very intuitive. For a deeper insight, you should read the [documentation](http://www.packer.io/docs/). The following steps will show, how to create a CentOS 6.5 box. We will then start the box with Vagrant later.

First, we create a target directory:

    ~/vm: mkdir centos-6.5

Now we start creating the box. This will take a while so we should be patient:

    ~/vm: cd bento/packer
    ~/vm/bento/packer: packer build -only=virtualbox-iso ../../centos-6.5/centos-6.5-x86_64.json

When the creation process is finished and no errors occured, we will find the created machine image in the following directory:

    ~/vm/bento/builds/virtualbox: opscode_centos-6.5_chef-provisionerless.box

In the final step, we will move the created image to our before created directory:

    ~/vm/bento/builds/virtualbox: mv opscode_centos-6.5_chef-provisionerless.box ~/vm/centos-6.5/

As already mentioned, we could have downloaded the image also from the bento repository page:

    ~/vm/bento/builds/virtualbox: cd ~/vm/centos-6.5
    ~/vm/centos-6.5: wget http://opscode-vm-bento.s3.amazonaws.com/vagrant/virtualbox/opscode_centos-6.5_chef-provisionerless.box

##Installing Vagrant

We will need to install Vagrant to be able to run the image we created in the previous step. The Vagrant project is providing binary packages for Mac OS X, Windows, Debian, Ubuntu, CentOS, Redhat and Fedora. So let's download the Mac OS X binary:

    ~/vm/centos-6.5: cd ~/Downloads
    ~/Downloads: wget https://dl.bintray.com/mitchellh/vagrant/vagrant_1.5.3.dmg

Then we install the package with the usual procedure on Mac OS X.

##Running the machine image with Vagrant

This is the final step where we create the machine image. Let's first move again to the directory, where our _box_ lives.

    ~/Downloads: cd ~/vm/centos-6.5

Now we add our box to Vagrant. It is required to set a name and the path to our box. This is just one option out of three. Please refer to the [Vagrant documentation](https://docs.vagrantup.com/v2/cli/box.html) to see the other options. This will also enable us to start the box by name later:

    ~/vm/centos-6.5: vagrant box add --name centos-6.5 opscode_centos-6.5_chef-provisionerless.box
    ==> box: Adding box 'centos-6.5' (v0) for provider:
    box: Downloading: file:///Users/andwen/vm/centos-6.5/opscode_freebsd-10.0_chef-provisionerless.box
    ==> box: Successfully added box 'centos-6.5' (v0) for 'virtualbox'!

And now we have to initialize the box:

    ~/vm/centos-6.5: vagrant init centos-6.5 opscode_centos-6.5_chef-provisionerless.box
    A `Vagrantfile` has been placed in this directory. You are now
    ready to `vagrant up` your first virtual environment! Please read
    the comments in the Vagrantfile as well as documentation on
    `vagrantup.com` for more information on using Vagrant.

When we look at the directorys content, we see the created Vagrantfile. This file includes all the neccessary information to start the virtual machine. We do this by running the following command:

    ~/vm/centos-6.5: vagrant up
    vagrant up
    Bringing machine 'default' up with 'virtualbox' provider...
    ==> default: Importing base box 'centos-6.5'...
    ==> default: Matching MAC address for NAT networking...
    ==> default: Setting the name of the VM: centos-65_default_1397870052419_92480
    ==> default: Fixed port collision for 22 => 2222. Now on port 2200.
    ==> default: Clearing any previously set network interfaces...
    ==> default: Preparing network interfaces based on configuration...
        default: Adapter 1: nat
    ==> default: Forwarding ports...
        default: 22 => 2200 (adapter 1)
    ==> default: Booting VM...
    ==> default: Waiting for machine to boot. This may take a few minutes...
        default: SSH address: 127.0.0.1:2200
        default: SSH username: vagrant
        default: SSH auth method: private key
        default: Warning: Connection timeout. Retrying...
    ==> default: Machine booted and ready!
    ==> default: Checking for guest additions in VM...
    ==> default: Mounting shared folders...
        default: /vagrant => /Users/andwen/Documents/vm/centos-6.5

Now, the virtual machine has started. We can now connect to it via ssh. The user is _vagrant_ and the password is _vagrant_ as well. The ssh port was set to _2200_:

    ~/vm/centos-6.5: ssh -p 2200 vagrant@127.0.0.1
    The authenticity of host '[127.0.0.1]:2200 ([127.0.0.1]:2200)' can't be established.
    RSA key fingerprint is 64:60:5d:ba:02:61:01:09:a4:9a:55:95:88:43:14:0a.
    Are you sure you want to continue connecting (yes/no)? yes
    Warning: Permanently added '[127.0.0.1]:2200' (RSA) to the list of known hosts.
    vagrant@127.0.0.1's password:
    Last login: Fri Apr 18 22:26:30 2014 from 10.0.2.2
    [vagrant@localhost ~]$

Welcome to your first virtual machine setup with Packer, Bento and Vagrant.

##Removing the box

Because all the above is very easy, we will likely use this method to create virtual machines quite often. This will result in many machines and we will have the need to remove boxes. This is quite simple. First we will check which boxes exist:

    ~/vm/centos-6.5: vagrant box list
    centos-6.5   (virtualbox, 0)
    centos-6.5-2 (virtualbox, 0)

So let's remove the box centos-6.5-2:

    ~/vm/centos-6.5: vagrant box remove centos-6.5-2
    Removing box 'centos-6.5-2' (v0) with provider 'virtualbox'...

##Summary

Packer, Bento and Vagrant are really great tools to set up virtual machines. In this article, we discussed how to do this based on VirtualBox. I start to use this to test CouchDB releases. There is still some work to do on the machine to get CouchBD installed, but it is definitely less time consuming compared to running various machines with the most important OS.



