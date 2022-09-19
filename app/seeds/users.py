from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo',
        last_name='User',
        role='Demo',
        email='demo@demo.io',
        password='pass',
        image='/static/images/users/1.png',
        pronouns='They/Them',
        department='Executive',
        bio=''
    )
    cecilia = User(
        first_name='Cecilia',
        last_name='Ou',
        role='Engineer',
        email='cou.code@gmail.com',
        password='pass',
        image='/static/images/users/2.png',
        pronouns='She/Her/Hers',
        department='Engineering',
        bio='I am the demo user!'
    )
    chen = User(
        first_name='Chen',
        last_name='Chen',
        role='Engineer',
        email='chencc3333@gmail.com',
        password='password',
        image='/static/images/users/3.png',
        pronouns='She/Her/Hers',
        department='Engineering',
        bio='This is my bio.'
    )
    francisco = User(
        first_name='Francisco',
        last_name='Palacios',
        role='Engineer',
        email='pineapples@gmail.com',
        password='password',
        image='/static/images/users/4.png',
        pronouns=None,
        department='Engineering',
        bio='This is my bio.'
    )
    jason = User(
        first_name='Jason',
        last_name='Chew',
        role='Engineer',
        email='demojason@user.io',
        password='password',
        image='/static/images/users/5.png',
        pronouns=None,
        department='Engineering',
        bio='This is my bio.'
    )

    db.session.add(demo)
    db.session.add(cecilia)
    db.session.add(chen)
    db.session.add(francisco)
    db.session.add(jason)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
