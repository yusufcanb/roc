docker run --rm \
  -v `pwd`/tasks:/opt/robotframework/tests:Z \
  -v `pwd`/reports:/opt/robotframework/reports:Z \
  ghcr.io/yusufcanb/roc-runner:latest
