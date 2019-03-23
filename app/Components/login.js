import React, { Component } from 'react';
import {
  StyleSheet, Text, View,
  ScrollView,
  TextInput,
  Alert,AsyncStorage,
  Platform
} from 'react-native';
import Button from './Button';
import { LinearGradient } from 'expo'
import { Facebook } from 'expo';
import TextInputWTitle from './inputText.js';
import InputPassword from './inputPassword.js';

import * as Expo from "expo"
//import { getMaxListeners } from 'cluster';

const ACCESS_TOKEN = 'access_token';

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      count: 0,
      token: ''
    }
  }

    async signInWithGoogle(){
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId:
          "802116894984-a2n57c60e6ri7bpp6t63nlivelj185om.apps.googleusercontent.com",
        //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
        scopes: ["profile", "email"]
      })

      if (result.type === "success") {
        Alert.alert("Login success!", `Hola ${result.user.name}!`);
        //this.setState({
          //signedIn: true,
          //name: result.user.name,
          //photoUrl: result.user.photoUrl,
          //email: result.user.email,
      
        //})
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
}

  _retrieveAndCheckToken = async () => {
    try {
      const localToken = await AsyncStorage.getItem(ACCESS_TOKEN);
      if (localToken !== null) {
        console.log(localToken);
        //Here we should get the token from the server to compare it with the local token
        //serverToken = fetch...
        if(false && localToken === serverToken)
          this.props.navigation.navigate('Swipe');
       } else console.log("No local token");
    } catch (error) {
      // Error retrieving data
    }
  };



  async storeToken(){
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN, this.state.token);
      this.getToken();
    } catch (error) {
      console.log("Ha fallat el storeToken")
      // Error saving data
    }
  }

  async getToken(){
    try {
      let token = await AsyncStorage.getItem(ACCESS_TOKEN);
      this.getToken();
      console.log("token: "+ token);
    } catch (error) {
      // Error showing data
      console.log("Ha fallat el getToken")
    }
  }

  async removeToken(){
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      this.getToken(); //ha de ser null
    } catch (error) {
      // Error showing data
      console.log("Ha fallat el removeToken")
    }
  }


  async _logInFacebook() {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync('248948239393282', {
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {

        const response = await fetch('https://graph.facebook.com/me?fields=name,picture,email&access_token=${token}');

        Alert.alert("You are logged in!", `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }


  async _loginUsingAPI() {

    return fetch('http://10.4.41.164/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.msg);
        return responseJson;
      }).catch((error) => {
        console.error(error);
      });

  }

  _handlePress() {
    if (this.state.email === '' && this.state.password === ''){
      this.setState({count: this.state.count + 1});

    if (this.state.count === 2){
      this.props.navigation.navigate('Swipe');
      this.setState({count: 0});
    }
    return;
    }

    const response = this._loginUsingAPI();
    console.log(response.msg);
    if (response.success){
      this.setState({token:response.msg})
      this.storeToken();
      this.props.navigation.navigate('Swipe');
    }
    else{
      if(response.msg === undefined)
        Alert.alert("Login error", "Unknown error");
      else
      Alert.alert("Login error", response.msg);
    }


  }

  _handlePressFBLogin() {
    this._logInFacebook();
  }

  pressGoogleLogin() {
    this.signInWithGoogle()
  }
  render() {
    this._retrieveAndCheckToken();

    return (
      <LinearGradient colors={['#F15A24', '#D4145A']}
        start={[0, 1]}
        end={[1, 0]}
        style={{
          flex: 1,
          padding: '10%',
          paddingTop: '30%'
        }}>
        <Text style={{ color: 'white', fontSize: 45, flex: 1 }}>Login</Text>

        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white' }}>{"Email"}</Text>
          <TextInput onChangeText={(email) => this.setState({ email })} value={this.state.email} textAlign={'center'} autoCapitalize={'none'}
            style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 35 }}></TextInput>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white' }}>{"Password"}</Text>
          <TextInput secureTextEntry={true} onChangeText={(password) => this.setState({ password })} value={this.state.password} textAlign={'center'} autoCapitalize={'none'}
            style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 35 }}></TextInput>
        </View>

        <View style={{ flex: 1 }}>
          <Button
            title='Login'
            color='#ff3b28'
            onPress={() => this._handlePress()}>
          </Button>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white' }}> Don't have an account?<Text> </Text>
            <Text style={{ textDecorationLine: "underline" }}
              onPress={() => this.props.navigation.navigate('Register')
              }>
              Register now!
            </Text>
          </Text>
          <View style={{ flex: 1, padding: '10%', paddingVertical: '15%' }}>
            <Button
              title='Login with Facebook'
              color='#3b5998'
              onPress={() => this._handlePressFBLogin()}
            ></Button>
          </View>
          <View style={{ flex: 1, padding: '10%', paddingVertical: '5%' }}>
            <Button
              title='Login with Google'
              color='#D84B37'
              onPress={() => this.pressGoogleLogin()}
            ></Button>
          </View>
        </View>
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});