import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import { createStackNavigator, Header } from 'react-navigation';

import Styles, { Themes } from './styles';

import Login from './components/Login';
import Tabs from './components/Tabs';
import Websocket from './components/common/Websocket';

const Navigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    },
    Tabs,
  },
  {
    initialRouteName: 'Login',
    navigationOptions: ({ screenProps }) => ({
      headerLeft: (
        <View style={Styles.navBarIconWrapper}>
          <Image source={screenProps.theme.icon} style={Styles.navBarIcon} resizeMode={'contain'} />
        </View>
      ),
      title: screenProps.username,
      headerStyle: {
        backgroundColor: screenProps.theme.main,
      },
      headerTintColor: screenProps.theme.text,
    }),
  }
);

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      connected: true,
      username: 'haretisch',
      theme: Themes.ironbeard,
    };
  }

  componentWillMount() {
    // Check if user is logged in, wait on Loading then redirect to either Login or Tabs
    // Call websocket setup if logged in before going to Tabs so we have information to show
  }

  updatePoints(points) {
    const flags = {
      subscriber: 'Subscriber',
      notifications: 'Notifications On',
      hosting: 'Hosting',
      following: 'Following',
    }
    const flagsKeys = Object.keys(flags).sort();

    let house = points.house.name.toLowerCase();
    let multiplier = Math.pow(2, flagsKeys.filter(f => points.pointFlags[f]).length);
    let pointFlags = {};
    flagsKeys.forEach(f => {
      pointFlags[flags[f]] = points.pointFlags[f];
    });
    let userPoints = Math.floor(points.points.current);
    let theme = Themes[house];

    this.setState({house, multiplier, points: userPoints, pointFlags, theme});
  }

  updateGamble(gamble) {
    this.setState({gamble});
  }

  updateLeaderboard(board) {
    let keys = Object.keys(board);
    let gc = keys.map(k => {if(board[k].houseName === 'Gryffinclaw'){ return board[k]; }}).filter(i => !!i)[0];
    let ls = keys.map(k => {if(board[k].houseName === 'Lannistark'){ return board[k]; }}).filter(i => !!i)[0];
    let ib = keys.map(k => {if(board[k].houseName === 'Ironbeard'){ return board[k]; }}).filter(i => !!i)[0];

    let leaderboard = {
      gryffinclaw: Math.floor(gc.points.current + gc.points.tips + gc.points.cheers + gc.points.subscriptions),
      lannistark: Math.floor(ls.points.current + ls.points.tips + ls.points.cheers + ls.points.subscriptions),
      ironbeard: Math.floor(ib.points.current + ib.points.tips + ib.points.cheers + ib.points.subscriptions),
    };

    this.setState({leaderboard});
  }

  render() {
    const {connected, username} = this.state;

    const channels = [
      { // Logged in user info
        channel: 'user_data',
        params: {username},
        listeners: {
          [username]: {
            func: this.updatePoints.bind(this),
          },
        },
      },
      { // Logged in user's roulette status
        channel: 'roulette',
        params: {username},
        listeners: {
          status_change: {
            endpoint: username,
            func: this.updateGamble.bind(this),
          },
        },
      },
      { // Leaderboard
        channel: 'houses',
        listeners: {
          update: {
            path: 'house_points:update',
            func: this.updateLeaderboard.bind(this),
          },
        },
      },
    ];

    console.log(this.state);

    return (
      <View style={Styles.page}>
        {!!connected && <Websocket
          username={username}
          channels={channels}
        />}
        <Navigator
          screenProps={this.state}
        />
      </View>
    );
  }
}

App.propTypes = {
  //
};
