import React from "react"
import { StyleSheet, Text, View, Image, Button } from "react-native"
import * as Expo from "expo"


export default class GoogleLogin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signedIn: false,
      name: "",
      photoUrl: "",
      email:"",
      accessToken:""
    }
  }
  
  signIn = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId:
          "802116894984-a2n57c60e6ri7bpp6t63nlivelj185om.apps.googleusercontent.com",
        //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
        scopes: ["profile", "email"]
      })

      if (result.type === "success") {
        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl,
          email: result.user.email,
          accessToken: result.accessToken
      
        })
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.signedIn ? (
          <LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl} email={this.state.email} accessToken={this.state.accessToken} />
        ) : (
          <LoginPage signIn={this.signIn} />
        )}
      </View>
    )
  }
}

const LoginPage = props => {
  return (
    <View>
      <Button title="Sign in with Google" onPress={() => props.signIn()} />
    </View>
  )
}

const LoggedInPage = props => {
  return (
    <View style={styles.container}>
   
      <Text style={styles.header}>Benvingut!</Text>
      <Text style={styles.header}>Nom: {props.name}</Text>
      <Text style={styles.header}>e-mail:{props.email}</Text>
      <Text style={styles.header}>token:{props.accessToken}</Text>
    
      <Image style={styles.image} source={{ uri: props.photoUrl }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#777",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 20
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }
})




