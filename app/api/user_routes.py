from flask import Blueprint, jsonify, request
from flask_login import login_required, login_user
from app.models import User, db
from app.forms import SignUpForm
from app.api.auth_routes import validation_errors_to_error_messages


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_user(id):
    """
    Edits user profile information
    """
    update_form = SignUpForm()
    update_form['csrf_token'].data = request.cookies['csrf_token']
    if update_form.validate_on_submit():
        user = User.query.filter(User.id==id)[0]
        user.email = update_form.data['email']
        user.password = update_form.data['password']
        user.first_name = update_form.data['firstName']
        user.last_name = update_form.data['lastName']
        user.role = update_form.data['role']
        user.image = update_form.data['image']
        user.pronouns = update_form.data['pronouns']
        user.department = update_form.data['department']
        
        # REVISIT - Why isn't the update method working? 
        # User.query.filter(User.id==id).update(
        #     {
        #         "email": update_form.data['email'],
        #         "password": update_form.data['password'],
        #         "first_name": update_form.data['firstName'],
        #         "last_name": update_form.data['lastName'],
        #         "role": update_form.data['role'],
        #         "image": update_form.data['image'],
        #         "pronouns": update_form.data['pronouns'],
        #         "department": update_form.data['department']
        #     }
        # )
        
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(update_form.errors)}, 401