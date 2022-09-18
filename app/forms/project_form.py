from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, DateField, SubmitField
from wtforms.validators import DataRequired, NumberRange, Length

class ProjectForm(FlaskForm):
  # from variables are in camelCase to better match the front end
  workspaceId = IntegerField("Workspace", validators=[DataRequired()])
  name = StringField("Name", validators=[DataRequired(), Length(0, 100)])
  status = StringField("Status", validators=[Length(0, 15)])
  dueDate = DateField("Due Date")
  description = StringField("Description", validators=[Length(0, 500)])
  icon = StringField("Icon", validators=[Length(0, 100)])
  ownerId = IntegerField("Owner")