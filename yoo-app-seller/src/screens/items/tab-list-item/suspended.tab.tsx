import {View} from 'react-native';
import React from 'react';
import ListItem from '../components/list-item';
import {RouteProp, useRoute} from '@react-navigation/native';
import {ItemTabParamList} from '@/routes/item.route';

const SuspendedTab = () => {
  const route = useRoute<RouteProp<ItemTabParamList>>();
  const status = route.params.status;
  return (
    <View style={{flex: 1}}>
      <ListItem status={status} />
    </View>
  );
};

export default SuspendedTab;
