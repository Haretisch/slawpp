import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import Touchable from './common/Touchable'
import { TabNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { Themes } from '../styles'

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Touchable onPress={() => {this.props.navigation.replace('Tabs')}}>
          <View style={styles.button}>
            <Text style={styles.text}>Mock login with Twitch!</Text>
          </View>
        </Touchable>
      </View>
    );
  }
}

Login.propTypes = {
  navigation: Proptypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#f2f2f2',
  },
  button: {
    backgroundColor: Themes.twitch.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    height: 50,
    width: 300,
  },
  text: {
    color: Themes.twitch.text,
  },
});
