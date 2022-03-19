import os
import profile
import psycopg2
from flask import Flask, render_template
from flask import request
from utils import convert_to_json


app = Flask(__name__)
app.debug=True

def get_db_connection():
    conn = psycopg2.connect(host='localhost',
                            database='flask_db',
                            user='admin',
                            password='admin')
    return conn

@app.route('/')
def index():
    return '<h1>Salut</h1>'

@app.route('/getallevents', methods = ['GET','POST'])
def get_all_events():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM events;')
    # cur.execute('')
    users = cur.fetchall()
    cur.close()
    conn.close()
    return convert_to_json(users)

@app.route('/createevent', methods = ['POST'])
def create_event():
    title = request.args.get("title")
    organizer_id = request.args.get("organizer_id")
    location = request.args.get("artist_type")
    description = request.args.get("description")
    start_date = request.args.get("start_date")
    end_date = request.args.get("start_date")
    f = request.files['file'].read()

    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(f'INSERT INTO events(title, organizer_id, location, artist_type, description, media, start_date, end_date) VALUES ({title}, {organizer_id}, {location}, {description}, {f}, {start_date}, {end_date});')
        out = cur.fetchall()
    except:
        return 'false'
    
    return str(out)

@app.route('/insertartist', methods = ['POST'])
def insert_artist():
    first_name = request.args.get("first_name")
    last_name = request.args.get("last_name")
    username = request.args.get("username")
    email = request.args.get("email")
    profile_picture = request.files['file'].read()
    password = request.args.get("password")
    location = request.args.get("location")
    artist_type = request.args.get("artist_type")
    phrase = "INSERT INTO artists (first_name, last_name, username, email, password, location, artist_type, profile_picture) VALUES "
    phrase += first_name + "," + last_name + "," + username + "," + email + "," + password + "," + location + ","
    phrase += artist_type + profile_picture +";"
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(phrase)
        out = cur.fetchall()
        cur.close()
        conn.close()
    except:
        return "false"
    return str(out)

@app.route('/selecteventsfororg', methods = ['GET', 'POST'])
def select_events_for_org():
    conn = get_db_connection()
    cur = conn.cursor()
    org_id = request.args.get("organizer_id")
    cur.execute(f'SELECT * FROM events WHERE organizer_id={org_id}')
    returned_events = cur.fetchall()
    cur.close()
    conn.close()
    return convert_to_json(returned_events)

@app.route('/selectbookedeventsforartist', methods = ['GET', 'POST'])
def select_booked_events_for_artist():
    json_names = ['title', 'organizer_id', 'location', 'artist_type', 
    'media', 'start_date', 'end_date', 'applicants', 'accepted_aplicants']
    str_names = ",".join(json_names)

    conn = get_db_connection()
    cur = conn.cursor()
    artist_id = request.args.get("artist_id")
    cur.execute(f'SELECT booked_events_ids FROM artists WHERE id={artist_id}')
    returned_events = cur.fetchall()[0].split(',')
    booked_events = []
    for event in returned_events:
        cur.execute(f'SELECT * FROM events WHERE id={event}')
        e = cur.fetchall()
        booked_events.append(e[0])
    
    cur.close()
    conn.close()
    return convert_to_json(booked_events)

@app.route('/selectpendingeventsforartists')
def select_pending_events_for_artists():
    json_names = ['title', 'organizer_id', 'location', 'artist_type', 'description', 
    'media', 'start_date', 'end_date']
    str_names = ",".join(json_names)
    artist_id = request.args.get("artist_id")
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(f'SELECT pending_events_ids FROM artists WHERE id={artist_id}')
        events = cur.fetchall()[0].split(',')
        pending_events = []
        for event in events:
            cur.execute(f'SELECT {str_names} FROM events WHERE id={event}')
            e = cur.fetchall()
            pending_events.append(e[0])

        cur.close()
        conn.close()
    except:
        return 'false'
    return convert_to_json(pending_events, json_names)

@app.route('/selecteventapplicants', methods = ['GET', 'POST'])
def selecteventapplicants():
    json_names = ['title', 'organizer_id', 'location', 'artist_type', 'description', 
    'media', 'start_date', 'end_date']
    str_names = ",".join(json_names)
    id = request.args.get("id")
    phrase = "SELECT applicants FROM events WHERE id=" + id + ";"
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(phrase)
        events = cur.fetchall()[0].split(',')
        events_appl = []
        for event in events:
            cur.execute(f'SELECT {str_names} FROM events WHERE id={event}')
            e = cur.fetchall()
            events_appl.append(e[0])

        cur.close()
        conn.close()
    except:
        return "false"
    return convert_to_json(events_appl, json_names)

app.run(port = 4996)