import React, { Component } from 'react';
import { Button, Container, AppRegistry,StyleSheet,Text ,TextInput, View} from 'react-native';
//import Login Component
//import Login from './src/components/Login/Login';

export default class Register extends Component {
  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#123456',
        margin: '10%'
      }}>
        <View>
          <Text>"Email"</Text>
          <TextInput style={{
            backgroundColor:'#ffffff'
          }}></TextInput>
        </View>
        <View>
          <Text>"Email"</Text>
          <TextInput
          style={{
            backgroundColor:'#ffffff'
          }}></TextInput>
        </View>
        <View>
          <Text>"Username"</Text>
          <TextInput
          style={{
            backgroundColor:'#ffffff'
          }}></TextInput>
        </View>
        <View>
          <Text>"Password"</Text>
          <TextInput style={{
            backgroundColor:'#ffffff'
          }}></TextInput>
        </View>
        <View>
          <Text>"Repeat Password"</Text>
          <TextInput
          style={{
            backgroundColor:'#ffffff'
          }}></TextInput>
        </View>
        <View>
          <Button
            title="Register"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
            onPress=""
          />
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('Register', () => Register);
