import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn';
import Footer from './components/Footer';
import ArtistHome from './components/pages/ArtistHome';
import ArtistSignUp from './components/pages/ArtistSignUp';
import OrganizerHome from './components/pages/OrganizerHome';
import OrganizerSignUp from './components/pages/OrganizerSignUp';
import LogIn from './components/pages/LogIn';
import Events from './components/pages/Events';
import EventDetails from './components/pages/EventDetails';
import AddEvent from './components/pages/AddEvent';
import ArtistApplicant from './components/pages/ArtistApplicant'
import ArtistRequest from './components/pages/ArtistRequest'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route path="/services"><Services /></Route>
          <Route path="/products"><Products /></Route> 
          <Route path="/sign-up"><SignUp /></Route>
          <Route path="/sign-in"><LogIn /></Route>
          <Route exact path="/artist/home"><ArtistHome /></Route>
          <Route exact path="/artist/home/applicant/:id"><ArtistApplicant /></Route>
          <Route exact path="/artist/home/request/:id"><ArtistRequest /></Route>
          <Route exact path="/artist/sign-up"><ArtistSignUp /></Route>
          <Route exact path="/organizer/home"><OrganizerHome /></Route>
          <Route exact path="/organizer/sign-up"><OrganizerSignUp /></Route>
          <Route exact path="/organizer/events"><Events /></Route>
          <Route exact path="/organizer/events/add"><AddEvent /></Route>
          <Route exact path="/organizer/events/:id"><EventDetails /></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;