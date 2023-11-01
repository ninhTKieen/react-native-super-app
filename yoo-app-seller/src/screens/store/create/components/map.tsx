import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {color} from '@/configs/globalStyles';
import {useFormContext} from 'react-hook-form';
import {IStoreCreate} from '@/features/store/store.model';
import GeoLocation from 'react-native-geolocation-service';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StoreIcon} from '@/screens/store/icons';

const Map = (): JSX.Element => {
  const {setValue, watch} = useFormContext<IStoreCreate>();

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
      <View
        style={{
          position: 'absolute',
          top: '5%',
          right: '5%',
          width: 35,
          height: 35,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 50,
          backgroundColor: color.white,
        }}>
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

const styles = StyleSheet.create({
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

export default Map;
