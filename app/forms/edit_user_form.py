from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length
from app.models import User


class EditUserForm(FlaskForm):
    firstName = StringField('First Name', 
                        validators=[DataRequired(message='First name is required'), 
                        Length(max=100, message='First name must be less than 100 characters' )])
    lastName = StringField('Last Name', 
                        validators=[DataRequired(message='Last name is required'), 
                        Length(max=100, message='Last name must be less than 100 characters')])
    role = StringField('Role', 
                        validators=[Length(max=15, message='Role must be less than 15 characters')])
    image = StringField('Image', 
                        validators=[Length(max=100, message='Image must be less than 100 characters')])
    pronouns = StringField('Pronouns', 
                        validators=[Length(max=15, message='Pronouns must be less than 15 characters')])
    department = StringField('Department', 
                        validators=[Length(max=15, message='Department must be less than 15 characters')])

