from crypt import methods
from flask import Blueprint,request
from app.api.user_routes import user, users
from app.forms import project_form
from app.forms.workspace_form import AddUserForm, WorkspaceForm
from app.models import Workspace, User
from ..models.db import db


workspace_routes = Blueprint('workspace', __name__)

# Get All Workspaces
@workspace_routes.route('/')
def get_all_workspace():
    workspaces = [wk.to_dict() for wk in Workspace.query.all()]
    return {"workspaces": workspaces}

# Get One workSpaces by id
# @workspace_routes.route('/<int:id>')
# def one_workspace(id):
#     workspace = Workspace.query.get(id)
#     return workspace.to_dict()


# Get One Workspaces by id with users
@workspace_routes.route('/<int:id>')
def one_workspace(id):
    workspace = Workspace.query.get(id)
    users_in_this_ws = [user.to_dict() for user in workspace.members]
    project_in_this_ws= [projects.to_dict() for projects in workspace.projects]
    return {
        "workspace": workspace.to_dict(),
        "users": users_in_this_ws,
        "projects": project_in_this_ws,
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
def get_workspace(id):
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





    form = AddUserForm()
    find_user = User.query.filter(User.email == form.data['users'])
    if form.validate_on_submit():
        workspace = Workspace.query.get(id).update(
            name = form.data['name'],
            users = workspace.members.append(find_user)
        )
        db.session.commit()
        return workspace.to_dict()
    else:
        form.errors
    return workspace.to_dict()

# # # #Remove a user from Workspace
# @workspace_routes.route('/<int:id>/users/<int:userId>', methods=['DELETE'])
# def get_workspace(id, user_id):
#     workspace = Workspace.query.get(id)
#     find_user = workspace.members.get(user_id)
#     db.session.delete(find_user)
#     #figure out how to add User to workspace after getting workspace
#     return workspace.to_dict()
