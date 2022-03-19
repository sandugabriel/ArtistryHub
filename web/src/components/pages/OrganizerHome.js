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

export default function OrganizerHome() {
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
            {artist.skills.map((skill) => <li key={skill} style={{display: 'inline-block'}}>{skill + ','}</li>)}
          </Card.Text>
          <Card.Text className='artist-item-description'>
            {artist.description}
          </Card.Text>
          <Button className='artist-item-button' variant="primary"><Link to={'/artist/home/request/' + artist.id} className='artist-item-details-link'>Details</Link></Button>
        </Card.Body>
      </Card>
    </li>);

  return (
    <>
      <div className='filters'>
        <div className='filter-container'>
          <label for="artist-type">Artist type</label>
          <select name="artist-type">
            <option value="dj">DJ</option>
            <option value="photographer">Photographer</option>
            <option value="music-band">Music Band</option>
            <option value="singer">Singer</option>
            <option value="dancer">Dancer</option>
            <option value="face-painter">Face painter</option>
          </select>
        </div>

        <div className='filter-container'>
          <label for="location">Location</label>
          <select name="location">
            <option value="bucharest">Bucharest</option>
            <option value="brasov">Brasov</option>
            <option value="cluj">Cluj</option>
            <option value="timisoara">Timisoara</option>
            <option value="craiova">Craiova</option>
            <option value="pitesti">Pitesti</option>
          </select>
        </div>

        <div className='filter-container'>
          <label for="artist-type">Filter 1</label>
          <select name="artist-type">
            <option value="option-1">Option 1</option>
            <option value="option-2">Option 2</option>
            <option value="option-3">Option 3</option>
          </select>
        </div>

        <div className='filter-container'>
          <label for="artist-type">Filter 2</label>
          <select name="artist-type">
            <option value="option-1">Option 1</option>
            <option value="option-2">Option 2</option>
            <option value="option-3">Option 3</option>
          </select>
        </div>

        <div className='filter-container'>
          <label for="artist-type">Filter 3</label>
          <select name="artist-type">
            <option value="option-1">Option 1</option>
            <option value="option-2">Option 2</option>
            <option value="option-3">Option 3</option>
          </select>
        </div>

        <div className='filter-container'>
          <label for="artist-type">Filter 4</label>
          <select name="artist-type">
            <option value="option-1">Option 1</option>
            <option value="option-2">Option 2</option>
            <option value="option-3">Option 3</option>
          </select>
        </div>

        <Button className='apply-filters-button filter-container' variant="primary">Apply filters</Button>

      </div>
      
      <ul className='artists-list' style={{boxShadow: 'none'}}>
        {listArtists}
      </ul>;
    </>
  );
}