import React, { Component } from 'react';
import {
    StyleSheet, Text, View,
    ScrollView,
    TextInput,
    Alert,
    Platform,
    Image,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import Button from './Button';
import { LinearGradient } from 'expo'
import { Facebook } from 'expo';
import TextInputWTitle from './inputText.js';
import InputPassword from './inputPassword.js';
import { decompressFromUTF16 } from 'lz-string';
import { AsyncStorage } from 'react-native';


const placeHolderImages = [
    { id: "1", uri: require('../assets/1.jpg') },
    { id: "2", uri: require('../assets/2.jpg') },
    { id: "3", uri: require('../assets/3.jpg') },
    { id: "4", uri: require('../assets/4.jpg') },
    { id: "5", uri: require('../assets/5.jpg') },
    { id: "6", uri: require('../assets/3.jpg') },
    { id: "7", uri: require('../assets/4.jpg') },
    { id: "8", uri: require('../assets/5.jpg') }
]

export default class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            favouriteOffers: [],
            images: [],
            isLoading: true,
        }
    }

    async getImageFromServer(tokenJson, id) {


        return fetch(`http://10.4.41.164/api/offers/${id}/image`, {
            method: 'GET',
            headers: {
                Accept: '*',
                'x-access-token': tokenJson.token
            }
        }).then((response => { return response.text() }));

    }

    async cacheImage(id, image) {
        await AsyncStorage.setItem(id, image);
    }

    async getImage(id) {
        return await AsyncStorage.getItem(id);
    }


    async handleGetFavouriteOffers() {

        let ofertesAux = []
        let imatgesAux = []
        const t = await AsyncStorage.getItem('access_token');
        tokenJson = JSON.parse(t);
        const response = await this.getMyFavouritesFromAPI(tokenJson);

        if (response.success) {
            ofertesAux = response.offers

            for (let i = 0; i < ofertesAux.length; i++) {
                let id = ofertesAux[i].id;
                let image = await this.getImageFromServer(tokenJson, id);
                imatgesAux[i] = image;
            }

        }

        this.setState({ isLoading: false, favouriteOffers: ofertesAux, images: imatgesAux })

    }

    async getMyFavouritesFromAPI(tokenJson) {

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
        return this.state.favouriteOffers.map((data, index) => {
            return (
                <View>
                    <Image style={{
                        borderRadius: 40,
                        overflow: 'hidden',
                        marginLeft: 5,
                        marginRight: 5,
                        width: 80,
                        height: 80
                    }} source={{ uri: `data:image/jpeg;base64,${this.state.images[index]}` }} />
                </View>
            )
        })
    }

    renderChats = () => {
        return this.state.favouriteOffers.map((data, index) => {
            return (
                <View>
                    <Image style={{
                        borderRadius: 50,
                        overflow: 'hidden',
                        marginBottom: 5,
                        marginTop: 5,
                        width: 100,
                        height: 100,
                        marginLeft: '5%'
                    }} source={{ uri: `data:image/jpeg;base64,${this.state.images[index]}` }} />
                    <Text
                        style={{
                            position: 'absolute',
                            top: 30,
                            left: 125,
                            color: 'white',
                            fontWeight: "bold"
                        }}
                        onPress={() => Alert.alert("Editar puto gos!")}>{data.name}
                    </Text>
                    <Text
                        style={{
                            position: 'absolute',
                            top: 50,
                            left: 125,
                            color: 'white'
                        }}
                        onPress={() => Alert.alert("Editar puto gos!")}>Ultim missatge del xat :)
        </Text>

                </View>
            )
        })
    }

    render() {
        if (this.state.isLoading) {



            this.handleGetFavouriteOffers();
            console.log(this.state.favouriteOffers);
            this.setState({ isLoading: false });

            return <LinearGradient colors={['#F15A24', '#D4145A']}
                start={[0, 1]}
                end={[1, 0]}
                style={{
                    flex: 1,
                    padding: '10%',
                    paddingTop: '30%'
                }}>
                <ActivityIndicator size="small" color="#ffffff" />


            </LinearGradient>;



        }
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
                    fontSize: 30,
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
                    paddingTop: '5%',
                    color: 'white',
                    fontSize: 30,
                    fontWeight: 'bold'
                }}>Chats</Text>
                <ScrollView>
                    {this.renderChats()}
                </ScrollView>
            </LinearGradient>
        );
    }
}
