import React, { Component } from 'react';
import {
    StyleSheet, Text, View,
    ScrollView,
    TextInput,
    Alert,
    Platform, Image

} from 'react-native';
import Button from './Button';
import { LinearGradient } from 'expo'

export default class filter extends React.Component {

    render() {
        return (
            <LinearGradient colors={['#F15A24', '#D4145A']}
                start={[0, 1]}
                end={[1, 0]}
                style={{
                    flex: 1,
                }}>
                <Text style={{ color: 'white', fontSize: 45, flex: 1 }}>Register</Text>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: 'white' }}>{"Rang d'edat"}</Text>
                    <View style={{flexDirection: 'row'}} >
                        <Text style={{ color: 'white' }}>{"De:"}</Text>
                        <TextInput keyboardType='numeric' style={{width:'30%', backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 35 }}></TextInput>
                        <Text style={{ color: 'white' }}>{"Fins:"}</Text>
                        <TextInput keyboardType='numeric' style={{width:'30%', backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 35 }}></TextInput>
                    </View>
                </View>

            </LinearGradient>
        );
    }
}
