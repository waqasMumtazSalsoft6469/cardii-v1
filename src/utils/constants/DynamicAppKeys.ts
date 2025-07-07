import {Platform} from 'react-native';

const shortCodes = {
  cardii: '7135b3',
};

const appIds = {
  hugloren: Platform.select({
    ios: 'com.cardii.royoorder',
    android: 'com.cardii.royoorder',
  }),
};

export {appIds, shortCodes};
