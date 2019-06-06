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
import strings from '../i18n/i18n';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { CheckBox } from 'react-native-elements'

export default class filter extends React.Component {

    state = {
        distance: [5],
        ageRange: [0, 20],
        distanceFilter: false,
        ageFilter: false,
        sex: "",
        species: "",
        type: ""
    }

    updateUser = (value) => {
        this.setState({ species: value })
    }

    multiSliderValuesChange = values => {
        if (values[1] > 45 ) values[1] = 999;
        console.log(values);
        this.setState({
            ageRange: values,
        });
    };

    sliderOneValuesChange = values => {
        let newValues = [0];
        newValues[0] = values[0];
        console.log(values);
        if (values[0] > 45 ) values[0] = 999;
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

    async handleChangeFilters() {

        const token = await AsyncStorage.getItem("access_token");
        const jsonToken = JSON.parse(token);
        jsonObject = { sex: this.state.sex, type: this.state.type, species: this.state.species, radius: this.state.distance[0], minAge: this.state.ageRange[0], maxAge: this.state.ageRange[1], ageFilter: this.state.ageFilter, distanceFilter: this.state.distanceFilter };
        console.log(jsonObject);

        const userResponse = await this.getCurrentUserFromAPI(jsonToken)
        console.log(userResponse);

        if (userResponse.success)
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
                    flex: 1,
                    padding: '5%',
                    paddingTop: '10%'
                }}>
                <Text style={{ flex: 1, color: 'white', fontSize: 45, flex: 1 }}>{strings('filter.title')}</Text>
                <View style={{ flex: 1 }}>

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ color: 'white', paddingBottom: '2%' }}>{strings('filter.ageRange')}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', flex: 1 }} >
                        <Text style={{ color: 'white', margin: 1 }}>{this.state.ageRange[0]}</Text>
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
                                backgroundColor: '#D84B37'
                            }}
                            allowOverlap
                            snapped
                        />
                        <Text style={{ color: 'white', margin: 1 }}>{this.state.ageRange[1]}</Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: 'white' }}>{strings('filter.specie')}</Text>
                    <Picker style={{ color: 'white' }} selectedValue={this.state.species} onValueChange={this.updateUser}>
                        <Picker.Item label={strings('filter.all')} value="" />
                        <Picker.Item label={strings('filter.dog')} value="0" />
                        <Picker.Item label={strings('filter.cat')} value="1" />
                        <Picker.Item label={strings('filter.fish')} value="2" />
                        <Picker.Item label={strings('filter.reptile')} value="3" />
                        <Picker.Item label={strings('filter.bird')} value="4" />
                        <Picker.Item label={strings('filter.other')} value="5" />
                    </Picker>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems:"center" }} >
                        <Text style={{ color: 'white' }}>{strings('filter.distance')}: </Text>
                        <Text style={{ color: 'white' }}>{this.state.distance} Km</Text>
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
                            backgroundColor: '#D84B37'
                        }}
                        onValuesChange={this.sliderOneValuesChange}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: 'white' }}>{strings('filter.sex')}</Text>
                    <RadioForm
                        formHorizontal={true}
                        animation={false}
                        buttonColor={"#ffffff"}
                        selectedButtonColor={"#ffffff"}
                        style={{ paddingVertical: 10 }}
                        labelStyle={{ color: 'white' }}
                        radioStyle={{ paddingRight: 20, opacity: 0.5 }}
                        radio_props={[
                            { label: strings('filter.any'), value: "" },
                            { label: strings('filter.male'), value: "Male" },
                            { label: strings('filter.female'), value: "Female" }

                        ]}
                        initial={0}
                        onPress={(value) => { this.setState({ sex: value }) }}
                    //onPress={() => {console.log(this.state.race)}}
                    />
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={{ color: 'white' }}>{strings('filter.type')}</Text>
                    <RadioForm
                        formHorizontal={true}
                        animation={false}
                        buttonColor={"#ffffff"}
                        selectedButtonColor={"#ffffff"}
                        style={{ paddingVertical: 10 }}
                        labelStyle={{ color: 'white' }}
                        radioStyle={{ paddingRight: 20, opacity: 0.5 }}
                        radio_props={[
                            { label: strings('filter.any'), value: "" },
                            { label: strings('filter.adoption'), value: "adoption" },
                            { label: strings('filter.foster'), value: "foster" }

                        ]}
                        initial={0}
                        onPress={(value) => { this.setState({ type: value }) }}
                    //onPress={() => {console.log(this.state.race)}}
                    />
                </View>
                <Button
                    style={{ color: 'white', flex: 1 }}
                    title={strings('filter.change')}
                    color='#D84B37'
                    onPress={() => this.handleChangeFilters()}
                ></Button>



            </LinearGradient>
        );
    }
}
