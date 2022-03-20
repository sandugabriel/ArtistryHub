import React, { Component } from "react";
import SignInForm from "./SignIn.js";
import { Link, Redirect } from 'react-router-dom';

const axios = require("axios");
const FormValidators = require("./validate");
const validateSignUpForm = FormValidators.validateSignUpForm;
const zxcvbn = require("zxcvbn");


class SignInContainer extends Component {
  constructor(props) {
    super(props);
    // this.isLoggedIn = false;

    this.state = {
      errors: {
        message: ""
      },
      user: {
        username: "",
        email: "",
        password: "",
        pwconfirm: ""
      },
      btnTxt: "show",
      type: "password",
      score: "0",
      userType: "",
      isLoggedIn: false,
    };

    localStorage.setItem("email", this.state.user.email);
    localStorage.setItem("userType", this.state.userType);
    localStorage.setItem("isLoggedIn", this.state.isLoggedIn);


    this.pwMask = this.pwMask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleType = this.handleType.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.submitSignin = this.submitSignin.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.pwHandleChange = this.pwHandleChange.bind(this);
  }

  handleChange(event) {
    console.log("handleChange");

    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  handleType(event) {
    console.log("handleType");

    // const field = event.target.name;
    // const user = this.state.user;
    // user[field] = event.target.value;

    this.setState({
      userType: event.currentTarget.value,
    });
  }

  handleLogin(user) {
    console.log("handleLogin");

    // const field = event.target.name;
    // const user = this.state.user;
    // user[field] = event.target.value;

    this.setState({
      isLoggedIn: true,
    });

  }

  pwHandleChange(event) {
    console.log("pwHandleChange");

    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });

    if (event.target.value === "") {
      this.setState(state =>
        Object.assign({}, state, {
          score: "null"
        })
      );
    } else {
      var pw = zxcvbn(event.target.value);
      this.setState(state =>
        Object.assign({}, state, {
          score: pw.score + 1
        })
      );
    }
  }

  async makeGetRequest(url) {

    let res = await axios.post(url);

    let data = res.data;
    console.log(data);
    return data
  }

  async submitSignin(user) {
    console.log("submitSignin");
    if (user.userType === 'artist') {
      let root_url = 'http://127.0.0.1:4996/validateloginartist?email=' + user.email + '&password=' + user.pw;
      let submitURL = new URL(root_url);
      let val = await this.makeGetRequest(submitURL);
      console.log(val)
      if(val === true) {
        localStorage.setItem("email", this.state.user.email);
        localStorage.setItem("userType", this.state.userType);
        localStorage.setItem("isLoggedIn", 'true');

        // window.location.reload();
        window.location.replace('/artist/home')
      }

    } else {
      let root_url = 'http://127.0.0.1:4996/validateloginorganizer?email=' + user.email + '&password=' + user.pw;
      let submitURL = new URL(root_url);
      let val = await this.makeGetRequest(submitURL);
      console.log(val)
      if(val === true) {
        localStorage.setItem("email", this.state.user.email);
        localStorage.setItem("userType", this.state.userType)
        localStorage.setItem("isLoggedIn", 'true');
      }

    }

    this.forceUpdate();

  }

  validateForm(event) {
    console.log("validateForm");
    event.preventDefault();
    var payload = validateSignUpForm(this.state.user);
    // console.log(payload)

    console.log(this.state);
    var user = {
      email: this.state.user.email,
      pw: this.state.user.password,
      userType: this.state.userType
    };
    this.submitSignin(user);

  }

  pwMask(event) {
    event.preventDefault();
    this.setState(state =>
      Object.assign({}, state, {
        type: this.state.type === "password" ? "input" : "password",
        btnTxt: this.state.btnTxt === "show" ? "hide" : "show"
      })
    );
  }

  render() {
    return (
      <div>
        <SignInForm

          onSubmit={this.validateForm}
          onChange={this.handleChange}
          onPwChange={this.pwHandleChange}
          handleType={this.handleType}
          errors={this.state.errors}
          user={this.state.user}
          score={this.state.score}
          btnTxt={this.state.btnTxt}
          type={this.state.type}
          pwMask={this.pwMask}
        />
        {console.log("SALUT")}
        {/* {console.log(this.isLoggedIn)} */}
        {console.log(localStorage.getItem("email"))}
        {console.log(localStorage.getItem("userType"))}
        {console.log(localStorage.getItem("isLoggedIn"))}
        {localStorage.getItem("isLoggedIn") === "true" ?  <Redirect to={localStorage.getItem("userType")+"/home"} /> : null }
      </div>
    );
  }
}

export default SignInContainer;
