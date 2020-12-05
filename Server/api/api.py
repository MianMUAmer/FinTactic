from flask import Flask, jsonify, abort, request, jsonify
import time

app = Flask(__name__)

@app.route("/")
def hello():
  return "it is workin"

@app.route("/time")
def getTime():
  return {'time' : time.time()}

@app.route('/api/register', methods = ['POST'])
def new_user():
    username = request.json.get('username')
    password = request.json.get('password')
    if username is None or password is None:
        abort(400) # missing arguments
    # --- To check if the user is already in the DB ---
    # if User.query.filter_by(username = username).first() is not None:
    #     abort(400) # existing user

    return (jsonify({ 'username': username, 'password': password }), 201)

if __name__ == "__main__":
  app.run()