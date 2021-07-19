FROM openjdk:8

VOLUME /home/git/roc

RUN apt-get update -y
RUN apt-get install -y openssh-server git

RUN adduser --disabled-password --shell /usr/bin/git-shell --gecos "" git \
    && mkdir /home/git/.ssh \
    && touch /home/git/.ssh/authorized_keys \
    && chmod 600 /home/git/.ssh/authorized_keys \
    && mkdir /home/git/roc

RUN mkdir /app

COPY src/main/resources/docker/roc-platform/motd /etc/motd
COPY src/main/resources/docker/roc-platform/ssh_config /etc/ssh/ssh_config
COPY src/main/resources/docker/roc-platform/start.sh /app/start.sh
COPY target/platform-*-spring-boot.jar /app/platform.jar

EXPOSE 8080 22

RUN chown -R git:git /home/git
RUN ssh-keygen -A
RUN service ssh start

ENTRYPOINT ["/bin/sh", "/app/start.sh"]

