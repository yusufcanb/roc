FROM openjdk:8-jdk

COPY ./target/platform-1.0-SNAPSHOT-spring-boot.jar platform-1.0-SNAPSHOT.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","/platform-1.0-SNAPSHOT.jar"]
