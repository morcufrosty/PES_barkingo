import React, { Component } from 'react';
import {
    StyleSheet, Text, View,
    ScrollView,
    TextInput,
    Alert,
    Platform, Image, TouchableOpacity

} from 'react-native';
import Button from './Button';
import { LinearGradient } from 'expo'
import { Facebook } from 'expo';
import TextInputWTitle from './inputText.js';
import InputPassword from './inputPassword.js';
import { AsyncStorage } from 'react-native';
import strings from '../i18n/i18n';

export default class perfilAnimalMyOffers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '1',
            uId: '',
            name: '',
            type: '',
            species: '',
            race: '',
            sex: 'Male',
            age: '',
            //PER CANVIAR EL FORMAT DE LA DATA, MIRAR "fromat" de <DatePicker> a l'inici del render()
            iniDate: "2019-04-15",
            endDate: '2019-04-15',
            description: '',
            image: '',
            ownerName:'',
            ownerImage:'',
            ownerDesc:'',
            isLoading: true
        }

    }
    async getOfferInfoFromAPI(tokenJson, id) {

        return fetch(`http://10.4.41.164/api/offers/${id}`, {
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

    async getProfileImageFromServer(tokenJson, id) {
        return fetch(`http://10.4.41.164/api/users/${id}/image`, {
            method: 'GET',
            headers: {
                Accept: '*',
                'x-access-token': tokenJson.token
            }
        }).then((response => { return response.text() }))

    }


    async getUserInfoFromAPI(tokenJson, id) {

        return fetch(`http://10.4.41.164/api/users/${id}`, {
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
        var desc, name, race, age, id, image, uIdd, ownerN, ownerD, ownerI
        id = this.props.navigation.getParam('id', '1')
        image = this.props.navigation.getParam('image', 'undefined')
        console.log(id)
        const token = await AsyncStorage.getItem("access_token");
        tokenJson = JSON.parse(token);
        const responseOffer = await this.getOfferInfoFromAPI(tokenJson, id);
        if (responseOffer.success) {
            name = responseOffer.offer.name,
            desc = responseOffer.offer.description,
            race = responseOffer.offer.raceName,
            age = responseOffer.offer.age,
            uIdd = responseOffer.offer.idOwner

                console.log(responseOffer);
                console.log(uIdd);
                const responseUser = await this.getUserInfoFromAPI(tokenJson, uIdd);
                console.log(responseUser);
                ownerN = responseUser.user.username;
                ownerD = responseUser.user.bio;

            this.getProfileImageFromServer(tokenJson,  uIdd).then( (value)=> {
                profileImage = "data:image/jpeg;base64," + value;
                this.setState({ownerImage: profileImage});})



        }
        this.setState({
            name: name,
            description: desc,
            race: race,
            age: age,
            isLoading: false,
            image: image,
            uId: uIdd,
            ownerDesc: ownerD,
            ownerName: ownerN
        })
    }


    resetState(){
        this.setState({isLoading: false, id: '1', image: ''})
    }

    
    render() {
        if (this.state.isLoading) {
            this.handleStart();
            return <LinearGradient colors={['#F15A24', '#D4145A']}
                start={[0, 1]}
                end={[1, 0]}
                style={{
                    flex: 1,
                    padding: '10%',
                    paddingTop: '30%'
                }}>

            </LinearGradient>;
        }

        return (
            <LinearGradient colors={['#F15A24', '#D4145A']}
            start={[0, 1]}
            end={[1, 0]}
            style={{
                flex: 1,
            }}>
            <View style={{ flex: 1 }}>
                <Image style={{
                    width: '100%',
                    height: '50%',
                }} source={{ uri: `${this.state.image}` }} />
                <ScrollView>
                    <Text style={{ marginTop: '5%', color: 'white', fontSize: 30, fontWeight: 'bold', marginLeft: '10%' }}>{this.state.name}</Text>
                    <Text style={{ color: 'white', fontSize: 20, marginLeft: '10%' }}>{strings('perfilAnimal.age', {a: this.state.age})}</Text>
                    <Text style={{ color: 'white', fontSize: 20, marginLeft: '10%' }}>{strings('perfilAnimal.race', {r: this.state.race})}</Text>
                    <Text style={{ color: 'white', fontSize: 20,  marginLeft: '10%' }}>{strings('perfilAnimal.sex', {s: this.state.sex})}</Text>
                    <Text style={{ color: 'white', fontSize: 20, marginLeft: '10%', marginBottom:'5%'}}>{strings('perfilAnimal.description')} {this.state.description}</Text>
                    <View style={{marginBottom:'20%', marginLeft:'10%', marginRight:'10%', borderRadius: 5, backgroundColor: 'rgba(255, 255, 255, 0.2)'}}>
                        <View style={{flexDirection: 'row', padding:'5%'}} >
                            <Image style={{
                                borderRadius: 64,
                                overflow: 'hidden'
                            }} source={{ uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64 }} />
                            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 25, marginLeft: '10%', marginRight: '10%', justifyContent: 'center', alignItems: 'center', textAlignVertical: 'center' 
                         }}>{this.state.ownerName}</Text>
                        </View>
                        <Text style={{ color: 'white', fontSize: 20, marginLeft: '10%', marginBottom:'5%', marginRight:'5%' }}>{this.state.ownerDesc}</Text>
                    </View>
                </ScrollView>
            </View>
        </LinearGradient>
        );
    }
}