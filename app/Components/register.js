import React, { Component } from 'react';
import { Alert, Container, AppRegistry, StyleSheet, Text, TextInput, View, ToastAndroid } from 'react-native';
import styles from '../style/stylesheet.js'
import { LinearGradient } from 'expo'
import TextInputWTitle from './inputText.js';
import InputPassword from './inputPassword.js';
import Button from './Button';


export default class Register extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            username: '',
            password: '',
            repeatPassword: ''
        }
    }

    async registerToApiAsync() {
        return fetch('http://10.4.41.164/api/users/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                name: this.state.username,
                password: this.state.password
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.msg);
                return responseJson;
            }).catch((error) => {
                console.error(error);
            });


    }

    render() {
        return (
            <LinearGradient colors={['#F15A24', '#D4145A']}
                start={[0, 1]}
                end={[1, 0]}
                style={{
                    flex: 1,
                    padding: '10%',
                    paddingTop: '30%'
                }}>
                <Text style={{ color: 'white', fontSize: 45, flex: 1 }}>Register</Text>

                <View style={{ flex: 1 }}>
                    <Text style={{ color: 'white' }}>{"Email"}</Text>
                    <TextInput onChangeText={(email) => this.setState({ email })} value={this.state.email} textAlign={'center'} autoCapitalize={'none'}
                        style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 35 }}></TextInput>
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={{ color: 'white' }}>{"Username"}</Text>
                    <TextInput onChangeText={(username) => this.setState({ username })} value={this.state.username} textAlign={'center'} autoCapitalize={'none'}
                        style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 35 }}></TextInput>
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={{ color: 'white' }}>{"Password"}</Text>
                    <TextInput secureTextEntry={true} onChangeText={(password) => this.setState({ password })} value={this.state.password} textAlign={'center'} autoCapitalize={'none'}
                        style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 35 }}></TextInput>
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={{ color: 'white' }}>{"Repeat password"}</Text>
                    <TextInput secureTextEntry={true} onChangeText={(repeatPassword) => this.setState({ repeatPassword })} value={this.state.repeatPassword} textAlign={'center'} autoCapitalize={'none'}
                        style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 35 }}></TextInput>
                </View>

                <View style={{ flex: 1 }}>
                    <Button
                        title='Register'
                        accessibilityLabel="Learn more about this purple button"
                        color='#ff3b28'
                        onPress={async () => {
                            const expression = /\S+@\S+\.\S+/
                            if (this.state.email === '' || this.state.username === '' || this.state.password === '' || this.state.repeatPassword === '')
                                Alert.alert("Error", "Please fill all the fields")
                            else if (!expression.test(String(this.state.email).toLowerCase()))
                                Alert.alert("Error", "The email you entered is invalid, please try again")
                            else if (this.state.password == this.state.repeatPassword) {
                                if (this.state.password.length < 5) {
                                    Alert.alert("Error", "The password must have at least 5 characters");
                                    return;
                                }

                                const response = await this.registerToApiAsync();
                                if (response.success) {
                                    //Alert.alert("Congratulations", response.msg);
                                    ToastAndroid.showWithGravityAndOffset(
                                        'User created successfully',
                                        ToastAndroid.SHORT,
                                        ToastAndroid.BOTTOM,
                                        25,
                                        50,
                                    );
                                    this.props.navigation.navigate('Login');
                                } else if (response.msg === undefined)
                                    Alert.alert("Login error", "Server error");
                                else
                                    alert(response.msg);
                            }
                            else Alert.alert("Error", 'The passwords do not match, please try again');
                        }
                        }
                    ></Button>
                </View>
                <View style={{ flex: 1 }}>

                    <Text style={{ color: 'white' }}>Go Back to <Text> </Text>
                        <Text style={{ textDecorationLine: "underline" }}
                            onPress={() => this.props.navigation.navigate('Login')}>
                            Login page
            </Text>
                    </Text>
                </View>

            </LinearGradient>
        );
    }
}

AppRegistry.registerComponent('Register', () => Register);
