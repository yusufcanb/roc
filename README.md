# ROC | Robot Operation Center

This project is a RPA platform built on top of Robot Framework's keyword driven testing approach.

## System Decomposition

- `/agent`: Agent project manages executions on installed platforms.
- `/platform`: Platform project is for backend operations of platform.
- `/web`: Web UI project for platform. Created with `create-react-app`
