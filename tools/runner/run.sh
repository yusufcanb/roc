docker run --rm \
  -v `pwd`/tasks:/opt/robotframework/tests:Z \
  -v `pwd`/reports:/opt/robotframework/reports:Z \
  ppodgorsek/robot-framework:latest
