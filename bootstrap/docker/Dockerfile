FROM ubuntu:22.04

USER root
ENV TZ=America/Sao_Paulo
ENV HOME_DIR=/home/developer
ENV OPPOSITE_HOME_DIR=$HOME_DIR/oppositejs-bootstrap

RUN ln -s -f /usr/share/zoneinfo/$TZ /etc/localtime
RUN apt-get update
RUN apt-get install -y apt-utils zip sudo build-essential vim python3 python3-pip python3-virtualenv

# Giving password and sudo to developer
RUN useradd -m -s /bin/bash -p $(perl -e 'print crypt($ARGV[0], "password")' 'developer') developer \
&& usermod -a -G developer developer \
&& groupadd supergroup \
&& usermod -aG sudo developer \
&& usermod -aG supergroup developer \
&& mkdir ~developer/.ssh

# Creating developer's home
RUN mkdir -p $OPPOSITE_HOME_DIR \
&& chown -R developer:developer $OPPOSITE_HOME_DIR \
&& chmod 760 /home/developer

# Forcing python3 on python symlink
RUN rm -f /usr/bin/python \
&& ln -s /usr/bin/python3 /usr/bin/python

# Creating delivery user work directory and user if doesn't exists
USER developer
WORKDIR $OPPOSITE_HOME_DIR
## Installing bootstrap trhough npm
#COPY package.json /home/developer/oppositejs-bootstrap/

## Copying bashrc and loading environment vars
COPY .bashrc $HOME_DIR/.bashrc
COPY ../../download/0.0.5a/oppostitejs-bootstrap-app-0.0.5a.zip $OPPOSITE_HOME_DIR
RUN unzip $OPPOSITE_HOME_DIR/oppostitejs-bootstrap-app-0.0.5a.zip \
&& rm -f oppostitejs-bootstrap-app-0.0.5a.zip

### Installing and activating virtualenv
COPY requirements.txt $OPPOSITE_HOME_DIR
RUN /usr/bin/python3 -m virtualenv $OPPOSITE_HOME_DIR/venv \
&& . $OPPOSITE_HOME_DIR/venv/bin/activate && pip install -r requirements.txt

# Running Python app
#RUN . $OPPOSITE_HOME_DIR/venv/bin/activate && python3 app.py

## Exposing ports
EXPOSE 8088 8888
