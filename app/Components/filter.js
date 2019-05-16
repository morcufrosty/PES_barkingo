import React, { Component } from 'react';
import {
    StyleSheet, Text, View,
    ScrollView,
    TextInput,
    Alert,
    Platform, Image, Picker

} from 'react-native';
import Button from './Button';
import { LinearGradient } from 'expo'
import { AsyncStorage } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import MultiSlider from '@ptomasroos/react-native-multi-slider'

export default class filter extends React.Component {

    state = {
        distance: [5],
        ageRange: [0, 20],
        sex: "",
        species: "",
        type: ""
    }

    updateUser = (value) => {
       this.setState({ species: value })
    }

    multiSliderValuesChange = values => {
        this.setState({
            ageRange: values,
        });
    };

    sliderOneValuesChange = values => {
        let newValues = [0];
        newValues[0] = values[0];
        this.setState({
            distance: values,
        });
    };
 
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

    async handleChangeFilters(){

        const token = await AsyncStorage.getItem("access_token");
        const jsonToken = JSON.parse(token);
        jsonObject = { sex: this.state.sex , type: this.state.type , species: this.state.species , radius: this.state.distance[0] , minAge: this.state.ageRange[0] , maxAge: this.state.ageRange[1] };
        console.log(jsonObject);

        const userResponse = await this.getCurrentUserFromAPI(jsonToken)
        console.log(userResponse);

        if(userResponse.success)
            await AsyncStorage.setItem(userResponse.user.id, JSON.stringify(jsonObject));
            
        else console.log(userResponse.msg)


        this.props.navigation.state.params.onGoBack();
        this.props.navigation.goBack();
        

    }




    render() {
        return (
            <LinearGradient colors={['#F15A24', '#D4145A']}
                start={[0, 1]}
                end={[1, 0]}
                style={{
                    flex:1,
                    padding: '5%',
                    paddingTop: '10%'
                }}>
                <Text style={{ flex:1, color: 'white', fontSize: 45, flex: 1 }}>Filters</Text>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: 'white', paddingBottom:'2%' }}>{"Rang d'edat"}</Text>
                    <View style={{flexDirection: 'row', flex:1}} >
                        <Text style={{ color: 'white', margin:1 }}>{this.state.ageRange[0]}</Text>
                        <MultiSlider
                            values={[
                                this.state.ageRange[0],
                                this.state.ageRange[1],
                            ]}
                            sliderLength={300}
                            onValuesChange={this.multiSliderValuesChange}
                            min={0}
                            max={50}
                            step={1}
                            selectedStyle={{
                                backgroundColor: '#D84B37',
                            }}
                            markerStyle={{
                                backgroundColor:'#D84B37'
                            }}
                            style={{
                                margin:40
                            }}

                            allowOverlap
                            snapped
                        />                    
                        <Text style={{ color: 'white',margin:1 }}>{this.state.ageRange[1]}</Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: 'white' }}>{"Especie"}</Text>
                    <Picker style={{color:'white'}} selectedValue = {this.state.species} onValueChange = {this.updateUser}>
                        <Picker.Item label = "Tots" value = "" />
                        <Picker.Item label = "Gossos" value = "0" />
                        <Picker.Item label = "Gats" value = "1" />
                        <Picker.Item label = "Peixos" value = "2" />
                        <Picker.Item label = "Reptil" value = "3" />
                        <Picker.Item label = "Ocells" value = "4" />
                        <Picker.Item label = "Altres" value = "5" />
                    </Picker>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{flexDirection: 'row'}} >
                        <Text style={{ color: 'white' }}>{"Distancia"}: </Text>
                        <Text style={{ color: 'white' }}>{this.state.distance} km</Text>
                    </View>
                    <MultiSlider
                        values={this.state.distance}
                        sliderLength={280}
                        sliderLength={300}
                        min={0}
                        max={50}
                        step={1}
                        selectedStyle={{
                            backgroundColor: '#D84B37',
                        }}
                        markerStyle={{
                            backgroundColor:'#D84B37'
                        }}
                        onValuesChange={this.sliderOneValuesChange}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: 'white' }}>{"Sexe"}</Text>
                    <RadioForm
                            formHorizontal={true}
                            animation={false}
                            buttonColor={"#ffffff"}
                            selectedButtonColor={"#ffffff"}
                            style={{ paddingVertical: 10 }}
                            labelStyle={{ color: 'white' }}
                            radioStyle={{ paddingRight: 20, opacity: 0.5 }}
                            radio_props={[
                                { label: 'Any', value: "" },
                                { label: 'Male', value: "Male" },
                                { label: 'Female', value: "Female" }

                            ]}
                            initial={0}
                            onPress={(value) => { this.setState({ sex: value }) }}
                            //onPress={() => {console.log(this.state.race)}}
                        />
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={{ color: 'white' }}>{"Type"}</Text>
                    <RadioForm
                            formHorizontal={true}
                            animation={false}
                            buttonColor={"#ffffff"}
                            selectedButtonColor={"#ffffff"}
                            style={{ paddingVertical: 10 }}
                            labelStyle={{ color: 'white' }}
                            radioStyle={{ paddingRight: 20, opacity: 0.5 }}
                            radio_props={[
                                { label: 'Any', value: "" },
                                { label: 'Adoption', value: "adoption" },
                                { label: 'Foster', value: "foster" }

                            ]}
                            initial={0}
                            onPress={(value) => { this.setState({ type: value }) }}
                            //onPress={() => {console.log(this.state.race)}}
                        />
                </View>
                <Button
                    style={{color:'white', flex:1}}
                    title='Change filters'
                    color='#D84B37'
                    onPress={() => this.handleChangeFilters()}
                ></Button>


                
            </LinearGradient>
        );
    }
}
