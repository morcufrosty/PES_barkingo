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
import { AsyncStorage } from 'react-native';

const Users = [
  { id: "1", uri: require('../assets/1.jpg') },
  { id: "2", uri: require('../assets/2.jpg') },
  { id: "3", uri: require('../assets/3.jpg') },
  { id: "4", uri: require('../assets/4.jpg') },
  { id: "5", uri: require('../assets/5.jpg') }
]

export default class Swipe extends React.Component {


  renderPublications = () => {
    return Users.map((data)=>{
      return(
      <View>
        <Image style={{
          borderRadius:5,
          overflow:'hidden',
          marginLeft: 10,
          width: 200, 
          height: 200
        }} source ={data.uri} /> 
      <TouchableOpacity 
        style={{
          position:'absolute',
          top:10,
          right:10
        }}
        onPress={()=>Alert.alert("Editar puto gos!")}>
          <Image
            source={{uri: "https://www.pngrepo.com/download/42233/pencil-edit-button.png", width: 40, height: 40}} />        
        </TouchableOpacity>
        <TouchableOpacity 
          style={{
            position:'absolute',
            top:10,
            left:20
          }}
        onPress={()=>Alert.alert("Eliminar puto gos!")}>
          <Image
            source={{uri: "https://png.pngtree.com/svg/20170121/delete_286553.png", width: 40, height: 40}} />        
        </TouchableOpacity>
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
           {this.renderPublications()}       
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
