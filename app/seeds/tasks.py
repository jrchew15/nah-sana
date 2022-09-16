from app.models import db, Task
from datetime import date


def seed_tasks():

    task1 = Task(project_id=1, user_id=1, name='Watch Interview Prep Videos', due_date=(2022,4,1), description=None, complete=True)
    task2 = Task(project_id=1, user_id=1, name='HTML/CSS',  due_date=date(2022,5,2), description=None, complete=True)
    task3 = Task(project_id=1, user_id=1, name='Git',  due_date=date(2022,5,2), description='Wow so many branches', complete=True)
    task4 = Task(project_id=1, user_id=1, name='Boolean Algebra',  due_date=date(2022,5,2),description='Did we even use Boolean Algebra in the course? hmm...', complete=True)
    task5 = Task(project_id=2, user_id=1, name='Intro to Javascript',  due_date=date(2022,9,2),description='How do you comfort a JavaScript bug? You console it', complete=True)
    task6 = Task(project_id=2, user_id=1, name='Intro to Functions',  due_date=date(2022,9,2),description='Functions are the building blocks of programming', complete=True)
    task7 = Task(project_id=2, user_id=1, name='Environment Setup',  due_date=date(2022,9,2),description='So many things to download, so little time', complete=True)
    task8 = Task(project_id=2, user_id=1, name='Stress Management',  due_date=date(2022,9,2), description=None, complete=True)
    task9 = Task(project_id=3, user_id=1, name='Objects, Callbacks, Scope, and Closure',  due_date=date(2022,5,23), description=None, complete=True)
    task10 = Task(project_id=3, user_id=1, name='Recursion, IIFEs, Asynchronous JS', due_date=date(2022,5,30),description='To understand recursion, one must first understand recursion', complete=True)
    task11 = Task(project_id=3, user_id=1, name='Data Structures', due_date=date(2022,6,20),description='Binary Trees, what are those? ', complete=True)
    task12 = Task(project_id=4, user_id=1, name='Speedrun of Python', due_date=date(2022,9,12), description='Snakesssssssss', complete=True)
    task13 = Task(project_id=5, user_id=1, name='Group Project',due_date=date(2022,9,26), description='nah-sana is the best!', complete=False)
    task14 = Task(project_id=5, user_id=1, name='Capstone Project',due_date=date(2022,10,10), description=None, complete=False)
    task15 = Task(project_id=6, user_id=2, name='Finish Documentation', due_date=date(2022,9,16), description='API Documentation, Database Scema, Feature List, Redux State Shape, User Stories', complete=True)
    task16 = Task(project_id=7, user_id=3, name='Code Backend',due_date=date(2022,9,20), description='Python time', complete=False)
    task17 = Task(project_id=7, user_id=4, name='Code Frontend',due_date=date(2022,9,21), description='JavaScript time', complete=False)
    task18 = Task(project_id=7, user_id=5, name='Write CSS',due_date=date(2022,9,24), description='Beautification time', complete=False)
    task19 = Task(project_id=8, user_id=1, name='Pass the Group Project',  due_date=date(2022,9,26), description=None, complete=True)
    task20 = Task(project_id=9, user_id=2, name='Buy Groceries', due_date=date(2022,10,21), description=None, complete=False)
    task21 = Task(project_id=9, user_id=3, name='Cook Dinner', due_date=date(2022,10,22), description=None, complete=False)
    task22 = Task(project_id=10, user_id=4, name='Serve Dinner', due_date=date(2022,10,22), description=None, complete=False)
    

    db.session.add(task1)
    db.session.add(task2)
    db.session.add(task3)
    db.session.add(task4)
    db.session.add(task5)
    db.session.add(task6)
    db.session.add(task7)
    db.session.add(task8)
    db.session.add(task9)
    db.session.add(task10)
    db.session.add(task11)
    db.session.add(task12)
    db.session.add(task13)
    db.session.add(task14)
    db.session.add(task15)
    db.session.add(task16)
    db.session.add(task17)
    db.session.add(task18)
    db.session.add(task19)
    db.session.add(task20)
    db.session.add(task21)
    db.session.add(task22)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_tasks():
    db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
    db.session.commit()
