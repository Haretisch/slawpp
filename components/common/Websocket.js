import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Socket} from 'phoenix';

export default class SlawSocket extends Component{
  constructor(props) {
    super(props)

    this.state = {
      channels: {},
      config: {
        channels: {
          roulette: 'roulette_participants:$v:$username',
          user_data: 'user_data:$v',
          houses: 'houses:$v',
          creature: 'creature_attack:$v',
          house_raids: 'house_raid:$v'
        },
        version: 'v0',
      },
      connected: false,
      socket: new Socket("wss://api.sirslaw.com/socket", {
        params: {user: props.username}
      }),
    }
  }

  componentDidMount() {
    const {socket} = this.state;
    const {channels} = this.props;

    this.handleChannels();

    socket.onOpen(() => {this.setState({connected: true});});
    socket.onClose((event) => {this.setState({connected: false});});
    socket.onError((error) => {console.log("Error", error);})

    socket.connect();
  }

  componentWillUnmount() {
    const {socket} = this.state;

    this.leaveChannels();
    socket.disconnect();
  }

  componentDidUpdate(prevProps, prevState) {
    const {channels, connected} = this.state;
    const {connected: wasConnected} = prevState;

    if(!wasConnected && connected) {
      this.joinChannels();
    } else if(wasConnected && !connected) {
      this.leaveChannels();
    }
  }

  addChannelListeners({channel, listeners}) {
    let connectionName = channel.topic.substring(0, channel.topic.indexOf(':'));

    for(let callback in listeners) {
      if(callback === 'onOpen') { continue; }
      if(typeof listeners[callback].func === 'function') {
        let listenerString;
        let f = listeners[callback];

        if(f.path) {
          listenerString = f.path;
        } else {
          listenerString = `${connectionName}:${callback}`;
          if(f.endpoint) {
            listenerString += `:${f.endpoint}`
          }
        }

        channel.on(listenerString, f.func);
      }
    }
  }

  handleChannels(prevChannels = []) {
    const {config, socket} = this.state;
    const {channels: curChannels} = this.props;
    const pattern = new RegExp("\\$(\\w+)\\b", 'g');
    const channels = {};

    curChannels.forEach(({channel, listeners, params}) => {
      let connectionString = config.channels[channel].
        replace(pattern, (match, param) => {
          if(param === 'v') {
            return config.version;
          } else if(params[param]) {
            return params[param];
          } else {
            throw `Missing parameter "${match}" for connection to "${channel}"`;
          }
        })
      ;
      channels[channel] = {};

      channels[channel].channel = socket.channel(connectionString, params || {});
      channels[channel].listeners = listeners;
      this.addChannelListeners(channels[channel]);
    });

    this.setState({channels});
  }

  joinChannels() {
    const {channels} = this.state;

    for(channel in channels) {
      let chan = channels[channel];

      chan.channel.join().receive('ok', body => {
        if(typeof chan.listeners.onOpen === 'function') {
          chan.listeners.onOpen(body);
        }
      });
    }
  }

  leaveChannels() {
    const {channels} = this.state;

    for(channel in channels) {
      channels[channel].c.leave();
    }
  }

  render(){return null;}
}

SlawSocket.propTypes = {
  channels: PropTypes.arrayOf(PropTypes.shape({
    channel: PropTypes.string.isRequired,
    listeners: PropTypes.objectOf(PropTypes.shape({
      endpoint: PropTypes.string,
      func: PropTypes.func.isRequired,
      path: PropTypes.string,
    })).isRequired,
    params: PropTypes.object,
    //send: PropTypes.func,
  })).isRequired,
  username: PropTypes.string.isRequired,
};
