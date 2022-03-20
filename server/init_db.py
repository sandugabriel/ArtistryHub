import os 
import psycopg2


conn = psycopg2.connect(
        host="localhost",
        database="flask_db",
        user='admin',
        password='admin')

cur = conn.cursor()

cur.execute('DROP TABLE IF EXISTS artists')
cur.execute('CREATE TABLE artists (id serial PRIMARY KEY,'
                                 'first_name varchar (150) NOT NULL,'
                                 'last_name varchar (100) NOT NULL,'
                                 'username varchar (100) NOT NULL,'
                                 'email varchar (100) NOT NULL,'
                                 'password varchar (100) NOT NULL,'
                                 'profile_picture bytea,'
                                 'location varchar (100) NOT NULL,'
                                 'artist_type varchar (100) NOT NULL,'
                                 'booked_events_ids varchar(500),'
                                 'pending_events_ids varchar(500),'
                                 'date_added date DEFAULT CURRENT_TIMESTAMP);'
                                 )

cur.execute('DROP TABLE IF EXISTS organizers')
cur.execute('CREATE TABLE organizers (id serial PRIMARY KEY,'
                                 'first_name varchar (150) NOT NULL,'
                                 'last_name varchar (100) NOT NULL,'
                                 'username varchar (100) NOT NULL,'
                                 'email varchar (100) NOT NULL,'
                                 'password varchar (100) NOT NULL,'
                                 'events_ids varchar (500),'
                                 'date_added date DEFAULT CURRENT_TIMESTAMP);'
                                 )

cur.execute('DROP TABLE IF EXISTS events;')
cur.execute('CREATE TABLE events (id serial PRIMARY KEY,'
                                 'title varchar (150) NOT NULL,'
                                 'organizer_id integer NOT NULL,'
                                 'location varchar (100) NOT NULL,'
                                 'artist_type varchar (100) NOT NULL,'
                                 'description varchar (500) NOT NULL,'
                                 'media bytea NOT NULL,'
                                 'start_date TIMESTAMP NOT NULL,'
                                 'end_date TIMESTAMP NOT NULL,'
                                 'applicants varchar (500),'
                                 'accepted_aplicants varchar (500),'
                                 'date_added date DEFAULT CURRENT_TIMESTAMP);'
                                 )

# dev
# cur.execute("COPY artists(id, first_name, last_name, username, email, password, location, artist_type) FROM '/Users/gsandu/Downloads/MOCK_DATA.csv DELIMITER ', CSV HEADER;")
# cur.execute("COPY organizers(id, first_name, last_name, username, email, password) FROM '/Users/gsandu/Downloads/buyers.csv DELIMITER ', CSV HEADER;")

conn.commit()

cur.close()
conn.close()