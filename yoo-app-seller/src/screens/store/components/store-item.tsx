import React from 'react';

import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {IStore} from '@/features/store/store.model';
import {PartnerStoreStackParamList} from '@/routes/store.route';
import {useAppDispatch, useAppSelector} from '@/hooks/redux.hook';
import {
  selectCurrentStore,
  setCurrentStore,
} from '@/features/store/store.slice';
import FastImage from 'react-native-fast-image';

const {width} = Dimensions.get('screen');
interface IProps {
  item: IStore;
}

const StoreItem = ({item}: IProps) => {
  const navigation =
    useNavigation<NavigationProp<PartnerStoreStackParamList>>();
  const dispatch = useAppDispatch();
  const currentStore = useAppSelector(selectCurrentStore);
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: item.id === currentStore ? '#caf0f8' : 'white',
        },
      ]}
      onPress={() => {
        dispatch(setCurrentStore(item));
        navigation.navigate('PartnerStoreMainPage', {
          // inforStore: item,
        });
      }}>
      <View style={{marginLeft: 10}}>
        <FastImage
          source={{
            uri: item.imageUrls[0]
              ? item.imageUrls[0]
              : 'https://i.imgur.com/Eo44Q03.jpg',
          }}
          style={styles.image}
        />
      </View>

      <View style={{marginLeft: 20}}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '500',
            color: '#151522',
          }}>
          {item.name.length > 29 ? item.name.substr(0, 29) + '...' : item.name}
        </Text>
        <Text style={{fontSize: 14, fontWeight: '400', color: '#151522'}}>
          {item.address?.length && item.address?.length > 29
            ? item.address?.substring(0, 30) + '...'
            : item.address}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginHorizontal: 20,
  },

  image: {
    height: width / 6,
    width: width / 6,
    borderRadius: width / 12,
  },
});

export default StoreItem;
