import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import '../Navbar.css';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router';
import { allArtists } from './DB'


export default function ArtistApplicant() {
  const { id } = useParams();
  const artist = allArtists[id];

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
            <Button className='artist-item-accept-button' variant="success"><Link to={'/organizer/events'} className='artist-item-details-link'>Accept</Link></Button>
            <Button className='artist-item-decline-button' variant="warning"><Link to={'/organizer/events'} className='artist-item-details-link'>Decline</Link></Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );

}