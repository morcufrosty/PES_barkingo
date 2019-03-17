import React, { Component } from 'react';
import { Button, Alert, Container, AppRegistry,StyleSheet,Text ,TextInput, View} from 'react-native';
import styles from '../style/stylesheet.js'
//import Background from './Background.js'
import { LinearGradient } from 'expo'
//import Login Component
//import Login from './src/components/Login/Login';


export default class Register extends Component {
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
          <View style={{flex:1}}>
            <Text style={{color: 'white'}}>Email</Text>
            <TextInput textAlign={'center'}
            style={{backgroundColor:'white', opacity: 0.5, borderRadius: 5}}></TextInput>
          </View>
          <View style={{flex:1}}>
            <Text style={{color: 'white'}}>Username</Text>
            <TextInput textAlign={'center'} style={{backgroundColor:'white', opacity: 0.5, borderRadius: 5}}></TextInput>
          </View>
          <View style={{flex:1}}>
            <Text style={{color: 'white'}}>Password</Text>
            <TextInput textAlign={'center'} secureTextEntry={true}
            style={{backgroundColor:'white', opacity: 0.5, borderRadius: 5}}></TextInput>
          </View>
          <View style={{flex:1}}>
            <Text style={{color: 'white'}}>Repeat Password</Text>
            <TextInput secureTextEntry={true} textAlign={'center'}
            style={{backgroundColor:'white', opacity: 0.5, borderRadius: 5}}></TextInput>
          </View>
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
