import React, { Component } from 'react';
import { StyleSheet, Button as NButton, TouchableOpacity, Text } from 'react-native';

export default class Button extends Component {
    constructor(props) {
        super(props);
        this.styles = {
            button: {
                marginRight: 40,
                marginLeft: 40,
                marginTop: 10,
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: this.props.color,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: this.props.color
            },
            loginText: {
                color: 'white',
                textAlign: 'center',
                paddingLeft: 10,
                paddingRight: 10
            }
        }
    }

    render() {
        return (
            <TouchableOpacity
                style={this.styles.button}
                onPress={this.props.onPress}
            >
                <Text style={this.styles.loginText}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}

// const styles = StyleSheet.create({
//      button: {
//         marginRight:40,
//         marginLeft:40,
//         marginTop:10,
//         paddingTop:10,
//         paddingBottom:10,
//         backgroundColor:'#1E6738',
//         borderRadius:10,
//         borderWidth: 1,
//         borderColor: '#fff'
//      }
// })

// export default Button;