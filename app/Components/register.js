import React, { Component } from 'react';
import { Alert, Container, AppRegistry, StyleSheet, Text, TextInput, View, ToastAndroid } from 'react-native';
import styles from '../style/stylesheet.js'
import { LinearGradient } from 'expo'
import TextInputWTitle from './inputText.js';
import InputPassword from './inputPassword.js';
import Button from './Button';
import strings from '../i18n/i18n';


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
                <Text style={{ color: 'white', fontSize: 45, flex: 1 }}>{strings('register.title')}</Text>

                <View style={{ flex: 1 }}>
                    <Text style={{ color: 'white' }}>{strings('register.email')}</Text>
                    <TextInput onChangeText={(email) => this.setState({ email })} value={this.state.email} textAlign={'center'} autoCapitalize={'none'}
                        style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 35 }}></TextInput>
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={{ color: 'white' }}>{strings('register.user')}</Text>
                    <TextInput onChangeText={(username) => this.setState({ username })} value={this.state.username} textAlign={'center'} autoCapitalize={'none'}
                        style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 35 }}></TextInput>
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={{ color: 'white' }}>{strings('register.pwd')}</Text>
                    <TextInput secureTextEntry={true} onChangeText={(password) => this.setState({ password })} value={this.state.password} textAlign={'center'} autoCapitalize={'none'}
                        style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 35 }}></TextInput>
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={{ color: 'white' }}>{strings('register.repPwd')}</Text>
                    <TextInput secureTextEntry={true} onChangeText={(repeatPassword) => this.setState({ repeatPassword })} value={this.state.repeatPassword} textAlign={'center'} autoCapitalize={'none'}
                        style={{ backgroundColor: 'white', opacity: 0.5, borderRadius: 5, paddingVertical: 0, height: 35 }}></TextInput>
                </View>

                <View style={{ flex: 1 }}>
                    <Button
                        title={strings('register.title')}
                        accessibilityLabel={strings('register.learnMore')}
                        color='#ff3b28'
                        onPress={async () => {
                            const expression = /\S+@\S+\.\S+/
                            if (this.state.email === '' || this.state.username === '' || this.state.password === '' || this.state.repeatPassword === '')
                                Alert.alert(strings('register.error'), strings('register.allFields'))
                            else if (!expression.test(String(this.state.email).toLowerCase()))
                                Alert.alert(strings('register.error'), strings('register.invalidEmail'))
                            else if (this.state.password == this.state.repeatPassword) {
                                if (this.state.password.length < 5) {
                                    Alert.alert(strings('register.error'), strings('register.invalidPwd'));
                                    return;
                                }

                                const response = await this.registerToApiAsync();
                                if (response.success) {
                                    //Alert.alert("Congratulations", response.msg);
                                    ToastAndroid.showWithGravityAndOffset(
                                        strings('register.succesCreate'),
                                        ToastAndroid.SHORT,
                                        ToastAndroid.BOTTOM,
                                        25,
                                        50,
                                    );
                                    this.props.navigation.navigate('Login');
                                } else if (response.msg === undefined)
                                    Alert.alert(strings('login.loginError'), strings('login.serverError'));
                                else
                                    alert(response.msg);
                            }
                            else Alert.alert(strings('login.error'), strings('login.pwdError'));
                        }
                        }
                    ></Button>
                </View>
                <View style={{ flex: 1 }}>

                    <Text style={{ color: 'white' }}>{strings('register.goBack')} <Text> </Text>
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
