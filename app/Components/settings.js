import React, { Component } from 'react';
import {
    StyleSheet, Text, View,
    ScrollView,
    TextInput,
    Alert,
    Platform,
    Image,
    TouchableOpacity,
    ToastAndroid,
    ActivityIndicator
} from 'react-native';
import Button from './Button';
import { LinearGradient } from 'expo'
import { Facebook } from 'expo';


import TextInputWTitle from './inputText.js';
import InputPassword from './inputPassword.js';
import { AsyncStorage } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
const blankImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8NH36fwAHxAMhxQoqFAAAAABJRU5ErkJggg==";

const initialState = {
    myOffers: [],
    images: [],
    isLoading: true,
    username: '',
    noOffers: false
};
export default class Swipe extends React.Component {

    constructor(props) {
        super(props)
        this.state = initialState;
    }


    async handleDeleteOffer(id) {
        this.setState({ isLoading: true, myOffers: [] })
        const t = await AsyncStorage.getItem('access_token');
        tokenJson = JSON.parse(t);
        console.log(tokenJson);
        const response = await this.deleteOffer(tokenJson, id);

        console.log(response);
        if (response.success) {
            ToastAndroid.showWithGravityAndOffset(
                'Offer deleted succesfully',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50,
            );
        }
        else {
            Alert.alert("No ha borrat", response.msg);
        }
    }

    async deleteOffer(tokenJson, id) {
        console.log(id);
        return fetch(`http://10.4.41.164/api/offers/${id}`, {
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

    async getMyOffersFromAPI(tokenJson) {

        return fetch('http://10.4.41.164/api/myOffers', {
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

    async getUserFromAPI(tokenJson) {

        return fetch('http://10.4.41.164/api/user', {
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

    async cacheImage(id, image) {
        await AsyncStorage.setItem(id, image);
    }

    async getImage(id) {
        return await AsyncStorage.getItem(id);
    }


    async getImageFromServer(tokenJson, id) {
        return fetch(`http://10.4.41.164/api/offers/${id}/image`, {
            method: 'GET',
            headers: {
                Accept: '*',
                'x-access-token': tokenJson.token
            }
        }).then((response => { return response.text() }))

    }

    editOffer(id) {
        this.props.navigation.navigate('formNewOffer', { id: id, update: true, onGoBack: () => this.refresh() });
    }

    refresh() {
        this.setState(initialState)
    }

    async handleStart() {

        const token = await AsyncStorage.getItem("access_token");
        tokenJson = JSON.parse(token);
        ofertesAux = []
        imatgesAux = []
        noOfertes = false

        const responseOffers = await this.getMyOffersFromAPI(tokenJson);
        const responseUser = await this.getUserFromAPI(tokenJson);

        if (responseOffers.success) {
            ofertesAux = responseOffers.offers
            console.log(ofertesAux);

            for (let i = 0; i < ofertesAux.length; i++) {
                let id = ofertesAux[i].id;
                this.getImageFromServer(tokenJson, id, i).then( (value)=> {
                    let images = this.state.images;
                    images[i] = "data:image/jpeg;base64," + value;
                    this.setState({images: images});} ) 
        
                imatgesAux[i] = blankImage;
        
              }
        }

        else {
            noOfertes = true
        }

        this.setState({ isLoading: false, myOffers: ofertesAux, noOffers: noOfertes, images: imatgesAux, username: responseUser.name })
    }

    renderPublications = () => {

        return this.state.myOffers.map((item, index) => {

            return (
                <View>
                    <Image style={{
                        borderRadius: 5,
                        overflow: 'hidden',
                        marginLeft: 10,
                        width: 200,
                        height: 200
                    }} source={{ uri: `${this.state.images[index]}` }} />
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            top: 10,
                            right: 10
                        }}
                        onPress={() => this.editOffer(item.id)}>
                        <Image
                            source={{ uri: "https://www.pngrepo.com/download/42233/pencil-edit-button.png", width: 40, height: 40 }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            top: 10,
                            left: 20
                        }}
                        onPress={() => this.handleDeleteOffer(item.id)}>
                        <Image
                            source={{ uri: "https://png.pngtree.com/svg/20170121/delete_286553.png", width: 40, height: 40 }} />
                    </TouchableOpacity>
                </View>
            )
        })
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

                <ActivityIndicator size="small" color="#ffffff" />

            </LinearGradient>;
        }

        var noOffersMessage;
        if (this.state.noOffers) {
            noOffersMessage = (
                <View style={{
                    paddingBottom: 30
                }}>
                    <Text style={{ color: 'white', opacity: 0.5, fontStyle: "italic" }}>{"You haven't created any publications"}</Text>
                </View>
            );
        } else {
            noOffersMessage = (
                <View>
                </View>
            );
        }

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
                        flex: 1,
                        flexDirection: 'row',
                        height: 64
                    }}>
                        <Image style={{
                            borderRadius: 64,
                            overflow: 'hidden'
                        }} source={{ uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64 }} />
                        <Text style={{ fontSize: 20, marginLeft: 10, color: 'white', flex: 1, justifyContent: 'center', alignItems: 'center', height: 64, textAlignVertical: 'center' }}>{this.state.username}</Text>
                    </View>
                    <Text style={{
                        paddingTop: '5%',
                        paddingBottom: '5%',
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
                    {noOffersMessage}
                    <View style={{ flex: 1, marginTop: 10 }}>
                        <Button
                            onPress={() => this.props.navigation.navigate('formNewOffer', { onGoBack: () => this.refresh() })}
                            title="New Publication"
                            color="#ff3b28"

                        />
                    </View>

                    <View style={{ flex: 1, marginTop: 10 }}>
                        <Button
                            onPress={() => this.setState({ isLoading: true, myOffers: [] })
                            }
                            title="Settings"
                            color="#ff3b28"

                        />
                    </View>

                    <View style={{ flex: 1, marginTop: 10 }}>

                        <Button
                            onPress={async () => {

                                await AsyncStorage.removeItem('access_token');
                                const resetAction = StackActions.reset({
                                    index: 0,
                                    actions: [NavigationActions.navigate({ routeName: 'Login' })],
                                });
                                this.props.navigation.dispatch(resetAction);
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
