from flask import render_template, url_for, flash, redirect, request, jsonify, send_file
from flaskblog import app, db, bcrypt
from flaskblog.models import User, Report, ReportData, Note, Bookmark, Video, AAPL, AMZN, FB, GOOG, MSFT, BTC, ETH, GC, SI
from flask_login import login_user, current_user, logout_user, login_required
from io import BytesIO
import flask
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import statsmodels.api as sm

symDict = {"AAPL":"Apple", "AMZN":"Amazon", "FB":"Facebook", "GOOGL":"Google", "MSFT":"Microsoft", "BTC":"Bitcoin", "ETH":"Ethereum", "GC":"Gold", "SI":"Silver"}

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
    
@app.route('/api/logout')
@login_required
def logout():
    logout_user()
    return {"success": 200}
    
@app.route("/api/assets", methods=['GET', 'POST'])
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
    elif(name=="AMZN"):
        target = AMZN
    elif(name=="FB"):
        target = FB
    elif(name=="GOOGL"):
        target = GOOG
    elif(name=="MSFT"):
        target = MSFT
    elif(name=="BTC"):
        target = BTC
    elif(name=="ETH"):
        target = ETH
    elif(name=="GC"):
        target = GC
    elif(name=="SI"):
        target = SI
    else:
        return {'name': "invalid"}, 400
    
    metadata["3. Name"] = symDict[name]
    result["Meta Data"] = metadata

    if startDate and endDate:
        assets = target.query.filter(target.date.between(startDate, endDate)).all()
    else:
        assets = target.query.all()

    for asset in assets:
        date[asset.getDate()] = asset.to_json()
    
    result["Time Series (Daily)"] = date
    return jsonify(result), 200

@app.route("/api/updateUser", methods=['GET', 'POST'])
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

@app.route("/api/getInfo", methods=['GET', 'POST'])
def getInfo():
    req = flask.request.get_json(force=True)
    id = req.get('id', None)
    user = User.query.filter_by(id=id).first()
    return jsonify(user.get_info()), 200

@app.route("/api/getPic", methods=['GET', 'POST'])
def getPic():
    req = flask.request.get_json(force=True)
    id = req.get('id', None)
    user = User.query.filter_by(id=id).first()
    return send_file(BytesIO(user.get_image()), attachment_filename=str(user.id)+'.jpg', as_attachment=True)


@app.route("/api/upReport", methods=["POST"])
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

@app.route("/api/getMetaReport", methods=['GET', 'POST'])
def getReports():
    req = flask.request.get_json(force=True)
    user_id = req.get('id', None)
    raw_reports = Report.query.filter_by(user_id=user_id).all()

    metas = {}
    for r in raw_reports:
        metas[r.get_id()] = r.get_meta()

    return jsonify(metas), 200

@app.route("/api/getNotes", methods=['GET', 'POST'])
def getNotes():
    req = flask.request.get_json(force=True)
    user_id = req.get('id', None)
    raw_notes = Note.query.filter_by(user_id=user_id).all()
    notes = {}
    for n in raw_notes:
        notes[n.get_id()] = n.get_note()

    return jsonify(notes), 200

@app.route("/api/upNotes", methods=['GET', 'POST'])
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
    
@app.route("/api/deleteNotes", methods=['GET', 'POST'])
def deleteNotes():
    req = flask.request.get_json(force=True)
    id = req.get('id', None)
    notes = Note.query.filter_by(id=id).first()
    db.session.delete(notes)
    db.session.commit()
    return {"success": 200}

@app.route("/api/deleteReports", methods=['GET', 'POST'])
def deleteReports():
    req = flask.request.get_json(force=True)
    id = req.get('id', None)
    report = Report.query.filter_by(id=id).first()
    reportdata = ReportData.query.filter_by(id=id).first()
    db.session.delete(report)
    db.session.delete(reportdata)
    db.session.commit()
    return {"success": 200}

@app.route("/api/deleteVideo", methods=['GET', 'POST'])
def deleteVideo():
    req = flask.request.get_json(force=True)
    id = req.get('id', None)
    video = Video.query.filter_by(id=id).first()
    db.session.delete(video)
    db.session.commit()
    return {"success": 200}

@app.route("/api/getDataReport", methods=['GET', 'POST'])
def getData():
    req = flask.request.get_json(force=True)
    id = req.get('id', None)
    report = ReportData.query.filter_by(id=id).first()
    return send_file(BytesIO(report.get_data()), attachment_filename='report.pdf', as_attachment=True)
    
@app.route("/api/correlation", methods=['GET', 'POST'])
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
        result["meanX"] = np.mean(close1)
        result["meanY"] = np.mean(close2)
        result["ratio"] = np.std(close2) / np.std(close1)

        return jsonify(result), 200
    elif struct=="data":
        for day,c1, c2 in zip(dates, close1, close2):
            result[day] = {"assetX":  str(c1), "assetY": str(c2)}
        return jsonify(result), 200
    



