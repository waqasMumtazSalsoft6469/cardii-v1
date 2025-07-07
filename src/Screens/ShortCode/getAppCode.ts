import {getBundleId} from 'react-native-device-info';
import {appIds, shortCodes} from '../../utils/constants/DynamicAppKeys';

export const getAppCode = () => {
  switch (getBundleId()) {
    case appIds.cardii:
      return shortCodes.cardii;
    default:
      return '7135b3';
  }
};
