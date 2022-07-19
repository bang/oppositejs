# Opposite.js

Free template processor totally written in Vanilla Javascript

# Version
0.0.4a

# Intro

This is a simple bunch of tools that provides template, events and
variables processing totally written in Vanilla Javascript for web applications. 

# Concept

Using new HTML attributes, it allows devs to link events to their modules, 
define variables, execute actions and more.

There are five .js files that represents the "core" of the project

 * core.js - It's responsible to detect and process the new attributes that was mentioned
before. Besides, it's responsible to link events' action to the custom modules methods;

 * config.js - Configure important metadata for the project, such as the 'starter module';

 * base.js - Communicates all custom modules with Core class(core.js module), provides config and 
some important methods to share data between module instances. Thus, all modules 
but the 'core.js' must inherit from Base class in base.js module;

 * main.js - It's responsible to start everything and set all custom templates into 'main' div.

 * action.js - 

# HTTP server, npm

This framework is agnostic regarding the HTTP server. For now, it has no route processing
integrated to this tools and probably we'll never have. 

We understand `npm` it's the "standard" for web develop. Unfortunately, to have `npm`
you're obligated to install Node, something we do not agree. So, this project is
agnostic about HTTP servers and it's not submited to any package manager as 'npm' for
now. That means you're free to use whatever you want!

Off course, that brought cost for us. Tests for example, it's something we're actually 
trying to define which approach works better for the project. 

# Install

## Bootstrap

We prepared a little 'bootstrap' application for your convenience. However, note that the
application uses Flask(Python) as route and HTTP server. If you don't want to use Flask, you can try 
'Download zip file' section and set up the files into your HTTP server structure by yourself. 

However, if you want to try our bootstrap, please download it <a href="#">clicking here</a>

After download, you need decompress the file inside your project directory. 

When the file decompression is finished, create a virtualenv!

`python -mvirtualenv venv`

Then, activate the virtualenv

Linux/MacOS - `source venv/bin/activate`

or

Windows - `venv\Scripts\activate`

Almost there! Now, you need install Python dependencies

python -mpip install -r requirements.txt

Finally! Run the application!

`python app.py`

You're done!

## Download zip file

