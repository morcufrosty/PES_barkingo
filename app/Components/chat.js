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

renderFavorites = () => {
    return placeHolderImages.map((data,index)=>{
      return(
      <View>
        <Image style={{
          borderRadius:40,
          overflow:'hidden',
          marginLeft: 10,
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
          marginBottom: 10,
          width: 100,
          height: 100,
          marginLeft: '5%'
        }} source ={placeHolderImages[index].uri} />
      <Text
        style={{
          position:'absolute',
          top: 60,
          left: 125,
          color: 'white'
        }}
        onPress={()=>Alert.alert("Editar puto gos!")}>Ultim missatge del xat :)
        </Text>
        <Text
        style={{
          position:'absolute',
          top: 40,
          left: 125,
          color: 'white',
          fontWeight: "bold"
        }}
        onPress={()=>Alert.alert("Editar puto gos!")}>Nom del puto gos
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
          paddingTop: '10%',
        }}>
        <Text style={{
          paddingLeft: '5%',
          paddingBottom:'5%',
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
        <ScrollView style={{
            marginBottom: 170}}>
           {this.renderChats()}
          </ScrollView>
      </LinearGradient>
    );
  }
}
