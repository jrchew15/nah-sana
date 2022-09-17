from ..forms.task_form import TaskForm
from ..models import db, Task

@workspace_routes.route('/<int:id>/tasks',methods=['POST'])
@login_required
def create_task(id):
    form = TaskForm()

    if form.validate_on_submit():
        data = form.data
        new_task = Task(
            user_id=data['userId'],
            project_id=data['projectId'],
            name=data['name'],
            due_date=data['dueDate'],
            description=data['description']
        )

        db.session.add(new_task)
        db.session.commit()
        return new_task.to_dict()
    return {"message":"Bad Data", "statusCode": 400}
