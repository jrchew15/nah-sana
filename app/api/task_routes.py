## Get all tasks of current user
from ..models.models import db, Workspace, Project, Task
from ..models import db
from flask import Blueprint, redirect

task_routes = Blueprint('task', __name__, url_prefix='/api/tasks')

@task_routes.route('/')
def get_all_tasks():
    return 'test'
