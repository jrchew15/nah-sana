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

## Splash Page:
Here you can view the splash page for Nah-sana, visit the developers Github and LinkedIn profiles, as well as log in or sign up for Nah-sana.
<img width="1430" alt="image" src="https://user-images.githubusercontent.com/103226832/192048867-2d575942-769e-4a70-8fce-c324fd72d3f0.png">

## Log In Page:
If you have an account, you can enter your credentials and press Login. You can also login as a Demo user by clicking the "Sign in as Demo user" button.
<img width="1429" alt="image" src="https://user-images.githubusercontent.com/103226832/192048998-fc9ae91d-3300-4331-b3fb-9ba514e6aa8b.png">

## Sign Up Page: 
You can sign up for Nah-sana by filling out the sign up form and pressing "Sign Up"
<img width="1428" alt="image" src="https://user-images.githubusercontent.com/103226832/192049112-4666df62-599c-46f0-a2fd-fd00165210bd.png">

## Create Your First Workspace: 
New users will be able to create their first workspace so they can track their projects and tasks. 
<img width="1429" alt="image" src="https://user-images.githubusercontent.com/103226832/192049198-59ee4df7-c618-4668-8ced-eedf9f7eaab8.png">

## Workspace Home Page: 
Once the user is logged in and in their workspace, they will see a dashboard that showcases their current tasks, projects, and team members in the workspace. 
<img width="1430" alt="image" src="https://user-images.githubusercontent.com/103226832/192049350-9a3fd251-2e22-4677-b579-59201dc71559.png">

## Create a Project: 
Signed in users can click the Create Project button that opens a form to create a new project. 
<img width="1429" alt="image" src="https://user-images.githubusercontent.com/103226832/192049405-e6cb9ad5-4f96-4789-a603-8ce7485a0666.png">

## Project Overview: 
Signed in users can click on a project and be directed to the project overview page. This page displays a description and options to edit or delete the project. 
<img width="1430" alt="image" src="https://user-images.githubusercontent.com/103226832/192049530-deef1df1-b074-4f85-8c0f-45d0eeebf25e.png">

## Edit Project: 
When signed in users click "Edit Project" a form will appear with the data pre-populated into the fields for the user to edit. 
<img width="1427" alt="image" src="https://user-images.githubusercontent.com/103226832/192049644-349e70bd-353e-43bc-bb49-dde0b972b508.png">

## Project Task List: 
When a signed in user clicks on the List tab in the Project Detail page, they will see a list of tasks assigned to the project and their due dates. 
<img width="1430" alt="image" src="https://user-images.githubusercontent.com/103226832/192049727-bbc014c4-42a8-463c-9986-3fadd93234c0.png">

## Task Detail: 
When a signed in user clicks on the task, a form will appear showing further detail about the task and gives the user the ability to edit the task, mark it complete, or delete it. 
<img width="1428" alt="image" src="https://user-images.githubusercontent.com/103226832/192049883-9c8a15ae-4ad9-48e8-93cb-27b92643e130.png">

## Create a Task
When a signed in user clicks on Add Task, a form will appear that lets the user create a task. 
<img width="1429" alt="image" src="https://user-images.githubusercontent.com/103226832/192050508-0dd1f895-159a-4d02-86a7-55317ecf2572.png">

## User Profile
When a signed in user clicks on the icon or card for a user in the workspace, they are directed to a Profile Overview page that shows important information about the user. 
<img width="1428" alt="image" src="https://user-images.githubusercontent.com/103226832/192050619-dc444d9d-2746-4fae-8e31-f091500ffd01.png">

## User Tasks
When a signed in user clicks on the list tab within a User Profile page, they will see all the tasks currently assigned to the user. 
<img width="1430" alt="image" src="https://user-images.githubusercontent.com/103226832/192050705-f5ecc060-9bae-4a11-89b0-c2c8cf947782.png">

## Edit Your Profile
When a signed in user clicks on the icon at the top right and then on "My Settings" a form will appear that has their pre-populated profile information. From there, they can edit their profile information.
<img width="1428" alt="image" src="https://user-images.githubusercontent.com/103226832/192050823-ce4eec01-ec79-4ae6-9153-8d7885a3b191.png">

## Edit Workspace
When a signed in user clicks on the icon at the top right and then on "Update Workspace", a form will appear that allows them to update the name of the workspace. 
<img width="1427" alt="image" src="https://user-images.githubusercontent.com/103226832/192050925-4a53ab20-d524-4693-886e-4860b3d8e61b.png">

## Add user to a Workspace
When a signed in user clicks on the Invite Teammates button on the left navigation bar, a form will appear that allows them to enter in the email address for a nah-sana member so they can be added to the workspace. 
<img width="1430" alt="image" src="https://user-images.githubusercontent.com/103226832/192051056-bba55809-f0a0-4b6d-b206-ffedc79ad22d.png">



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
