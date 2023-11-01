import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Badge} from 'react-native-paper';
import {ICustomer} from '@/features/chat/chat.model';
import moment from 'moment';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ChatStackParamList} from '@/routes/chat.route';
import AvatarImage from '@/components/common/avatar-image';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const {width, height} = Dimensions.get('screen');

export const LoadingCustomerItem = () => {
  return (
    <View style={styles.container}>
      <SkeletonPlaceholder borderRadius={4}>
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item width={56} height={56} borderRadius={56} />
          <SkeletonPlaceholder.Item marginLeft={'4%'}>
            <SkeletonPlaceholder.Item
              width={width * 0.3}
              height={height * 0.02}
            />
            <SkeletonPlaceholder.Item
              marginTop={'5%'}
              width={width * 0.5}
              height={height * 0.02}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
};

type Props = {
  customer: ICustomer;
};
const CustomerItem = (props: Props) => {
  const navigation = useNavigation<NavigationProp<ChatStackParamList>>();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('ChatboxScreen', {
          customer: props.customer,
        });
      }}>
      <AvatarImage
        source={{uri: props.customer.friendImageUrl}}
        size={width * 0.143}
      />
      <View style={styles.containerContent}>
        <View style={styles.dateAndName}>
          <Text style={styles.txtName}>{props.customer.friendName}</Text>
          {props.customer?.lastMessage?.creationTime && (
            <Text
              style={{
                top: 0,
                right: 0,
                fontSize: 13,
                fontWeight: props.customer.unreadMessageCount ? '500' : '400',
                color: props.customer.unreadMessageCount
                  ? '#333333'
                  : '#adb5bd',
              }}>
              {moment(props.customer?.lastMessage?.creationTime).format(
                'DD-MM-YY HH:mm',
              )}
            </Text>
          )}
        </View>
        {props.customer?.lastMessage && (
          <View style={styles.lastMessAndUnRead}>
            {props.customer?.lastMessage?.typeMessage && (
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 16,
                  color: props.customer.unreadMessageCount
                    ? '#707386'
                    : '#C4C8D9',
                  fontWeight: props.customer.unreadMessageCount ? '600' : '500',
                }}>
                {props.customer.lastMessage.typeMessage === 1
                  ? props.customer.lastMessage.message
                  : props.customer.lastMessage.typeMessage === 4
                  ? '[Tệp tin]'
                  : props.customer.lastMessage.typeMessage === 3
                  ? '[Video]'
                  : '[Hình ảnh]'}
              </Text>
            )}
            {!!props.customer.unreadMessageCount && (
              <Badge>{`+${props.customer.unreadMessageCount}`}</Badge>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomerItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: height * 0.019,
    borderBottomWidth: 1.5,
    borderColor: '#F1F2F8',
    backgroundColor: 'white',
    overflow: 'visible',
  },
  containerContent: {
    marginLeft: '4%',
    flex: 1,
    justifyContent: 'space-between',
  },
  dateAndName: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#707386',
  },
  lastMessAndUnRead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '2%',
  },
});
