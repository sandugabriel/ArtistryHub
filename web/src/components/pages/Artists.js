import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import '../Navbar.css';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Artists() {
  // const [button, setButton] = useState(true);
  const listArtists = allArtists.map((artist) => 
    <li key={artist.id} className='artist-item'>
      <Card style={{ width: '18rem' }}>
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
          <Button className='artist-item-button' variant="primary"><Link to={'/artist/home/applicant/' + artist.id} className='artist-item-details-link'>Details</Link></Button>
        </Card.Body>
      </Card>
    </li>);

  return (
    <>
      <ul className='artists-list'>
        {listArtists}
      </ul>
    </>
  );
}
  
export { Artists, allArtists };