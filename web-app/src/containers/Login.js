import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";
import Routing from './Routing.js';
import { AsyncStorage } from 'AsyncStorage';

const ACCESS_TOKEN = 'access_token';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
    };
  }

  componentDidMount(){

  }

  storeToken = async (token) => {
    try {
        var expirationDate = new Date().getTime() + (24 * 60 * 60) * 1000;
        var jsonObject = { token: token, expiration: expirationDate };
        await AsyncStorage.setItem(ACCESS_TOKEN, JSON.stringify(jsonObject));
    } catch (error) {
        console.log("Ha fallat el storeToken: " + error)
        // Error saving data
    }
  }

  async removeToken() {
      try {
          await AsyncStorage.removeItem(ACCESS_TOKEN);
      } catch (error) {
          // Error showing data
          console.log("Ha fallat el removeToken: " + error)
      }
  }

  async loginDevUsingAPI() {

    return fetch('http://10.4.41.164/api/users/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: 'devUser@dev.dev',
            password: 'devUser'
        }),
    }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson.msg);
            localStorage.setItem("api_token", responseJson.token);
            return responseJson;
        }).catch((error) => {
            console.error(error);
        });
  }

  validateForm() {
    return this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  async handleLogin (){
    if (this.state.password=="123456"){
      const response = await this.loginDevUsingAPI();
      if (response.success) {
        var token = response.token;
        console.log(token);
        this.storeToken(response.token);
        this.props.login();
      }
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    this.handleLogin();
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="password" bssize="large">
            <FormLabel>Password</FormLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}