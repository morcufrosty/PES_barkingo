/* @flow */

import { AsyncStorage } from 'react-native';



export default async () => {
  const token = await AsyncStorage.getItem('jwtToken');
  const optionsWithHeaders = token
    ? {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        },
      }
    : options;
  return fetch("10.4.41.164:3000" + url, optionsWithHeaders);
};