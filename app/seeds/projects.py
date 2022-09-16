from app.models import db, Project
from datetime import date


def seed_projects():
    project1 = Project(
        workspace_id=1,
        owner_id=1,
        name='Entrance Process',
        status='Complete',
        due_date=date(2022, 4, 1),
        description='Pass the interview and technical assessments',
        icon='/static/images/icons/1.png'
    )
    project2 = Project(
        workspace_id=1,
        owner_id=2,
        name='Prepwork',
        status='Complete',
        due_date=date(2022, 5, 9),
        description='Learn more about HTML/CSS, GIT and Boolean Algebra',
        icon='/static/images/icons/2.png'
    )
    project3 = Project(
        workspace_id=1,
        owner_id=3,
        name='Javascript',
        status='Complete',
        due_date=date(2022, 9, 4),
        description='Learn JavaScript basics, SQLite, React and build your first full stack application',
        icon='/static/images/icons/3.png'
    )
    project4 = Project(
        workspace_id=1,
        owner_id=4,
        name='Python',
        status='Complete',
        due_date=date(2022, 9, 27),
        description='Learn Python basics, SQLAlchemy, Flask',
        icon='/static/images/icons/4.png'
    )
    project5 = Project(
        workspace_id=1,
        owner_id=5,
        name='Final Projects',
        status='Complete',
        due_date=date(2022, 10, 10),
        description='Complete a Flask/React Group Project and your Capstone project',
        icon='/static/images/icons/5.png'
    )
    project6 = Project(
        workspace_id=2,
        owner_id=1,
        name='Project Planning',
        status='On Track',
        due_date=date(2022, 9, 16),
        description='Plan for the group project and complete all documentation',
        icon='/static/images/icons/6.png'
    )
    project7 = Project(
        workspace_id=2,
        owner_id=2,
        name='Coding',
        status='On Track',
        due_date=date(2022, 9, 25),
        description='Finish coding nah-sana',
        icon='/static/images/icons/1.png'
    )
    project8 = Project(
        workspace_id=2,
        owner_id=3,
        name='Presentation',
        status='On Track',
        due_date=date(2022, 9, 26),
        description='Present our really awesome project',
        icon='/static/images/icons/2.png'
    )
    project9 = Project(
        workspace_id=3,
        owner_id=4,
        name='Cook',
        status='On Hold',
        due_date=date(2022, 10, 22),
        description='Buy, prep, and cook food',
        icon='/static/images/icons/3.png'
    )
    project10 = Project(
        workspace_id=3,
        owner_id=5,
        name='Host Party',
        status='On Hold',
        due_date=date(2022, 10, 22),
        description='Party time',
        icon='/static/images/icons/4.png'
    )

    db.session.add(project1)
    db.session.add(project2)
    db.session.add(project3)
    db.session.add(project4)
    db.session.add(project5)
    db.session.add(project6)
    db.session.add(project7)
    db.session.add(project8)
    db.session.add(project9)
    db.session.add(project10)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_projects():
    db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
    db.session.commit()
