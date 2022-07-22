# Opposite.js

Free template processor almost totally written in Vanilla Javascript

# Version
0.0.5a

# Intro

This is a simple bunch of tools that provides template, events and
variables processing totally written in Vanilla Javascript for web applications. 

# Concept

Using new HTML attributes, it allows devs to link events to their modules, 
define variables, execute actions and more.

There are five .js files that represents the "core" of the project

 * core.js - It's responsible to detect and delegate the new attributes process to other modules
 that was mentioned before. Besides, it's responsible to link events' action to the custom 
 modules methods;


 * config.js - Configure important metadata for the project, such as the 'starter module', for
 example. You can refer to an API module configuration, for example, making this available for all your 
 custom modules; 


 * base.js - Communicates all custom modules with the Core class(core.js module), providing config 
 and some important methods to share data between module instances. Thus, all modules but the 'core.js' must 
 inherit from Base class in base.js module;


 * action.js - Implements all methods that makes the custom attributes work


 * main.js - It's responsible to start everything and set all custom templates into 'main' div. This is the only
 file you need to refer on `<script>` tag in your HTML code. Check out our [documentation page]()


And this is it! Our project is resumed to this five Javascript files for now. Continue reading the next sections to
learn more about it and how to install it.


# Backend

Oppositejs is agnostic regarding the HTTP server. For now, it has no route processing
integrated to this tools and probably we'll never have. 

We understand `npm` it's the "standard" for web develop. Unfortunately, to have `npm`
you're obligated to install Node, mainly if you're using Typescript which we 
do not agree, and many other problems.

So, this project is essentially "agnostic" about backend, and it's not submitted to any 
package manager as 'npm' for now. That means you're free to use whatever you 
want(Node included)!

Off course, that brought cost for us. Tests for example, it's something we're actually 
trying to define which approach works better for the project once we don't want to have
dep. 

Anyway, you'll need a backend to serve HTTP and routes. We rather to build this backend
in Flask(Python). But again, you can use whatever you want.



# Install





