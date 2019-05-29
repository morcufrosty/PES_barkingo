import React, { Component } from 'react';
import {
    StyleSheet, Text, View,
    ScrollView,
    TextInput,
    Alert,
    ToastAndroid,
    Platform, Image, Picker, TouchableOpacity

} from 'react-native';
import Button from './Button';
import { LinearGradient } from 'expo'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { AsyncStorage } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import strings, {ChangeLanguage} from '../i18n/i18n';


export default class changeSettings extends React.Component {

    ChangeLanguageHandler = (lang) => {
        if (ChangeLanguage(lang) != lang){
            Alert.alert(strings('changeSettings.LanguageError'));
        }
        ToastAndroid.showWithGravityAndOffset(
            strings('changeSettings.LanguageSuccess'),
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50,
        );
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
                <Text style={{ flex:1, color: 'white', fontSize: 45, flex: 1 }}>{strings('changeSettings.settings')}</Text>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: 'white', paddingBottom:'2%' }}>{strings('changeSettings.language')}</Text>
                    <View style={{flexDirection: 'row'}} >
                        <TouchableOpacity
                        onPress={()=>this.ChangeLanguageHandler('en')}
                        style={{
                            height: 70,
                            width: '35%',
                            padding: '3%'
                        }}>
                            <Image
                                style={{
                                    borderRadius: 7
                                }}
                                source={{ uri: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1280px-Flag_of_the_United_Kingdom.svg.png", width: 70, height: 70 }} />
                        </TouchableOpacity>  
                        <TouchableOpacity
                        onPress={()=>this.ChangeLanguageHandler('ca-ES')}
                        style={{
                            height: 70,
                            width: '35%',
                            padding: '3%'
                        }}>
                            <Image
                                style={{
                                    borderRadius: 7
                                }}
                                source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Catalonia.svg/2000px-Flag_of_Catalonia.svg.png", width: 70, height: 70 }} />
                        </TouchableOpacity>  
                        <TouchableOpacity
                        onPress={()=>this.ChangeLanguageHandler('es')}
                        style={{
                            height: 70,
                            width: '35%',
                            padding: '3%'
                        }}>
                            <Image
                                style={{
                                    borderRadius: 7
                                }}
                                source={{ uri: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/1280px-Flag_of_Spain.svg.png", width: 70, height: 70 }} />
                        </TouchableOpacity>                    
                    </View>
                </View>
                <Button
                    style={{color:'white', flex:1}}
                    title= {strings('changeSettings.logOut')}
                    color='#D84B37'
                    onPress={async () => {

                        await AsyncStorage.removeItem('access_token');
                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: 'Login' })],
                        });
                        this.props.navigation.dispatch(resetAction);
                    }}
                ></Button>
                <Text style={{color: 'white', textDecorationLine: "underline", flex:1 }}
                            onPress={() => 
                                Alert.alert(
                                    strings('changeSettings.delete'),
                                    strings('changeSettings.deleteQuestion'),
                                    [
                                      {text: strings('changeSettings.no'), onPress: () => console.log('No')},
                                      {text: strings('changeSettings.yes'), onPress: () => console.log('Si')},
                                    ],
                                    {cancelable: false},
                                  )
                            }>
                            Delete Account
                </Text>


                
            </LinearGradient>
        );
    }
}
