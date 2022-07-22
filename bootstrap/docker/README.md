# The docker way

We suppose you have Docker and docker-compose installed. If you don't, follow the links below and install it before to get further.

* [Install Docker on Linux](https://docs.docker.com/desktop/linux/install/)
* [Install Docker on Mac](https://docs.docker.com/desktop/mac/install/)
* [Install Docker on Windows](https://docs.docker.com/desktop/windows/install/)

* [Install docker-compose](https://docs.docker.com/compose/install/)

Then, save this content in a file named as 'docker-compose.yml'
```dockerfile
version: '2'

services:
  oppositejs-bootstrap:
    image: ramtricks/oppositejs-bootstrap:0.0.5a
    container_name: oppositejs-bootstrap
#    build: .
    working_dir: /home/developer/oppositejs
    volumes:
      - /home/andre/Projects/Opposite.js/oppositejs/bootstrap/docker:/home/developer/oppositejs
    ports:
      - "8888:8088"
    restart:
      on-failure

    command: bash -c "cd /home/developer/oppositejs-bootstrap && source venv/bin/activate && python3 app.py"

## If you want to setup your own network, uncomment and edit the config below
#    networks:
#      oppositejs_net:
#        ipv4_address: 172.28.0.4
#
#networks:
#  oppositejs_net:
#    driver: bridge
#    ipam:
#      config:
#      - subnet: 172.28.0.0/16
#        gateway: 172.28.0.1

```

Then, execute docker-compose

##### You don't have our image yet?
`docker pull /ramtricks/oppositejs-bootstrap0.0.5a && docker-compose up`

##### Already have our image?
`docker-compose up`

You should see something like this:

```bash

Creating oppositejs-bootstrap ... done
Attaching to oppositejs-bootstrap
oppositejs-bootstrap    |  * Serving Flask app 'app' (lazy loading)
oppositejs-bootstrap    |  * Environment: production
oppositejs-bootstrap    |    WARNING: This is a development server. Do not use it in a production deployment.
oppositejs-bootstrap    |    Use a production WSGI server instead.
oppositejs-bootstrap    |  * Debug mode: on
oppositejs-bootstrap    |  * Running on all addresses (0.0.0.0)
oppositejs-bootstrap    |    WARNING: This is a development server. Do not use it in a production deployment.
oppositejs-bootstrap    |  * Running on http://127.0.0.1:8088
oppositejs-bootstrap    |  * Running on http://172.18.0.2:8088 (Press CTRL+C to quit)
oppositejs-bootstrap    |  * Restarting with stat
oppositejs-bootstrap    |  * Debugger is active!
oppositejs-bootstrap    |  * Debugger PIN: 630-592-379
```

In this case, place the address `http:/172.18.0.2:8088` in your favorite browser!

 







