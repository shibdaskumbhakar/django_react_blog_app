# Blog Using Django And React

## First Take the Clone From Git Repo

#### `git clone https://github.com/shibdaskumbhakar/django_react_blog_app.git`

<br/>

## Backend Setup

#### go inside the blog_backend folder
#### Create virtual env



> python3 -m venv venv
</br>
> source /venv/bin/activate
</br>

### Insatll the all requirmens
> pip install -r requirments.txt
</br>

### Add .env inside the path :- blog_backend/blog_backend

### I have used Postgresql for database
***
SECRET_KEY=
</br>
DATABASE_NAME=
</br>
DATABASE_USER=
</br>
DATABASE_PASSWORD=
***

### Run the backend server

### `python manage.py runserver`

> Local serevr running on http://127.0.0.1:8000/


*****
*****

## Frontend Setup
#### go inside the blog_client folder

### Install The packges
### `npm install`

I have added the backend url inside the /config/config.js file


### Run The Frontend
### `npm start`

> Local serevr running on http://127.0.0.1:3000/


## Postman Collection
I have added the postman collection in this repo.

Please Import the collection and add envermint for this collection . and add a envermint veriable

> host = http://127.0.0.1:8000/api/v1


