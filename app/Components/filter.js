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
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';


export default class filter extends React.Component {

    state = {user: ''}

    updateUser = (user) => {
       this.setState({ user: user })
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
                    <View style={{flexDirection: 'row'}} >
                        <Text style={{ color: 'white', paddingRight: '2%' }}>{"De:"}</Text>
                        <TextInput keyboardType='numeric' style={{width:'30%', paddingRight: '5%', backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 35 }}></TextInput>
                        <Text style={{ color: 'white', paddingRight: '2%' }}>{"Fins:"}</Text>
                        <TextInput keyboardType='numeric' style={{width:'30%', paddingRight: '2%', backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 35 }}></TextInput>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: 'white' }}>{"Especie"}</Text>
                    <Picker style={{color:'white'}} selectedValue = {this.state.user} onValueChange = {this.updateUser}>
                        <Picker.Item label = "Gossos" value = "dog" />
                        <Picker.Item label = "Gats" value = "cat" />
                        <Picker.Item label = "Peixos" value = "fish" />
                        <Picker.Item label = "Ocells" value = "birds" />
                        <Picker.Item label = "Altres" value = "other" />
                    </Picker>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: 'white' }}>{"Distancia"}</Text>
                    <Picker style={{color:'white'}} selectedValue = {this.state.user} onValueChange = {this.updateUser}>
                        <Picker.Item label = "10km" value = "verynear" />
                        <Picker.Item label = "25km" value = "near" />
                        <Picker.Item label = "50km" value = "medium" />
                        <Picker.Item label = "100km" value = "far" />
                        <Picker.Item label = "200km" value = "veryfar" />
                    </Picker>
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
                                { label: 'Mascle', value: "0" },
                                { label: 'Femella', value: "1" }
                            ]}
                            initial={0}
                            onPress={(value) => { Alert.alert('canviat') }}
                            //onPress={() => {console.log(this.state.race)}}
                        />
                </View>
                <Button
                    style={{color:'white', flex:1}}
                    title='Change filters'
                    color='#D84B37'
                    onPress={() => Alert.alert("sexe")}
                ></Button>


                
            </LinearGradient>
        );
    }
}
