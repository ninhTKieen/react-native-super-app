import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Badge} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ChatStackParamList} from '@/routes/chat.route';
import AvatarImage from '@/components/common/avatar-image';

type Props = {
  avatarUrl?: string;
  name?: string;
  isOnline?: boolean;
  onPressBack?: Function;
};

const HeaderBoxChat = ({
  avatarUrl = '',
  name = '',
  onPressBack = () => {},
}: Props) => {
  const navigation = useNavigation<NavigationProp<ChatStackParamList>>();
  return (
    <View style={styles.menu}>
      <View style={{flexDirection: 'row', alignItems: 'center', flex: 6}}>
        <TouchableOpacity
          style={{marginHorizontal: 10}}
          onPress={() => {
            navigation.goBack();
            onPressBack();
          }}>
          <Ionicons name="md-arrow-back-outline" color="#2B5783" size={22} />
        </TouchableOpacity>
        <View>
          <AvatarImage
            size={40}
            source={{uri: avatarUrl}}
            // containerStyle={{
            //   borderWidth: 2,
            //   borderColor: item.isOnline ? 'green' : '#dee2e6',
            // }}
          />
          {/* {item.isOnline ? ( */}
          <Badge style={{position: 'absolute', top: 3, right: 0}} size={10} />
          {/* ) : (
            <Badge
              badgeStyle={{
                backgroundColor: '#adb5bd',
              }}
              containerStyle={{position: 'absolute', top: 3, right: 0}}
            />
          )} */}
        </View>

        <View style={{flexDirection: 'row', marginLeft: 10, flex: 1}}>
          <Text
            style={{color: '#333333', fontSize: 15, fontWeight: '500'}}
            numberOfLines={1}>
            {name}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.iconRight}>
        <Ionicons
          name="ellipsis-vertical"
          // color="#0078fe"
          color="#2B5783"
          size={22}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderBoxChat;

const styles = StyleSheet.create({
  menu: {
    paddingVertical: '3%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: '2.5%',
    justifyContent: 'space-between',
    flex: 3,
  },
  iconRight: {},
});
