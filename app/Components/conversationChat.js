/* @flow */
import React from 'react';
import { AsyncStorage } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';

import { loadMessages, sendMessage } from '../actions/loadMessages';





export default class ConversationChat extends React.Component {


  

  constructor(props) {
    super(props);
    const host = "10.4.41.164";
    const port = "3000";
    this.socket = SocketIOClient(`http://${host}:${port}`);
   
    this.socket.emit('init', {
     
      senderId: this.getCurrentUserFromAPI(AsyncStorage.getItem("access_token")),
    });
    this.socket.on('message', message => {
      const newMessage = {
        createdAt: message.createdAt,
        text: message.text,
        userId: message.senderId,
        _id: message.msgId,
      };
      this.props.onSendMessage(message.conversationId, newMessage);
    });
    state = {
      message: '',
      offerId: this.props.navigation.getParam('offerId', '1'),
      isLoading:false
    };
  }


 
/*
  componentWillMount() {
    this.props.onLoadMessages(
      this.props.navigation.state.params.conversation.id,
    );
  }*/

  

  componentWillUnmount() {
    this.socket.emit('disconnect', {
      senderId: "",
    });
  }

  getConversationFriend = id => {
    const { user, friends } = this.props;
    return id === user.myId ? user.fullName : friends[id].fullName;
  };

  getMappedMessages = () => {
    return this.props.messages
      ? this.props.messages
          .map(({ _id, text, createdAt, userId }) => {
            return {
              _id,
              text,
              createdAt,
              user: {
                _id: userId,
                name: this.getConversationFriend(userId),
              },
            };
          })
          .reverse()
      : [];
  };

  async getCurrentUserFromAPI(tokenJson) {
    console.log(tokenJson);

    return fetch('http://10.4.41.164/api/users/currentUser', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': tokenJson
        }
    }).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        }).catch((error) => {
            console.error(error);
        });

}

  _onSend = message => {
    const { conversation } = this.props.navigation.state.params;
    const { user, onSendMessage } = this.props;
    this.socket.emit('message', {
      conversationId: conversation.id,
      text: message[0].text,
      senderId: user.myId,
      receiverId: conversation.friendId,
      createdAt: new Date(),
      msgId: message[0]._id,
    });
    const newMessage = {
      createdAt: message[0].createdAt,
      text: message[0].text,
      userId: message[0].user._id,
      _id: message[0]._id,
    };
    onSendMessage(conversation.id, newMessage);
  };

  render() {
    return (
      <GiftedChat
        messages={this.getMappedMessages()}
        onSend={this._onSend}
        user="{{ _id: this.props.user.myId }}"
      />
    );
  }
}
/*
export default connect(
  state => ({
    user: state.user,
    messages: state.messages[state.conversations.currentConversationId],
    friends: state.friends.friends,
  }),
  dispatch => ({
    onLoadMessages: conversationId => {
      dispatch(loadMessages(conversationId));
    },
    onSendMessage: (conversationId, message) => {
      dispatch(sendMessage(conversationId, message));
    },
  }),
)(ConversationChat);*/