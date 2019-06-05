/* @flow */
import React from 'react';
import { AsyncStorage, ScrollView, ActivityIndicator, View, Platform } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';
import KeyboardSpacer from 'react-native-keyboard-spacer';

// import { loadMessages, sendMessage } from '../actions/loadMessages';

export default class ConversationChat extends React.Component {
    constructor(props) {
        super(props);
        const host = '10.4.41.164';
        const port = '3000';
        this.socket = SocketIOClient(`http://${host}:${port}`);

        this.socket.on('message', message => {
            const newMessage = {
                createdAt: message.createdAt,
                text: message.text,
                userId: message.senderId,
                _id: message.msgId,
            };
            this.props.onSendMessage(message.conversationId, newMessage);
        });

        this.state = {
            // message: '',
            // messages: [],
            // offerId: this.props.navigation.getParam('offerId', '1'),
            isLoading: true,
            chat: this.props.navigation.getParam('chat', '1'),
            // tokenJson: '',
            // user: {},
        };

        this.handleStart = this.handleStart.bind(this);
        this.getMappedMessages = this.getMappedMessages.bind(this);
        this.getConversationFriend = this.getConversationFriend.bind(this);
        this.getUserInfoAPI = this.getUserInfoAPI.bind(this);
    }

    async handleStart() {
        const t = await AsyncStorage.getItem('access_token');
        const tokenJson = JSON.parse(t);
        const response = await this.getCurrentUserFromAPI(tokenJson);
        const id = response.user.id;
        this.socket.emit('init', {
            senderId: id,
        });

        const messages = await this.getMappedMessages();

        this.setState({ messages, tokenJson, user: response.user });
    }

    componentDidMount() {
        this.handleStart().then(res => {
            this.setState({ isLoading: false });
        });
    }

    componentWillUnmount() {
        this.socket.emit('disconnect', {
            senderId: '',
        });
    }

    async getUserInfoAPI(tokenJson, id) {
        return fetch(`http://10.4.41.164/api/users/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': tokenJson.token,
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                return responseJson;
            })
            .catch(error => {
                console.error(error);
            });
    }

    async getConversationFriend(id) {
        const t = await AsyncStorage.getItem('access_token');
        const tokenJson = JSON.parse(t);
        const response = await this.getUserInfoAPI(tokenJson, id);
        return response.user.username;
    }

    async getMappedMessages() {
        const t = await AsyncStorage.getItem('access_token');
        const tokenJson = JSON.parse(t);
        const response = await this.getChatMessagesFromAPI(tokenJson, this.state.chat.chatInfo.idChat);
        const promises = response.messages
            ? response.messages
                  .map(async ({ _id, text, createdAt, userId }) => {
                      const res = await this.getConversationFriend(userId);
                      return {
                          _id,
                          text,
                          createdAt,
                          user: {
                              _id: userId,
                              name: res,
                          },
                      };
                  })
                  .reverse()
            : [];
        return Promise.all(promises);
    }

    async getCurrentUserFromAPI(tokenJson) {
        return fetch('http://10.4.41.164/api/users/currentUser', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': tokenJson.token,
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                return responseJson;
            })
            .catch(error => {
                console.error(error);
            });
    }

    getChatMessagesFromAPI(tokenJson, id) {
        return fetch(`http://10.4.41.164/api/chats/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': tokenJson.token,
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                return responseJson;
            })
            .catch(error => {
                console.error(error);
            });
    }

    _onSend = message => {
        const { chat } = this.state;
        const { chatInfo } = chat;
        this.socket.emit('message', {
            conversationId: chatInfo.idChat,
            text: message[0].text,
            senderId: chat.currentUser,
            receiverId: chatInfo.userId,
            createdAt: new Date(),
            msgId: message[0]._id,
        });
        const newMessage = {
            createdAt: message[0].createdAt,
            text: message[0].text,
            _id: message[0]._id,
            user: {
                _id: message[0].user._id,
                name: this.state.user.username,
            },
        };
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, newMessage),
        }));
    };

    render() {
        if (this.state.isLoading) {
            // this.handleStart();
            return (
                <ScrollView
                    horizontal={false}
                    style={{
                        height: '90%',
                    }}
                >
                    <ActivityIndicator size="small" color="#ffffff" />
                </ScrollView>
            );
        } else {
            return (
                <View style={{flex: 1}}>
                    <GiftedChat
                    messages={this.state.messages} 
                    onSend={this._onSend} 
                    user={{ _id: this.state.user.id, name: this.state.user.username }}
                    />
                    {Platform.OS === 'android' ? <KeyboardSpacer /> : null }
                </View>
            );

        }
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
