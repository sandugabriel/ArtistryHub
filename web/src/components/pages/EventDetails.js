import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import '../Navbar.css';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router';
import { myEvents } from './DB'
import { allArtists } from './DB'

function EventDetails() {
  const { id } = useParams();
  const ev = myEvents[id];
  const listArtists = allArtists.map((artist) => 
    <li key={artist.id} className='artist-applicant'>
      <img src="/images/profile-pic-icon.png" className="artist-profile-photo" />
      <div className='artist-applicant-name'>{artist.name}</div>
      <div className='artist-applicant-type'>{artist.type}</div>
      <Button className='artist-applicant-button' variant="primary"><Link to={'/artist/home/applicant/' + artist.id} className='artist-item-details-link'>Details</Link></Button>
      {/* <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="/images/img-2.jpg" style={{ width: '100%' }}/>
        <Card.Body className='artist-item-card'>
          <Card.Title className='artist-item-name'>
            {artist.name}
          </Card.Title>
          <Card.Text className='artist-item-type'>
            {artist.type}
          </Card.Text>
          <Card.Text className='artist-item-skills'>
            {artist.skills.map((skill) => <li key={skill} style={{display: 'inline-block'}}>{skill + ','}</li>)}
          </Card.Text>
          <Card.Text className='artist-item-description'>
            {artist.description}
          </Card.Text>
          <Button className='artist-item-button' variant="primary"><Link to={'/artist/home/applicant/' + artist.id} className='artist-item-details-link'>Details</Link></Button>
        </Card.Body>
      </Card> */}
    </li>);

  return (
    <>
      <div className='organizer-and-applicants-container'>
        <Card style={{ width: '18rem' }} className='event-item-details-container' style={{ height: '80vh', maxWidth: '100vh' }}>
          <Card.Img variant="top" src="/images/party.jpg" style={{ width: '50%' }}/>
          <Card.Body className='event-item-card'>
            <Card.Title className='event-item-title'>
              {ev.name}
            </Card.Title>
            <Card.Text className='event-item-location'>
              {ev.location}
            </Card.Text>
            <Card.Text className='event-item-date'>
              {ev.date.toDateString()}
            </Card.Text>
            <Card.Text className='event-item-details'>
              {ev.details}
            </Card.Text>
          </Card.Body>
        </Card>
        {/* <Button variant="primary"><Link to={'.artists-applicants-list'}>View Applicants</Link></Button> */}
        <a href='#artists-applicants-list' id='view-applicants-button'>View Applicants</a>
        <ul id='artists-applicants-list' className='artists-applicants-list'>
          {listArtists}
        </ul>
      </div>
    </>
  );
}
    
export default EventDetails;