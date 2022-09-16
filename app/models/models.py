from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# String Constraints
med_str = 100
long_str = 500

# -- Join Tables
# Connects users to workspaces they are assigned to
user_workspaces = db.Table(
    'user_workspaces',
    db.Model.metadata,
    db.Column('users', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('workspaces', db.Integer, db.ForeignKey('workspaces.id'), primary_key=True)
)

# Connects users to projects they are assigned to
user_projects = db.Table(
    'user_projects',
    db.Model.metadata,
    db.Column('users', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('projects', db.Integer, db.ForeignKey('projects.id'), primary_key=True)
)

class Workspace(db.Model):
    __tablename__ = "workspaces"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(med_str), nullable=False)

    # Relationships
    projects = db.relationship("Project", back_populates="workspace")
    members = db.relationship(
        "User",
        secondary=user_workspaces,
        back_populates='spaces',
    )

class Project(db.Model):
    __tablename__ = "projects"

    id = db.Column(db.Integer, primary_key=True)
    workspace_id = db.Column(db.Integer, db.ForeignKey('workspaces.id'))
    name = db.Column(db.String(med_str), nullable=False)
    status = db.Column(db.String(med_str))
    due_date = db.Column(db.Date)
    description = db.Column(db.String(long_str))
    icon = db.Column(db.String(med_str))
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # Relationships
    workspace = db.relationship("Workspace", back_populates="projects")
    tasks = db.relationship("Task", back_populates="project", cascade="all, delete")
    owner = db.relationship("User", back_populates="project_owner")
    contributors = db.relationship(
        "User",
        secondary=user_projects,
        back_populates='assigned_projects',
    )

class Task(db.Model):
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))
    name = db.Column(db.String(med_str), nullable=False)
    due_date = db.Column(db.Date)
    description = db.Column(db.String(long_str))
    complete = db.Column(db.Boolean)

    # Relationships
    project = db.relationship("Project", back_populates="tasks")
    task_user = db.relationship("User", back_populates="user_tasks")

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(med_str), nullable=False)
    last_name = db.Column(db.String(med_str), nullable=False)
    role = db.Column(db.String(med_str))
    email = db.Column(db.String(med_str), nullable=False, unique=True)
    hashed_password = db.Column(db.String(med_str), nullable=False)
    image = db.Column(db.String(med_str))
    pronouns = db.Column(db.String(med_str))
    department = db.Column(db.String(med_str))

    # Relationships
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
