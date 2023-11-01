import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IRateItem} from '@/features/rate/rate.model';
import AvatarImage from '@/components/common/avatar-image';
import RateListStar from './rate-list-star';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import IconGeneral from '@/components/common/icon-general';
type Props = {
  data: IRateItem;
};
const RateItem = ({data}: Props) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <AvatarImage source={{uri: data.avatar}} size={36} />
        <View
          style={{
            paddingLeft: '2%',
          }}>
          <Text style={styles.txtName}>{data.userName}</Text>
          <RateListStar pointStar={data.ratePoint} size={11} />
        </View>
      </View>
      <Text style={styles.txtComment}>{data.comment}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {data?.creationTime && (
          <Text style={styles.txtDate}>
            {moment(String(data.creationTime), 'MM/DD/YYYY HH:mm:ss').format(
              'DD-MM-YYYY HH:mm',
            )}
          </Text>
        )}
        {!!data.answerRateId && (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
            }}>
            <Text style={styles.txtBtnAns}>Phản hồi của người bán</Text>
            <IconGeneral
              name="chevron-down"
              type="Ionicons"
              color={'#707386'}
              size={16}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default RateItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: '4%',
    paddingVertical: '5%',
    marginTop: '0.5%',
  },
  txtName: {
    color: '#676767',
    fontSize: 16,
    fontWeight: '600',
    paddingBottom: '4%',
  },
  txtComment: {
    color: '#707386',
    fontSize: 15,
    fontWeight: '500',
    paddingVertical: '4%',
  },
  txtDate: {
    color: '#707386',
    fontSize: 13.5,
    fontWeight: '500',
  },
  txtBtnAns: {
    color: '#707386',
    fontSize: 14,
    fontWeight: '500',
  },
});
