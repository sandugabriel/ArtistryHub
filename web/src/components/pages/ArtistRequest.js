import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import '../Navbar.css';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router';
import { myEvents, allArtists } from './DB'


export default function ArtistRequest() {
  const { id } = useParams();
  const artist = allArtists[id];
  const listEvents = myEvents.map((ev) =>
    <option value={ev.name}>
      {ev.name}
    </option>
  );
  return (
    <>
      <div className='artists-list' style={{boxShadow: 'none'}}>
        <Card style={{ width: '18rem' }} className='artist-item'>
          <Card.Img variant="top" src="/images/img-2.jpg" style={{ width: '100%' }}/>
          <Card.Body className='artist-item-card'>
            <Card.Title className='artist-item-name'>
              {artist.name}
            </Card.Title>
            <Card.Text className='artist-item-type'>
              {artist.type}
            </Card.Text>
            <Card.Text className='artist-item-skills'>
              {artist.skills}
            </Card.Text>
            <Card.Text className='artist-item-description'>
              {artist.description}
            </Card.Text>

            <label for="choose-event"></label>
            <select name="choose-event">
              {listEvents}
            </select>

            <Button className='artist-item-accept-button' variant="success"><Link to={'/organizer/home'} className='artist-item-details-link'>Request Artist</Link></Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );

}