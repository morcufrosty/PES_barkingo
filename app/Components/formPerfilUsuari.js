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
import { ImagePicker, Permissions, Constants, Location } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from "@expo/vector-icons";
import { StackActions, NavigationActions } from 'react-navigation';
import strings from '../i18n/i18n';
import formNewOffer from './formNewOffer';


export default class formPerfilUsuari extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            new: false,
            image: null,
            profilePlaceHolder: null,
            location: null,
            errorMessage: null,
            longitude: 0,
            latitude:0,
            city:'',
            region:'',
            postalCode:'',
            country:'',
            isoCountry:'',
            isoComunity:'',
            flagURI:'',
            isLoading: true,
            imageFromServer: '',
        }
    }

    async handleStart(){
        if (this.props.navigation.getParam('new', false)) {
          this.setState({new: true})
          console.log("new")
        }else{
          this.setState({new: false})
          console.log("old")
        }

        this.setState({isLoading:false});

        const token = await AsyncStorage.getItem("access_token");
        const jsonToken = JSON.parse(token);
        console.log("TOKEN FROM ASYNC : " + jsonToken);
        let response = await this.getCurrentUserFromAPI(jsonToken.token);
        let imageFromServer = await this.getProfileImageFromServer(jsonToken, response.user.id);
        console.log("debug1: "+ imageFromServer)
        let imageServer = '';

        if(imageFromServer != '{"success":false,"msg":"Image couldn\'t be found"}'){
          console.log("diferent")
          imageServer = "data:image/jpeg;base64," + imageFromServer;

        }
        console.log("image server:"+ imageServer)
        this.setState({
          imageFromServer: imageServer,
          name: response.user.username,
          description: response.user.bio,
          longitude: response.user.longitude,
          latitude: response.user.latitude,
        });
        console.log(this.state.getImageFromServer)
    }



    componentWillMount() {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        this.setState({
          errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',

        });
        console.log("polla grossa");
      } else {
        console.log("getting location");
      //  this._getLocationAsync();
      }
    }


        async getProfileInfoFromApi(tokenJson, id) {
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


        async getProfileImageFromServer(tokenJson, id) {
            return fetch(`http://10.4.41.164/api/users/${id}/image`, {
                method: 'GET',
                headers: {
                    Accept: '*',
                    'x-access-token': tokenJson.token
                }
            }).then((response => { return response.text() }))

        }


    _getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied',
        });
      }
        let location = await Location.getCurrentPositionAsync({});

        this.setState({ location });
        console.log(JSON.stringify(this.state.location))
        this.setState({ longitude: location.coords.longitude});
        this.setState({ latitude: location.coords.latitude});

      let map = {
        'Andalucía':'AN',
        'Aragón':'AR',
        'Principado de Asturias':'AS',
        'Canarias':'CN',
        'Cantabria':'CB',
        'Castilla-La Mancha':'CM',
        'Castilla La Mancha':'CM',
        'Castilla la Mancha': 'CM',
        'Castilla y León':'CL',
        'Catalunya':'CT',
        'Cataluña':'CT',
        'Extremadura':'EX',
        'Galicia':'GA',
        'Illes Balears':'IB',
        'Islas Baleares':'IB',
        'La Rioja':'RI',
        'Madrid, Comunidad de':'MD',
        'Comunidad de Madrid':'MD',
        'Murcia, Región de':'MC',
        'Murica':'MC',
        'Región de Murcia':'MC',
        'Navarra, Comunidad Foral de':'NC',
        'Navarra':'NC',
        'Comunidad Foral de Navarra':'NC',
        'Nafarroako Foru Komunitatea':'NC',
        'País Vasco':'PV',
        'Euskal Herria':'PV',
        'Valenciana, Comunidad':'VC',
        'Comunidad Valenciana':'VC',
        'Valenciana, Comunidat':'VC',
        'Comunidat Valenciana':'VC',

      }
      let locationJSON = {
        'longitude':location.coords.longitude,
        'latitude': location.coords.latitude
      }
      console.log(JSON.stringify(locationJSON))
      let parsedLocation = await Location.reverseGeocodeAsync(locationJSON);
      console.log(JSON.stringify(parsedLocation))
      if (parsedLocation[0].country ==="Espanya"){
        let region = parsedLocation[0].region;
        let isoComunity = map[region];
        console.log(isoComunity);
        this.setState({isoComunity})
      }
      this.setState({isoCountry: parsedLocation[0].isoCountryCode,
                    city: parsedLocation[0].city,
                    region: parsedLocation[0].region,
                    postalCode:parsedLocation[0].postalCode,
                    country:parsedLocation[0].country,

      })


      if (this.state.isoComunity != ''){
        let flagURI = "http://flags.ox3.in/mini/"+this.state.isoCountry.toLowerCase()+"/"+this.state.isoComunity.toLowerCase()+".png";
        this.setState({flagURI});
      }else{
        let flagURI = "http://flags.ox3.in/mini/"+this.state.isoCountry.toLowerCase()+".png";
        this.setState({flagURI});

      }
      console.log(this.state.flagURI);
    };


    async handlePress() {
        console.log(
            this.state.name,
            this.state.description,
            this.state.longitude,
            this.state.latitude
        )

        if (this.state.name === '') {
            Alert.alert(strings('formNewOffer.error'), strings('formNewOffer.nameError'))
        }

        else if (this.state.description === null) {
            Alert.alert(strings('formNewOffer.error'), strings('formNewOffer.descriptionError'))
        }

        else {

            const token = await AsyncStorage.getItem("access_token");
            const jsonToken = JSON.parse(token);
            console.log(jsonToken)
            const responseCurrentUser = await this.getCurrentUserFromAPI(jsonToken.token);
            const id = responseCurrentUser.user.id;
            console.log("ID: "+id)
            let response;
            if (!this.state.new) {
                response = await this.updatePerfilUsingAPI(jsonToken, id);
                console.log("response: " + response);

            }
            else {
                response = await this.newPerfilUsingAPI(jsonToken, id);
                console.log("response: " + response);

            }

            console.log("RESPOSTA:" + response.success);
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
                    console.log(id);
                    const responsePostImg = await this.handleSubmitImage(jsonToken, id, data);
                    //Alert.alert(responsePostImg.msg);
                    if(!this.state.new){
                      console.log("going back")

                      this.props.navigation.state.params.onGoBack();
                      this.props.navigation.goBack();
                    }else{
                      const resetAction = StackActions.reset({
                          index: 0,
                          actions: [NavigationActions.navigate({ routeName: 'BottomNavigation' })],
                      });
                      this.props.navigation.dispatch(resetAction);

                    }
                }
                else{
                  if(!this.state.new){
                    console.log("going back")

                    this.props.navigation.state.params.onGoBack();
                    this.props.navigation.goBack();
                  }else{
                    console.log("going to bottom nav")

                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'AppAfterLogin' })],
                    });
                    this.props.navigation.dispatch(resetAction);

                  }

                }


            }
            else {
                Alert.alert(strings('formNewOffer.error'), response.msg);
            }
        }
    }

    async handleSubmitImage(tokenJson, id, data) {

        return fetch(`http://10.4.41.164/api/users/${id}/image`, {
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


    async getCurrentUserFromAPI(tokenJson) {
        console.log("TOKEN :" + tokenJson);
        return fetch('http://10.4.41.164/api/users/currentUser', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': tokenJson
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            }).catch((error) => {
                console.error(error);
            });

    }


    async newPerfilUsingAPI(tokenJson, id) {

        return fetch(`http://10.4.41.164/api/users/${id}`, {
            method: 'PUT',
            headers: {
                Accept: '*',
                'Content-Type': 'application/json',
                'x-access-token': tokenJson.token
            },
            body: JSON.stringify({
              username: this.state.name,
              bio: this.state.description,
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.msg);
                return responseJson;
            }).catch((error) => {
                console.error(error);
            });
    }

    async updatePerfilUsingAPI(tokenJson, id) {
        console.log(tokenJson.token);
        console.log(id);
        return fetch(`http://10.4.41.164/api/users/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': tokenJson.token
            },
            body: JSON.stringify({
              username: this.state.name,
              bio: this.state.description,
              latitude: this.state.latitude,
              longitude: this.state.longitude,

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
            console.log("loading");
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


        let { image } = this.state;
        var imageForm;
        var form;
        var submitButton;



        if (this.state.image != null ) {
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
                        <Text style={{ color: 'white', opacity: 0.5 }}>{strings('formNewOffer.changeImage')}</Text>

                    </View>
                </View>);

        } else if (this.state.imageFromServer != '')  {
          console.log("GOT IMAGE FROM SERVER IN RENDER!")
          imageForm = (
              <View style={{ flex: 1, marginTop: 10, marginBottom: 20, flexDirection: 'row' }}>
                  <Image
                      source={{ uri: this.state.imageFromServer }}
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
                      <Text style={{ color: 'white', opacity: 0.5 }}>{strings('formNewOffer.changeImage')}</Text>

                  </View>
              </View>);
        }else
        {
            var random = Math.random();
            var source;
            var imagePlace;
            if (random < 0.5){
              imagePlace=(
                <Image
                    source={require("../assets/Profile_m.png")}
                    style={{ width: 100, height: 100, borderRadius:100 }}
                />
              )
            } else {
              imagePlace=(
                <Image
                    source={require("../assets/Profile_f.png")}
                    style={{ width: 100, height: 100, borderRadius:100 }}
                />
              )
            }
            imageForm = (
                <View style={{ flex: 1, marginTop: 10, marginBottom: 20, flexDirection: 'row' }}>

                    {imagePlace}
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
                        <Text style={{ color: 'white', opacity: 0.5 }}>{strings('formNewOffer.addImage')}</Text>

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
                    <Text style={{ color: 'white', fontSize: 45, flex: 1 }}>{strings('formNewOffer.userDetails')}</Text>


                    {imageForm}

                    <View style={{ flex: 1, paddingVertical: 10 }}>
                        <Text style={{ color: 'white',fontWeight: 'bold' }}>{strings('formNewOffer.name')}</Text>
                        <TextInput onChangeText={(name) => this.setState({ name })} value={this.state.name}
                            style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 35 }}></TextInput>
                    </View>

                    <View style={{ flex: 1, paddingVertical: 10 }}>
                        <Text style={{ color: 'white' ,fontWeight: 'bold'}}>{strings('formNewOffer.description')}</Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={(description) => this.setState({ description })}
                            value={this.state.description}
                            style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 80 }}>
                        </TextInput>
                    </View>


                    <View style={{ flex: 1, paddingVertical: 10 }}>
                        <Text style={{ color: 'white',fontWeight: 'bold' }}>{strings('formNewOffer.location')}</Text>
                        <Text style={{ color: 'white' }}>
                          { this.state.city } - {this.state.region}
                        </Text>
                        <Text style={{ color: 'white', opacity:0.5 }}>
                          {this.state.postalCode} - {this.state.country}
                        </Text>
                        <Image source={{ uri:`${this.state.flagURI}` , width: 20, height: 15 }} />
                      </View>
                                          <Button
                                              title= {strings('formNewOffer.submit')}
                                              color='#ff3b28'
                                              onPress={async () => this.handlePress()}>

                    </Button>
                </ScrollView>

            </LinearGradient>
        );
    }
}
