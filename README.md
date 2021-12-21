# ROC | Robot Operation Center

Robot Operation Center (ROC) is an Self hosted, lightweight, JVM based software automation platform for every day IT
operations which uses Robot Framework as it's executor. 🤖 🕹

## Overview

![System Overview](./docs/assets/system-overview.png)

### Project Decomposition

- `/agent`: Agent project manages executions on installed platforms.
- `/platform`: Platform project is for backend operations of platform.
- `/web`: Web UI project for platform. Created with `create-react-app`

## Installation

> If you don't have any ROC deployment please skip to the deployment section for deployment steps.


Install ```roc-ctl``` CLI tool for interacting the ROC;


```
npm install -g roc-ctl
```

## Deployment

Start platform using `docker-compose`;

```
docker-compose up -d
```

