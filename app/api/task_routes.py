## Get all tasks of current user
from cgitb import reset
from urllib import response
from ..models.models import db, Workspace, Project, Task
from ..models import User
from ..models import db
from flask import Blueprint, redirect
from flask_login import current_user

task_routes = Blueprint('task', __name__, url_prefix='/api/tasks')

## get all tasks of the current user
@task_routes.route('')
def get_all_tasks():
    user_id = current_user.id
    tasks = Task.query.filter(Task.user_id==user_id)
    response = {task.id:task.to_dict() for task in tasks}
    return response

#get details of a task by id
@task_routes.route('/<int:taskId>')
def get_task_by_id(taskId):
    tasks = Task.query.get(taskId)
    return tasks.to_dict()

#get all tasks by a project id
#need to move this route to the project-routes and change the url a little if needed
@task_routes.route('/<int:projectId>/tasks')
def get_task_by_projectId(projectId):
    tasks = Task.query.filter(Task.project_id==projectId)
    response = {task.id:task.to_dict() for task in tasks}
    return response

#Get all tasks by a user's id who is in the same workspace as current user
#need to move this route to the workspace-routes and change the url a little if needed
@task_routes.route('/<int:workspaceId>/users/<int:userId>/tasks')
def tasks_by_workspace_userId(workspaceId, userId):
    user_id = current_user.id
    projects = Project.query.filter(Project.workspace_id==workspaceId, Project.owner_id==user_id)
    response = {project.id:project.to_dict() for project in projects}
    tasks = Task.query.join(Project).filter(Project.workspace_id==workspaceId, Project.owner_id==user_id).all()
    response1 = {task.id:task.to_dict() for task in tasks}
    return response1
