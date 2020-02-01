import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native';

import MapView from './components/MapView';

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

        <MapView />
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
