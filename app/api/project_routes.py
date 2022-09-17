from flask import Blueprint, request
from app.models import db, Project
from app.forms.project_form import ProjectForm
from datetime import date

project_routes = Blueprint('projects', __name__, url_prefix='/api/projects')

# Create a new project
@project_routes.route('', methods=["POST"])
def new_project():
  new_form = ProjectForm()
  new_form['csrf_token'].data = request.cookies['csrf_token']
  if new_form.validate_on_submit():
    new_project = Project(
        workspace_id=new_form.data['workspaceId'],
        name=new_form.data['name'],
        status=new_form.data['status'],
        due_date=new_form.data['dueDate'],
        description=new_form.data['description'],
        # REVISIT ICON AND OWNER WHEN FRONT END CODE IS WRITTEN
        icon=new_form.data['icon'],
        owner_id=new_form.data['ownerId']
    )
    db.session.add(new_project)
    db.session.commit()
    return new_project.to_dict()
  if new_form.errors:
    return new_form.errors

# Update an existing project based on id
@project_routes.route('/<int:id>', methods=["PUT"])
def update_project(id):
  update_form = ProjectForm()
  update_form['csrf_token'].data = request.cookies['csrf_token']
  if update_form.validate_on_submit():
    Project.query.filter(Project.id==id).update(
      {
        "workspace_id": update_form.data['workspaceId'],
        "name": update_form.data['name'],
        "status": update_form.data['status'],
        "due_date": update_form.data['dueDate'],
        "description": update_form.data['description'],
        # REVISIT ICON AND OWNER WHEN FRONT END CODE IS WRITTEN
        "icon": update_form.data['icon'],
        "owner_id": update_form.data['ownerId']
      }
    )

    db.session.commit()
    project = Project.query.filter(Project.id==id)[0]
    return project.to_dict()
  
  if update_form.errors:
    return update_form.errors


