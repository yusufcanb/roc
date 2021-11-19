FROM maven:3.8-jdk-11 as BUILD
WORKDIR /usr/src

COPY agent /usr/src/agent/
COPY core /usr/src/core/
COPY platform /usr/src/platform/
COPY pom.xml /usr/src/pom.xml

RUN mvn clean package

FROM openjdk:11

RUN mkdir /app

COPY --from=BUILD /usr/src/platform/src/main/resources/docker/roc-platform/motd /etc/motd
COPY --from=BUILD /usr/src/platform/src/main/resources/docker/roc-platform/ssh_config /etc/ssh/ssh_config
COPY --from=BUILD /usr/src/platform/src/main/resources/docker/roc-platform/start.sh /app/start.sh

COPY --from=BUILD /usr/src/platform/target/platform-*-spring-boot.jar /app/platform.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/platform.jar"]

