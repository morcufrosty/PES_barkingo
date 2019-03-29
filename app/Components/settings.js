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



export default class Swipe extends React.Component {


  render() {
    return (
      <LinearGradient colors={['#F15A24', '#D4145A']}
        start={[0, 1]}
        end={[1, 0]}
        style={{
          flex: 1,
          padding: '10%',
          paddingTop: '30%'
        }}>
        <Text style={{ color: 'white', fontSize: 45, flex: 1 }}>SETTINGS</Text>

        <View style={{ flex: 1 }}>
          <Button
            onPress={async () => {

              await AsyncStorage.removeItem('access_token');
              this.props.navigation.replace('Login');
            }
            }
            title="Log out"
            color="#FF0000"
          />
        </View>

      </LinearGradient>
    );
  }
}
