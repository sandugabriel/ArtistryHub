import React from 'react';
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import {Button} from '../Button'
// import TextField from "material-ui/TextField";
import TextField from "@material-ui/core/TextField";
import '../../App.css';
import { db } from '../..';
import { Link } from 'react-router-dom';


let formData = new FormData(); 

function handleSignup(event) {
  // event.preventDefault();

  // console.log("handle signup!!");

  // console.log(db.collection('artist')
  //   .get()
  //   .then(function(querySnapshot) {
  //       querySnapshot.forEach(function(doc) {
  //           // doc.data() is never undefined for query doc snapshots
  //           console.log(doc.id, " => ", doc.data());
  //       });
  //   })
  //   .catch(function(error) {
  //       console.log("Error getting documents: ", error);
  //   }));
};

const SignUpForm = ({
  history,
  onSubmit,
  onChange,
  errors,
  user,
  score,
  btnTxt,
  type,
  pwMask,
  onPwChange
}) => {
  console.log(errors);
  return (
    <div className="loginBox">
      {/* {errors.message && <p style={{ color: "red" }}>{errors.message}</p>} */}
      <h1>Sign Up</h1>
     {/* <br></br>
      <br></br>
      <br></br>
      Start errori
      <br></br>
      {errors.message && <p>Salut</p>}
      <br></br>
      End errori
      <br></br> */}

      <form onSubmit={onSubmit}>
        <TextField
          name="username"
          label="user name"
          value={user.username}
          onChange={onChange}
          errorText={errors.username}
        />
        
        <br />
        <TextField
          name="email"
          label="email"
          value={user.email}
          onChange={onChange}
          errorText={errors.email}
        />
        <br />

        <TextField
          type={type}
          name="password"
          label="password"
          value={user.password}
          onChange={onPwChange}
          errorText={errors.password}
        />

        <div className="pwStrRow">
          {score >= 1 && (
            <div>
              {/* <PasswordStr score={score} />  */}
              <Button 
                className="pwShowHideBtn" 
                label={btnTxt} onClick={pwMask} 
                style={{position: 'relative', left: '50%', transform: 'translateX(-50%)'}} 
              />
            </div>
            )} 
        </div>
        <TextField
          type={type}
          name="pwconfirm"
          label="confirm password"
          value={user.pwconfirm}
          onChange={onChange}
          errorText={errors.pwconfirm}
        />
        <br />
        <Button
          buttonStyle='btn--signup2'
          primary={true}
          type="submit"
          label="submit"
          onClick={handleSignup}
        >Sign Up</Button>
      </form>
      {/* {currUser = user}; */}
      <p>
        Aleady have an account? <br />
        <a href="/sign-in">Log in here</a>
      </p>
    </div>
  );
};
export default SignUpForm;
