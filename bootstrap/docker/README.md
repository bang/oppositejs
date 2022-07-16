# The docker way

I'm supposing you have Docker installed. If you don't, follow the links below and install it before to get further.

* [Install Docker on Linux](https://docs.docker.com/desktop/linux/install/)
* [Install Docker on Mac](https://docs.docker.com/desktop/mac/install/)
* [Install Docker on Windows](https://docs.docker.com/desktop/windows/install/)


Then, once in the 'infra' directory

Export `OPPOSITEJS_HOME_DIR` and `OPPOSITE_PORT` environment variable as explained before
- Linux/Mac:
`export OPPOSITEJS_HOME_DIR=<OPPOSITE_PROJECT_HOME_DIR>`
`export OPPOSITEJS_PORT=<YOUR_PORT_NUMBER`

- Windows:
`set OPPOSITEJS_HOME_DIR=<OPPOSITE_PROJECT_HOME_DIR>`
`set OPPOSITEJS_PORT=<YOUR_PORT_NUMBER`

#### First time running docker-compose up?

`docker-compose up --build`

#### Not the first time?

`docker-compose up`

You're done!

### Now what?

Place this address in your browser: 

[http://127.0.0.1:8088](http://127.0.0.1:8088)
