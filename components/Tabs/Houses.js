import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Constants } from 'expo';

export default class Houses extends Component {
  render() {
    const {screenProps: {leaderboard: {gryffinclaw = 0, lannistark = 0, ironbeard = 0}}} = this.props;

    return (
      <View style={styles.container}>
        <Text>Gryffinclaw: {gryffinclaw}</Text>
        <Text>Lannistark: {lannistark}</Text>
        <Text>Ironbeard: {ironbeard}</Text>
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
