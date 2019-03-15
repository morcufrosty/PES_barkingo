import React, { Component } from 'react';
import { Container, AppRegistry,StyleSheet,Text ,TextInput, View} from 'react-native';
//import Login Component
//import Login from './src/components/Login/Login';

export default class Register extends Component {
  render() {
    return (
      <View>
            <Text>"Email"</Text>
        <TextInput></TextInput>
      <Text>"Username"</Text>
  <TextInput></TextInput>
      <Text>"Password"</Text>
        <TextInput></TextInput>
        <Text>"Repeat Password"</Text>
        <TextInput></TextInput>
      </View>
    );
  }
}

AppRegistry.registerComponent('Register', () => Register);
