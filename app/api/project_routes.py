from crypt import methods
from flask import Blueprint
from app.models import Project
from ..models.db import db

project_routes = Blueprint('project', __name__)


@project_routes.route('/')
def all_projects():
    projects_all= [project.to_dict() for project in Project.query.all()]
    return { "projects": projects_all }

@project_routes.route("/<int:id>")
def one_project(id):
    project_one = Project.query.get(id)
    if project_one is not None:
        return project_one.to_dict()
        # return { id: project_one.to_dict() }
    else:
        return {
            "statusCode": 404,
            "message": "Project not found"
        }
@project_routes.route('/', methods=["POST"])
def create_project():
    pass

@project_routes.route("/<int:id>", methods=["DELETE"])
def delete_project(id):
    project_one = Project.query.get(id)
    if project_one is not None:
        db.session.delete(project_one)
        db.session.commit()
        return {
            "statusCode": 200,
            "message":f'Successfully deleted {project_one.name}'
            }
    else:
        return {
            "statusCode": 404,
            "message": "Project not found"
        }
