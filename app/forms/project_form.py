from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, DateField, SubmitField
from wtforms.validators import DataRequired, NumberRange, Length

class ProjectForm(FlaskForm):
  # from variables are in camelCase to better match the front end
  workspaceId = IntegerField("Workspace", validators=[DataRequired()])
  name = StringField("Name", validators=[DataRequired(message="Name is required"), Length(max=100, message="Name must be less than 100 characters")])
  status = StringField("Status", validators=[Length(max=15, message="Status must be less than 100 characters")])
  dueDate = DateField("Due Date")
  description = StringField("Description", validators=[Length(max=500, message="Description must be less than 500 characters")])
  icon = StringField("Icon", validators=[Length(max=100, message="Icon must be less than 100 characters")])
  ownerId = IntegerField("Owner")

class AddUserToProjectForm(FlaskForm):
  userId = IntegerField("User ID", validators=[DataRequired()])
