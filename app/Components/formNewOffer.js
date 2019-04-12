import React, { Component } from 'react';
import { StyleSheet, Text, View,
    ScrollView,
    TextInput,
    Alert,
    Platform,
    Picker,
}  from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Button from './Button';
import { LinearGradient } from 'expo'
import { Facebook } from 'expo';
import DatePicker from 'react-native-datepicker'


export default class formNewOffer extends React.Component {



  constructor(props) {
    super(props)
    this.state = {
      name: '',
      type: '',
      species: '',
      race: '',
      sex: null,
      age: '',
      iniDate: "2019-04-15",
      endDate: '2019-04-15',
      description:''
    }
  }

  resetState(){
    this.setState({
      name: '',
      type: '',
      species: '',
      race: '',
      sex: '',
      age: '',
      iniDate: '',
      endDate: '',
      description: ''
   })

  }

async handlePress(){

  if(this.state.name === ''){
    Alert.alert("Error", "Please enter the name of the pet" )
  }

  else if(this.state.age === ''){
    Alert.alert("Error", "Please enter the age of the pet" )
  }

  else if(this.state.description === ''){
    Alert.alert("Error", "Please enter a description" )
  }

  else if(this.state.race === ''){
    Alert.alert("Error", "Please enter the race of the pet" )
  }

  else if(this.state.sex === null){
    Alert.alert("Error", "Please specify the sex of the pet" )
  }



  const response = await this.newOfferUsingAPI();


  if(response.success){
    Alert.alert("Amazing!", response.msg);

  }
  else{
    Alert.alert("Error", response.msg);
  }

}

async newOfferUsingAPI(){

  return fetch('http://10.4.41.164/api/offers', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': await AsyncStorage.getItem(ACCESS_TOKEN)
    },
    body: JSON.stringify({

      name: this.state.name,
      type: this.state.type,
      species: this.state.species,
      race: this.state.race,
      sex: this.state.sex,
      age: this.state.age,
      iniDate: this.state.iniDate,
      endDate: this.setState.endDate

    }),
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson.msg);
      return responseJson;
    }).catch((error) => {
      console.error(error);
    });
}

render(){
  var form;
          if (this.state.type === "foster") {
             form = (
                <View>
                <Text  style={{ color: 'white' }}>{"Data d'inici"}</Text>
                <DatePicker
                        style={{width: 200, margin: 5}}
                        date={this.state.iniDate}
                        mode="date"
                        placeholder="select ini date"
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
                            borderRadius: 5                          }
                          // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {this.setState({iniDate: date})}}
                      />
                      <Text  style={{ color: 'white' }}>{"Data fi"}</Text>
                      <DatePicker
                              style={{width: 200,margin: 5}}
                              date={this.state.endDate}
                              mode="date"
                              placeholder="select end date"
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
                                dateText:{
                                  color: "black",
                                }
                                // ... You can check the source to find the other keys.
                              }}
                              onDateChange={(date) => {this.setState({endDate: date})}}
                            />
                    </View>
             );
          } else if (this.state.type === "adoption") {
             form = (
               <View>
               </View>
             );
          }

  return (
    <LinearGradient colors={['#F15A24', '#D4145A']}
      start={[0, 1]}
      end={[1, 0]}
      style={{
        paddingRight:20,
        paddingTop:30,
        paddingLeft: 20,
        padding: 20,
        flex: 1
      }}
    >
      <ScrollView
      style={{
        flex: 1
      }}
      showsVerticalScrollIndicator={false}
      >

      <Text style={{ color: 'white', fontSize: 45, flex: 1 }}>New Offer</Text>

            <View style={{ flex: 1, paddingVertical: 10 }}>
              <Text  style={{ color: 'white' }}>{"Name"}</Text>
              <TextInput onChangeText={(name) => this.setState({ name })}  value={this.state.name}
                style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 35 }}></TextInput>
            </View>

            <View style={{ flex: 1, paddingVertical: 10 }}>
              <Text  style={{ color: 'white' }}>{"Species"}</Text>
              <TextInput onChangeText={(species) => this.setState({ species })}  value={this.state.species}
                style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 35 }}>
                </TextInput>
            </View>

            <View style={{ flex: 1, paddingVertical: 10 }}>
              <Text style={{ color: 'white' }}>{"Race"}</Text>
              <TextInput onChangeText={(race) => this.setState({ race })}  value={this.state.race}
                style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 35 }}>
                </TextInput>
            </View>


            <View style={{ flex: 1 , paddingVertical: 10}}>
              <Text style={{ color: 'white' }}>{"Age"}</Text>
              <TextInput onChangeText={(age) => this.setState({ age })}  value={this.state.age}
                style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 35 }}>
                </TextInput>
            </View>

            <KeyboardAwareScrollView>
              <View style={{ flex: 1, paddingVertical: 10 }}>
                <Text style={{ color: 'white' }}>{"Description"}</Text>
                <TextInput
                  multiline = {true}
                  numberOfLines = {4}
                  onChangeText={(description) => this.setState({ description })}
                  value={this.state.description}
                  style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 80 }}>
                  </TextInput>
              </View>
            </KeyboardAwareScrollView>

            <View style={{ flex: 1,paddingVertical: 10 }}>
            <Text style={{ color: 'white' }}>{"Sexe"}</Text>
            <RadioForm
            formHorizontal={true}
            animation={true}
            buttonColor={"#ffffff"}
            selectedButtonColor={"#ffffff"}
            style={{ paddingVertical:10}}
            labelStyle={{color: 'white'}}
            radioStyle={{paddingRight: 20,opacity:0.5}}
                     radio_props={[
                       {label: 'male', sex: "male" },
                       {label: 'female', sex: "female" }
                     ]}
                     initial={0}
                     onPress={(sex) => {this.setState({sex:sex})}}
                   />
            </View>

            <View style={{ flex: 1,paddingVertical: 10 }}>
            <Text style={{ color: 'white' }}>{"Type of offer"}</Text>
            <RadioForm
            formHorizontal={true}
            animation={true}
            buttonColor={"#ffffff"}
            selectedButtonColor={"#ffffff"}
            style={{ paddingVertical:10}}
            labelStyle={{color: 'white'}}
            radioStyle={{paddingRight: 20,opacity:0.5}}
                     radio_props={[
                       {label: 'adoption', value: "adoption" },
                       {label: 'foster', value: "foster" }
                     ]}
                     initial={0}
                     onPress={(value) => {this.setState({type:value})}}
                   />
            </View>
            {form}

            </ScrollView>

    </LinearGradient>
    );
}
}
