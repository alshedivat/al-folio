---
layout:     post
title:      Azure CLI login in 2020
date:       2019-12-24 08:00
summary:    Enabling non-interactive login to Azure CLI. 
categories: serverless
tags:       [serverless, cloud, azure]
---

Azure provides a command-line tool to manage its cloud resources.
It's an important tool when automatizing the deployment of our systems to Azure.
However, when compared to clouds such as AWS, there's one caveat: [the login method](https://docs.microsoft.com/en-us/cli/azure/authenticate-azure-cli).
While it's possible to log in with standard credentials, this method is disabled for most of the accounts:

```
This approach doesn't work with Microsoft accounts or
accounts that have two-factor authentication enabled.
```

Instead, if we run the standard `az login` command, we're going to see the following output:

```
To sign in, use a web browser to open the page https://microsoft.com/devicelogin
and enter the code XXXXXXXX to authenticate.
```

And only after opening a browser, going to the dedicated website, we'll be able to authenticate the
CLI session, and we'll see the output confirming a successful login operation:

```json
[
  {
    "cloudName": "AzureCloud",
    "homeTenantId": "XXXX",
    "id": "YYYYYY",
    "tenantId": "XXXXXX",
    "user": {
      "name": "XXXXXXX",
      "type": "user"
    }
  }
]

```

Obviously, we can't rely on such method when building automatic deployment systems.
Instead, we can use [service principal](https://docs.microsoft.com/en-us/cli/azure/create-an-azure-service-principal-azure-cli#sign-in-using-a-service-principal) credentials to handle the login.
Fortunately, we can create this resource in a single step:

```console
bash-5.1# az ad sp create-for-rbac --name ${principal_name} --only-show-errors
{
  "appId": "XXX",
  "displayName": "${principle_name}",
  "name": "VVVVV",
  "password": "YYY",
  "tenant": "ZZZ"
}
```

**These values must be stored as they are non-retreviable**.
Then, the standard non-interactive login method can be used:

```console
bash-5.1# az login -u XXX --service-principal --tenant ZZZ -p YYY
```

To make this process easy an intuitive for our users, we implemented
[a simple wrapper](https://github.com/spcl/serverless-benchmarks/blob/master/tools/create_azure_credentials.py) in our
[serverless benchmarking suite](/projects/sebs):

```python
print('Please provide the intended principal name')
principal_name = input()
_, out = container.exec_run("az login", stream=True)
print('Please follow the login instructions to generate credentials...')
print(next(out).decode())
# wait for login finish
ret = next(out)
ret_json = json.loads(ret.decode())
print('Loggin succesfull with user {}'.format(ret_json[0]['user']))
status, out = container.exec_run("az ad sp create-for-rbac --name {} --only-show-errors".format(principal_name))
if status:
    print('Unsuccesfull principal creation!')
    print(out.decode())
else:
    credentials = json.loads(out.decode())
    print('Created service principal {}'.format(credentials['name']))
    print('AZURE_SECRET_APPLICATION_ID = {}'.format(credentials['appId']))
    print('AZURE_SECRET_TENANT = {}'.format(credentials['tenant']))
    print('AZURE_SECRET_PASSWORD = {}'.format(credentials['password']))
```

The Azure CLI is insufficient to create and deploy serverless function apps - we need
[Azure Functions Core Tools](https://github.com/Azure/azure-functions-core-tools/), as explained
[in the documentation](https://docs.microsoft.com/en-us/azure/azure-functions/create-first-function-cli-python).


## Docker image 

Running a Docker image with Azure CLI could simplify the entire process significantly - no relogging
needed, just spin an instance of the CLI in the background, keep it running, and execute cloud
management commands there.
Azure provides [a Docker image](https://docs.microsoft.com/en-us/cli/azure/run-azure-cli-docker)
with the CLI installed.
However, it uses Alpine Linux as the base image - a common choice due to its small image size.
This can lead to a common problem of `libc` compatibility - Alpine uses `musl` as its implementation
of the C library. It's great software, but it's not binary compatible with `libc`, as we discovered
when trying to use the Functions Core Tools:

```
bash-5.1# chmod +x func 
bash-5.1# ./func 
Error loading shared library ld-linux-x86-64.so.2: No such file or directory
(needed by ./func)
```

This issue can be solved by installing `libc6-compat` and `gcompat`, but in our case, it only leads to
further problems. Instead, we decided to create a new Docker image and install both tools there.
Additionally, we install Node.js to locally host and invoke JavaScript function apps.
[We can't use Debian `buster`](https://github.com/MicrosoftDocs/azure-docs/issues/41512),
but Debian `stretch` should work.

```docker
FROM python:3.7-slim-stretch
ARG USER
# disable telemetry by default
ENV FUNCTIONS_CORE_TOOLS_TELEMETRY_OPTOUT=1

RUN apt-get clean && apt-get update\
  && apt-get install -y ca-certificates curl apt-transport-https\
    lsb-release gnupg libicu57\
  && curl -sL https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor\
    | tee /etc/apt/trusted.gpg.d/microsoft.asc.gpg > /dev/null\
  && AZ_REPO=$(lsb_release -cs)\
  && echo "deb [arch=amd64] https://packages.microsoft.com/repos/azure-cli/ $AZ_REPO main"\
    | tee /etc/apt/sources.list.d/azure-cli.list\
  && echo "deb [arch=amd64] https://packages.microsoft.com/debian/9/prod $(lsb_release -cs) main" > /etc/apt/sources.list.d/dotnetdev.list\
  && apt-get update\
  && apt-get install -y azure-cli azure-functions-core-tools-3\
  # Install NodeJS 10.x to test functions locally with func host
  && curl -sL https://deb.nodesource.com/setup_10.x | bash - && apt-get install -y nodejs\
  && apt-get purge -y --auto-remove curl lsb-release gnupg

ENV HOME=/home/${USER}
RUN useradd --uid 1000 -m ${USER}\
    && chown ${USER}:${USER} ${HOME}\
    && chown ${USER}:${USER} /mnt
WORKDIR ${HOME}
USER ${USER}:${USER}

# Extension must be installed for a specific user, I guess.
# Installed with root does not work for user.
RUN az extension add --name application-insights
```

The `FUNCTIONS_CORE_TOOLS_TELEMETRY_OPTOUT=1` environment variable is used to opt-out of the telemetry
system, and we install additional extensions to easily query performance metrics - these will be
discussed in an upcoming blogpost.
