from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

# Commented this out because we are not using usernames
# def username_exists(form, field):
#     # Checking if username is already in use
#     username = field.data
#     user = User.query.filter(User.username == username).first()
#     if user:
#         raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    # username = StringField(
    #     'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired()])
    firstName = StringField('First Name', validators=[DataRequired(), Length(max=100)])
    lastName = StringField('Last Name', validators=[DataRequired(), Length(max=100)])
    role = StringField('Role', validators=[Length(max=15)])
    image = StringField('Image', validators=[Length(max=100)])
    pronouns = StringField('Pronouns', validators=[Length(max=15)])
    department = StringField('Department', validators=[Length(max=15)])

