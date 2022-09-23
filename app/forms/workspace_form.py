from enum import unique
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, DateField, SubmitField
from wtforms.validators import DataRequired,ValidationError, NumberRange, Length
from app.models import User

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError("Email provided not found. This user doesn't have an account, please ask them to sign up.")

class WorkspaceForm(FlaskForm):
      # from variables are in camelCase to better match the front end
    name = StringField("Name", validators=[DataRequired(), Length(0, 100)])
    # email = StringField('Users Email', validators=[user_exists])


class AddUserForm(FlaskForm):
      # from variables are in camelCase to better match the front end
    email = StringField('Users Email', validators=[DataRequired(),user_exists])
