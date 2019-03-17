import React, { Component } from 'react';
import { Button, Alert, Container, AppRegistry,StyleSheet,Text ,TextInput, View} from 'react-native';
import styles from '../style/stylesheet.js'
import { LinearGradient } from 'expo'
import TextInputWTitle from './inputText.js';
import InputPassword from './inputPassword.js';


export default class Register extends React.Component {
  render() {
    return (
      <LinearGradient colors = {['#F15A24', '#D4145A']}
      start = {[0, 1]}
      end = {[1, 0]}
      style={{
        flex:1,
        padding: '10%',
        paddingTop: '30%'
      }}>
          <Text style={{color: 'white', fontSize: 45, flex: 1}}>Register</Text>
          <TextInputWTitle name='Email'/>
          <TextInputWTitle name='Username'/>
          <InputPassword name='Password'/>
          <InputPassword name='Repeat password'/>
          <View style={{flex:1}}>
            <Button
              title='Register'
              accessibilityLabel="Learn more about this purple button"
              color='#ff3b28'
              onPress= {() => {
                // this.props.navigation.navigate('Login')
                Alert.alert('Registered!');
              }}
            ></Button>
        </View>
        <View style={{flex:1}}>

          <Text style={{color: 'white'}}>Go Back to <Text> </Text>
            <Text style ={{textDecorationLine: "underline"}}
                  onPress={() => this.props.navigation.navigate('Login')}>
              Login page
            </Text>
          </Text>
        </View>

      </LinearGradient>
    );
  }
}

AppRegistry.registerComponent('Register', () => Register);
