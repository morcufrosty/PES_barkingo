import React, { Component } from 'react';
import {Card} from 'react-bootstrap';
import {getOfferImageFromServer, getProfileImageFromServer} from "../Helpers/APIcalls"


export default class ImageComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: "",
            isLoading: true
        }
    }




    async handleImage(){

        console.log("ID")
        console.log(this.props.id)

        if(this.props.type == "offer"){

        
        getOfferImageFromServer(this.props.id).then( (value)=> {
            let  profileImage = "data:image/jpeg;base64," + value;
            this.setState({image: profileImage})
            ;})
        
        } else{

        
        getProfileImageFromServer(this.props.id).then( (value)=> {
                let profileImage = "data:image/jpeg;base64," + value;
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
            <Card.Img variant="top" style={{width: '18rem'}} src={this.state.image} />
        );
    }
}