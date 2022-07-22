# Bootstrap application



## Download the bootstrap application

You can download Opposite.js bootstrap <a href="#">clicking here</a>

Then you need only to unzip the file in your project directory



## Backend/router provider

Opposite.js is agnostic about backend and doesn't have an "official" provider 
yet(probably will never have). So, you can use whatever you want! But, we're using 
Flask(Python) for our bootstrap application. To know more about Flask checking out 
the <a href="https://flask.palletsproject.com/en/2.1.x/">official Flask page</a>


## Docker/docker-compose

If you like Docker, there's some instructions about it [here]("docker/README.md")


## Configuring and running

### Environment

By default, the application will run at port 8088. But, you can change that exporting the variable OPPOSITEJS_PORT like this:



#### Linux

`export OPPOSITEJS_PORT=<YOUR_PORT_NUMBER>`



#### Windows

`set OPPOSITEJS_PORT=<YOUR_PORT_NUMBER>`



### Running

This bootstrap **requires** Python >=3.7x + virtualenv



Creating virtualenv

`python -mvirtualenv venv`



Activating virtualenv

Linux/MacOS: `source venv/bin/activate`



Windows: `venv\Scripts\activate`



Now, run using `python app.py`






























