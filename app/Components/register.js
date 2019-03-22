import React, { Component } from 'react';
import { Button, Alert, Container, AppRegistry,StyleSheet,Text ,TextInput, View} from 'react-native';
import styles from '../style/stylesheet.js'
import { LinearGradient } from 'expo'
import TextInputWTitle from './inputText.js';
import InputPassword from './inputPassword.js';


export default class Register extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      email: '',
      username: '',
      password: '',
      repeatPassword: ''
    }
  }

  handleChangeUsr(text){
    this.setState({username: text})
  }

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
            <Text style={{color: 'white'}}>{"Email"}</Text>
            <TextInput  onChangeText= { (email) => this.setState({email})} value = {this.state.email} textAlign={'center'} autoCapitalize = {'none'}
            style={{backgroundColor:'white', opacity: 0.5, borderRadius: 5}}></TextInput>
          </View>

          <View style={{flex:1}}>
            <Text style={{color: 'white'}}>{"Username"}</Text>
            <TextInput  onChangeText= { (username) => this.setState({username})} value = {this.state.username} textAlign={'center'} autoCapitalize = {'none'}
            style={{backgroundColor:'white', opacity: 0.5, borderRadius: 5}}></TextInput>
          </View>
          
          <View style={{flex:1}}>
            <Text style={{color: 'white'}}>{"Password"}</Text>
            <TextInput secureTextEntry={true}  onChangeText= { (password) => this.setState({password})} value = {this.state.password} textAlign={'center'} autoCapitalize = {'none'}
            style={{backgroundColor:'white', opacity: 0.5, borderRadius: 5}}></TextInput>
          </View>

          <View style={{flex:1}}>
            <Text style={{color: 'white'}}>{"Repeat password"}</Text>
            <TextInput secureTextEntry={true}  onChangeText= { (repeatPassword) => this.setState({repeatPassword})} value = {this.state.repeatPassword} textAlign={'center'} autoCapitalize = {'none'}
            style={{backgroundColor:'white', opacity: 0.5, borderRadius: 5}}></TextInput>
          </View>

          <View style={{flex:1}}>
            <Button
              title='Register'
              accessibilityLabel="Learn more about this purple button"
              color='#ff3b28'
              onPress= {() => {

                if(this.state.password == this.state.repeatPassword){
                    fetch('http://10.4.41.164/api/register', {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        email: this.state.email,
                        name: this.state.username ,
                        password: this.state.password
                    }),
                }).then((response) => response.json());
              }}
            }
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
