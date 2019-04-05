import React, { Component } from 'react';
import { StyleSheet, Text, View,
    ScrollView,
    TextInput,
    Alert,
    Platform,

}  from 'react-native';
import Button from './Button';
import { LinearGradient } from 'expo'
import { Facebook } from 'expo';



export default class formNewOffer extends React.Component {
render(){

  return (
    <LinearGradient colors={['#F15A24', '#D4145A']}
      start={[0, 1]}
      end={[1, 0]}
      style={{
        flex: 1,
        padding: '10%',
        paddingTop: '30%'
      }}>
      <Text style={{ color: 'white', fontSize: 45, flex: 1 }}>New Offer</Text>

            <View style={{ flex: 1 }}>
              <Text style={{ color: 'white' }}>{"Species"}</Text>
              <TextInput
                style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 35 }}
                keyboardType='numeric'
                ></TextInput>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: 'white' }}>{"Race"}</Text>
              <TextInput
                style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 35 }}
                keyboardType='numeric'
                ></TextInput>
            </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: 'white' }}>{"Name"}</Text>
        <TextInput
          style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 35 }}></TextInput>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ color: 'white' }}>{"Age"}</Text>
        <TextInput
          style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 35 }}
          keyboardType='numeric'
          ></TextInput>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ color: 'white' }}>{"Description"}</Text>
        <TextInput
          style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 35 }}
          keyboardType='numeric'
          ></TextInput>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: 'white' }}>{"Sexe"}</Text>
        <TextInput
          style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 35 }}></TextInput>
      </View>
      <View style={{ flex: 1 }}>
        <Button
          title='Submit'
          color='#ff3b28'>
        </Button>
      </View>
    </LinearGradient>
    );
}
}