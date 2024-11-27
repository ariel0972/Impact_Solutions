import os
import time
from flask import Flask
from flask import request, Response
from flask import jsonify, json
import json # OH TERRYDAVIS PLEASE FORGIVE ME
app = Flask(__name__)

import random

def open_DB():
    x = open("db.json","r").read()
    x = json.loads(x)
    return x

def save_DB(x):
    x = json.dumps(x)
    open("db.json","w").write(x)

def generateRandom(N: int):
    o = []
    for _ in range(N):
        p = random.randint(ord("a"),ord("z"))
        o.append(chr(p))
    return "".join(o)

def GetUserByToken(token:str):
    x = open("db.json","r").read()
    x = json.loads(x)
    for i,u in enumerate(x["users"]): # may terry davis have mercy of this
        # time.sleep(random.random() / 2) # solution for side channel attack
        if u["token"] != token:
            continue
        # token = generateRandom(10)
        # x["users"][i]["token"] = token
        # return {"token":token, "userType":x["users"][i]["userType"]}
        return u
    return None

def GetUserById(user_id:str):
    x = open_DB()
    for i,u in enumerate(x["users"]): # may terry davis have mercy of this
        # time.sleep(random.random() / 2) # solution for side channel attack
        if u["id"] != user_id:
            continue
        return u
    return None


# @app.post('/app/userSignIn')

@app.post('/app/SignIn')
def UserSignin():# this is so bad that if multiple requests to sigin the DB will just get fucked
    req = request.json
    req["user"]
    req["password"]

    req["type"]

    x = open("db.json","r").read()
    x = json.loads(x)
    token = generateRandom(10)
    id_user = generateRandom(10)

    for u in x["users"]:
        if u["user"] == req["user"]:
            return Response(status=401)
    x["users"].append({"id": id_user, "user":req["user"], "password":req["password"], "token":token, "userType":req["type"]})
    open("db.json","w").write(json.dumps(x))
    return {"token":token, "userType":req["type"]}


@app.post('/app/Login')
def Login():
    req = request.json
    req["user"]
    req["password"]
    x = open("db.json","r").read()
    x = json.loads(x)
    for i,u in enumerate(x["users"]): # may terry davis have mercy of this
        # time.sleep(random.random() / 2) # solution for side channel attack
        if u["user"] != req["user"]:
            continue
        if u["password"] != req["password"]:
            continue
        token = generateRandom(10)
        x["users"][i]["token"] = token
        return {"token":token, "userType":x["users"][i]["userType"]}

    return Response(status=401)


@app.post('/app/CreateCampaigns')
def create_campaigns():# I'm tired
    req = request.json
    req["userToken"]
    req["name"]
    req["description"]
    user = GetUserByToken(req["userToken"])
    if not user:
        return Response("not found", 401)
    # if user["userType"] != 1: #architect
    #     return Response("not architet", 401)
    x = open("db.json","r").read()
    x = json.loads(x)
    campaign_id = generateRandom(5) # why id is random? lie: non sequetial id is more secure. reality: function is already there, why not? i'm tire
    x["campaigns"].append({"id": campaign_id,
                           "userToken":req["userToken"], "name": req["name"], "description":req["description"], "subscriptions":[]})
    open("db.json","w").write(json.dumps(x))
    return jsonify(campaign_id=campaign_id)

def root_dir():  # pragma: no cover
    return os.path.abspath("/BEREBEL/front/")


def get_file(filename):  # pragma: no cover
    try:
        src = os.path.join(root_dir(), filename)
        # Figure out how flask returns static files
        # Tried:
        # - render_template
        # - send_file
        # This should not be so non-obvious
        return open(src,"rb").read()

    except IOError as exc:
        return str(exc)


@app.route('/', defaults={'path': ''})
@app.route('/front-end/<path:path>')

def get_resource(path):  # pragma: no cover
    mimetypes = {
        ".css": "text/css",
        ".html": "text/html",
        ".js": "application/javascript",
        ".png": "image/png",
        ".svg": "image/svg+xml",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
    }
    complete_path = os.path.join(root_dir(), path)
    ext = os.path.splitext(path)[1]
    print(ext)
    mimetype = mimetypes.get(ext, "text/html")
    print(mimetype)
    content = get_file(complete_path)
    return Response(content, mimetype=mimetype)

@app.post('/app/DeleteEvent')
def DeleteEvents():
    req = request.json
    campaign_id = req["CampaignId"]
    user_token = req["userToken"]


