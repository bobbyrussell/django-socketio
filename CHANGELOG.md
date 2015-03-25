# CHANGELOG
Django SocketIO
##0.1.1 (03.24.2015)
###Minor Release
* Fixed a bug in sockets.js where message in 'disconnect' was set incorrectly
* Better organization of configuration files
* Message div now autoscrolls on new messages
* Remove 'debug_toolbar' from production local apps
* Fix path in DATABASES for local and production

##0.1.0 (03.19.2015)
###Initial Release
This project is meant to be a simple implementation of a chat client and server
running on Django 1.7 and Socket.IO 1.3. My focus will be on clarity of code,
and in simplicity of implementation and maintenance.

I'll be adding features as I go. The plan is to add Redis, some kind of
persistence, and all the utilities necessary to deploy the app into production.
