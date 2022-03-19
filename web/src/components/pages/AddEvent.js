import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import '../Navbar.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { myEvents } from './DB'

function AddEvent() {
  // const [button, setButton] = useState(true);
  
  let tags = [];
  const handleTags = (event) => {
    const newTag = event.target.id;
    if (tags.includes(newTag)) {
      tags = tags.filter((item) => {
        return item !== newTag
      })
    } else {
      tags.push(newTag);
    }
  }

  const handleSubmit = (event) => {
    const newEvent = {
      id: myEvents[myEvents.length - 1].id + 1,
      idOrganizer: 1,
      idArtist: null,
      idApplicants: [],
      name: event.target[0].value,
      date: new Date(event.target[1].value),
      location: event.target[2].value,
      details: event.target[3].value,
      tags: tags
    }

    // console.log(newEvent);
    event.preventDefault();
    
    myEvents.push(newEvent);
    console.log(myEvents)
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Form className='create-event-form' onSubmit={handleSubmit}>
        <h1 className='create-event-title'>Create an event</h1>
        <Form.Group controlId="formName" className='create-event-form-input' style={{ gridColumn: 1 }}>
          <Form.Label className='create-event-form-input-label'>Event name: </Form.Label>
          <Form.Control type="text" placeholder="Enter the event name" className='create-event-form-input-field' />
        </Form.Group>

        <Form.Group controlId="formDate" className='create-event-form-input'>
          <Form.Label className='create-event-form-input-label'>Event start date: </Form.Label>
          <Form.Control type="datetime-local" placeholder="Date" className='create-event-form-input-field' />
        </Form.Group>

        <Form.Group controlId="formDate" className='create-event-form-input'>
          <Form.Label className='create-event-form-input-label'>Event end date: </Form.Label>
          <Form.Control type="datetime-local" placeholder="Date" className='create-event-form-input-field' />
        </Form.Group>

        <Form.Group controlId="formLocation" className='create-event-form-input'>
          <Form.Label className='create-event-form-input-label'>Event location: </Form.Label>
          <Form.Control type="text" placeholder="Enter the event location" className='create-event-form-input-field' />
        </Form.Group>

        <Form.Group controlId="formDetails" className='create-event-form-input'>
          <Form.Label className='create-event-form-input-label'>Event details: </Form.Label>
          <Form.Control type="text" placeholder="Enter the event details" className='create-event-form-input-field' />
        </Form.Group>

        <Form.Group controlId="formDetails" className='create-event-form-input'>
          <Form.Label className='create-event-form-input-label'>Event image: </Form.Label>
          <Form.Control type="file" accept="image/*" placeholder="Enter the event details" className='create-event-form-input-field' />
        </Form.Group>

        <Form.Group controlId="formTags" className='create-event-form-input'>
          <Form.Check inline label="DJ" name="group-tag" type="checkbox" id="DJ" className='create-event-form-checkbox' onChange={handleTags} />
          <Form.Check inline label="Photographer" name="group-tag" type="checkbox" id="Photographer" className='create-event-form-checkbox' onChange={handleTags} />
          <Form.Check inline label="Music Band" name="group-tag" type="checkbox" id="Music Band" className='create-event-form-checkbox' onChange={handleTags} />
          <Form.Check inline label="Singer" name="group-tag" type="checkbox" id="Singer" className='create-event-form-checkbox' onChange={handleTags} />
          <Form.Check inline label="Dancer" name="group-tag" type="checkbox" id="Dancer" className='create-event-form-checkbox' onChange={handleTags} />
          <Form.Check inline label="Face painter" name="group-tag" type="checkbox" id="Face painter" className='create-event-form-checkbox' onChange={handleTags} />
          <Form.Check inline label="Others" name="group-tag" type="checkbox" id="Others" className='create-event-form-checkbox' onChange={handleTags} />
        </Form.Group>

        <Button variant="primary" type="submit" className='create-event-form-input-submit-button'>
          Create event
        </Button>
      </Form>
    </div>
  );
}
  
export default AddEvent;