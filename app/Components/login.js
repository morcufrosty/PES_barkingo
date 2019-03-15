import React from 'react';
import { StyleSheet, Text, View,
    ScrollView,
    TextInput,
    Button
}  from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <ScrollView style={{padding: 20}}>
           <Text
               style={{fontSize: 27}}>
               Login
           </Text>
           <TextInput placeholder='Username' />
           <TextInput placeholder='Password' />
           <View style={{margin:7}} />
           <Button
                     title="Submit"
                 />
             </ScrollView>
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
