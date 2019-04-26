import React, { Component } from 'react';
import { Text, View, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo';

export default class TextInputWTitle extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text style={{ color: 'white' }}>{this.props.name}</Text>
                <TextInput textAlign={'center'} autoCapitalize={'none'} style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 40 }} />
            </View>
        );
    }
}
