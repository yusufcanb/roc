FROM maven:3.8-jdk-11 as BUILD

WORKDIR /usr/src

COPY agent /usr/src/agent/
COPY core /usr/src/core/
COPY platform /usr/src/platform/
COPY pom.xml /usr/src/pom.xml

RUN mvn clean package

FROM openjdk:11

RUN apt-get update -y
RUN mkdir /opt/agent

COPY --from=BUILD /usr/src/agent/target/agent-*-spring-boot.jar /opt/agent/agent.jar

ENTRYPOINT ["java", "-jar", "/opt/agent/agent.jar"]

