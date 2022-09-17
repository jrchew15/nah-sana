from flask import Blueprint, request
from ..forms.task_form import TaskForm
from ..models import db, Task,Workspace
from flask_login import login_required
from ..utils import sql_date_to_date_obj
from .auth_routes import validation_errors_to_error_messages

workspace_routes = Blueprint('workspace', __name__)

@workspace_routes.route('/<int:id>/tasks', methods=['POST'])
@login_required
def create_task(id):
    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_task = Task(
            user_id=data['userId'],
            project_id=data['projectId'],
            name=data['name'],
            due_date=sql_date_to_date_obj(data['dueDate']),
            description=data['description']
        )

        db.session.add(new_task)
        db.session.commit()
        return new_task.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

@workspace_routes.route('/<int:id>')
def get_workspace(id):
    workspace = Workspace.query.get(id)
    return workspace.to_dict()
    # workspaces = [wk.to_dict() for wk in Workspace.query.all()]
    # return {"workspaces": workspaces}

# @workspace_routes.route('/<int:id>', methods=['POST'])
# def get_workspace(id):
#     workspace = Workspace.query.get(id)
#     #figure out how to add User to workspace after getting workspace

#     return workspace.to_dict()
