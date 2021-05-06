from flaskblog import db, login_manager
from datetime import datetime
from flask_login import UserMixin

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    reports = db.relationship('Report', backref='author', lazy=True)
    notes = db.relationship('Note', backref='author', lazy=True)
    bookmarks = db.relationship('Bookmark', backref='author', lazy=True)

    name = db.Column(db.String(30))
    phone = db.Column(db.String(20))
    mobile = db.Column(db.String(20))
    address = db.Column(db.String(60))
    designation = db.Column(db.String(30))
    pic = db.Column(db.LargeBinary)
    twitter = db.Column(db.String(20))
    instagram = db.Column(db.String(20))
    facebook = db.Column(db.String(20))

    def __repr__(self):
        return f"User('{self.email}')"

    def to_json(self):        
        return {"id": self.id, "email": self.email}
    
    def get_info(self):
        return {"name": self.name, "email": self.email, "phone": self.phone, "mobile": self.mobile, "address": self.address,
        "designation": self.designation, "twitter": self.twitter, "instagram": self.instagram, "facebook": self.facebook,
        "savedNotes": len(self.notes), "savedReports": len(self.reports)}
    def get_image(self):
        return self.pic

class Report(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(300))
    date_uploaded = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    def get_meta(self):
        return {"id":self.id, "title": self.title, "date": self.date_uploaded.strftime("%d.%m.%Y")}
    def get_date(self):
        return self.date_uploaded.strftime("%d.%m.%Y")
    def get_id(self):
        return self.id

class ReportData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.LargeBinary)
    def get_data(self):
        return self.data

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    asset = db.Column(db.String(300))
    ticker = db.Column(db.String(300))
    graph = db.Column(db.String(300))
    indicator = db.Column(db.String(300))
    startDate = db.Column(db.String(300))
    endDate = db.Column(db.String(300))
    date_uploaded = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def get_note(self):
        return {"id":self.id, "date": self.date_uploaded.strftime("%d.%m.%Y"), "asset": self.asset, "ticker": self.ticker, "graph": self.graph,
        "indicator": self.indicator,"startDate": self.startDate,"endDate": self.endDate}
    def get_id(self):
        return self.id

class Video(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(300))
    url = db.Column(db.String(300))
    thumbnail = db.Column(db.String(300))
    def get_json(self):
        return {"id": self.id, "name": self.name, "url": self.url, "thumbnail": self.thumbnail}
    def get_id(self):
        return self.id

