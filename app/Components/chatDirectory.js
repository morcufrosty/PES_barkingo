import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Alert, Platform, Image, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native';
import Button from './Button';
import { LinearGradient } from 'expo';
import { Facebook } from 'expo';
import TextInputWTitle from './inputText.js';
import InputPassword from './inputPassword.js';
import { decompressFromUTF16 } from 'lz-string';
import { AsyncStorage } from 'react-native';
import ImageComponent from './ImageComponent';

export default class ChatDirectory extends React.Component {
    constructor(props) {
        super(props);
        this.navigationWillFocusListener = props.navigation.addListener('willFocus', () => {
            this.refresh();
        })
        this.state = {
            favouriteOffers: [],
            images: [],
            isLoading: true,
            chats: []
        }
    }

    refresh() {
        this.setState({
            favouriteOffers: [],
            images: [],
            isLoading: true
        })
    }

    async getImageFromServer(tokenJson, id) {
        return fetch(`http://10.4.41.164/api/offers/${id}/image`, {
            method: 'GET',
            headers: {
                Accept: '*',
                'x-access-token': tokenJson.token,
            },
        }).then(response => {
            return response.text();
        });
    }

    async cacheImage(id, image) {
        await AsyncStorage.setItem(id, image);
    }

    async getImage(id) {
        return await AsyncStorage.getItem(id);
    }
    async handleDeleteChat(id, index) {
        const t = await AsyncStorage.getItem('access_token');
        tokenJson = JSON.parse(t);
        const response = await this.deleteFavourite(tokenJson, id);
        console.log('retorna delete');
        if (response.success) {
            let auxFav = this.state.favouriteOffers;
            let auxImg = this.state.images;
            auxFav.splice(index, 1);
            auxImg.splice(index, 1);
            this.setState({ favouriteOffers: auxFav, images: auxImg });
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
                'x-access-token': tokenJson.token,
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson.msg);
                return responseJson;
            })
            .catch(error => {
                console.error(error);
            });
    }

    async getCurrentUserFromAPI(tokenJson) {
        return fetch('http://10.4.41.164/api/users/currentUser', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': tokenJson.token,
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                return responseJson;
            })
            .catch(error => {
                console.error(error);
            });
    }

    async getUserInfoFromAPI(tokenJson, id) {
        return fetch(`http://10.4.41.164/api/users/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': tokenJson.token,
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                return responseJson;
            })
            .catch(error => {
                console.error(error);
            });
    }

    async getProfileImageFromServer(tokenJson, id) {
        return fetch(`http://10.4.41.164/api/users/${id}/image`, {
            method: 'GET',
            headers: {
                Accept: '*',
                'x-access-token': tokenJson.token,
            },
        }).then(response => {
            return response.text();
        });
    }

    async getMyOffersFromAPI(tokenJson) {
        return fetch('http://10.4.41.164/api/offers/currentUser', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': tokenJson.token
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log("THIS IS THE MESSAGE OF OFFERS:" + responseJson.msg);
                return responseJson;
            })
            .catch(error => {
                console.error(error);
            });
    }

    async getOfferInfoFromAPI(tokenJson, id) {
        return fetch(`http://10.4.41.164/api/offers/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': tokenJson.token,
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                return responseJson;
            })
            .catch(error => {
                console.error(error);
            });
    }

    async getImageFromServer(tokenJson, id) {
        return fetch(`http://10.4.41.164/api/offers/${id}/image`, {
            method: 'GET',
            headers: {
                Accept: '*',
                'x-access-token': tokenJson.token
            }
        }).then((response => {
            return response.text();
        }))

    }

    async handleGetChats() {
        let ofertesAux = [];
        chatAux = [];
        let myOffers = [];
        let myOffersIds = [];

        const t = await AsyncStorage.getItem('access_token');
        tokenJson = JSON.parse(t);

        const myOffersResponse = await this.getMyOffersFromAPI(tokenJson);

        if (myOffersResponse.success) {
            myOffers = myOffersResponse.offers;
            for (let i = 0; i < myOffers.length; i++) {

                myOffersIds[i] = myOffers[i].id

            }
        }

        let currentUser = await this.getCurrentUserFromAPI(tokenJson);

        const response = await this.getMyChatsFromAPI(tokenJson);

        if (response.success) {
            chatResponse = response.offers;
            console.log('current user', currentUser.user.id);

            for (let i = 0; i < chatResponse.length; i++) {
                offer = false;
                user = false;
                let chatOfferId = chatResponse[i].idOffer;
                let chatUserId = chatResponse[i].idUser;

                if (myOffersIds.includes(chatOfferId)) {
                    user = true;
                } else offer = true;

                if (user) {
                    responseUser = await this.getUserInfoFromAPI(tokenJson, chatUserId);
                    responseOffer = await this.getOfferInfoFromAPI(tokenJson, chatOfferId);

                    if (responseUser.success && responseOffer.success) {
                        chatAux[i] = { name: responseUser.user.username, desc: ' (interested in ' + responseOffer.offer.name + ')', type: 'user', chatInfo: chatResponse[i], currentUser: currentUser.user.id, id:chatUserId };
                    }
                } else if (offer) {
                    responseOffer = await this.getOfferInfoFromAPI(tokenJson, chatOfferId);
                    responseUser = await this.getUserInfoFromAPI(tokenJson, chatUserId);

                    if (responseOffer.success && responseUser.success) {
                        chatAux[i] = { name: responseOffer.offer.name, desc: ' (' + responseUser.user.username + "'s pet)", chatInfo: chatResponse[i], currentUser: currentUser.user.id, id:chatOfferId };
                       

                        // console.log(responseOffer.offer.name);
                    }
                }


                /*
            this.getImageFromServer(tokenJson, id, i).then( (value)=> {
                let images = this.state.images;
                images[i] = "data:image/jpeg;base64," + value;
                this.setState({images: images});} ) */

            }

        }

        this.setState({ isLoading: false, chats: chatAux });
    }

    async getMyChatsFromAPI(tokenJson) {
        return fetch('http://10.4.41.164/api/chats', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': tokenJson.token,
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson.msg);
                return responseJson;
            })
            .catch(error => {
                console.error(error);
            });
    }


    renderChats = () => {
        return this.state.chats.map((data, index) => {
            return (
                <View style={{ flexDirection: 'row', padding: '2%' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('chatScreen', { chat: data })}
                        onLongPress={() =>
                            Alert.alert(
                                'UnFavourite',
                                'Remove from favourited list',
                                [
                                    {
                                        text: 'Cancel',
                                        onPress: () => console.log('Cancel Pressed'),
                                        style: 'cancel',
                                    },
                                    { text: 'OK', onPress: () => this.handleDeleteFavourite(this.state.chats[index].id, index) },
                                ],
                                { cancelable: false },
                            )}>
                        <ImageComponent id={data} />
                    </TouchableOpacity>
                    <Text style={{
                        color: 'white', fontSize: 20, bottom: 20, marginLeft: '2%', marginRight: '2%', justifyContent: 'center', alignItems: 'center', textAlignVertical: 'center'
                    }}>{this.state.chats[index].name}</Text>
                    <Text style={{
                        fontStyle: "italic", color: 'white', bottom: 20, fontSize: 15, marginLeft: '1%', marginRight: '2%', justifyContent: 'center', alignItems: 'center', textAlignVertical: 'center'
                    }}>{this.state.chats[index].desc}</Text>

                </View>
            );
        });
    };


    render() {
        if (this.state.isLoading) {
            this.handleGetChats();

            return (
                <LinearGradient
                    colors={['#F15A24', '#D4145A']}
                    start={[0, 1]}
                    end={[1, 0]}
                    style={{
                        flex: 1,
                        paddingTop: 30,
                    }}
                >
                    <Text
                        style={{
                            paddingLeft: '5%',
                            paddingBottom: 5,
                            color: 'white',
                            fontSize: 30,
                            fontWeight: 'bold',
                        }}
                    >
                        Chats
                    </Text>
                    <ScrollView
                        horizontal={false}
                        style={{
                            height: '90%',
                        }}
                    >
                        <ActivityIndicator size="small" color="#ffffff" />

                    </ScrollView>
                    {/* Aqui shan de fer ifs. Si no hi ha cap favorited que no surti i si ningu ha fet favorited dons que no surti */}

                </LinearGradient>);
        }



        return (
            <LinearGradient
                colors={['#F15A24', '#D4145A']}
                start={[0, 1]}
                end={[1, 0]}
                style={{
                    flex: 1,
                    paddingTop: 30,
                }}
            >
                <Text
                    style={{
                        paddingLeft: '5%',
                        paddingBottom: 5,
                        color: 'white',
                        fontSize: 30,
                        fontWeight: 'bold',
                    }}
                >
                    Chats
                </Text>
                <ScrollView
                    horizontal={false}
                    style={{
                        height: '90%',
                    }}
                >
                    {this.renderChats()}
                </ScrollView>
                {/* Aqui shan de fer ifs. Si no hi ha cap favorited que no surti i si ningu ha fet favorited dons que no surti */}
            </LinearGradient>
        );
    }
}
