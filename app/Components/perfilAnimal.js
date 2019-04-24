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
import TextInputWTitle from './inputText.js';
import InputPassword from './inputPassword.js';
import { AsyncStorage } from 'react-native';



export default class perfilAnimal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
          id: this.props.navigation.state.params.item,
          name: '',
          type: '',
          species: '',
          race: '',
          sex: 'Male',
          age: '',
          //PER CANVIAR EL FORMAT DE LA DATA, MIRAR "fromat" de <DatePicker> a l'inici del render()
          iniDate: "2019-04-15",
          endDate: '2019-04-15',
          description:'',
          image:'../assets/1.jpg',
          isLoading:false
    }

  }
  async getOfferFromAPI(tokenJson){

    return fetch(`http://10.4.41.164/api/offers/${this.state.id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': tokenJson.token
    }
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson.msg);
      return responseJson;
    }).catch((error) => {
      console.error(error);
    });

  }

  async handleStart() {

    const token = await AsyncStorage.getItem("access_token");
    console.log(token)
    tokenJson = JSON.parse(token);

    const responseOffer = await this.getOfferFromAPI(tokenJson);
    this.setState({isLoading: false})
    if (responseOffer.success) {
      this.setState({ name: responseOffer.name })
      console.log( responseOffer.offer)

    }

  }




  render() {
    //this.handleStart();
    return (
      <LinearGradient colors = {['#F15A24', '#D4145A']}
      start = {[0, 1]}
      end = {[1, 0]}
      style={{
        flex:1,
        padding: '10%',
        paddingTop: '30%'
      }}>

      <View style={{flex: 1, flexDirection: 'row'}}>
        <View >
        </View>


        <View style={{flex: 1}}>

          <Text style={{color: 'white', fontSize: 20, flex: 1}}>Nom</Text>
          <Text style={{color: 'white', fontSize: 20, flex: 1}}>Edat</Text>
          <Text style={{color: 'white', fontSize: 20, flex: 1}}>Raça</Text>
          <Text style={{color: 'white', fontSize: 20, flex: 1}}>Sexe</Text>

        </View>


      </View>
      <View>
        <Text style={{color: 'white', fontSize: 20, flex: 1}}>Description</Text>
      </View>
      </LinearGradient>
    );
  }
}