class Bookmark(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    video_id = db.Column(db.Integer, db.ForeignKey('video.id'), nullable=False)

    def get_video_id(self):
        return self.video_id

class AAPL(db.Model):
    date = db.Column(db.String(20), primary_key=True)
    open = db.Column(db.String(20), nullable=False)
    high = db.Column(db.String(20), nullable=False)
    low = db.Column(db.String(20), nullable=False)
    close = db.Column(db.String(20), nullable=False)
    adjclose = db.Column(db.String(20), nullable=False)
    volume = db.Column(db.String(20), nullable=False)
    def __repr__(self):
        return f'"{self.date}": {{"1. open": "{self.open}", "2. high": "{self.high}", "3. low": "{self.low}", "4. close": "{self.close}", "5. adjusted close": "{self.adjclose}", "6. volume": "{self.volume}", "7. dividend amout": "0.0000", "8. split coefficient": "1.0"}}'

    def getDate(self):
        return self.date
    def get_close(self):
        return self.close

    def to_json(self):
        return {"1. open": self.open, "2. high":self.high, "3. low":self.low, "4. close":self.close, "5. adjclose":self.adjclose, "6. volume":self.volume, "7. dividend amout": "0.0000", "8. split coefficient": "1.0" }

class AMZN(db.Model):
    date = db.Column(db.String(20), primary_key=True)
    open = db.Column(db.String(20), nullable=False)
    high = db.Column(db.String(20), nullable=False)
    low = db.Column(db.String(20), nullable=False)
    close = db.Column(db.String(20), nullable=False)
    adjclose = db.Column(db.String(20), nullable=False)
    volume = db.Column(db.String(20), nullable=False)
    def __repr__(self):
        return f'"{self.date}": {{"1. open": "{self.open}", "2. high": "{self.high}", "3. low": "{self.low}", "4. close": "{self.close}", "5. adjusted close": "{self.adjclose}", "6. volume": "{self.volume}", "7. dividend amout": "0.0000", "8. split coefficient": "1.0"}}'

    def getDate(self):
        return self.date
    def get_close(self):
        return self.close

    def to_json(self):
        return {"1. open": self.open, "2. high":self.high, "3. low":self.low, "4. close":self.close, "5. adjclose":self.adjclose, "6. volume":self.volume, "7. dividend amout": "0.0000", "8. split coefficient": "1.0" }

class FB(db.Model):
    date = db.Column(db.String(20), primary_key=True)
    open = db.Column(db.String(20), nullable=False)
    high = db.Column(db.String(20), nullable=False)
    low = db.Column(db.String(20), nullable=False)
    close = db.Column(db.String(20), nullable=False)
    adjclose = db.Column(db.String(20), nullable=False)
    volume = db.Column(db.String(20), nullable=False)
    def __repr__(self):
        return f'"{self.date}": {{"1. open": "{self.open}", "2. high": "{self.high}", "3. low": "{self.low}", "4. close": "{self.close}", "5. adjusted close": "{self.adjclose}", "6. volume": "{self.volume}", "7. dividend amout": "0.0000", "8. split coefficient": "1.0"}}'

    def getDate(self):
        return self.date
    def get_close(self):
        return self.close

    def to_json(self):
        return {"1. open": self.open, "2. high":self.high, "3. low":self.low, "4. close":self.close, "5. adjclose":self.adjclose, "6. volume":self.volume, "7. dividend amout": "0.0000", "8. split coefficient": "1.0" }

class GOOG(db.Model):
    date = db.Column(db.String(20), primary_key=True)
    open = db.Column(db.String(20), nullable=False)
    high = db.Column(db.String(20), nullable=False)
    low = db.Column(db.String(20), nullable=False)
    close = db.Column(db.String(20), nullable=False)
    adjclose = db.Column(db.String(20), nullable=False)
    volume = db.Column(db.String(20), nullable=False)
    def __repr__(self):
        return f'"{self.date}": {{"1. open": "{self.open}", "2. high": "{self.high}", "3. low": "{self.low}", "4. close": "{self.close}", "5. adjusted close": "{self.adjclose}", "6. volume": "{self.volume}", "7. dividend amout": "0.0000", "8. split coefficient": "1.0"}}'

    def getDate(self):
        return self.date
    def get_close(self):
        return self.close

    def to_json(self):
        return {"1. open": self.open, "2. high":self.high, "3. low":self.low, "4. close":self.close, "5. adjclose":self.adjclose, "6. volume":self.volume, "7. dividend amout": "0.0000", "8. split coefficient": "1.0" }

class MSFT(db.Model):
    date = db.Column(db.String(20), primary_key=True)
    open = db.Column(db.String(20), nullable=False)
    high = db.Column(db.String(20), nullable=False)
    low = db.Column(db.String(20), nullable=False)
    close = db.Column(db.String(20), nullable=False)
    adjclose = db.Column(db.String(20), nullable=False)
    volume = db.Column(db.String(20), nullable=False)
    def __repr__(self):
        return f'"{self.date}": {{"1. open": "{self.open}", "2. high": "{self.high}", "3. low": "{self.low}", "4. close": "{self.close}", "5. adjusted close": "{self.adjclose}", "6. volume": "{self.volume}", "7. dividend amout": "0.0000", "8. split coefficient": "1.0"}}'

    def getDate(self):
        return self.date
    def get_close(self):
        return self.close

    def to_json(self):
        return {"1. open": self.open, "2. high":self.high, "3. low":self.low, "4. close":self.close, "5. adjclose":self.adjclose, "6. volume":self.volume, "7. dividend amout": "0.0000", "8. split coefficient": "1.0" }

class BTC(db.Model):
    date = db.Column(db.String(20), primary_key=True)
    open = db.Column(db.String(20), nullable=False)
    high = db.Column(db.String(20), nullable=False)
    low = db.Column(db.String(20), nullable=False)
    close = db.Column(db.String(20), nullable=False)
    adjclose = db.Column(db.String(20), nullable=False)
    volume = db.Column(db.String(20), nullable=False)
    def __repr__(self):
        return f'"{self.date}": {{"1. open": "{self.open}", "2. high": "{self.high}", "3. low": "{self.low}", "4. close": "{self.close}", "5. adjusted close": "{self.adjclose}", "6. volume": "{self.volume}", "7. dividend amout": "0.0000", "8. split coefficient": "1.0"}}'

    def getDate(self):
        return self.date
    def get_close(self):
        return self.close

    def to_json(self):
        return {"1. open": self.open, "2. high":self.high, "3. low":self.low, "4. close":self.close, "5. adjclose":self.adjclose, "6. volume":self.volume, "7. dividend amout": "0.0000", "8. split coefficient": "1.0" }

class ETH(db.Model):
    date = db.Column(db.String(20), primary_key=True)
    open = db.Column(db.String(20), nullable=False)
    high = db.Column(db.String(20), nullable=False)
    low = db.Column(db.String(20), nullable=False)
    close = db.Column(db.String(20), nullable=False)
    adjclose = db.Column(db.String(20), nullable=False)
    volume = db.Column(db.String(20), nullable=False)
    def __repr__(self):
        return f'"{self.date}": {{"1. open": "{self.open}", "2. high": "{self.high}", "3. low": "{self.low}", "4. close": "{self.close}", "5. adjusted close": "{self.adjclose}", "6. volume": "{self.volume}", "7. dividend amout": "0.0000", "8. split coefficient": "1.0"}}'

    def getDate(self):
        return self.date
    def get_close(self):
        return self.close

    def to_json(self):
        return {"1. open": self.open, "2. high":self.high, "3. low":self.low, "4. close":self.close, "5. adjclose":self.adjclose, "6. volume":self.volume, "7. dividend amout": "0.0000", "8. split coefficient": "1.0" }

class GC(db.Model):
    date = db.Column(db.String(20), primary_key=True)
    open = db.Column(db.String(20), nullable=False)
    high = db.Column(db.String(20), nullable=False)
    low = db.Column(db.String(20), nullable=False)
    close = db.Column(db.String(20), nullable=False)
    adjclose = db.Column(db.String(20), nullable=False)
    volume = db.Column(db.String(20), nullable=False)
    def __repr__(self):
        return f'"{self.date}": {{"1. open": "{self.open}", "2. high": "{self.high}", "3. low": "{self.low}", "4. close": "{self.close}", "5. adjusted close": "{self.adjclose}", "6. volume": "{self.volume}", "7. dividend amout": "0.0000", "8. split coefficient": "1.0"}}'

    def getDate(self):
        return self.date
    def get_close(self):
        return self.close

    def to_json(self):
        return {"1. open": self.open, "2. high":self.high, "3. low":self.low, "4. close":self.close, "5. adjclose":self.adjclose, "6. volume":self.volume, "7. dividend amout": "0.0000", "8. split coefficient": "1.0" }

class SI(db.Model):
    date = db.Column(db.String(20), primary_key=True)
    open = db.Column(db.String(20), nullable=False)
    high = db.Column(db.String(20), nullable=False)
    low = db.Column(db.String(20), nullable=False)
    close = db.Column(db.String(20), nullable=False)
    adjclose = db.Column(db.String(20), nullable=False)
    volume = db.Column(db.String(20), nullable=False)
    
    def __repr__(self):
        return f'"{self.date}": {{"1. open": "{self.open}", "2. high": "{self.high}", "3. low": "{self.low}", "4. close": "{self.close}", "5. adjusted close": "{self.adjclose}", "6. volume": "{self.volume}", "7. dividend amout": "0.0000", "8. split coefficient": "1.0"}}'
    def getDate(self):
        return self.date
    def get_close(self):
        return self.close
    def to_json(self):
        return {"1. open": self.open, "2. high":self.high, "3. low":self.low, "4. close":self.close, "5. adjclose":self.adjclose, "6. volume":self.volume, "7. dividend amout": "0.0000", "8. split coefficient": "1.0" }


