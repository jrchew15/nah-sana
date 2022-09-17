## Get all tasks of current user
from app.forms.task_form import TaskForm
from ..models.models import db, Workspace, Project, Task
from ..models import User
from ..models import db
from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from ..utils import sql_date_to_date_obj


task_routes = Blueprint('task', __name__, url_prefix='/api/tasks')

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

    tasks = Task.query\
        .join(Project)\
        .filter(Project.workspace_id==workspaceId, Task.user_id==userId)\
        .all()
    response = {task.id:task.to_dict() for task in tasks}
    return response

@task_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_task(id):
    task = Task.query.get(id)
    if task is None:
        return {"message":"Task couldn't be found", "statusCode":404}

    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        task.user_id = data["userId"]
        task.project_id=data['projectId']
        task.name=data['name']
        task.due_date=sql_date_to_date_obj(data['dueDate'])
        task.description=data['description']

        db.session.commit()
        return task.to_dict()

    return {"message":"Bad Data", "statusCode": 400}

@task_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_task(id):
    task = Task.query.get(id)
    if task is None:
        return {"message":"Task couldn't be found", "statusCode":404}

    db.session.delete(task)
    db.session.commit()
    return {
            "message": "Successfully deleted",
             "statusCode": 200
        }
    user_id = current_user.id
    tasks = Task.query.filter(Task.user_id==user_id)
    response = {task.id:task.to_dict() for task in tasks}
    return response
