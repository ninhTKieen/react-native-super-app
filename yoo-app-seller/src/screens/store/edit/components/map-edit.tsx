import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {color} from '@/configs/globalStyles';
import {useFormContext} from 'react-hook-form';
import {IStoreUpdate} from '@/features/store/store.model';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {StoreIcon} from '@/screens/store/icons';
import GeoLocation from 'react-native-geolocation-service';

const MapEdit = (): JSX.Element => {
  const {setValue, watch} = useFormContext<IStoreUpdate>();

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: watch('latitude') || 10.762622,
          longitude: watch('longitude') || 106.660172,
          latitudeDelta: 0.0922 / 20,
          longitudeDelta: 0.0421 / 20,
        }}
        onLongPress={e => {
          setValue('latitude', e.nativeEvent.coordinate.latitude);
          setValue('longitude', e.nativeEvent.coordinate.longitude);
        }}>
        <Marker
          draggable
          coordinate={{
            latitude: watch('latitude') || 10.762622,
            longitude: watch('longitude') || 106.660172,
          }}
          onDragEnd={e => {
            setValue('latitude', e.nativeEvent.coordinate.latitude);
            setValue('longitude', e.nativeEvent.coordinate.longitude);
          }}
        />
      </MapView>
      <View style={styles.containerButton}>
        <TouchableOpacity
          onPress={() => {
            GeoLocation.getCurrentPosition(
              position => {
                setValue('latitude', position.coords.latitude);
                setValue('longitude', position.coords.longitude);
              },
              error => {
                console.log(error);
              },
              {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
            );
          }}>
          <StoreIcon.Location height={25} width={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MapEdit;

const styles = StyleSheet.create({
  containerButton: {
    position: 'absolute',
    top: '5%',
    right: '5%',
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: color.white,
  },
  container: {
    maxHeight: 300,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  map: {
    height: 200,
    width: '100%',
    marginTop: 10,
  },
  textInput: {
    borderWidth: 1,
    padding: 7,
    borderRadius: 5,
    marginVertical: 5,
    borderColor: color.grey3,
    justifyContent: 'center',
    alignItems: 'center',
    color: color.blueDark,
    paddingVertical: 13,
  },
});
