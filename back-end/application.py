from flask import Flask, render_template
from flask import request
import pyrebase
import random
import string

app = Flask(__name__, static_folder="./../front-end/build/static", template_folder="./../front-end/build")

config = {
    "apiKey": "AIzaSyAJSlXYUqgGHpFTo0h9WQReihmGHquF-dk",
    "authDomain": "web-sandbox-007.firebaseapp.com",
    "databaseURL": "https://web-sandbox-007.firebaseio.com",
    "storageBucket": "web-sandbox-007.appspot.com"
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
        player_name = request.form['player-name']
        # num_players = reques.form['num-players']
        
        player_role = assign_role()
        roomID = get_roomID()

        db.child("rooms").child(roomID).child(player_name).set(player_role)

        return str(roomID)


@app.route("/join", methods=['GET','POST'])
def join_game():
    if request.method == 'POST':
        player_name = request.form['player-name']
        roomID = request.form['roomID']
        
        player_role = assign_role()

        db.child("rooms").child(roomID).child(player_name).set(player_role)

        return str(player_name)

@app.route("/<player_role>")
def player_screen(player_role):
    '''Serves the player page.'''

    if request.method == 'GET':
        return render_template(f'{player_role}.html')


