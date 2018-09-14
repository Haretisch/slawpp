import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { Themes } from '../../styles'

import Profile from './Profile';
import Events from './Events';
import Houses from './Houses';

export default createMaterialBottomTabNavigator(
  {
    Profile: { screen: Profile },
    Events: { screen: Events },
    Houses: { screen: Houses },
  },
  {
    navigationOptions: ({ navigation, screenProps }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        const prefix = Platform.OS === 'ios' ? 'ios' : 'md';
        switch (routeName) {
          case 'Profile':
            iconName = `${prefix}-person`;
            break;
          case 'Houses':
            iconName = `${prefix}-podium`;
            break;
          case 'Events':
            iconName = `${prefix}-flag`;
            break;
        }

        return (<Ionicons name={iconName} size={25} color={tintColor} />);
      },
      barStyle: { backgroundColor: screenProps.theme.main },
    }),
    shifting: true,
    showIcon: true,
    initialRouteName: 'Profile',
    activeTintColor: '#ffffff',
    inactiveTintcolor: '#ffffff',
  }
);
