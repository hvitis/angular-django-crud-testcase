# How to run

Backend Auth from this project was slightly changed (OAuth library was deprecated - details in commits ) and hosted on heroku for the duration of the testing to facilitate development on Windows (rh-dev.eu docker files were UNIX only):
https://django-crud-backend.herokuapp.com/

Solution runs on that hosted backend.

### Using hosted backend

1. Enter the link to start Heroku dynos
   https://django-crud-backend.herokuapp.com/

2.

```
git clone
```

3.

```
cd angular-django-crud-testcase/frontend/angular-frontend/
```

4.

```
npm i
```

5.

```
npm start
```

### Using docker backend

1. From root folder

```
sudo docker-compose up
```

2. Run migrations

```
sudo docker-compose run migrate
```

3. Change API service URL variable in
   angular-testcase/frontend/angular-frontend/src/app/**api.service.ts**

from

```
  url: string = environment.urlHeroku;
```

to

```
  url: string = environment.url;
```

4.

```
cd angular-django-crud-testcase/frontend/angular-frontend/
```

5.

```
npm i
```

6.

```
npm start
```

# Possible improvements

1. Moving Adding User to a separate component.
2. Validating IBAN not only on adding but also on editing (Now alert comming from Bad Request API call)
3. Packing up frontend to docker
4. Auto-logout after Token expires.
5. Adding more Types.

# Requirements

- docker (at least 17.12.0+)
- docker-compose (at least 1.18.0)
- docker-hostmanager
- git

## Docker name resolution

In order to access the application on your browser, your host machine must be able to resolve the host name of your container.
We're using docker-etchosts to manage the hosts file entries. Check [GitHub](https://github.com/RegioHelden/docker-common) on how to set up our docker development environment.

# Setup

- Copy the repository content (please don't fork it so that there is no link to forked repositories someone might look up the solution at)
- Start the containers `docker-compose up`
- Initialize the database `docker-compose run django migrate`
- Create a Google OAuth client ID (https://developers.google.com/identity/sign-in/web/devconsole-project) and add http://testcase.rh-dev.eu:8001 to "Authorized JavaScript origins"
- Save the client ID in the Django settings file (backend/settings.py) to the variable GOOGLE_CLIENT_ID and use the same one in the frontend app
- Implement the frontend against the API
- Extend the readme on how to build and run the frontend, the JS frontend webserver should run on port 8001 (http://testcase.rh-dev.eu:8001)

# Authorization

The OAuth token generated on the client side must be sent with each request to the server in the Authorization header.

`Authorization: Token thisIsMyOAuthToken`

# API endpoints

The API provides GET, PUT, POST, PATCH, DELETE and OPTIONS to manage all user related needs

http://testcase.rh-dev.eu:8000/api/users to list and http://testcase.rh-dev.eu:8000/api/users/{id} to manage single users
