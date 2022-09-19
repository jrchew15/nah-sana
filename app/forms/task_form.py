from flask_wtf import FlaskForm
from wtforms.validators import DataRequired, Length
from wtforms import StringField, IntegerField, DateField, BooleanField

class TaskForm(FlaskForm):
    userId = IntegerField('User ID')
    projectId = IntegerField('Project ID')
    name = StringField('Name', validators=[DataRequired(), Length(max=100, message='Task name length must be less than 100')])
    dueDate = DateField('Due Date')
    description = StringField('Description', validators=[Length(max=500)])
    complete = BooleanField('Complete')
