FROM ubuntu

USER root
# ENV TZ=America/Sao_Paulo
RUN ln -s -f /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime
RUN apt update
RUN apt install -y sudo build-essential vim npm python3 python3-pip

# Preparing user delivery and configuring home dir
RUN useradd -m -s /bin/bash developer
RUN usermod -a -G developer developer
RUN mkdir -p /home/developer/app-front
RUN chown -R developer:developer /home/developer
RUN chmod 760 /home/developer/app-front

# Forcing python3 on python symlink
RUN rm -f /usr/bin/python
RUN ln -s /usr/bin/python3 /usr/bin/python

# Creating delivery user work directory and user if doesn't exists
USER developer
WORKDIR /home/developer/app-front
# Installing bootstrap trhough npm
COPY package.json /home/developer/app-front
RUN npm install bootstrap

# Copying bashrc and loading environment vars
COPY .bashrc /home/developer/.bashrc
CMD ["source", "/home/developer/.bashrc"]

# Installing and activating virtualenv
COPY requirements.txt /home/developer/app-front
RUN bash -c "python -mpip install virtualenv"
RUN bash -c "python -mvirtualenv venv"
CMD ["source", "/home/developer/app-front/venv/bin/activate"]

# Installing python requirements
RUN bash -c "python -mpip install -r requirements.txt"

# Running Python app
CMD ["python3", "app.py"]

# Exposing ports
EXPOSE 8080