from app.models import db, Workspace


def seed_workspaces():
    app_academy = Workspace(name='App Academy')
    nah_sana = Workspace(name='nah-sana')
    dinner_party = Workspace(name='Dinner Party')

    db.session.add(app_academy)
    db.session.add(nah_sana)
    db.session.add(dinner_party)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_workspaces():
    db.session.execute('TRUNCATE workspaces RESTART IDENTITY CASCADE;')
    db.session.commit()
