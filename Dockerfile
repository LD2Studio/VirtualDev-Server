FROM debian:trixie-slim

RUN apt update && apt install -y nano curl gettext caddy mosquitto mosquitto-clients
RUN apt install -y git
RUN apt install -y nodejs
# Installation de npm seulement
RUN curl -qL https://www.npmjs.com/install.sh | sh

WORKDIR /home/www
RUN npm i mqtt three tweakpane
RUN npm i git+https://github.com/LD2Studio/VirtualDev.git

COPY examples/ /home/www/examples

