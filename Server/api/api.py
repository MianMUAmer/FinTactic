from flask import Flask
import time

app = Flask(__name__)

@app.route("/")
def hello():
  return "it is workin"

@app.route("/time")
def getTime():
  return {'time' : time.time()}

if __name__ == "__main__":
  app.run()