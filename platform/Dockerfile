FROM openjdk:8

VOLUME /home/git/roc

RUN apt-get update -y
RUN apt-get install -y openssh-server git

RUN useradd -ms /usr/bin/git-shell git \
    && mkdir /home/git/.ssh \
    && touch /home/git/.ssh/authorized_keys \
    && chmod 600 /home/git/.ssh/authorized_keys

RUN mkdir /app

COPY platform/src/main/resources/docker/roc-platform/motd /etc/motd
COPY platform/src/main/resources/docker/roc-platform/ssh_config /etc/ssh/ssh_config
COPY platform/src/main/resources/docker/roc-platform/start.sh /app/start.sh
COPY platform/target/platform-*-spring-boot.jar /app/platform.jar

EXPOSE 8080 22

RUN chown -R git:git /home/git
RUN ssh-keygen -A
RUN service ssh start

ENTRYPOINT ["/bin/sh", "/app/start.sh"]

