import React, { Component } from 'react';
import { Text, View, Image, AsyncStorage } from 'react-native';

export default class ImageComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: "",
            isLoading: true
        }
    }


    async getOfferImageFromServer(tokenJson, id) {
        return fetch(`http://10.4.41.164/api/offers/${id}/image`, {
            method: 'GET',
            headers: {
                Accept: '*',
                'x-access-token': tokenJson.token
            }
        }).then((response => { return response.text() }))

    }

    async getProfileImageFromServer(tokenJson, id) {
        return fetch(`http://10.4.41.164/api/users/${id}/image`, {
            method: 'GET',
            headers: {
                Accept: '*',
                'x-access-token': tokenJson.token
            }
        }).then((response => { return response.text() }))

    }

    async handleImage(){

        const t = await AsyncStorage.getItem('access_token');
        tokenJson = JSON.parse(t);
        console.log("ID")
        console.log(this.props)

        if(this.props.id.type == "offer"){

        console.log("offer")
        this.getOfferImageFromServer(tokenJson, this.props.id.idd).then( (value)=> {
            profileImage = "data:image/jpeg;base64," + value;
            this.setState({image: profileImage})

            ;})
        
        } else{

            console.log("user")
            this.getProfileImageFromServer(tokenJson, this.props.id.idd).then( (value)=> {
                profileImage = "data:image/jpeg;base64," + value;
                this.setState({image: profileImage})
    
                ;})
            
            }
            this.setState({isLoading:false})

    }

    render() {

        if(this.state.isLoading){
            this.handleImage();
           
        }

        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Image style={{
                        borderRadius: 40,
                        overflow: 'hidden',
                        marginLeft: 5,
                        marginRight: 5,
                        width: 80,
                        height: 80,
                        backgroundColor:"#f29797"
                    }} source={{ uri: `${this.state.image}` }} />            
                    </View>
        );
    }
}