from ..models import db, User, Project, Workspace

def seed_join_tables():
    demo_users = User.query.all()
    project1 = Project.query.get(1)
    project2 = Project.query.get(2)
    project1.contributors.extend(demo_users)
    project2.contributors.extend(demo_users)

    workspace1 = Workspace.query.get(1)
    workspace2 = Workspace.query.get(2)
    workspace1.members.extend(demo_users)
    workspace2.members.extend(demo_users)

    db.session.commit()

def undo_join_tables():
    db.session.execute('TRUNCATE user_projects RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE user_workspaces RESTART IDENTITY CASCADE;')
    db.session.commit()
