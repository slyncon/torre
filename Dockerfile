FROM    node:carbon

USER    root

RUN     apt-get update && apt-get upgrade -y

RUN     mkdir -p /usr/src/app
COPY    . /usr/src/app 
WORKDIR /usr/src/app

# set user to avoid permission issues
# (see https://github.com/nodejs/node-gyp/issues/1236)
USER    node

RUN     mkdir /home/node/.npm-global
ENV     PATH=/home/node/.npm-global/bin:$PATH
ENV     NPM_CONFIG_PREFIX=/home/node/.npm-global

RUN     npm install -g firebase-tools

USER    root

EXPOSE  9005:9005