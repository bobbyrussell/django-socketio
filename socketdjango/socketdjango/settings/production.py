from .base import *

DEBUG = False

LOCAL_APPS = (
    'debug_toolbar',
)

INSTALLED_APPS = DJANGO_APPS + LOCAL_APPS

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
