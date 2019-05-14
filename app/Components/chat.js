import React, { Component } from 'react';
import {
    StyleSheet, Text, View,
    ScrollView,
    TextInput,
    Alert,
    Platform,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import Button from './Button';
import { LinearGradient } from 'expo'
import { Facebook } from 'expo';
import TextInputWTitle from './inputText.js';
import InputPassword from './inputPassword.js';
import { decompressFromUTF16 } from 'lz-string';
import { AsyncStorage } from 'react-native';


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
    async handleDeleteFavourite(id, index) {
        const t = await AsyncStorage.getItem('access_token');
        tokenJson = JSON.parse(t);
        const response = await this.deleteFavourite(tokenJson, id);
        console.log("retorna delete")
        if (response.success) {
            let auxFav = this.state.favouriteOffers;
            let auxImg = this.state.images;
            auxFav.splice(index, 1);
            auxImg.splice(index, 1);
            this.setState({favouriteOffers : auxFav, images : auxImg});
        }
        else {
            Alert.alert("Favorite offer has not been deleted!", response.msg);
        }
    }

    async deleteFavourite(tokenJson, id) {
        console.log(id);
        return fetch(`http://10.4.41.164/api/offers/${id}/favourite`, {
            method: 'DELETE',
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
                this.getImageFromServer(tokenJson, id, i).then( (value)=> {
                    let images = this.state.images;
                    images[i] = "data:image/jpeg;base64," + value;
                    this.setState({images: images});} ) 
                
              }

        }

        this.setState({ isLoading: false, favouriteOffers: ofertesAux, images: imatgesAux })

    }

    async getMyFavouritesFromAPI(tokenJson) {

        return fetch('http://10.4.41.164/api/offers/favourite', {
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
                <View style={{flexDirection: 'row', padding:'2%'}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('perfilAnimalFavorites', {id: this.state.favouriteOffers[index].id, image: this.state.images[index]} )}
                    onLongPress={()=>
                        Alert.alert(
                            'UnFavourite',
                            'Remove from favourited list',
                            [
                              {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                              },
                              {text: 'OK', onPress:  () => this.handleDeleteFavourite(this.state.favouriteOffers[index].id, index)},
                            ],
                            {cancelable: false},
                          )}>
                    <Image style={{
                        borderRadius: 40,
                        overflow: 'hidden',
                        marginLeft: 5,
                        marginRight: 5,
                        width: 80,
                        height: 80,
                        backgroundColor:"#f29797"
                    }} source={{ uri: `${this.state.images[index]}` }} />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 20, marginLeft: '2%', marginRight: '2%', justifyContent: 'center', alignItems: 'center', textAlignVertical: 'center' 
                         }}>{this.state.favouriteOffers[index].name}</Text>                
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
                        marginLeft: '5%',
                        backgroundColor:"#f29797"
                    }} source={{ uri: `${this.state.images[index]}` }} />
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
                    horizontal={false}
                    style={{
                        height: 110,
                    }}
                >
                    {this.renderFavorites()}
                </ScrollView>
            </LinearGradient>
        );
    }
}
