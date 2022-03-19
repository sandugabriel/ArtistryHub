import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/compat/app';
import firestore from 'firebase/compat/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyB64HZYz-5c9bXiQubbHXb8BCfvwqzxYRY",
  authDomain: "artistryhub-b4e1f.firebaseapp.com",
  projectId: "artistryhub-b4e1f",
  storageBucket: "artistryhub-b4e1f.appspot.com",
  messagingSenderId: "981848607198",
  appId: "1:981848607198:web:07dacd2c5220a7f784754f",
  measurementId: "G-H4EDYF95G8"
});

export const db = firebase.firestore()

ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
