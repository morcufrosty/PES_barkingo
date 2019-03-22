import React, { Component } from 'react';
import { Text, View,
    TextInput
}  from 'react-native';
import { LinearGradient } from 'expo'


export default class InputPassword extends Component {


  render() {
    return (
          <View style={{flex:1}}>
            <Text style={{color: 'white'}}>{this.props.name}</Text>
            <TextInput textAlign={'center'} secureTextEntry={true}
            style={{backgroundColor:'white', opacity: 0.5, borderRadius: 5}}></TextInput>
          </View>
    );
  }
}
