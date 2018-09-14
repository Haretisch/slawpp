import { StyleSheet } from 'react-native';
import { Header } from 'react-navigation';

import gc from '../assets/images/gc.png';
import ls from '../assets/images/ls.png';
import ib from '../assets/images/ib.png';

export const Themes = {
  gryphonclaw: {
    main: '#faaf19',
    text: '#ffffff',
    icon: gc,
  },
  lannistark: {
    main: '#81282a',
    text: '#ffffff',
    icon: ls,
  },
  ironbeard: {
    main: '#122a48',
    text: '#ffffff',
    icon: ib,
  },
  'twitch': {
    main: '#6441a4',
    text: '#ffffff',
  },
  '': {
    main: '#f2f2f2',
    text: '#dad8de',
  },
}

const styles = {
  navBarIconWrapper: {
    aspectRatio: 1,
    height: '100%',
  },
  navBarIcon: {
    height: '100%',
    width: '100%',
  },
  page: {
    flex: 1,
  }
}

export default StyleSheet.create(styles);
