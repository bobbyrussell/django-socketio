#Django SocketIO
## About
Django SocketIO is just an exercise to implement user interactions with sockets
via nodejs and django
## Requirements
* [virtualenv](https://virtualenv.pypa.io/en/latest/installation.html)
* [NodeJS](https://nodejs.org/download/)
* [Bower](http://bower.io/#install-bower)
* [Django 1.8](https://www.djangoproject.com/download/)

## Installation
You might do something like this to install this project to your current
working directory...

* Invoke:

        virtualenv env
        . env/bin/activate
        git clone https://github.com/bobbyrussell/django-socketio
        cd django-socketio
        pip install -r requirements/base.txt
        bower install
        cd socketdjango/nodejs && npm install
        cd ../..
        node socketdjango/nodejs/server.js &
        python socketdjango/manage.py runserver &

* Point your browser to [http://localhost:8000/chat](http://localhost:8000/chat)

## License
This code is licensed under the MIT License.
