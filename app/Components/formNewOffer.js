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

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      type: '',
      species: '',
      race: '',
      sex: null,
      age: '',
      iniDate: '',
      endDate: ''

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

async handlePress(){

  if(this.state.name === ''){
    Alert.alert("Error", "Please enter the name of the pet" )
  }

  else if(this.state.age === ''){
    Alert.alert("Error", "Please enter the age of the pet" )
  }

  else if(this.state.description === ''){
    Alert.alert("Error", "Please enter a description" )
  }

  else if(this.state.race === ''){
    Alert.alert("Error", "Please enter the race of the pet" )
  }

  else if(this.state.sex === null){
    Alert.alert("Error", "Please specify the sex of the pet" )
  }



  const response = await this.newOfferUsingAPI();


  if(response.success){
    Alert.alert("Amazing!", response.msg);

  }
  else{
    Alert.alert("Error", response.msg); 
  }

}

async newOfferUsingAPI(){

  return fetch('http://10.4.41.164/api/offers', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': await AsyncStorage.getItem(ACCESS_TOKEN)
    },
    body: JSON.stringify({

      name: this.state.name,
      type: this.state.type,
      species: this.state.species,
      race: this.state.race,
      sex: this.state.sex,
      age: this.state.age,
      iniDate: this.state.iniDate,
      endDate: this.setState.endDate

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
          color='#ff3b28'
           onPress={async () => this.handlePress()}>
        </Button>
      </View>
    </LinearGradient>
    );
}
}
