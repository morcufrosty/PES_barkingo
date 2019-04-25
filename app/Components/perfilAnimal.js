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
          id: this.props.navigation.getParam('id', '1'),
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
          isLoading: true
    }

  }
  async getOfferInfoFromAPI(tokenJson){

    return fetch(`http://10.4.41.164/api/offers/${this.state.id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': tokenJson.token
    }
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      return responseJson;
    }).catch((error) => {
      console.error(error);
    });

  }

  async handleStart() {

    console.log(this.state.id)
    const token = await AsyncStorage.getItem("access_token");
    tokenJson = JSON.parse(token);
    const responseOffer = await this.getOfferInfoFromAPI(tokenJson);
    if (responseOffer.success) {
      this.setState({ name: responseOffer.offer.name,
        description: responseOffer.offer.description, 
        race: responseOffer.offer.raceName,
        age: responseOffer.offer.age

       })
      console.log(this.state)

    }
      this.setState({isLoading:false})

  }




  render() {
    if (this.state.isLoading) {
      this.handleStart();
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

          <Text style={{color: 'white', fontSize: 20, flex: 1}}>Name: {this.state.name}</Text>
          <Text style={{color: 'white', fontSize: 20, flex: 1}}>Age: {Math.floor(Math.random()*17) + 1}</Text>
          <Text style={{color: 'white', fontSize: 20, flex: 1}}>Race: {this.state.race}</Text>
          <Text style={{color: 'white', fontSize: 20, flex: 1}}>Sex: {this.state.sex}</Text>
          <Text style={{color: 'white', fontSize: 20, flex: 1}}>Description: {this.state.description}</Text>


        </View>


      </View>
      <View>
      </View>
      </LinearGradient>
    );
  }
}
