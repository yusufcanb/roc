# ROC | Robot Operation Center

Robot Operation Center (ROC) is an Self hosted, lightweight, JVM based software automation platform for every day IT
operations which uses Robot Framework as it's executor. 🤖 🕹

## Overview

```
$ roc-ctl --help

Command line interface for ROC (Robot Operation Center)

VERSION
roc-ctl/0.1.0-alpha.0 win32-x64 node-v12.15.0

USAGE
$ roc [COMMAND]

TOPICS
agent        Create new agent for specific project
config       ROC platform configurations
environment  Create new environment for specific project
project      Project operations (e.g. List, Create, Update)
task-force   Create new task force for specific project

COMMANDS
help         Display help for roc-ctl.
``

### Project Decomposition

- `/agent`: Agent project manages executions on installed platforms.
- `/platform`: Platform project is for backend operations of platform.
- `/web`: Web UI project for platform. Created with `create-react-app`

![System Overview](./docs/assets/system-overview.png)

## Development

Run required services via docker-compose;

```

docker compose up

```

Start platform with;

```

./mvnw compile && ./mvnw -pl platform spring-boot:run

```

Then, start frontend development server;

```shell
cd web
npm install
npm run start
```

## Deployment

Deploy on Kubernetes

```shell
# Coming soon
```