FROM maven:3.8-jdk-11 as BUILD
WORKDIR /usr/src

COPY agent /usr/src/agent/
COPY core /usr/src/core/
COPY platform /usr/src/platform/
COPY pom.xml /usr/src/pom.xml

RUN mvn clean package

FROM openjdk:11

VOLUME /home/git/roc

RUN apt-get update -y
RUN apt-get install -y openssh-server git

RUN useradd -ms /usr/bin/git-shell git \
    && mkdir -p /home/git/.ssh \
    && touch /home/git/.ssh/authorized_keys \
    && chmod 600 /home/git/.ssh/authorized_keys

RUN mkdir /app

COPY --from=BUILD /usr/src/platform/src/main/resources/docker/roc-platform/motd /etc/motd
COPY --from=BUILD /usr/src/platform/src/main/resources/docker/roc-platform/ssh_config /etc/ssh/ssh_config
COPY --from=BUILD /usr/src/platform/src/main/resources/docker/roc-platform/start.sh /app/start.sh

COPY --from=BUILD /usr/src/platform/target/platform-*-spring-boot.jar /app/platform.jar

EXPOSE 8080 22

RUN chown -R git:git /home/git
RUN ssh-keygen -A
RUN service ssh start

ENTRYPOINT ["/bin/sh", "/app/start.sh"]

