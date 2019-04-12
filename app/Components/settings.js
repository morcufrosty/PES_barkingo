import React, { Component } from 'react';
import {
  StyleSheet, Text, View,
  ScrollView,
  TextInput,
  Alert,
  Platform, 
  Image
} from 'react-native';
import Button from './Button';
import { LinearGradient } from 'expo'
import { Facebook } from 'expo';
import TextInputWTitle from './inputText.js';
import InputPassword from './inputPassword.js';
import { AsyncStorage } from 'react-native';



export default class Swipe extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      myOffers:''

    }
  }


  async getMyOffersFromAPI(){

    return fetch('http://10.4.41.164/api/offers', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': await AsyncStorage.getItem("access_token")
    }
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson.msg);
      return responseJson;
    }).catch((error) => {
      console.error(error);
    });

  }

  async handleOffers(){

  const response = await this.getMyOffersFromAPI();
  
  if(response.success){
    this.setState({myOffers: response.offers})
  }

  else{
    Alert.alert("Error al carregar ofertes");


  }

  }


  render() {
    return (
      <LinearGradient colors={['#F15A24', '#D4145A']}
        start={[0, 1]}
        end={[1, 0]}
        style={{
          flex: 1,
          paddingTop: '20%',
          padding: '5%'
        }}>
        <ScrollView>
          <View style={{
            flex:1,
            flexDirection: 'row',
            height:64
          }}>  
            <Image style={{
              borderRadius:64,
              overflow:'hidden'
            }} source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />        
            <Text style={{fontSize:20, marginLeft:10, color: 'white', flex: 1,justifyContent: 'center', alignItems: 'center', height:64, textAlignVertical: 'center' }}>Your name</Text>
          </View>
          <Text style={{
            paddingTop:'5%',
            paddingBottom:'5%',
            color: 'white'
          }}>Your publications</Text>
          <ScrollView
            horizontal={true}
            style={{
              marginLeft: -10
            }}
          >
            <View>
              <Image style={{
                borderRadius:5,
                overflow:'hidden',
                marginLeft: 10,
                width: 200, 
                height: 200
              }} source ={ require('../assets/1.jpg')} />        
              <Image style={{
                position:'absolute',
                top:10,
                right:10
                }} 
                onPress={() => Alert.alert("S'hauria d'editar el gos")}
                source={{uri: "https://www.pngrepo.com/download/42233/pencil-edit-button.png", width: 40, height: 40}} />        
              <Image style={{
                position:'absolute',
                top:10,
                left:20
                }} 
                onPress={() => Alert.alert("S'hauria d'editar el gos")}
                source={{uri: "https://png.pngtree.com/svg/20170121/delete_286553.png", width: 40, height: 40}} />        
            </View>
            <View>
              <Image style={{
                borderRadius:5,
                overflow:'hidden',
                marginLeft: 10,
                width: 200, 
                height: 200
              }} source ={ require('../assets/2.jpg')} />        
              <Image style={{
                position:'absolute',
                top:10,
                right:10
                }} 
                onPress={() => Alert.alert("S'hauria d'editar el gos")}
                source={{uri: "https://www.pngrepo.com/download/42233/pencil-edit-button.png", width: 40, height: 40}} />        
              <Image style={{
                position:'absolute',
                top:10,
                left:20
                }} 
                onPress={() => Alert.alert("S'hauria d'editar el gos")}
                source={{uri: "https://png.pngtree.com/svg/20170121/delete_286553.png", width: 40, height: 40}} />        
            </View>
            <View>
              <Image style={{
                borderRadius:5,
                overflow:'hidden',
                marginLeft: 10,
                width: 200, 
                height: 200
              }} source ={ require('../assets/3.jpg')} />        
              <Image style={{
                position:'absolute',
                top:10,
                right:10
                }} 
                onPress={() => Alert.alert("S'hauria d'editar el gos")}
                source={{uri: "https://www.pngrepo.com/download/42233/pencil-edit-button.png", width: 40, height: 40}} />        
              <Image style={{
                position:'absolute',
                top:10,
                left:20
                }} 
                onPress={() => Alert.alert("S'hauria d'editar el gos")}
                source={{uri: "https://png.pngtree.com/svg/20170121/delete_286553.png", width: 40, height: 40}} />        
            </View>
            
          </ScrollView>

          <View style={{ flex: 1, marginTop: 10 }}>
            <Button
              onPress={() => Alert.alert("S'hauria d'anar a ajustaments")}
              title="Settings"
              color="#ff3b28"
              
            />
          </View>

          <View style={{ flex: 1, marginTop: 10 }}>
            <Button
              onPress={() => Alert.alert("S'haurien d'obrir coses")}
              title="New Publication"
              color="#ff3b28"
              
            />
          </View>

          <View style={{ flex: 1, marginTop: 10 }}>
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
        </ScrollView>
      </LinearGradient>
    );
  }
}
