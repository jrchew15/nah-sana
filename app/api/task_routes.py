## Get all tasks of current user
from ..models.models import db, Workspace, Project, Task
from ..models import db
from flask import Blueprint, redirect

task_routes = Blueprint('task', __name__, url_prefix='/api/tasks')

## get all tasks of the current user
## not finished yet, need user id
@task_routes.route('')
def get_all_tasks():
    tasks = Task.query.all()
    response = {task.id: task.to_dict() for task in tasks}
    return response

#get details of a task by id
@task_routes.route('/<int:taskId>')
def get_task_by_id(taskId):
    tasks = Task.query.get(taskId)
    return tasks.to_dict()
