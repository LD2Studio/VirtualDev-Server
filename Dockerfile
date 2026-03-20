FROM debian:trixie-slim

RUN apt update && apt install -y nano curl gettext caddy mosquitto mosquitto-clients
RUN apt install -y git

# install nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash

# set env
ENV NVM_DIR=/root/.nvm

# install node
ARG NODE_VERSION=20
RUN bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION"

# set ENTRYPOINT for reloading nvm-environment
ENTRYPOINT ["bash", "-c", "source $NVM_DIR/nvm.sh && exec \"$@\"", "--"]

# set cmd to bash
CMD ["/bin/bash"]

WORKDIR /home/www
RUN bash -c "source $NVM_DIR/nvm.sh && npm install mqtt"
RUN bash -c "source $NVM_DIR/nvm.sh && npm install git+https://github.com/LD2Studio/VirtualDev.git#dev"

COPY examples/ /home/www/examples

