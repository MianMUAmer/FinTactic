from flask import render_template, url_for, flash, redirect, request, jsonify
from flaskblog import app, db, bcrypt
from flaskblog.models import User
from flask_login import login_user, current_user, logout_user, login_required
import flask
@app.route("/")
@app.route("/home")
def home():
    return render_template("home.html")

@app.route("/about")
def about():
    return render_template("about.html", title="About")

@app.route("/register", methods=['GET', 'POST'])
def register():
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')
    errors = {}
    user = User.query.filter_by(username=username).first()
    if user:
        errors['username'] = 'exists'
    mail = User.query.filter_by(email=email).first()
    if mail:
        errors['email'] = 'exists'

    if(len(errors)==0):
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        user = User(username = username, email=email, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        return {'success':'true'}, 200
    return jsonify(errors), 400

@app.route("/login", methods=['GET', 'POST'])
def login():
    req = flask.request.get_json(force=True)
    email = req.get('email', None)
    password = req.get('password', None)
    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        login_user(user, False)
        return {'currentuser': current_user.to_json()}, 200
    return {'currentuser': "invalid"}, 400
    
@app.route('/logout')
@login_required
def logout():
    logout_user()
    return {"success": 200}
    

