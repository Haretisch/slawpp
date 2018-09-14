import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Constants } from 'expo';

export default class Profile extends Component {
  render() {
    const {screenProps: {points, gamble}} = this.props;

    return (
      <View style={styles.container}>
        <Text>Current points: {points}</Text>
        <Text>Gambling: {!!gamble.current_participant ? 'Yes' : 'Not right now'}</Text>
      </View>
    );
  }
}

Profile.propTypes = {
  screenProps: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});
