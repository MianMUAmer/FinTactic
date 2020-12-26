from flaskblog import db, login_manager
from datetime import datetime
from flask_login import UserMixin

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image_file = db.Column(db.String(20), nullable=False, default='default.jpeg')
    password = db.Column(db.String(60), nullable=False)

    def __repr__(self):
        return f"User('{self.email}', '{self.image_file}')"

    def to_json(self):        
        return {"email": self.email, "image":self.image_file}

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

    def to_json(self):
        return {"1. open": self.open, "2. high":self.high, "3. low":self.low, "4. close":self.close, "5. adjclose":self.adjclose, "6. volume":self.volume, "7. dividend amout": "0.0000", "8. split coefficient": "1.0" }
