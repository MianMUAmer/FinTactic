from flask import render_template, url_for, flash, redirect, request, jsonify, send_file
from flaskblog import app, db, bcrypt
from flaskblog.models import User, Report, ReportData, Note, AAPL, AMZN, FB, GOOG, MSFT, BTC, ETH, GC, SI
from flask_login import login_user, current_user, logout_user, login_required
from io import BytesIO
import flask
import numpy as np

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
        target = GOOG
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

@app.route("/updateUser", methods=['GET', 'POST'])
def update():
    pic = request.files["pic"]
    id = request.form.get('id')
    name = request.form.get('name')
    phone = request.form.get('phone')
    mobile = request.form.get('mobile')
    address = request.form.get('address')
    designation = request.form.get('designation')
    twitter = request.form.get('twitter')
    instagram = request.form.get('instagram')
    facebook = request.form.get('facebook')

    user = User.query.filter_by(id=id).first()
    user.pic = pic.read()
    user.name = name
    user.phone = phone
    user.mobile = mobile
    user.address = address
    user.designation = designation
    user.twitter = twitter
    user.instagram = instagram
    user.facebook = facebook
    db.session.commit()
    return {"success": 200}

@app.route("/getInfo", methods=['GET', 'POST'])
def getInfo():
    req = flask.request.get_json(force=True)
    id = req.get('id', None)
    user = User.query.filter_by(id=id).first()
    return jsonify(user.get_info()), 200

@app.route("/getPic", methods=['GET', 'POST'])
def getPic():
    req = flask.request.get_json(force=True)
    id = req.get('id', None)
    user = User.query.filter_by(id=id).first()
    return send_file(BytesIO(user.get_image()), attachment_filename=str(user.id)+'.jpg', as_attachment=True)


@app.route("/upReport", methods=["POST"])
def report():
    if 'report' not in request.files:
        resp = jsonify({'message' : 'No file part in the request'})
        resp.status_code = 400
        return resp

    report = request.files["report"]
    user_id= request.form.get("id")
    title= request.form.get("title")
    newReport = Report(title=title, user_id=user_id)
    newReportData = ReportData(data=report.read())
    db.session.add(newReport)
    db.session.add(newReportData)
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

@app.route("/getNotes", methods=['GET', 'POST'])
def getNotes():
    req = flask.request.get_json(force=True)
    user_id = req.get('id', None)
    raw_notes = Note.query.filter_by(user_id=user_id).all()
    notes = {}
    for n in raw_notes:
        notes[n.get_id()] = n.get_note()

    return jsonify(notes), 200

@app.route("/upNotes", methods=['GET', 'POST'])
def upNotes():
    req = flask.request.get_json(force=True)
    id = req.get('id', None)
    asset = req.get('asset', None)
    ticker = req.get('ticker', None)
    graph = req.get('graph', None)
    indicator = req.get('indicator', None)
    startDate = req.get('startDate', None)
    endDate = req.get('endDate', None)
    NewNote = Note(asset=asset, ticker=ticker, graph=graph, indicator=indicator, startDate=startDate, endDate=endDate, user_id=id)
    db.session.add(NewNote)
    db.session.commit()
    return {"success": 200}
    
@app.route("/deleteNotes", methods=['GET', 'POST'])
def deleteNotes():
    req = flask.request.get_json(force=True)
    id = req.get('id', None)
    notes = Note.query.filter_by(id=id).first()
    db.session.delete(notes)
    db.session.commit()
    return {"success": 200}

@app.route("/deleteReports", methods=['GET', 'POST'])
def deleteReports():
    req = flask.request.get_json(force=True)
    id = req.get('id', None)
    report = Report.query.filter_by(id=id).first()
    reportdata = ReportData.query.filter_by(id=id).first()
    db.session.delete(report)
    db.session.delete(reportdata)
    db.session.commit()
    return {"success": 200}

@app.route("/getDataReport", methods=['GET', 'POST'])
def getData():
    req = flask.request.get_json(force=True)
    id = req.get('id', None)
    report = ReportData.query.filter_by(id=id).first()
    return send_file(BytesIO(report.get_data()), attachment_filename='report.pdf', as_attachment=True)
    
@app.route("/correlation", methods=['GET', 'POST'])
def corr():
    req = flask.request.get_json(force=True)
    name1 = req.get('name1', None)
    name2 = req.get('name2', None)
    startDate = req.get('startDate', None)
    endDate = req.get('endDate', None)
    struct = req.get('struct', None)

    if(name1=='AAPL'):
        target1 = AAPL
    elif(name1=="AMZN"):
        target1 = AMZN
    elif(name1=="FB"):
        target1 = FB
    elif(name1=="GOOGL"):
        target1 = GOOG
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
        target2 = GOOG
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
    result = {}
    for a1 in assets1:
        for a2 in assets2:
            if a1.getDate()==a2.getDate():
                close1.append(float(a1.get_close()))
                close2.append(float(a2.get_close()))
                dates.append(a1.getDate())
    
    assetX = np.array(close1)
    assetY = np.array(close2)
    if struct=="meta":
        pC =  np.corrcoef(assetX, assetY)
        result["pC"] = pC[0,1]
        result["assetX"] = name1
        result["assetY"] = name2
        return jsonify(result), 200
    elif struct=="data":
        for day,c1, c2 in zip(dates, close1, close2):
            result[day] = {"assetX":  str(c1), "assetY": str(c2)}
        print(result)
        return jsonify(result), 200
    



