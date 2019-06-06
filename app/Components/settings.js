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
import strings from '../i18n/i18n';
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
            Alert.alert(strings('settings.userDeleted'), response.msg);
            //navigate cap al login, eliminar access token
        }
        else {
            Alert.alert(strings('settings.errorUserDeleted'), response.msg);
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

    async handleDeleteOffer(id, del) {
        const t = await AsyncStorage.getItem('access_token');
        tokenJson = JSON.parse(t);
        console.log(tokenJson);
        const response = await this.deleteOffer(tokenJson, id);

        console.log(response);
        if (response.success && del) {
            ToastAndroid.showWithGravityAndOffset(
                strings('settings.offerDeleted'),
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50,
                
            );

        }
        else if(del) {
            Alert.alert(strings('settings.errorOfferDeleted'), response.msg);
        }
        this.setState({  myOffers: [],
            images: [],
            isLoading: true,
            username: '',
            noOffers: false,
            pImage:'' })
        return response;
        
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
    async handleFinishOffer(id, index) {
        const t = await AsyncStorage.getItem('access_token');
        tokenJson = JSON.parse(t);
        const response = await this.finishOffer(tokenJson, id);
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

    async finishOffer(tokenJson, id) {
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
                        onPress={() => this.handleDeleteOffer(item.id, true)}>
                        <Image
                            source={{ uri: "https://png.pngtree.com/svg/20170121/delete_286553.png", width: 40, height: 40 }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        left: 10,
                        zIndex: 100,
                        height: 35,
                        width: 35
                    }}
                    onPress={async () => 
                
                        Alert.alert(
                            'Finalitzar oferta',
                            'Està segur que desitja finalitzar la oferta?',
                            [
                              {text: 'No', onPress: () => console.log("NO")},
                              {text: 'Si', onPress: async () =>{
                                  let res =await this.handleDeleteOffer(item.id, false)

                                  if(res.success){
                                  ToastAndroid.showWithGravityAndOffset(
                                    "Oferta finalitzada!",
                                    ToastAndroid.SHORT,
                                    ToastAndroid.BOTTOM,
                                    25,
                                    50,
                                );}
                                }},
                            ],
                            {cancelable: false},
                          )
                    
                    }>
                    <Image
                        source={{ uri: "https://cdn1.iconfinder.com/data/icons/basic-ui-elements-coloricon/21/15-512.png",   height: 35,
                        width: 35}} />
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
                <Text style={{ color:"#f29797", fontSize: 20, marginLeft: 10, color: "#f29797", flex: 1, justifyContent: 'center', alignItems: 'center', height: 64, textAlignVertical: 'center' }}>{strings('settings.username')}</Text>

                </View>
                <Text style={{
                    paddingTop: '5%',
                    paddingBottom: '5%',
                    color: 'white'
                }}>{strings('settings.publications')}</Text>
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
                        title={strings('settings.newPublication')}
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
                    <Text style={{ color: 'white', opacity: 0.5, fontStyle: "italic" }}>{strings('settings.noPublications')}</Text>
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
                    }}>{strings('settings.publications')}</Text>
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
                            title={strings('settings.newPublication')}
                            color="#ff3b28"

                        />
                    </View>           
                </ScrollView>
            </LinearGradient>
        );
    }
}
