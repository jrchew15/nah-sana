from flask_wtf import FlaskForm
from wtforms import StringField,DateField, SelectField,TextAreaField
from wtforms.validators import DataRequired, ValidationError
from app.models import Project

v = [DataRequired()]
class ProjectForm(FlaskForm):
    name = StringField('Name', v)
    status = StringField('Status')
    # status = SelectField('Status',choices=['On Track','At Risk', 'Off Track','On Hold, Complete'])
    description = TextAreaField('Description')
    dueDate= DateField('Due Date')
    icon = StringField('Icon')
