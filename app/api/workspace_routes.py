from crypt import methods
from flask import Blueprint
from app.api.user_routes import users
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
    users_in_this_ws = workspace.members
    return {
        "workspace": workspace.to_dict(),
        "users": users_in_this_ws
        }


# # Add a User to the Workspace
@workspace_routes.route('/<int:id>/users/<int:user_id>', methods=['POST'])
def get_workspace(id, user_id):

    workspace = Workspace.query.get(id)
    find_user = User.get(user_id)


    #figure out how to add User to workspace after getting workspace

    return workspace.to_dict()



# #Remove a user from Workspace
@workspace_routes.route('/<int:id>/users/<int:userId>', methods=['DELETE'])
def get_workspace(id, user_id):
    workspace = Workspace.query.get(id)
    find_user = workspace.members.get(user_id)
    db.session.delete(find_user)
    return workspace.to_dict()
