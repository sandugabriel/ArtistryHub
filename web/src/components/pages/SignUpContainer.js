import React, { Component } from "react";
import SignUpForm from "./SignUp.js";
import { Link } from 'react-router-dom';

const axios = require("axios");
const FormValidators = require("./validate");
const validateSignUpForm = FormValidators.validateSignUpForm;
const zxcvbn = require("zxcvbn");


class SignUpContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        username: "",
        email: "",
        password: "",
        pwconfirm: ""
      },
      btnTxt: "show",
      type: "password",
      score: "0"
    };

    this.pwMask = this.pwMask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
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

  async submitSignup(user) {
    console.log("submitSignup");
    var params = { username: user.usr, password: user.pw, email: user.email };
    console.log(params);
    let root_url = 'http://127.0.0.1:4996/createartist?username=' + user.usr + '&password' + user.pw  + '&email' + user.email
    let submitURL = new URL(root_url)
    await this.makeGetRequest(submitURL)

  }

  validateForm(event) {
    console.log("validateForm");
    event.preventDefault();
    var payload = validateSignUpForm(this.state.user);
    // console.log(payload)

    var user = {
        usr: this.state.user.username,
        pw: this.state.user.password,
        email: this.state.user.email
    };
    this.submitSignup(user);
    window.location.href = "/sign-in"

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
    // console.log(user);
    return (
      <div>
        <SignUpForm

          onSubmit={this.validateForm}
          onChange={this.handleChange}
          onPwChange={this.pwHandleChange}
          errors={this.state.errors}
          user={this.state.user}
          score={this.state.score}
          btnTxt={this.state.btnTxt}
          type={this.state.type}
          pwMask={this.pwMask}
        />
      </div>
    );
  }
}

// module.exports = SignUpContainer;
export default SignUpContainer;
