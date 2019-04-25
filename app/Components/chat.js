import React, { Component } from 'react';
import {
  StyleSheet, Text, View,
  ScrollView,
  TextInput,
  Alert,
  Platform,
  Image,
  TouchableOpacity
} from 'react-native';
import Button from './Button';
import { LinearGradient } from 'expo'
import { Facebook } from 'expo';
import TextInputWTitle from './inputText.js';
import InputPassword from './inputPassword.js';


const placeHolderImages = [
  { id: "1", uri: require('../assets/1.jpg') },
  { id: "2", uri: require('../assets/2.jpg') },
  { id: "3", uri: require('../assets/3.jpg') },
  { id: "4", uri: require('../assets/4.jpg') },
  { id: "5", uri: require('../assets/5.jpg') }
]

export default class Chat extends React.Component {
  constructor() {
    super()
    this.state = {
      favouriteOffers:[],
      images:[],
      isLoading:true,
    }
  }

  async handleGetFavouriteOffers(){

    const t = await AsyncStorage.getItem('access_token');
    tokenJson = JSON.parse(t);
    const response = await this.getOffers(tokenJson);
    console.log(response);
    if(response.success){
      this.setState({favouriteOffers: response.offers});
    }
    else{
      Alert.alert("Error", response.msg);
    }
  }

  async getMyFavouritesFromAPI(tokenJson){

    return fetch('http://10.4.41.164/api/favouriteOffers', {
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



renderFavorites = () => {
    return placeHolderImages.map((data,index)=>{
      return(
      <View>
        <Image style={{
          borderRadius:40,
          overflow:'hidden',
          marginLeft: 5,
          marginRight: 5,
          width: 80,
          height: 80
        }} source ={placeHolderImages[index].uri} />
      </View>
      )
    })
  }

  renderChats = () => {
    return placeHolderImages.map((data,index)=>{
      return(
      <View>
        <Image style={{
          borderRadius:50,
          overflow:'hidden',
          marginBottom: 5,
          marginTop: 5,
          width: 100,
          height: 100,
          marginLeft: '5%'
        }} source ={placeHolderImages[index].uri} />
      <Text
      style={{
        position:'absolute',
        top: 30,
        left: 125,
        color: 'white',
        fontWeight: "bold"
      }}
      onPress={()=>Alert.alert("Editar puto gos!")}>Nom del puto gos
      </Text>
      <Text
        style={{
          position:'absolute',
          top: 50,
          left: 125,
          color: 'white'
        }}
        onPress={()=>Alert.alert("Editar puto gos!")}>Ultim missatge del xat :)
        </Text>
        
      </View>
      )
    })
  }

  render() {
    return (
      <LinearGradient colors={['#F15A24', '#D4145A']}
        start={[0, 1]}
        end={[1, 0]}
        style={{
        flex: 1,
        paddingTop: 30
        }}
      >
        <Text style={{
          paddingLeft: '5%',
          paddingBottom: 5,
          color: 'white',
          fontSize:30,
          fontWeight: 'bold'
        }}>Favorited</Text>
        <ScrollView
          horizontal={true}
          style={{
            height: 110,
          }}
        >
          {this.renderFavorites()}
        </ScrollView>
        <Text style={{
            paddingLeft: '5%',
            paddingTop:'5%',
            color: 'white',
            fontSize:30,
            fontWeight: 'bold'
          }}>Chats</Text>
        <ScrollView>
           {this.renderChats()}
          </ScrollView>
      </LinearGradient>
    );
  }
}
