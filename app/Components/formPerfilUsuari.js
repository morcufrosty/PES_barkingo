import React, { Component } from 'react';
import {
    StyleSheet, Text, View,
    ScrollView,
    TextInput,
    Alert,
    Platform,
    Picker,
    Image,
    TouchableOpacity
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import Button from './Button';
import { LinearGradient } from 'expo'
import { Facebook } from 'expo';
import DatePicker from 'react-native-datepicker'
import { AsyncStorage } from 'react-native';
//import ImagePicker from 'react-native-image-picker';
import { ImagePicker, Permissions } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from "@expo/vector-icons";

export default class formPerfilUsuari extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            image: null,
        }
    }


    async getProfileInfoFromApi(tokenJson, id) {
        //AQUI POSAR EL PERFIL
        return fetch(`http://10.4.41.164/api/ueueueueueueueu/${id}`, {
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

    async handlePress() {
        console.log(
            this.state.name,
            this.state.description,
        )

        if (this.state.name === '') {
            Alert.alert("Error", "Please enter the your name")
        }
        /*
          else if(this.state.species === ''){
            Alert.alert("Error", "Please enter the scpecies of the pet" )
          }
          */
        /*
          else if(this.state.race === ''){
            Alert.alert("Error", "Please enter the race of the pet" )
          }
        */
        

        else if (this.state.description === null) {
            Alert.alert("Error", "Please specify a description")
        }


        else {

            const token = await AsyncStorage.getItem("access_token");
            const jsonToken = JSON.parse(token);
            let response;
            if (!this.state.update) {
                response = await this.newOfferUsingAPI(jsonToken);
                console.log("response: " + response);

            }
            else {
                response = await this.updateOfferUsingAPI(jsonToken);
            }

            if (response.success) {
                //  Alert.alert("Amazing!", response.msg);
                if (this.state.image != null) {
                    console.log("Enviant imatge")
                    data = new FormData()
                    data.append('image', {
                        uri: this.state.image.uri,
                        type: 'image/jpeg',
                        name: this.state.name
                    });
                    const responsePostImg = await this.handleSubmitImage(jsonToken, response.id, data);
                    //  Alert.alert(responsePostImg);
                    this.props.navigation.state.params.onGoBack();
                    this.props.navigation.goBack();
                }
                else{
                    this.props.navigation.state.params.onGoBack();
                    this.props.navigation.goBack();
                }


            }
            else {
                Alert.alert("Error", response.msg);
            }
        }
    }

    async handleSubmitImage(tokenJson, id, data) {

        return fetch(`http://10.4.41.164/api/offers/${id}/image`, {
            method: 'POST',
            headers: {
                Accept: '*',
                'Content-Type': 'multipart/form-data',
                'x-access-token': tokenJson.token
            },
            body: data,
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                return responseJson;
            }).catch((error) => {
                console.error(error);
            });
    }

    async newOfferUsingAPI(tokenJson) {

        return fetch("http://10.4.41.164/api/offers", {
            method: 'POST',
            headers: {
                Accept: '*',
                'Content-Type': 'application/json',
                'x-access-token': tokenJson.token
            },
            body: JSON.stringify({
                name: this.state.name,
                type: this.state.type,
                race: this.state.race,
                sex: this.state.sex,
                age: this.state.age,
                description: this.state.description

            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.msg);
                return responseJson;
            }).catch((error) => {
                console.error(error);
            });
    }

    async updateOfferUsingAPI(tokenJson) {

        return fetch(`http://10.4.41.164/api/offers/${this.state.id}`, {
            method: 'PUT',
            headers: {
                Accept: '*',
                'Content-Type': 'application/json',
                'x-access-token': tokenJson.token
            },
            body: JSON.stringify({
                name: this.state.name,
                type: this.state.type,
                race: this.state.race,
                sex: this.state.sex,
                age: this.state.age,
                description: this.state.description

            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.msg);
                return responseJson;
            }).catch((error) => {
                console.error(error);
            });

    }

    //OPCIONS DE L'IMAGE PICKER
    _pickImage = async () => {
        const { cameraRollStatus } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const { cameraStatus } = await Permissions.askAsync(Permissions.CAMERA);
        //  if (cameraRollStatus === 'granted') {

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [5, 5],
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result });
        }
        //  }
        //  else{
        //  Alert.alert("Error", "No camera permission" )
        //
        //  }

    }




    render() {

        if (this.state.isLoading) {

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

        let { image } = this.state;
        var imageForm;
        var form;


        if (this.state.image != null) {
            imageForm = (
                <View style={{ flex: 1, marginTop: 10, marginBottom: 20, flexDirection: 'row' }}>
                    <Image
                        source={{ uri: image.uri }}
                        style={{ width: 100, height: 100, borderRadius: 100 }}
                    />
                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: 'center',
                            flex: 1
                        }}>
                        <TouchableOpacity onPress={this._pickImage}
                            style={{
                                //borderWidth:1,
                                //borderColor:'rgba(0,0,0,0.2)',
                                opacity: 0.5,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 60,
                                height: 60,
                                backgroundColor: '#fff',
                                borderRadius: 50,
                            }}
                        >
                            <Icon name={"exchange"} size={20} color="#F15A24" />

                        </TouchableOpacity>
                        <Text style={{ color: 'white', opacity: 0.5 }}>{"Change image"}</Text>

                    </View>
                </View>);

        } else {
            imageForm = (
                <View style={{ flex: 1, marginTop: 10, marginBottom: 20, flexDirection: 'row' }}>
                    <Image
                        source={require('../assets/no_image.png')}
                        style={{ width: 100, height: 100 }}
                    />
                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: 'center',
                            flex: 1
                        }}>
                        <TouchableOpacity onPress={this._pickImage}
                            style={{
                                //borderWidth:1,
                                //borderColor:'rgba(0,0,0,0.2)',
                                opacity: 0.5,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 60,
                                height: 60,
                                backgroundColor: '#fff',
                                borderRadius: 50,
                            }}
                        >
                            <Icon name={"plus"} size={20} color="#F15A24" />

                        </TouchableOpacity>
                        <Text style={{ color: 'white', opacity: 0.5 }}>{"Add an image"}</Text>

                    </View>
                </View>);
        }
        return (
            <LinearGradient colors={['#F15A24', '#D4145A']}
                start={[0, 1]}
                end={[1, 0]}
                style={{
                    flex: 1,
                    padding: 15,
                    paddingTop: 25
                }}
            >
                <ScrollView
                    style={{
                        flex: 1,
                    }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps='always'>
                    <Text style={{ color: 'white', fontSize: 45, flex: 1 }}>Who are you?</Text>


                    {imageForm}

                    <View style={{ flex: 1, paddingVertical: 10 }}>
                        <Text style={{ color: 'white' }}>{"What's your name"}</Text>
                        <TextInput onChangeText={(name) => this.setState({ name })} value={this.state.name}
                            style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 35 }}></TextInput>
                    </View>

                    <View style={{ flex: 1, paddingVertical: 10 }}>
                        <Text style={{ color: 'white' }}>{"Add a little description about yourself!"}</Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={(description) => this.setState({ description })}
                            value={this.state.description}
                            style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 80 }}>
                        </TextInput>
                    </View>


                    <Button
                        title='Submit'
                        color='#ff3b28'
                        onPress={async () => this.handlePress()}>

                    </Button>
                </ScrollView>

            </LinearGradient>
        );
    }
}
