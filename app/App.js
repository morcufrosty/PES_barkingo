import React, { Component } from 'react';
import Register from "./Components/register";
import { StyleSheet, Text, View,
    ScrollView,
    TextInput,
    Button
}  from 'react-native';
import AppNav from "./AppNav"

export default class App extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
        <AppNav navigation={navigation}/>
    );
  }
}
