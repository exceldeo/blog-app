<!-- i want to make readme for my project -->

# Blog App

This is a simple blog app that allows users to create, read, update and delete blog posts. It is built with Django and React js.

## Features

- User authentication
- Create, read, update and change status blog posts
- Comment on blog posts
- Like and unlike blog posts
- Update user profile

## Technologies

- Django
- React js

## Dependencies

- Redis
- MinIo
- Memcached

## Installation

1. Clone the repository
2. Install dependencies
   for server can be installed by running the following command
   `pip install -r requirements.txt`
   for client can be installed by running the following command
   `yarn`
3. Run migrations
   `python manage.py migrate`
4. Run the server
   `python manage.py runserver`
5. Run the client
   `yarn start`

## Usage

1. Run redis server, minio and memcached server
   [Minio](https://docs.min.io/docs/minio-quickstart-guide.html)
   [Redis](https://redis.io/download)
   [Memcached](https://memcached.org/)
   ![redis_minio](./screenshoot/redis_minio.png)
2. Create a superuser
   `python manage.py createsuperuser`
3. Login to the admin dashboard and create a user
4. Login to the user account and create a blog post
5. View the blog post

## Screenshots

- Sign in
  ![signin](./screenshoot/signin_page.png)
- Sign up
  ![signup](./screenshoot/signup_page.png)
- Home
  ![home](./screenshoot/home_page.png)
- Detail Post
  ![detail](./screenshoot/detail_post.png)
- List Users
  ![list_user](./screenshoot/list_users_page.png)
- Profile
  ![profile](./screenshoot/profile_page.png)
- Upload Profile Picture
  ![upload](./screenshoot/upload_profile_photo.png)
- Edit Profile
  ![edit](./screenshoot/edit_profile.png)
- Change Password
  ![change](./screenshoot/change_password.png)
- Create Post
  ![create](./screenshoot/create_post.png)
- Update Post
  ![update](./screenshoot/edit_post_page.png)
- List Post
  ![list](./screenshoot/list_page_user.png)
- List Post Search
  ![search](./screenshoot/search_post_page.png)

## ERD

![erd](./screenshoot/blog-app-ERD.png)

## Flowchart

![flowchart](./screenshoot/blog-app-flowchart.png)

## API Endpoints

https://documenter.getpostman.com/view/11566293/2sA35G2MX6
