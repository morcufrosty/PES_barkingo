import React, { Component } from 'react';
import { StyleSheet, Text, View,
    ScrollView,
    TextInput,
    Button,
    Alert
}  from 'react-native';
import { LinearGradient } from 'expo'
import TextInputWTitle from './inputText.js';
import InputPassword from './inputPassword.js';


export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  _handlePress() {
    Alert.alert(this.state.username);
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
        <Text style={{color: 'white', fontSize: 45, flex: 1}}>Login</Text>
        <TextInputWTitle name='Username' action={this.handler}></TextInputWTitle>
        <InputPassword name='Password'></InputPassword>
        <View style={{flex:1}}>
          <Button
            title='Login'
            color='#ff3b28'
            onPress= {() => this._handlePress()}
          ></Button>
        </View>
        <View style={{flex:1}}>
          <Text style={{color: 'white'}}> Don't have an account?<Text> </Text>
            <Text style ={{textDecorationLine: "underline"}}
                  onPress={() => this.props.navigation.navigate('Register')
                }>
              Register now!
            </Text>
          </Text>

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
