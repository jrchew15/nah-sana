from flask_wtf import FlaskForm
from wtforms.validators import DataRequired, Length
from wtforms import StringField, IntegerField, DateField

class TaskForm(FlaskForm):
    userId = IntegerField('User ID')
    projectId = IntegerField('Project ID')
    name = StringField('Name', validators=[DataRequired(), Length(max=100, message='Task name length must be less than 100')])
    dueDate = StringField('Due Date')
    description = StringField('Description', validators=[Length(max=500)])

