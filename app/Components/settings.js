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
import Icon from 'react-native-vector-icons/FontAwesome';


const initialState = {
    myOffers: [],
    images: [],
    isLoading: true,
    username: '',
    noOffers: false,
    pImage:''
};
export default class Swipe extends React.Component {

    constructor(props) {
        super(props)
        this.state = initialState;
    }
    async handleDeleteUser(tokenJson) {
        const t = await AsyncStorage.getItem('access_token');
        tokenJson = JSON.parse(t);
        const response = await this.deleteFavourite(tokenJson, id);
        console.log("retorna delete user")
        if (response.success) {
            Alert.alert("User has been deleted!", response.msg);
            //navigate cap al login, eliminar access token
        }
        else {
            Alert.alert("User has not been deleted!", response.msg);
        }
    }

    async deleteUser(tokenJson) {
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

    async getProfileImageFromServer(tokenJson, id) {
        return fetch(`http://10.4.41.164/api/users/${id}/image`, {
            method: 'GET',
            headers: {
                Accept: '*',
                'x-access-token': tokenJson.token
            }
        }).then((response => { return response.text() }))

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

        return fetch('http://10.4.41.164/api/offers/currentUser', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': tokenJson.token
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log("THIS IS THE MESSAGE OF OFFERS:" +  responseJson.msg);
                return responseJson;
            }).catch((error) => {
                console.error(error);
            });

    }



    async getCurrentUserFromAPI(tokenJson) {

        return fetch('http://10.4.41.164/api/users/currentUser', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': tokenJson.token
            }
        }).then((response) => response.json())
            .then((responseJson) => {
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
        profileImage = ''

        const responseOffers = await this.getMyOffersFromAPI(tokenJson);
        const responseUser = await this.getCurrentUserFromAPI(tokenJson);

        if(responseUser.success){
           uId = responseUser.user.id;
           this.getProfileImageFromServer(tokenJson, uId).then( (value)=> {
            profileImage = "data:image/jpeg;base64," + value;
            this.setState({pImage: profileImage});})
        }
    

        if (responseOffers.success) {
            ofertesAux = responseOffers.offers

            for (let i = 0; i < ofertesAux.length; i++) {
                let id = ofertesAux[i].id;
                this.getImageFromServer(tokenJson, id, i).then( (value)=> {
                    let images = this.state.images;
                    images[i] = "data:image/jpeg;base64," + value;
                    this.setState({images: images});} )

              }
        }

        else {
            noOfertes = true
        }

        this.setState({ isLoading: false, myOffers: ofertesAux, noOffers: noOfertes, images: imatgesAux, username: responseUser.user.username })

    }

    renderPublications = () => {

        return this.state.myOffers.map((item, index) => {

            return (
                <View>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('perfilAnimalMyOffers', {id: this.state.myOffers[index].id, image: this.state.images[index]} )}
>
                    <Image style={{
                        borderRadius: 5,
                        overflow: 'hidden',
                        marginLeft: 10,
                        width: 200,
                        height: 200,
                        backgroundColor:"#f29797",
                    }} source={{ uri: `${this.state.images[index]}` }}
                    />
                    </TouchableOpacity>

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
            return (<LinearGradient colors={['#F15A24', '#D4145A']}
            start={[0, 1]}
            end={[1, 0]}
            style={{
                flex: 1,
                paddingTop: '20%',
                padding: '5%'
            }}>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    top: 40,
                    right: 15
                }}
                onPress={()  => this.props.navigation.navigate('changeSettings')}>
                <Icon name={"cog"} size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <ScrollView>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    height: 64
                }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('formPerfilUsuari', {onGoBack: () => this.refresh()})}  >
                    <Image style={{
                        borderRadius: 64,
                        overflow: 'hidden',
                        width: 64, height: 64,
                        backgroundColor: "#f29797"
                    }} source={{ uri: this.state.pImage }} />
                </TouchableOpacity>
                <Text style={{ color:"#f29797", fontSize: 20, marginLeft: 10, color: "#f29797", flex: 1, justifyContent: 'center', alignItems: 'center', height: 64, textAlignVertical: 'center' }}>username</Text>

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
                </ScrollView>
                <ActivityIndicator size="small" color="#ffffff" />

                {noOffersMessage}
                <View style={{ flex: 1, marginTop: 10 }}>
                    <Button
                        onPress={() => this.props.navigation.navigate('formNewOffer', { onGoBack: () => this.refresh() })}
                        title="New Publication"
                        color="#ff3b28"

                    />
                </View>           
            </ScrollView>
        </LinearGradient>)
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
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        top: 40,
                        right: 15,
                        height:20,
                        width:20
                    }}
                    onPress={()  => this.props.navigation.navigate('changeSettings')}>
                    <Icon name={"cog"} size={20} color="#FFFFFF" />
                </TouchableOpacity>
                <ScrollView>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        height: 64
                    }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('formPerfilUsuari', {onGoBack: () => this.refresh()})}  >
                        <Image style={{
                            borderRadius: 64,
                            overflow: 'hidden',
                            width: 64, height: 64,
                            backgroundColor: "#f29797"
                        }} source={{ uri: this.state.pImage }} />
                    </TouchableOpacity>
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
                </ScrollView>
            </LinearGradient>
        );
    }
}
