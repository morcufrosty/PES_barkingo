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
import {AsyncStorage} from 'react-native';
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

  _retrieveAndCheckToken = async () => {
    try {
      const localToken = await AsyncStorage.getItem('Token');
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



  _storeToken = async () => {
    try {
      await AsyncStorage.setItem('Token', this.state.token);
    } catch (error) {
      // Error saving data
    }
  };


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
        console.log(responseJson);
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
      this._storeToken(response.msg);
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
            style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5 }}></TextInput>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white' }}>{"Password"}</Text>
          <TextInput secureTextEntry={true} onChangeText={(password) => this.setState({ password })} value={this.state.password} textAlign={'center'} autoCapitalize={'none'}
            style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5 }}></TextInput>
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



          <View style={{ flex: 1, padding: '15%', paddingVertical: '15%' }}>
            <Button
              title='Login with Facebook'
              color='#3b5998'
              onPress={() => this._handlePressFBLogin()}
            ></Button>
          </View>

          <View style={{ flex: 1, padding: '15%', paddingVertical: '5%' }}>
            <Button
              title='Login with Google'
              color='#D84B37'
              onPress={() => this.props.navigation.navigate('GoogleLogin')}
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
