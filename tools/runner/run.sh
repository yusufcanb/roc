docker run --rm \
  -v `pwd`/variables.yaml:/opt/robotframework/variables.yaml:Z \
  -v `pwd`/tasks:/opt/robotframework/tests:Z \
  -v `pwd`/reports:/opt/robotframework/reports:Z \
  ghcr.io/yusufcanb/roc-runner:5.0.0-rc.0
