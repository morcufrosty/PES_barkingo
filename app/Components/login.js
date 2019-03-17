import React from 'react';
import { StyleSheet, Text, View,
    ScrollView,
    TextInput,
    Button,
    Alert
}  from 'react-native';
import { LinearGradient } from 'expo'


export default class App extends React.Component {
  render() {
    return (
      <LinearGradient colors = {['#F15A24', '#D4145A']}
      start = {[0, 1]}
      end = {[1, 0]}
      style={{
        flex:1,
        padding: '10%',
        paddingTop: '30%'
      }}>
          <Text style={{color: 'white', fontSize: 45, flex: 1}}>Login</Text>
          <View style={{flex:1}}>
            <Text style={{color: 'white'}}>Username</Text>
            <TextInput textAlign={'center'}
            style={{backgroundColor:'white', opacity: 0.5, borderRadius: 5}}></TextInput>
          </View>
          <View style={{flex:1}}>
            <Text style={{color: 'white'}}>Password</Text>
            <TextInput textAlign={'center'} secureTextEntry={true}
            style={{backgroundColor:'white', opacity: 0.5, borderRadius: 5}}></TextInput>
          </View>
          <View style={{flex:1}}>
            <Button
              title='Login'
              color='#ff3b28'
              onPress= {() => {
                Alert.alert('Logged in!');
              }}
            ></Button>
        </View>
        <View style={{flex:1}}>
          <Text style={{color: 'white'}}> Don't have an account?<Text> </Text>
            <Text style ={{textDecorationLine: "underline"}}
                  onPress={() => this.props.navigation.navigate('Register')}>
              Register now!
            </Text>
          </Text>

        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
});
