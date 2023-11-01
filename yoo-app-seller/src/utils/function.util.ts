import {PermissionsAndroid, Platform} from 'react-native';
import GeoLocation from 'react-native-geolocation-service';

export const requestLocationPermission = async () => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Imax Supplier App Location Permission',
          message:
            'Imax Supplier App needs access to your location ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
        console.log('Location permission denied');
      }
    } else {
      GeoLocation.requestAuthorization('whenInUse');
    }
  } catch (err) {
    console.warn(err);
  }
};
