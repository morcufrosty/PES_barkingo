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
import MultiSlider from '@ptomasroos/react-native-multi-slider'

export default class filter extends React.Component {

    state = {
        user: '',
        multiSliderValue: [0, 20],
    }

    updateUser = (user) => {
       this.setState({ user: user })
    }

    multiSliderValuesChange = values => {
        this.setState({
            multiSliderValue: values,
        });
    };
 
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
                        <Text style={{ color: 'white', margin:1 }}>{this.state.multiSliderValue[0]}</Text>
                        <MultiSlider
                            values={[
                                this.state.multiSliderValue[0],
                                this.state.multiSliderValue[1],
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
                        <Text style={{ color: 'white',margin:1 }}>{this.state.multiSliderValue[1]}</Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: 'white' }}>{"Especie"}</Text>
                    <Picker style={{color:'white'}} selectedValue = {this.state.user} onValueChange = {this.updateUser}>
                        <Picker.Item label = "Tots" value = "all" />
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
