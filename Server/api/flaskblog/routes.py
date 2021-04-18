from flask import render_template, url_for, flash, redirect, request, jsonify
from flaskblog import app, db, bcrypt
from flaskblog.models import User, AAPL, AMZN, FB, GOOG, MSFT, BTC, ETH, GC, SI
from flask_login import login_user, current_user, logout_user, login_required
import flask
@app.route("/")
@app.route("/home")
def home():
    return render_template("home.html")

@app.route("/about")
def about():
    return render_template("about.html", title="About")

@app.route('/notes', methods=['GET', 'POST'])
def notes():
    data = request.get_json(force=True)
    print(data)
    return {"success": 200}


@app.route("/register", methods=['GET', 'POST'])
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
    
@app.route("/assets", methods=['GET', 'POST'])
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
    elif(name=="BTC"):
        assets = BTC.query.all()
    elif(name=="ETH"):
        assets = ETH.query.all()
    elif(name=="GC"):
        assets = GC.query.all()
    elif(name=="SI"):
        assets = SI.query.all()       
    else:
        return {'name': "invalid"}, 400

    for asset in assets:
        date[asset.getDate()] = asset.to_json()
    
    result["Time Series (Daily)"] = date
    return jsonify(result), 200
