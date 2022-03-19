import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import '../Navbar.css';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { myEvents } from './DB'

function Events() {
  // const [button, setButton] = useState(true);
  const listEvents = myEvents.map((ev) => 
    <li key={ev.id} className='event-item'>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="/images/img-2.jpg" style={{ width: '100%' }}/>
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
          <Button className='event-item-button' variant="primary"><Link to={'/organizer/events/' + ev.id} className='event-item-details-link'>Details</Link></Button>
        </Card.Body>
      </Card>
    </li>);

  return (
    <>
      <ul className='events-list'>
        {listEvents}
      </ul>
    </>
  );
}
  
export default Events;