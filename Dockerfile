FROM node:latest
LABEL author=insight_team

WORKDIR /home/node
RUN apt-get update -y
RUN apt-get install -y openssl
RUN openssl req -newkey rsa:2048 -days 365 -nodes -x509 -keyout server.key -out server.cert -subj "/C=FR/ST=Paris/O=IPSSI/OU=IT/CN=localhost"

EXPOSE 3000



