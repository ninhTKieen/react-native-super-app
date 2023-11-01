import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IconGeneral from '@/components/common/icon-general';
import {color} from '@/configs/globalStyles';

const {width} = Dimensions.get('screen');

type Props = {
  icon?: {
    type:
      | 'Ionicons'
      | 'AntDesign'
      | 'Entypo'
      | 'EvilIcons'
      | 'Feather'
      | 'FontAwesome'
      | 'FontAwesome5'
      | 'FontAwesome5Pro'
      | 'Fontisto'
      | 'Foundation'
      | 'MaterialCommunityIcons'
      | 'MaterialIcons'
      | 'Octicons'
      | 'SimpleLineIcons'
      | 'Zocial';
    name: string;
  };
  title: string;
  content: any;
};

const StoreInfoItem = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.l}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: width * 0.5,
          }}>
          {props.icon && (
            <IconGeneral
              type={props.icon.type}
              name={props.icon.name}
              size={24}
              color={color.grey6}
              style={{paddingRight: 15}}
            />
          )}
          <Text style={styles.text1}>{props.title}</Text>
        </View>
        <Text
          style={[
            styles.text2,
            {
              maxWidth: props.icon ? width * 0.4 : width * 0.7,
              textAlign: 'left',
            },
          ]}>
          {props.content}
        </Text>
      </View>
    </View>
  );
};

export default StoreInfoItem;

const styles = StyleSheet.create({
  container: {paddingHorizontal: 19, paddingVertical: 15},
  l: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  i: {},
  text1: {
    fontSize: 16,
    fontWeight: '600',
    color: color.grey6,
    maxWidth: width * 0.5,
  },
  text2: {
    color: color.blueDark1,
    fontWeight: '500',
    fontSize: 15,
    paddingLeft: 10,
    paddingTop: 5,
    maxWidth: width * 0.4,
  },
});
