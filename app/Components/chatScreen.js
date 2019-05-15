import React from "react";
import { View, Platform } from 'react-native';
import { GiftedChat } from "react-native-gifted-chat";
import KeyboardSpacer from 'react-native-keyboard-spacer';


export default class charScreen extends React.Component {
    state = {
        messages: []
      };
    
      componentWillMount() {
        this.setState({
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
    
      onSend(messages = []) {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages)
        }));
      }
    
      render() {
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