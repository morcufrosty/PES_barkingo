import React, { Component } from 'react';
import { Container, AppRegistry,StyleSheet,Text ,TextInput, View} from 'react-native';

export default class Login extends Component {
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
        <Button onPress={() => this.props.navigation.navigate('RegisterScreen')} title="Register"/>
      </View>
    );
  }
}


AppRegistry.registerComponent('Register', () => Register);
