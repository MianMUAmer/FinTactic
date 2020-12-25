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
        return {"date": self.date, "open": self.open, "high":self.high, "low":self.low, "close":self.close, "adjclose":self.adjclose, "volume":self.volume}