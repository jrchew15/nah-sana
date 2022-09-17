from flask import Blueprint, request
from ..forms.task_form import TaskForm
from ..models import db, Task
from flask_login import login_required
from ..utils import sql_date_to_date_obj

workspace_routes = Blueprint('workspace', __name__, url_prefix='/api/workspaces')

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
    return {"message":"Bad Data", "statusCode": 400}
