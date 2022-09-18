
from flask import Blueprint,request
from app.api.user_routes import user, users
from app.forms import project_form
from app.forms.workspace_form import AddUserForm, WorkspaceForm
from app.models import Workspace, User
from ..forms.task_form import TaskForm
from ..models import db, Task,Workspace
from flask_login import login_required
from ..utils import sql_date_to_date_obj
from .auth_routes import validation_errors_to_error_messages


workspace_routes = Blueprint('workspace', __name__)

# Get All Workspaces
@workspace_routes.route('/')
def get_all_workspace():
    workspaces = [wk.to_dict() for wk in Workspace.query.all()]
    return {"workspaces": workspaces}


#Get all tasks by a user's id who is in the same workspace as current user
@workspace_routes.route('/<int:workspaceId>/users/<int:userId>/tasks')
def tasks_by_workspace_userId(workspaceId, userId):

    tasks = Task.query\
        .join(Project)\
        .filter(Project.workspace_id==workspaceId, Task.user_id==userId)\
        .all()
    response = {task.id:task.to_dict() for task in tasks}
    return response

# Get One Workspaces by id with users
@workspace_routes.route('/<int:id>')
def one_workspace(id):
    workspace = Workspace.query.get(id)
    users_in_this_ws = [user.to_dict() for user in workspace.members]
    project_objs= [project for project in workspace.projects]
    project_in_this_ws= [project.to_dict() for project in project_objs]
    task_in_this_ws = []

    # add all the tasks from each project on the workspace
    for project in project_objs:
        task_in_this_ws.extend([task.to_dict() for task in project.tasks])

    return {
        "workspace": workspace.to_dict(),
        "users": users_in_this_ws,
        "projects": project_in_this_ws,
        "tasks": task_in_this_ws
        }

# Create a  Workspace
@workspace_routes.route('/', methods=['POST'])
def create_workspace():
    form = WorkspaceForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_workspace = Workspace(
            name = form.data['name'],
            # users = form.data['users']
        )
        db.session.add(new_workspace)
        db.session.commit()
        return  new_workspace.to_dict()
    else:
        form.errors

# #Update a Workspace
@workspace_routes.route('/<int:id>', methods=['PUT'])
def update_workspace(id):
    form = WorkspaceForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        workspace = Workspace.query.get(id)
        workspace.name = form.data['name']
            # users = form.data['user']
        db.session.commit()
        return workspace.to_dict()
    else:
        form.errors


# Add a User to the Workspace
@workspace_routes.route('/<int:id>/users', methods=['POST'])
def add_user_from_workspace(id):
    workspace = Workspace.query.get(id)
    form = AddUserForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user_email = str(form.data['email'])
        foundUser = User.query.filter(User.email == user_email)[0]
        workspace.members.append(foundUser)
        db.session.commit()
        return foundUser.to_dict()
    else:
        return form.errors

# # # #Remove a user from Workspace
@workspace_routes.route('/<int:id>/users/<int:user_id>', methods=['DELETE'])
def delete_user_from_workspace(id, user_id ):
    workspace = Workspace.query.get(id)
    find_user_to_delete = [x for x in workspace.members if x.id == user_id]
    if len(find_user_to_delete) > 0:
        db.session.delete(find_user_to_delete[0])
        db.session.commit()
        return {'message': f'{find_user_to_delete[0].first_name} was successfully removed from workspace'}
    else:
        return {'Error':'User not found in workspace'}
