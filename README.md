#Django SocketIO
## About
Django SocketIO is just an exercise to implement user interactions with sockets
via nodejs and django
## Requirements
* [virtualenv](https://virtualenv.pypa.io/en/latest/installation.html)
* [NodeJS](https://nodejs.org/download/)
* [Bower](http://bower.io/#install-bower)
* [Django 1.7](https://www.djangoproject.com/download/)

## Installation
* Invoke:

        virtualenv env
        . env/bin/activate
        git clone https://github.com/bobbyrussell/django-socketio <project name>
        cd <project name>
        pip install -r requirements/base.txt
        bower install
        npm install nodejs/
        node nodejs/server.js
        python manage.py runserver

* Point your browser to [http://localhost:8000/](http://localhost:8000)

## License
This code is licensed under the MIT License.
