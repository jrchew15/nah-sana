from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, DateField, SubmitField
from wtforms.validators import DataRequired, NumberRange, Length


class WorkspaceForm(FlaskForm):
      # from variables are in camelCase to better match the front end
    name = StringField("Name", validators=[DataRequired(), Length(0, 100)])
    users = StringField('Users')
