import os
import profile
import psycopg2
from flask import Flask, render_template
from flask import request
import sys
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

@app.route('/test')
def test():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT id, username FROM artists;')
    # cur.execute('')
    users = cur.fetchall()
    cur.close()
    conn.close()
    return convert_to_json(users, ['id', 'username'])

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

@app.route('/createevent', methods = ['GET','POST'])
def create_event():
    title = request.args.get("title")
    organizer_id = request.args.get("organizer_id")
    artist_type = request.args.get("artist_type")
    description = request.args.get("description")
    location = request.args.get("location")
    start_date = request.args.get("start_date")
    end_date = request.args.get("end_date")
    f = request.files['file'].read()
    f = psycopg2.Binary(f)
    out = ['']

    try:
        conn = get_db_connection()
        cur = conn.cursor()
        print(f'''INSERT INTO events(title, organizer_id, location, artist_type, description, media, start_date, end_date) VALUES ('{title}', '{organizer_id}', '{location}', '{description}', {f}, {start_date}, {end_date});''')
        cur.execute(f'''INSERT INTO events(title, organizer_id, location, artist_type, description, media, start_date, end_date) VALUES ('{title}', '{organizer_id}', '{location}', '{artist_type}' , '{description}', {f}, '{start_date}', '{end_date}') RETURNING id;''')
        out = cur.fetchall()
        conn.commit()
        cur.close()
        conn.close()
        
    except Exception as e:
        print(e)

    return str(out[0])
    

@app.route('/createartist', methods = ['GET', 'POST'])
def create_artist():
    first_name = request.args.get("first_name")
    last_name = request.args.get("last_name")
    username = request.args.get("username")
    email = request.args.get("email")
    # profile_picture = request.files['file'].read()
    # profile_picture = psycopg2.Binary(profile_picture)
    password = request.args.get("password")
    location = request.args.get("location")
    artist_type = request.args.get("artist_type")
    phrase = f'''INSERT INTO artists (first_name, last_name, username, email, password, location, artist_type) VALUES ('{first_name}' ,  '{last_name}', '{username}' , '{email}' , '{password}' ,  '{location}'  ,'{artist_type}') RETURNING id;'''
    print(phrase)
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(phrase)
        # print('muie LA CACAU', file=sys.stderr)
        out = cur.fetchall()
        print(out)
        conn.commit()
        cur.close()
        conn.close()
    except Exception as e:
        print(e)
        return "false"
    return str(out[0])

@app.route('/createorganizer', methods = ['GET', 'POST'])
def create_organizer():
    first_name = request.args.get("first_name")
    last_name = request.args.get("last_name")
    username = request.args.get("username")
    email = request.args.get("email")
    password = request.args.get("password")

    phrase = f'''INSERT INTO organizers (first_name, last_name, username, email, password) VALUES ('{first_name}' ,  '{last_name}', '{username}' , '{email}' , '{password}') RETURNING id;'''

    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(phrase)
        out = cur.fetchall()
        print(out)
        conn.commit()
        cur.close()
        conn.close()
    except:
        return "false"
    return str(out[0])

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

@app.route('/validateloginartist', methods = ['GET', 'POST'])
def validate_login_artist():
    email = request.args.get("email");
    password = request.args.get("password")
    phrase = f"SELECT id, username FROM artists WHERE email='{email}' AND password='{password}'"
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(phrase)
    events = cur.fetchall()
    if len(events) < 1:
        is_logged_in = 'false'
    else:
        is_logged_in  = 'true'

    return is_logged_in


@app.route('/validateloginorganizer', methods = ['GET', 'POST'])
def validate_login_organizers():
    email = request.args.get("email");
    password = request.args.get("password")
    phrase = f"SELECT id, username FROM organizers WHERE email='{email}' AND password='{password}'"
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(phrase)
    events = cur.fetchall()
    if len(events) < 1:
        is_logged_in = 'false'
    else:
        is_logged_in  = 'true'

    return is_logged_in

app.run(port = 4996)