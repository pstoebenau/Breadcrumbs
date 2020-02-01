import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native'

export default class HelloWorldApp extends Component {
  render() {
    return (
      <View style={styles.body}>
        <View style={styles.topBar}>
          <Button
            title="Start trail"
            onPress={() => Alert.alert('Trail started')}
          />
          <Button
            title="End trail"
            onPress={() => Alert.alert('Trail started')}
          />
        </View>

        <Image
        style={{width: 400, height: 600}}
        source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#000',
  },

  topBar: {
    height: 100,
    flexDirection: 'row',
    paddingTop: 40,
    justifyContent: 'space-between',
  }
});
