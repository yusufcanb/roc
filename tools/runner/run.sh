docker run --rm \
  -v `pwd`/variables.yaml:/opt/robotframework/variables.yaml:Z \
  -v `pwd`/tasks:/opt/robotframework/tests:Z \
  -v `pwd`/reports:/opt/robotframework/reports:Z \
  roc-runner:latest
