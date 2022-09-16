from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .models import user_projects, user_workspaces

# Strings
small_str = 15
med_str = 100
long_str = 500


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(med_str), nullable=False)
    last_name = db.Column(db.String(med_str), nullable=False)
    role = db.Column(db.String(small_str))
    email = db.Column(db.String(med_str), nullable=False, unique=True)
    hashed_password = db.Column(db.String(med_str), nullable=False)
    image = db.Column(db.String(med_str))
    pronouns = db.Column(db.String(small_str))
    department = db.Column(db.String(small_str))

    user_tasks = db.relationship("Task", back_populates="task_user")
    project_owner = db.relationship("Project", back_populates="owner")
    spaces = db.relationship(
        "Workspace",
        secondary=user_workspaces,
        back_populates='members',
    )
    assigned_projects = db.relationship(
        "Project",
        secondary=user_projects,
        back_populates='contributors',
    )


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'email': self.email,
            'role': self.role,
            'image': self.image,
            'pronouns': self.pronouns,
            'department': self.department
        }
