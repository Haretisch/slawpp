import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Constants } from 'expo';

export default class Events extends Component {
  render() {

    return (
      <View style={styles.container}>
        <Text>Events</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});
