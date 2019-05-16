import React from "react";
import { View, Platform } from 'react-native';
import { GiftedChat } from "react-native-gifted-chat";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { AsyncStorage } from 'react-native';



export default class charScreen extends React.Component {
    state = {
        messages: []
      };
    
      componentWillMount() {
        this.setState({


          offerId: "1",
          isLoading:true,

          messages: [
            {
              _id: 1,
              text: "Hello developer",
              createdAt: new Date(),
              user: {
                _id: 2,
                name: "React Native",
                avatar: "https://placeimg.com/140/140/any"
              }
            }
          ]
        });
      }

      async openChatToAPI(tokenJson, id) {

        return fetch(`http://10.4.41.164/api/offers/${id}/chat`, {
            method: 'POST',
            headers: {
                Accept: '*',
                'Content-Type': 'application/json',
                'x-access-token': tokenJson.token
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.msg);
                return responseJson;
            }).catch((error) => {
                console.error(error);
            });
    }

      async handleStart(){
        const token = await AsyncStorage.getItem("access_token");
        tokenJson = JSON.parse(token);
        id = this.props.navigation.getParam('offerId', '1')
        const response = await this.openChatToAPI(tokenJson, id)

        this.setState({offerId:id, isLoading:false } )

      }
    
      onSend(messages = []) {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages)
        }));
      }
    
      render() {

        if(this.state.isLoading){
          this.handleStart()
        }

        return (
            <View style={{flex: 1}}>
                <GiftedChat
                    textInputProps={{autoFocus: true}}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                    _id: 1
                }}
                />
                {Platform.OS === 'android' ? <KeyboardSpacer /> : null }
            </View>
        );
      }
}
