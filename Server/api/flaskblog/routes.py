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
    startDate = req.get('startDate', None)
    endDate = req.get('endDate', None)
    corr = req.get('corr', None)

    result = {}
    date = {}
    metadata = {}
    metadata["1. Informaton"] = "Daily Time Series with Splits and Dividend Events"
    metadata["2. Symbol"] = name


    if(name=='AAPL'):
        target = AAPL
        metadata["3. Name"] = "Apple"
    elif(name=="AMZN"):
        metadata["3. Name"] = "Amazon"
        target = AMZN
    elif(name=="FB"):
        metadata["3. Name"] = "Facebook"
        target = FB
    elif(name=="GOOGL"):
        metadata["3. Name"] = "Google"
        target = GOOGL
    elif(name=="MSFT"):
        metadata["3. Name"] = "Microsoft"
        target = MSFT
    elif(name=="BTC"):
        metadata["3. Name"] = "Bitcoin"
        target = BTC
    elif(name=="ETH"):
        metadata["3. Name"] = "Ethereum"
        target = ETH
    elif(name=="GC"):
        metadata["3. Name"] = "Gold"
        target = GC
    elif(name=="SI"):
        metadata["3. Name"] = "Silver"
        target = SI
    else:
        return {'name': "invalid"}, 400
    
    result["Meta Data"] = metadata

    if startDate and endDate:
        assets = target.query.filter(target.date.between(startDate, endDate)).all()
    else:
        assets = target.query.all()

    if not corr:
        for asset in assets:
            date[asset.getDate()] = asset.to_json()
    else:
        for asset in assets:
            date[asset.getDate()] = asset.get_close()
    
    result["Time Series (Daily)"] = date
    return jsonify(result), 200