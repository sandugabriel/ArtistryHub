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

const SignInForm = ({
  history,
  onSubmit,
  onChange,
  errors,
  user,
  score,
  btnTxt,
  type,
  pwMask,
  onPwChange,
  handleType
}) => {
  console.log(errors);
  return (
    <div className="loginBox">
      <form onSubmit={onSubmit}>
        <h1>Sign In</h1>

        <br />
        <TextField
          name="email"
          label="email"
          value={user.email}
          onChange={onChange}
          // errorText={errors.email}
        />
        <br />

        <TextField
          type={type}
          name="password"
          label="password"
          value={user.password}
          onChange={onPwChange}
          // errorText={errors.password}
        />
        <br></br>
        <br></br>
        <input type="radio" value="artist" onChange={handleType} name="userType" /> Artist
        <br></br>
        <br></br>
        <input type="radio" value="organizer" onChange={handleType} name="userType" /> Organizer
        <br />
        <br />
        {/* <Link to='/'> */}
          <Button
            buttonStyle='btn--signup2'
            primary={true}
            type="submit"
            label="submit"
          >Sign In</Button>
        {/* </Link> */}
      </form>
    </div>
  );
};
export default SignInForm;
