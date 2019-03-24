import React, { Component } from 'react';
import {
  StyleSheet, Text, View,
  ScrollView,
  TextInput,
  Alert,
  Platform
} from 'react-native';
import Button from './Button';
import { LinearGradient } from 'expo'
import { Facebook } from 'expo';
import TextInputWTitle from './inputText.js';
import InputPassword from './inputPassword.js';
import { AsyncStorage } from 'react-native';
import * as Expo from "expo"
//import { getMaxListeners } from 'cluster';



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

  async signInWithGoogle() {
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
      const localToken = await AsyncStorage.getItem('Token');
      if (localToken !== null) {
        console.log(localToken);
        //Here we should get the token from the server to compare it with the local token
        //serverToken = fetch...
        if (false && localToken === serverToken)
          this.props.navigation.navigate('Swipe');
      } else console.log("No local token");
    } catch (error) {
      // Error retrieving data
    }
  };



  _storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('Token', token);
    } catch (error) {
      // Error saving data
    }
  };

  async _renewFacebookTokenToAPI(facebookName, facebookEmail, facebookToken) {

    return fetch('http://10.4.41.164/api/renewFacebookToken', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: facebookName.replace(/\s/g, "_"),
        email: facebookEmail,
        token: facebookToken
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.msg);
        return responseJson;
      }).catch((error) => {
        console.error(error);
      });

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

        const responseFb = await fetch(`https://graph.facebook.com/me?fields=name,picture,email&access_token=${token}`);
        responseFbJson = await responseFb.json();
       
        const responseBarkingo = await this._renewFacebookTokenToAPI(responseFbJson.name, responseFbJson.email, token);
        if (responseBarkingo.success) {
          this._storeToken(responseBarkingo.token);
          this.props.navigation.navigate('Swipe');
        }
        else Alert.Alert("Login error", responseBarkingo.msg);

        //Alert.alert("You are logged in!", `Hi ${responseFb.json().name}!`);
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
            onPress={async () => {
              if (this.state.email === '' && this.state.password === '') {
                this.setState({ count: this.state.count + 1 });

                if (this.state.count === 2) {
                  this.props.navigation.navigate('Swipe');
                  this.setState({ count: 0 });
                }
                return;
              }
              else if (this.state.email == '') {
                Alert.alert("Error", "Please enter your email");
                return;
              }


              else if (this.state.password == '') {
                Alert.alert("Error", "Please enter your password");
                return;
              }


              const response = await this._loginUsingAPI();
              console.log(response.msg);
              if (response.success) {
                console.log(response.token);
                this._storeToken(response.token);
                this.props.navigation.navigate('Swipe');
              }
              else {
                if (response.msg === undefined)
                  Alert.alert("Login error", "Server error");
                else
                  Alert.alert("Login error", response.msg);
              }
            }}>
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
          <View style={{ flex: 1, padding: '11%', marginTop: 20 }}>
            <Button
              title='Login with Facebook'
              color='#3b5998'
              onPress={() => this._handlePressFBLogin()}
            ></Button>
          </View>
          <View style={{ flex: 1, padding: '11%' }}>
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