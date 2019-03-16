import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native';


export default StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  activeTitle: {
    color: 'red',
  },
  background: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#123456',
    padding: '10%'
  }
});
