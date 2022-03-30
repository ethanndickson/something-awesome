from flask import Flask, request

app = flask(__name__)

@app.route("/add/cookies", methods=['POST'])
def addCookies():
    pass


@app.route("/add/fields",methods=['POST'])
def addFields():
    pass

@app.route("/add/keystrokes",methods=['POST'])
def addKeystrokes():
    pass