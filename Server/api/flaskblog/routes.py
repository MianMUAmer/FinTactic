from flask import render_template, url_for, flash, redirect, request, jsonify
from flaskblog import app, db, bcrypt
from flaskblog.models import User, AAPL, AMZN, FB, GOOG, MSFT
from flask_login import login_user, current_user, logout_user, login_required
import flask
@app.route("/")
def index():
    return app.send_static_file('index.html')

@app.route("/api/register", methods=['GET', 'POST'])
def register():
    req = flask.request.get_json(force=True)
    email = req.get('email', None)
    password = req.get('password', None)
    errors = {}
    mail = User.query.filter_by(email=email).first()
    if mail:
        errors['email'] = 'exists'

    if(len(errors)==0):
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        user = User(email=email, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        return {'success':'true'}, 200
    return jsonify(errors), 400

@app.route("/api/login", methods=['GET', 'POST'])
def login():
    req = flask.request.get_json(force=True)
    email = req.get('email', None)
    password = req.get('password', None)
    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        login_user(user, False)
        return {'currentuser': current_user.to_json()}, 200
    return {'currentuser': "invalid"}, 400
    
    
@app.route("/api/assets", methods=['GET', 'POST'])
def getAsset():
    req = flask.request.get_json(force=True)
    name = req.get('name', None)

    result = {}
    date = {}
    metadata = {}
    metadata["1. Informaton"] = "Daily Time Series with Splits and Dividend Events"
    metadata["2. Symbol"] = name
    
    result["Meta Data"] = metadata
    
    if(name=="AAPL"):
        assets = AAPL.query.all()
    elif(name=="AMZN"):
        assets = AMZN.query.all()
    elif(name=="FB"):
        assets = FB.query.all()
    elif(name=="GOOGL"):
        assets = GOOG.query.all()
    elif(name=="MSFT"):
        assets = MSFT.query.all()
    else:
        return {'name': "invalid"}, 400

    for asset in assets:
        date[asset.getDate()] = asset.to_json()
    
    result["Time Series (Daily)"] = date
    return jsonify(result), 200
