import React, { Component } from 'react';
import {
    StyleSheet, Text, View,
    ScrollView,
    TextInput,
    Alert,
    Platform, Image, Picker, TouchableOpacity

} from 'react-native';
import Button from './Button';
import { LinearGradient } from 'expo'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { AsyncStorage } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';


export default class changeSettings extends React.Component {

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
                <Text style={{ flex:1, color: 'white', fontSize: 45, flex: 1 }}>Ajustaments</Text>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: 'white', paddingBottom:'2%' }}>{"Selecciona l'idioma"}</Text>
                    <View style={{flexDirection: 'row'}} >
                        <TouchableOpacity
                        onPress={()=>Alert.alert('idioma triat')}
                        style={{
                            height: 70,
                            width: '35%',
                            padding: '3%'
                        }}>
                            <Image
                                source={{ uri: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1280px-Flag_of_the_United_Kingdom.svg.png", width: 70, height: 70 }} />
                        </TouchableOpacity>  
                        <TouchableOpacity
                        onPress={()=>Alert.alert('idioma triat')}
                        style={{
                            height: 70,
                            width: '35%',
                            padding: '3%'
                        }}>
                            <Image
                                source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Catalonia.svg/2000px-Flag_of_Catalonia.svg.png", width: 70, height: 70 }} />
                        </TouchableOpacity>  
                        <TouchableOpacity
                        onPress={()=>Alert.alert('idioma triat')}
                        style={{
                            height: 70,
                            width: '35%',
                            padding: '3%'
                        }}>
                            <Image
                                source={{ uri: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/1280px-Flag_of_Spain.svg.png", width: 70, height: 70 }} />
                        </TouchableOpacity>                    
                    </View>
                </View>
                <Button
                    style={{color:'white', flex:1}}
                    title='Log out'
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
                                    'Esborrar conta',
                                    'Està segur que desitja esborrar la seva conta?',
                                    [
                                      {text: 'No', onPress: () => console.log('No')},
                                      {text: 'Si', onPress: () => console.log('Si')},
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
