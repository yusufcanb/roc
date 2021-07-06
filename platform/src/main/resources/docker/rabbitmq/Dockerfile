FROM rabbitmq:3.8

RUN rabbitmq-plugins enable rabbitmq_management
RUN rabbitmq-plugins enable rabbitmq_stomp
RUN rabbitmq-plugins enable rabbitmq_web_stomp

EXPOSE 15671 15672 15674 61613