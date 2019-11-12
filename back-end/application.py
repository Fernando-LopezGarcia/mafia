from flask import Flask, render_template
from flask import request
import pyrebase
import random
import string
from flask_cors import CORS
import sys

app = Flask(__name__, static_folder="./../front-end/build/static", template_folder="./../front-end/build")
CORS(app)

config = {
    "apiKey": "AIzaSyBeYE_UDmmz-k3_EuQJu2y5MQab4J2-13E",
    "authDomain": "spicy-mafia.firebaseapp.com",
    "databaseURL": "https://spicy-mafia.firebaseio.com",
    "storageBucket": "spicy-mafia.appspot.com"
  }

firebase = pyrebase.initialize_app(config)
db = firebase.database()

@app.route("/")
def home():
    '''Serves the home page.'''
    return render_template('index.html')

def assign_role():
    '''Assign roles randomly.'''

    available_roles = db.child("roles").get().val()

    return random.choice(available_roles)

def get_roomID():
    ''' Generates a room ID randomly.'''
    
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))


@app.route('/create', methods=['GET','POST'])
def create_game():
    if request.method == 'POST':
        player_name = request.json['playername']
        # num_players = reques.form['numplayers']

        #print(player_name, file=sys.stderr)
        #print('HERE', file=sys.stderr)
        
        player_role = assign_role()
        roomID = get_roomID()

        #print('HERE3', file=sys.stderr)
        db.child("rooms").child(roomID).child(player_name).set(player_role)

        return str(roomID)


@app.route("/join", methods=['GET','POST'])
def join_game():
    if request.method == 'POST':
        player_name = request.json['playername']
        roomID = request.json['roomID']
        
        player_role = assign_role()

        db.child("rooms").child(roomID).child(player_name).set(player_role)

        return str(player_name)

@app.route("/<player_role>")
def player_screen(player_role):
    '''Serves the player page.'''

    if request.method == 'GET':
        return render_template(f'{player_role}.html')


