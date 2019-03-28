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

const ACCESS_TOKEN = 'access_token';
const USER_INFO = 'user_info';

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      name: '',
      password: '',
      count: 0,
      token: '',
      isLoading: true

    }
  }

  resetState(){
    this.setState({
      name: '',
      email: '',
      token: '',
      password: ''
   })

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
        this.setState({
          name: result.user.name,
          email: result.user.email.replace(/\s/g, "_"),
          token: result.accessToken

         // maybe we need it:photoUrl: result.user.photoUrl,
       })
       console.log("enter fetch API barkingo google");

       const resFromBarkingo = await this.renewGoogleTokenToAPI('http://10.4.41.164/api/renewGoogleToken');
       console.log("google response content:" + resFromBarkingo.success + " "+ resFromBarkingo.token + " "+resFromBarkingo.msg);
      if (resFromBarkingo.success){
       this.storeToken(resFromBarkingo.token);
       this.getToken();
       this.resetState();
       this.props.navigation.navigate('AppAfterLogin');
      }

      } else {
        Alert.alert("Login error", responseBarkingo.msg);
      }
    } catch (e) {
      console.log("error", e)
    }
  }


  retrieveAndCheckToken = async () => {
    try {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN);

      if (token !== null) {
        tokenJson = JSON.parse(token);

        
        /*console.log("This is the token: " + tokenJson.token);
        console.log("This is when the token expires: " + new Date(tokenJson.expiration));
        console.log("This is the current time: " + new Date(new Date().getTime()));*/
        this.setState({isLoading:false});
        

        if (new Date().getTime() < tokenJson.expiration ){
          this.resetState();
          this.setState({isLoading:false});
          this.props.navigation.navigate('AppAfterLogin');
        }
        else{
         
          //Renew token
         
         
          const userInfo = await AsyncStorage.getItem(USER_INFO);
          userInfoJson = JSON.parse(userInfo);
          this.state.email =userInfoJson.email;
          this.setState({ email:userInfoJson.email,password: userInfoJson.password  }); 
         
          const response = await this.loginUsingAPI();
          if (response.success) {
            this.storeToken(response.token);
            console.log("s'ha renovat token ");
            this.setState({isLoading:false});
            this.props.navigation.navigate('AppAfterLogin');

          }
          else{
            console.log("error renovant el token:"+ response.msg);
          }


        }
      } else {
        console.log("No local token");
        this.setState({isLoading:false});
        
      }
    } catch (error) {
      console.log(error);
    }
  };



  storeToken = async (token) => {
    try {
      expirationDate = new Date().getTime() + (24*60*60)*1000;
      jsonObject = {token: token , expiration: expirationDate};
      await AsyncStorage.setItem(ACCESS_TOKEN, JSON.stringify(jsonObject));
    } catch (error) {
      console.log("Ha fallat el storeToken: " + error)
      // Error saving data
    }
  }
  storeUserInfo = async () => {
    try {
      jsonObject = {email: this.state.email , password: this.state.password};
      await AsyncStorage.setItem(USER_INFO, JSON.stringify(jsonObject));
      
    } catch (error) {
      console.log("Ha fallat el storeUserInfo: " + error);
    }
  }

  async getToken(){
    try {
      let token = await AsyncStorage.getItem(ACCESS_TOKEN);
      this.getToken();
      console.log("token: "+ token);
    } catch (error) {
      // Error showing data
      console.log("Ha fallat el getToken: " + error)
    }
  }

  async removeToken(){
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      this.getToken(); //ha de ser null
    } catch (error) {
      // Error showing data
      console.log("Ha fallat el removeToken: " + error)
    }
  }

  async renewFacebookTokenToAPI(facebookName, facebookEmail, facebookToken) {

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

  async renewGoogleTokenToAPI(fullRoute) {
    console.log('enter renew google token');
    console.log("fullRoute: "+ fullRoute);
    return fetch(fullRoute, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        token: this.state.token
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.msg);
        return responseJson;
      }).catch((error) => {
        console.error(error);
      });

  }
 
  async logInFacebook() {
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

        const responseBarkingo = await this.renewFacebookTokenToAPI(responseFbJson.name, responseFbJson.email, token);
        if (responseBarkingo.success) {
          this.storeToken(responseBarkingo.token);
          this.props.navigation.navigate('AppAfterLogin');
        }
        else Alert.alert("Login error", responseBarkingo.msg);

        //Alert.alert("You are logged in!", `Hi ${responseFb.json().name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }


  async loginUsingAPI() {

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


  handlePressFBLogin() {
    this.logInFacebook();
  }

  pressGoogleLogin() {
    this.signInWithGoogle()
  }

  async handleLoginButton(){

      if (this.state.email === '' && this.state.password === '') {
        this.setState({ count: this.state.count + 1 });

        if (this.state.count === 2) {
          this.resetState();
          this.props.navigation.navigate('AppAfterLogin');
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


      const response = await this.loginUsingAPI();
      console.log(response.msg);
      if (response.success) {
        console.log(response.token);
        this.storeToken(response.token);
        this.storeUserInfo();
        this.resetState();
        this.props.navigation.navigate('AppAfterLogin');
      }
      else {
        if (response.msg === undefined)
          Alert.alert("Login error", "Server error");
        else
          Alert.alert("Login error", response.msg);
      }


  }


  render() {
    

    if (this.state.isLoading) {
      this.retrieveAndCheckToken();
          return   <LinearGradient colors = {['#F15A24', '#D4145A']}
            start = {[0, 1]}
            end = {[1, 0]}
            style={{
              flex:1,
              padding: '10%',
              paddingTop: '30%'
            }}>

            </LinearGradient>;
        }

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
            onPress={async () => this.handleLoginButton()}>
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
              onPress={() => this.handlePressFBLogin()}
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
