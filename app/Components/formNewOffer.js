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
import Autocomplete from 'react-native-autocomplete-input';
import racesJSON from './races.json';
import strings from '../i18n/i18n';

export default class formNewOffer extends React.Component {
    componentDidMount() {
        this.setState({ raceList: racesJSON });
    }
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            type: '0',
            species: '',
            race: '',
            sex: 'Male',
            age: '',
            //PER CANVIAR EL FORMAT DE LA DATA, MIRAR "fromat" de <DatePicker> a l'inici del render()
            iniDate: "2019-04-15",
            endDate: '2019-04-15',
            description: '',
            image: null,
            update: false,
            isLoading: true,
            query: '',
            raceList: [],
            imageFromServer:'',

        }
    }

    async prepareUpdate() {
        let response;


        if (this.props.navigation.getParam('update', false)) {
            console.log("UPDATE")

            const token = await AsyncStorage.getItem("access_token");
            tokenJson = JSON.parse(token);
            response = await this.getOfferInfoFromAPI(tokenJson, this.props.navigation.getParam('id', '1'));
            if (response.success) {
                console.log("SUCCESS");
            }
            imageFromServer = await this.getImageFromAPI(tokenJson, this.props.navigation.getParam('id', '1'));
            imageServer = "data:image/jpeg;base64," + imageFromServer;

            this.setState({
                imageFromServer: imageServer,
                update: this.props.navigation.getParam('update', false),
                id: this.props.navigation.getParam('id', '1'),
                name: response.offer.name,
                race: response.offer.idRace,
                query: response.offer.raceName,
                description: response.offer.description,
                sex: response.offer.sex, type: '0', age: '6', isLoading: false,
            })
        } else this.setState({ isLoading: false })

    }

    /*
    async getRaceListFromAPI(tokenJson){
      console.log(tokenJson);
      return fetch('http://10.4.41.164/api/races', {
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
    */
    async getImageFromAPI(tokenJson, id){
          return fetch(`http://10.4.41.164/api/offers/${id}/image`, {
              method: 'GET',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'x-access-token': tokenJson.token
              }
          }).then((response => { return response.text() }))

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

    async handlePress() {
        console.log(
            this.state.name,
            this.state.type,
            this.state.race,
            this.state.sex,
            this.state.age,
            this.state.description,
            this.state.image,
            this.state.update
        )

        if (this.state.name === '') {
            Alert.alert(strings('formNewOffer.error'), strings('formNewOffer.errorName'))
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
        else if (this.state.age === '') {
            Alert.alert(strings('formNewOffer.error'), strings('formNewOffer.ageError'))
        }


        else if (this.state.sex === null) {
            Alert.alert(strings('formNewOffer.error'), strings('formNewOffer.sexError'))
        }

        else if (this.state.description === '') {
            Alert.alert(strings('formNewOffer.error'), strings('formNewOffer.descriptionError'))
        }
        else if (this.state.image === null && !this.state.update) {
            Alert.alert(strings('formNewOffer.error'), strings('formNewOffer.imageError'))
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
                Alert.alert(strings('formNewOffer.error'), response.msg);
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

    escapeReg(text) {
      if (!arguments.callee.sRE) {
        var specials = [
          '/', '.', '*', '+', '?', '|',
          '(', ')', '[', ']', '{', '}', '\\'
        ];
        arguments.callee.sRE = new RegExp(
          '(\\' + specials.join('|\\') + ')', 'g'
        );
      }
      return text.replace(arguments.callee.sRE, '\\$1');
    }

    findRace(query) {

        //method called everytime when we change the value of the input
        if (query === '') {
            //if the query is null then return blank
            return [];
        }
        const { raceList } = this.state;
        //making a case insensitive regular expression to get similar value from the film json
        const regex = this.escapeReg(query)
        const regex2 = new RegExp(`${regex.trim()}`, 'i');
        //return the filtered film array according the query from the input
        return raceList.filter(race => race.raceName.search(regex2) >= 0);
    }

    render() {

        if (this.state.isLoading) {

            this.prepareUpdate();
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
        if (this.state.type === "1") {
            form = (
                <View style={{
                    paddingBottom: 30
                }}>
                    <Text style={{ color: 'white' }}>{strings('formNewOffer.startDate')}</Text>
                    <DatePicker
                        style={{ width: 200, margin: 5 }}
                        date={this.state.iniDate}
                        mode="date"
                        placeholder= {strings('formNewOffer.selectStartDate')}
                        format="YYYY-MM-DD"
                        minDate="2016-05-01"
                        maxDate="2020-06-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36,

                                backgroundColor: 'white',
                                borderWidth: 0,
                                opacity: 0.5,
                                borderRadius: 5
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => { this.setState({ iniDate: date }) }}
                    />
                    <Text style={{ color: 'white' }}>{strings('formNewOffer.endDate')}</Text>
                    <DatePicker
                        style={{ width: 200, margin: 5 }}
                        date={this.state.endDate}
                        mode="date"
                        placeholder= {strings('formNewOffer.selectEndDate')}
                        format="YYYY-MM-DD"
                        minDate="2016-05-01"
                        maxDate="2020-06-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36,
                                backgroundColor: 'white',
                                opacity: 0.5,
                                borderRadius: 5,
                                borderWidth: 0
                            },
                            dateText: {
                                color: "black",
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => { this.setState({ endDate: date }) }}
                    />
                </View>
            );
        } else if (this.state.type === "0") {
            form = (
                <View style={{
                    height: 10
                }}>
                </View>
            );
        }

        if (this.state.image != null) {
            imageForm = (
                <View style={{ flex: 1, marginTop: 10, marginBottom: 20, flexDirection: 'row' }}>
                    <Image
                        source={{ uri: image.uri }}
                        style={{ width: 200, height: 200, borderRadius: 50 }}
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

        } else if (this.state.imageFromServer!=''){
          imageForm = (
              <View style={{ flex: 1, marginTop: 10, marginBottom: 20, flexDirection: 'row' }}>
                  <Image
                      source={{ uri: this.state.imageFromServer }}
                      style={{ width: 200, height: 200, borderRadius: 50 }}
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
                        style={{ width: 200, height: 200 }}
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
                        <Text style={{ color: 'white', opacity: 0.5 }}>{strings('formNewOffer.addImage')}</Text>

                    </View>
                </View>);
        }
        const { query } = this.state;
        const raceList = this.findRace(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

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
                    <Text style={{ color: 'white', fontSize: 45, flex: 1 }}>{strings('formNewOffer.newOffer')}</Text>

                    <View style={{ flex: 1, paddingVertical: 10 }}>
                        <Text style={{ color: 'white' }}>{strings('formNewOffer.name')}</Text>
                        <TextInput onChangeText={(name) => this.setState({ name })} value={this.state.name}
                            style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 35 }}></TextInput>
                    </View>


                    <View style={{ flex:1, paddingVertical: 10 }}>
                        <Text style={{ color: 'white' }}>{strings('formNewOffer.race')}</Text>
                        <View styles = {styles.autocompleteContainer}>
                        <Autocomplete
                          autoCapitalize="none"
                          autoCorrect={false}
                          containerStyle={styles.autocompleteContainer2}
                          style={styles.input}
                          inputContainerStyle={{borderWidth:0, borderRadius: 50}}
                          listContainerStyle={styles.listContainer}
                          listStyle={styles.list}
                          data={raceList.length === 1 && comp(query, raceList[0].raceName) ? [] : raceList}
                          defaultValue={query}
                          onChangeText={text => this.setState({ query: text })}
                          renderItem={({ raceName, speciesName, idRace }) => (
                            <TouchableOpacity onPress={() => this.setState({ query: raceName, race:  idRace})}>
                              <Text style={styles.itemText}>
                                {raceName} - ({speciesName})
                              </Text>
                            </TouchableOpacity>
                          )}
                        />
                        </View>
                    </View>




                    <View style={{ flex: 1, paddingVertical: 10 }}>
                        <Text style={{ color: 'white' }}>{strings('formNewOffer.age')}</Text>
                        <TextInput onChangeText={(age) => this.setState({ age })} value={this.state.age} keyboardType='numeric'
                            style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 35 }}>
                        </TextInput>
                    </View>

                    <View style={{ flex: 1, paddingVertical: 10 }}>
                        <Text style={{ color: 'white' }}>{strings('formNewOffer.description')}</Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={(description) => this.setState({ description })}
                            value={this.state.description}
                            style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 80 }}>
                        </TextInput>
                    </View>

                    <View style={{ flex: 1, paddingVertical: 10 }}>
                        <Text style={{ color: 'white' }}>{strings('formNewOffer.sex')}</Text>
                        <RadioForm
                            formHorizontal={true}
                            animation={false}
                            buttonColor={"#ffffff"}
                            selectedButtonColor={"#ffffff"}
                            style={{ paddingVertical: 10 }}
                            labelStyle={{ color: 'white' }}
                            radioStyle={{ paddingRight: 20, opacity: 0.5 }}
                            radio_props={[
                                { label: strings('formNewOffer.male'), value: "Male" },
                                { label: strings('formNewOffer.female'), value: "Female" }
                            ]}
                            initial={0}
                            onPress={(value) => { this.setState({ sex: value }) }}
                        />
                    </View>

                    <View style={{ flex: 1, marginTop: 10, marginBottom: 20 }}>
                        <Text style={{ color: 'white' }}>{strings('formNewOffer.type')}</Text>
                        <RadioForm
                            formHorizontal={true}
                            animation={false}
                            buttonColor={"#ffffff"}
                            selectedButtonColor={"#ffffff"}
                            style={{ paddingVertical: 10 }}
                            labelStyle={{ color: 'white' }}
                            radioStyle={{ paddingRight: 20, opacity: 0.5 }}
                            radio_props={[
                                { label: strings('formNewOffer.adoption'), value: "0" },
                                { label: strings('formNewOffer.foster'), value: "1" }
                            ]}
                            initial={0}
                            onPress={(value) => { this.setState({ type: value }) }}
                            //onPress={() => {console.log(this.state.race)}}
                        />
                    </View>

                    {form}


                    <Text style={{ color: 'white' }}>{strings('formNewOffer.image')}</Text>
                    {imageForm}


                    <Button
                        title={strings('formNewOffer.submit')}
                        color='#ff3b28'
                        onPress={async () => this.handlePress()}>

                    </Button>
                </ScrollView>

            </LinearGradient>
        );
    }
}
const styles = StyleSheet.create({

  input:
      {backgroundColor: 'rgba(255, 255, 255, 0)', borderWidth:0, height: 35, borderRadius: 50},
  list:
      {backgroundColor:"white",  opacity: 0.5, borderWidth: 0 },
  listContainer:
          {borderWidth: 0 },
  autocompleteContainer2: {
      backgroundColor: '#EC91A5',
      borderWidth: 0,
      //opacity: 0.35,
    },

  autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
        backgroundColor: "#EC91A5",
        borderWidth: 0,

  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor:"#EC91A5"
  //  margin: 2,
  },

});
