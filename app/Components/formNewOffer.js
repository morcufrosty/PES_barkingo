import React, { Component } from 'react';
import { StyleSheet, Text, View,
    ScrollView,
    TextInput,
    Alert,
    Platform,
    Picker,
}  from 'react-native';


import Button from './Button';
import { LinearGradient } from 'expo'
import { Facebook } from 'expo';



export default class formNewOffer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      type: '',
      species: '',
      race: '',
      sex: '',
      age: '',
      iniDate: '',
      endDate: '',
      description:''
    }
  }

  resetState(){
    this.setState({
      name: '',
      type: '',
      species: '',
      race: '',
      sex: '',
      age: '',
      iniDate: '',
      endDate: '',
      description: ''
   })

  }

async newOfferUsingAPI(){

  return fetch('http://10.4.41.164/api/offers', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: this.state.id,
      type: this.state.name,
      species:
      photURL

    }),
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson.msg);
      return responseJson;
    }).catch((error) => {
      console.error(error);
    });
}

render(){

  return (
    <LinearGradient colors={['#F15A24', '#D4145A']}
      start={[0, 1]}
      end={[1, 0]}
      style={{
        flex: 1
      }}
    >
      <ScrollView
      style={{
        padding: '10%',
      }}>

      <Text style={{ color: 'white', fontSize: 45, flex: 1 }}>New Offer</Text>

            <View style={{ flex: 1, paddingVertical: 10 }}>
              <Text  style={{ color: 'white' }}>{"Name"}</Text>
              <TextInput onChangeText={(name) => this.setState({ name })}  value={this.state.name}
                style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 35 }}></TextInput>
            </View>

            <View style={{ flex: 1, paddingVertical: 10 }}>
              <Text  style={{ color: 'white' }}>{"Species"}</Text>
              <TextInput onChangeText={(species) => this.setState({ species })}  value={this.state.species}
                style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 35 }}>
                </TextInput>
            </View>

            <View style={{ flex: 1, paddingVertical: 10 }}>
              <Text style={{ color: 'white' }}>{"Race"}</Text>
              <TextInput onChangeText={(race) => this.setState({ race })}  value={this.state.race}
                style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 35 }}>
                </TextInput>
            </View>


            <View style={{ flex: 1 , paddingVertical: 10}}>
              <Text style={{ color: 'white' }}>{"Age"}</Text>
              <TextInput onChangeText={(age) => this.setState({ age })}  value={this.state.age}
                style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 35 }}>
                </TextInput>
            </View>

            <View style={{ flex: 1, paddingVertical: 10 }}>
              <Text style={{ color: 'white' }}>{"Description"}</Text>
              <TextInput
                multiline = {true}
                numberOfLines = {4}
                onChangeText={(description) => this.setState({ description })}
                value={this.state.description}
                style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 80 }}>
                </TextInput>
            </View>

            <View style={{ flex: 1 }}>
            <Text style={{ color: 'white' }}>{"Sexe"}</Text>
              <Picker
                mode="dropdown"
                selectedValue={this.state.sexe}
                style={{ paddingVertical: 0, height: 50 }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({sexe: itemValue})
                }>
                <Picker.Item label="male" value="male" />
                <Picker.Item label="female" value="female" />
              </Picker>
            </View>

        </ScrollView>


    </LinearGradient>
    );
}
}
