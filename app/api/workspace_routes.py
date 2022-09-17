from flask import Blueprint
from app.models import Workspace
from ..models.db import db

workspace_routes = Blueprint('workspace', __name__)

@workspace_routes.route('/<int:id>')
def get_workspace(id):
    workspace = Workspace.query.get(id)
    return workspace.to_dict()
    # workspaces = [wk.to_dict() for wk in Workspace.query.all()]
    # return {"workspaces": workspaces}