@app.post('/app/CreateEvents')
def CreateEvents():
    req = request.json
    campaign_id = req["CampaignId"]
    user_token = req["userToken"]
    date = req["date"]
    name = req["name"]
    local = req["local"]
    description = req["description"]
    user = GetUserByToken(req["userToken"])
    if not user:
        return 
    x = open("db.json","r").read()
    x = json.loads(x)
    if not any(True for c in x["campaigns"] if c["id"] == campaign_id):
        return
    token = generateRandom(10)
    x["Events"].append({"id": token,
                        "CampaignId":req["CampaignId"],
                       "userToken":req["userToken"],
                       "date": req["date"],
                       "name": req["name"],
                       "local": req["local"],
                       "description": req["description"],
                       "subscriptions": []})
    open("db.json","w").write(json.dumps(x))

    return token


@app.post('/app/SubscribeCampaign')
def SubscribeCampaign():
    req = request.json
    userToken = req["userToken"]
    campaing = req["Id"]

    user = GetUserByToken(userToken)
    if not user:
        return
    if user["userType"] != 0: #architect
        return
    db = open_DB()
    for i, c in enumerate(db["campaigns"]):
        if c["id"] != campaing:
            continue
        if user["id"] in db["campaigns"][i]["subscriptions"]:
            db["campaigns"][i]["subscriptions"].remove(user["id"])
            break
        db["campaigns"][i]["subscriptions"].append(user["id"])
        break

    save_DB(db)

@app.post('/app/UnSubscribeCampaign')
def UnSubscribeCampaign():
    req = request.json
    userToken = req["userToken"]
    campaing = req["campaignId"]
    user = GetUserByToken(userToken)
    if not user:
        return
    if user["userType"] != 0: #architect
        return
    db = open_DB()
    for i, c in enumerate(db["campaigns"]):
        if c["id"] != campaing:
            continue
        if user["id"] not in db["campaigns"][i]["subscriptions"]:
            return
        db["campaigns"][i]["subscriptions"].remove(user["id"])
    save_DB(db)

@app.post('/app/ApplyEvent')
def ApplyEvent():
    req = request.json
    userToken = req["userToken"]
    campaing = req["Id"]
    user = GetUserByToken(userToken)
    if not user:
        return
    if user["userType"] != 0: #architect
        return
    db = open_DB()
    for i, c in enumerate(db["Events"]):
        if c["id"] != campaing:
            continue
        if user["id"] in db["Events"][i]["subscriptions"]:
            print("removed")
            db["Events"][i]["subscriptions"].remove(user["id"])
            break
        db["Events"][i]["subscriptions"].append(user["id"])
        break

    save_DB(db)

@app.post('/app/UnApplyEvent')
def UnApplyEvent():
    req = request.json
    userToken = req["userToken"]
    campaing = req["EventId"]
    user = GetUserByToken(userToken)
    if not user:
        return
    if user["userType"] != 0: #architect
        return
    db = open_DB()
    for i, c in enumerate(db["Events"]):
        if c["id"] != campaing:
            continue
        if user["id"] not in db["Events"][i]["subscriptions"]:
            return
        db["Events"][i]["subscriptions"].remove(user["id"])
    save_DB(db)
    


@app.post('/app/GetUserInfo')
def GetUserToken():
    req = request.json
    userToken = req["userToken"]
    return GetUserByToken(userToken)

@app.post("/app/getCampaings")
def getCampaings():
    req = request.json
    userToken = req["userToken"]
    user = GetUserByToken(userToken)
    db = open_DB()
    print (db["campaigns"])
    return [{"name":c["name"],
      "id":c["id"],
      "description":c["description"],
      "isSubscribed":user["id"] in c["subscriptions"]
      }
        for c in db["campaigns"]]



@app.post("/app/getCampaignUsers")
def getCampaingsUsers():
    req = request.json
    userToken = req["userToken"]
    Campaign = req["Campaign"]
    user = GetUserByToken(userToken)
    
    db = open_DB()
    for c in db["campaigns"]:
        if c["id"] != Campaign:
            continue
        return [ GetUserById(u) for u in c["subscriptions"]]

@app.post("/app/getEventUsers")
def getEventUsers():
    req = request.json
    userToken = req["userToken"]
    Campaign = req["Event"]
    user = GetUserByToken(userToken)
    
    db = open_DB()
    for c in db["Events"]:
        if c["id"] != Campaign:
            continue
        return [ GetUserById(u) for u in c["subscriptions"]]



@app.post("/app/getEvents")
def getCampasssings():
    req = request.json
    userToken = req["userToken"]
    user = GetUserByToken(userToken)
    db = open_DB()
    return [{"name":c["name"],
      "id":c["id"],
      "description":c["description"],
      "date":c["date"],
      "local":c["local"],
      "isSubscribed":user["id"] in c["subscriptions"]
      }
        for c in db["Events"]]
    
app.run("0.0.0.0", port=9090, debug=False)