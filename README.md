# ROC | Robot Operation Center

[![e2e-build](https://github.com/yusufcanb/roc/actions/workflows/e2e.yml/badge.svg)](https://github.com/yusufcanb/roc/actions/workflows/e2e.yml)
[![ci-build](https://github.com/yusufcanb/roc/actions/workflows/ci.yml/badge.svg)](https://github.com/yusufcanb/roc/actions/workflows/ci.yml)

Robot Operation Center (ROC). Automation platform to distribute and execute robots across different platforms or subnets. 🤖 🕹

## Overview

![System Overview](./docs/assets/system-overview.png)

### Project Decomposition

- `/agent`: Agent project manages executions on installed platforms.
- `/platform`: Platform project is for backend operations of platform.
- `/cli`: Command line interface of the platform.

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


## Usage

Download the `roc-ctl` binary via;

```
curl https://github.com/yusufcanb/roc/releases/tag/1.0.0/roc-cli
```