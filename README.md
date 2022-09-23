# Nah-sana

### Summary

[Nah-sana](https://nah-sana.herokuapp.com/) is an online project management tool inspired by Asana that allows teams to effectively manage projects and tasks in one central location. 

### Project Wiki
- [API Documentation](https://github.com/jrchew15/nah-sana/wiki/API-Documentation)
- [Database Schema](https://github.com/jrchew15/nah-sana/wiki/Database-Schema)
- [Feature List](https://github.com/jrchew15/nah-sana/wiki/Feature-List)
- [Redux State Shape](https://github.com/jrchew15/nah-sana/wiki/Redux-State-Shape)
- [User Stories](https://github.com/jrchew15/nah-sana/wiki/User-Stories)

### This project is built with:

- SQLAlchemy
- Flask
- React
- Redux
- Docker
- Alembic

# Directions for Features

<!-- Edit in Github -->


# Local Installation
To run this application locally, you will need Python and NPM. This root folder contains a backend (app) and frontend (react-app) directory. 

### Step 1: Download
Clone the project repository in your terminal
```shell
git clone https://github.com/jrchew15/nah-sana.git
```

### Step 2: Backend Setup
-  Inside of the root directory, run the following command in the terminal to set up the necessary Python dependencies for running the backend server and database. 
   ```shell
   pipenv install -r requirements.txt
   ```
-  Create a .env file based on the example with proper settings for your development environment
-  Make sure the SQLite3 database connection URL is in the .env file
-  Get into your pipenv, migrate your database, seed your database, and run your Flask app
   ```shell
   pipenv shell
   ```
   ```shell
   flask db upgrade
   ```
   ```shell
   flask seed all
   ```
   ```shell
   flask run
   ```

### Step 3: Frontend Setup
Navigate to the /react-app directory, run the following command to set up the necessary Node.js dependencies and then start the server.
```shell
npm install
npm start
```