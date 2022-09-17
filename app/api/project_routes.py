
from ..models import Task
from ..forms.task_form import TaskForm
from ..utils import sql_date_to_date_obj

@project_routes.route('/<int:id>/tasks', methods=['POST'])
@login_required
def create_task(id):
    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_task = Task(
            user_id=data['userId'],
            project_id=data['projectId'] or id,
            name=data['name'],
            due_date=sql_date_to_date_obj(data['dueDate']),
            description=data['description']
        )

        db.session.add(new_task)
        db.session.commit()
        return new_task.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401
