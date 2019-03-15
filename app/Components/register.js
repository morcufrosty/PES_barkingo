import React, { Component } from 'react';
import { AppRegistry,StyleSheet,Text ,View} from 'react-native';
//import Login Component
import Login from './src/components/Login/Login';

export default class Register extends Component {
  render() {
    return (
      <Text>Email</Text>
      <TextInput></TextInput>
      <Text>Username</Text>
      <TextInput></TextInput>
      <Text>Password</Text>
      <TextInput></TextInput>
      <Text>Repeat Password</Text>
      <TextInput></TextInput>
    );
  }
}

AppRegistry.registerComponent('Register', () => Register);