@app.route("/api/mlOld", methods=['GET', 'POST'])
def ml():
    req = flask.request.get_json(force=True)
    name = req.get('name', None)
    startDate = req.get('startDate', None)
    endDate = req.get('endDate', None)
    choice = req.get('choice', None)

    if(name=='AAPL'):
        target = AAPL
    elif(name=="AMZN"):
        target = AMZN
    elif(name=="FB"):
        target = FB
    elif(name=="GOOGL"):
        target = GOOG
    elif(name=="MSFT"):
        target = MSFT
    elif(name=="BTC"):
        target = BTC
    elif(name=="ETH"):
        target = ETH
    elif(name=="GC"):
        target = GC
    elif(name=="SI"):
        target = SI
    else:
        return {'name': "invalid"}, 400

    if choice=="Old Data":
        assets = target.query.filter(target.date.between(startDate, endDate)).all()
    elif choice=="Future Data":
        assets = target.query.filter(target.date.between("2021-01-01", "2021-05-07")).all()

    result = {}
    for a in assets:
        result[a.getDate()] = a.get_close()
    df = pd.DataFrame({'Date': result.keys(), 'Closing Price': result.values()})
    df.index.name = 'index'

    if choice=="Old Data":
        model=sm.tsa.statespace.SARIMAX(df['Closing Price'].astype(float) ,order=(1, 1, 1),seasonal_order=(1,1,1,12))
        results=model.fit()
        df['forecast']=results.predict(start=0,dynamic=False)
        res = {}
        meta = {}
        data = {}
        meta["Symbol"]=name
        meta["Name"]=symDict[name]
        res["meta"] = meta
        i=0
        for date, actual,predicted in zip(result.keys(), result.values(), df['forecast']):
            data[date] = {"close": actual, "predict": predicted}
        del data[next(iter(data))]
        res["data"] = data
        return jsonify(res), 200

    elif choice=="Future Data":
        future_dates = []
        for x in range(0,24):
            future_dates.append(df.index[-1] + x)
        future_datest_df=pd.DataFrame(index=future_dates[1:],columns=df.columns)
        future_df=pd.concat([df,future_datest_df])
        model=sm.tsa.statespace.SARIMAX(df['Closing Price'].astype(float),order=(1, 1, 1),seasonal_order=(1,1,1,30))
        results=model.fit()
        future_df['forecast'] = results.predict(start = len(df), end = len(df)+22, dynamic= False)
        
        res = {}
        meta = {}
        future = []
        data = []
        dates = []

        meta["Symbol"]=name
        meta["Name"]=symDict[name]
        res["meta"] = meta
       
        for blank in range(0, len(df)):
            future.append("{}")
        for f in future_df[len(df)+1:]['forecast']:
            future.append(f) 
        res["future"] = future

        for v in result.values():
            data.append(v)
        for blank in range(0,22):
            data.append("{}")

        for k in result.keys():
            dates.append(k)
        
        dates.append("2021-05-08")
        dates.append("2021-05-09")
        d1 = "2021-05-"
        postfix = 10
        for day in range(0,20):
            newDate = d1 + str(postfix)
            dates.append(newDate)
            postfix+=1
        
        res["dates"]=dates
        res["data"] = data
        return jsonify(res), 200


@app.route("/api/addVideo", methods=['GET', 'POST'])
def addVideo():
    req = flask.request.get_json(force=True)
    name = req.get('name', None)
    url = req.get('url', None)
    thumbnail = req.get('thumbnail', None)
    video = Video(name=name, url=url, thumbnail=thumbnail)
    db.session.add(video)
    db.session.commit()
    return {"success": 200}



@app.route("/api/getVideos", methods=['GET', 'POST'])
def getVideos():
    rawVideos = Video.query.all()
    videos = {}
    for a in rawVideos:
        videos[a.get_id()] = a.get_json()
    return jsonify(videos), 200

@app.route("/api/toggleBookmark", methods=['GET', 'POST'])
def toggleBookmark():
    req = flask.request.get_json(force=True)
    user_id = req.get('user_id', None)
    video_url = req.get('video_url', None)
    video_id = Video.query.filter_by(url=video_url).first().get_id()
    if Bookmark.query.filter_by(user_id=user_id, video_id=video_id).first():
        bookmark = Bookmark.query.filter_by(video_id=video_id).first()
        db.session.delete(bookmark)
    else:
        bookmark = Bookmark(user_id=user_id, video_id=video_id)
        db.session.add(bookmark)
    db.session.commit()
    return {"success": 200}

@app.route("/api/getBookmarks", methods=['GET', 'POST'])
def getBookmarks():
    req = flask.request.get_json(force=True)
    user_id = req.get('user_id', None)
    bookmarks = {}
    index = 0
    rawBookmarks = Bookmark.query.filter_by(user_id=user_id).all()
    for b in rawBookmarks:
        bookmarks[index] = Video.query.filter_by(id=b.get_video_id()).first().get_json()
        index+=1
    return jsonify(bookmarks), 200

