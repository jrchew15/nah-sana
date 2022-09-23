from flask_wtf import FlaskForm
from wtforms.validators import DataRequired, Length
from wtforms import StringField, IntegerField, DateField, BooleanField
import datetime

def check_for_future(form, field):
  if field.data < datetime.date.today():
    raise ValueError('Due date must be in the future')

class TaskForm(FlaskForm):
    userId = IntegerField('User ID')
    projectId = IntegerField('Project ID')
    name = StringField('Name', validators=[DataRequired(), Length(max=100, message='Task name length must be less than 100')])
    dueDate = DateField('Due Date',validators=[DataRequired('Date is required'), check_for_future])
    description = StringField('Description', validators=[Length(max=500)])
    complete = BooleanField('Complete')
