# ROC | Robot Operation Center

[![platform-build](https://github.com/yusufcanb/roc/actions/workflows/platform-ci.yml/badge.svg?branch=master)](https://github.com/yusufcanb/roc/actions/workflows/platform-ci.yml)
[![cli-build](https://github.com/yusufcanb/roc/actions/workflows/npm-build.yml/badge.svg?branch=master)](https://github.com/yusufcanb/roc/actions/workflows/npm-build.yml)
[![cli-npm](https://img.shields.io/npm/v/roc-ctl.svg)](https://npmjs.org/package/roc-ctl)

Robot Operation Center (ROC). Automation platform to distribute and execute robots across different platforms or subnets. 🤖 🕹

## Overview

![System Overview](./docs/assets/system-overview.png)

### Project Decomposition

- `/agent`: Agent project manages executions on installed platforms.
- `/platform`: Platform project is for backend operations of platform.
- `/cli`: Command line interface of the platform.

## Installation

> If you don't have any ROC deployment please skip to the deployment section for deployment steps.


Install ```roc-ctl``` CLI tool for interacting the ROC;


```
npm install -g roc-ctl
```

Then, execute `roc-ctl` command;

```
➜ roc-ctl --help   
Command line interface for ROC (Robot Operation Center)

VERSION
  roc-ctl/0.1.0-alpha.1 darwin-x64 node-v16.13.0

USAGE
  $ roc-ctl [COMMAND]

TOPICS
  agent        Agent operations (e.g. List, Create, Update)
  config       CLI configurations (e.g. Platform URL, Default Project, etc.)
  environment  Environment operations (e.g. List, Create, Update, Upload Variables)
  job          Job operations (e.g. List, View Console, View Logs)
  project      Project operations (e.g. List, Create, Update)
  task-force   Task force operations (e.g. List, Create, Update, Upload Variables)

COMMANDS
  command
  help     Display help for roc-ctl.
```


## Deployment

### Using Docker Compose

Clone the repository;

```
git clone https://github.com/yusufcanb/roc
```

Execute command below to run the platform;
```
docker-compose up -d
```

### Kubernetes

> K8s deployment guide will be published soon
