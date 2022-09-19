from flask.cli import AppGroup

from .users import seed_users, undo_users
from .workspaces import seed_workspaces, undo_workspaces
from .projects import seed_projects, undo_projects
from .tasks import seed_tasks, undo_tasks
from .join_tables import seed_join_tables, undo_join_tables


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    # Add other seed functions here
    seed_workspaces()
    seed_projects()
    seed_tasks()
    seed_join_tables()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_workspaces()
    undo_projects()
    undo_tasks()
    undo_join_tables()
