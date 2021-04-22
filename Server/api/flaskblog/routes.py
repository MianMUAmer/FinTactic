from flask import render_template, url_for, flash, redirect, request, jsonify, send_file
from flaskblog import app, db, bcrypt
from flaskblog.models import User, Report, AAPL, AMZN, FB, GOOG, MSFT, BTC, ETH, GC, SI
from flask_login import login_user, current_user, logout_user, login_required
from io import BytesIO
import flask
import numpy as np

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
    startDate = req.get('startDate', None)
    endDate = req.get('endDate', None)
    
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

    for asset in assets:
        date[asset.getDate()] = asset.to_json()
    
    result["Time Series (Daily)"] = date
    return jsonify(result), 200

@app.route("/upReport", methods=["POST"])
def report():
    if 'report' not in request.files:
        resp = jsonify({'message' : 'No file part in the request'})
        resp.status_code = 400
        return resp

    report = request.files["report"]
    user_id= request.form.get("id")
    title= request.form.get("title")
    newReport = Report(title=title, data=report.read(), user_id=user_id)
    db.session.add(newReport)
    db.session.commit()
    return {"success": 200}

@app.route("/getMetaReport", methods=['GET', 'POST'])
def getReports():
    req = flask.request.get_json(force=True)
    user_id = req.get('id', None)
    raw_reports = Report.query.filter_by(user_id=user_id).all()

    metas = {}
    for r in raw_reports:
        metas[r.get_id()] = r.get_meta()

    return jsonify(metas), 200

@app.route("/getDataReport", methods=['GET', 'POST'])
def getData():
    req = flask.request.get_json(force=True)
    id = req.get('id', None)
    report = Report.query.filter_by(id=1).first()
    return send_file(BytesIO(report.get_data()), attachment_filename=report.get_date()+'-report.pdf', as_attachment=True)
    
@app.route("/correlation", methods=['GET', 'POST'])
def corr():
    req = flask.request.get_json(force=True)
    name1 = req.get('name1', None)
    name2 = req.get('name2', None)
    startDate = req.get('startDate', None)
    endDate = req.get('endDate', None)

    if(name1=='AAPL'):
        target1 = AAPL
    elif(name1=="AMZN"):
        target1 = AMZN
    elif(name1=="FB"):
        target1 = FB
    elif(name1=="GOOGL"):
        target1 = GOOGL
    elif(name1=="MSFT"):
        target1 = MSFT
    elif(name1=="BTC"):
        target1 = BTC
    elif(name1=="ETH"):
        target1 = ETH
    elif(name1=="GC"):
        target1 = GC
    elif(name1=="SI"):
        target1 = SI
    else:
        return {'name': "invalid"}, 400
    
    if(name2=='AAPL'):
        target2 = AAPL
    elif(name2=="AMZN"):
        target2 = AMZN
    elif(name2=="FB"):
        target2 = FB
    elif(name2=="GOOGL"):
        target2 = GOOGL
    elif(name2=="MSFT"):
        target2 = MSFT
    elif(name2=="BTC"):
        target2 = BTC
    elif(name2=="ETH"):
        target2 = ETH
    elif(name2=="GC"):
        target2 = GC
    elif(name2=="SI"):
        target2 = SI
    else:
        return {'name': "invalid"}, 400

    if startDate and endDate:
        assets1 = target1.query.filter(target1.date.between(startDate, endDate)).all()
        assets2 = target2.query.filter(target2.date.between(startDate, endDate)).all()
    else:
        assets1 = target1.query.all()
        assets2 = target2.query.all()
    
    close1 = []
    close2 = []
    dates = []
    # for a1, a2 in zip(assets1, assets2):
    #     if a1.getDate()==a2.getDate():
    #         close1.append(a1.get_close())
    #         close2.append(a2.get_close())
    for a1 in assets1:
        for a2 in assets2:
            if a1.getDate()==a2.getDate():
                close1.append(a1.get_close())
                close2.append(a2.get_close())
                dates.append(a1.getDate())
    
    assetX = np.array(close1)
    assetY = np.array(close2)

    pC =  np.corrcoef(assetX, assetY) 
    return {'pC': pC[0,1]}, 200
    #return jsonify(dates), 200
    



