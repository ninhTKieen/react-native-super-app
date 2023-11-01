import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Button, Divider} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {IItemBooking} from '@/features/itemBooking/item-booking.model';
import {ItemBookingStackParamList} from '@/routes/item-booking.route';
import {useTranslation} from 'react-i18next';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {color} from '@/configs/globalStyles';
import IconGeneral from '@/components/common/icon-general';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import Toast from 'react-native-toast-message';
import {AxiosError} from 'axios';
import itemServices from '@/features/item/item.service';
import {ItemStatus} from '@/features/item/item.model';

interface IProps {
  item: IItemBooking;
}
const {width} = Dimensions.get('screen');

type ItemBookingDetailScreenNavigationProp = NavigationProp<
  ItemBookingStackParamList,
  'ItemBookingList'
>;
const ListItemBookingRow = ({item}: IProps) => {
  const navigation = useNavigation<ItemBookingDetailScreenNavigationProp>();
  const {t} = useTranslation();
  const queryClient = useQueryClient();

  const {mutate: deleteItem} = useMutation({
    mutationFn: () => itemServices.deleteItem({id: item.id}),
    onSuccess: _data => {
      queryClient.refetchQueries(['itembooking']);
      Toast.show({
        type: 'success',
        text1: t(i18nKeys.common.success) as string,
        text2: t(i18nKeys.store.updateSuccessMsg) as string,
      });
    },
    onError: error => {
      console.log('[DELETE ITEM]', (error as AxiosError).response?.data);
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.common.error) as string,
        text2: t(i18nKeys.store.updateFailedMsg) as string,
      });
    },
  });

  const {mutate: showItem} = useMutation({
    mutationFn: () =>
      itemServices.showItem({
        id: item.id,
      }),
    onSuccess: _data => {
      queryClient.refetchQueries(['itembooking']);
      Toast.show({
        type: 'success',
        text1: t(i18nKeys.common.success) as string,
        text2: t(i18nKeys.item.edit.statusSuccess) as string,
        visibilityTime: 2000,
      });
    },
    onError: error => {
      console.log('[UPDATE STATUS ITEM]', (error as AxiosError).response?.data);
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.common.error) as string,
        text2: t(i18nKeys.store.updateFailedMsg) as string,
        visibilityTime: 2000,
      });
    },
  });

  const {mutate: hiddenItem} = useMutation({
    mutationFn: () =>
      itemServices.hiddenItem({
        id: item.id,
      }),
    onSuccess: _data => {
      queryClient.refetchQueries(['itembooking']);
      Toast.show({
        type: 'success',
        text1: t(i18nKeys.common.success) as string,
        text2: t(i18nKeys.item.edit.statusSuccess) as string,
        visibilityTime: 2000,
      });
    },
    onError: error => {
      console.log('[UPDATE STATUS ITEM]', (error as AxiosError).response?.data);
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.common.error) as string,
        text2: t(i18nKeys.store.updateFailedMsg) as string,
        visibilityTime: 2000,
      });
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ItemBookingDetail', {item});
        }}>
        <View style={{flexDirection: 'row'}}>
          <FastImage
            source={{
              uri: item.imageUrlList[0] as string,
            }}
            style={styles.image}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.name} numberOfLines={2}>
              {(item.name as string).length > 25
                ? `${item.name?.slice(0, 25)}...`
                : item.name}
            </Text>
            <Text style={styles.price}>
              {Intl.NumberFormat('vi', {
                style: 'currency',
                currency: 'VND',
              }).format(item.modelList[0]?.currentPrice ?? 0)}
            </Text>
          </View>
        </View>

        <Divider style={{marginTop: 20}} />
      </TouchableOpacity>

      <View style={styles.buttonWrapper}>
        <Button
          mode="outlined"
          icon={item.status === ItemStatus.ACTIVE ? 'eye-off' : 'eye'}
          style={{
            borderRadius: 20,
            width: 0.38 * width,
            borderColor: color.primary,
          }}
          onPress={() => {
            item.status === ItemStatus.ACTIVE ? hiddenItem() : showItem();
          }}
          labelStyle={{
            color: color.primary,
          }}>
          {item.status === ItemStatus.ACTIVE
            ? t(i18nKeys.item.delist)
            : t(i18nKeys.item.publish)}
        </Button>

        <Button
          mode="contained"
          icon="book-edit"
          onPress={() => {
            Toast.show({
              type: 'info',
              text1: `${t(i18nKeys.common.updating)}`,
              text2: `${t(i18nKeys.common.comingSoonMsg)}`,
              visibilityTime: 2000,
            });
          }}
          disabled={item.status === ItemStatus.HIDDEN}
          style={{
            backgroundColor:
              item.status === ItemStatus.ACTIVE ? color.primary : color.grey0,
            borderRadius: 20,
            width: width * 0.38,
          }}
          textColor={color.white}>
          {t(i18nKeys.common.edit)}
        </Button>

        <TouchableOpacity
          onPress={() => {
            Alert.alert(t(i18nKeys.dialog.confirmTitle), '', [
              {
                text: t(i18nKeys.dialog.cancel) as string,
              },
              {
                style: 'destructive',
                text: t(i18nKeys.dialog.confirm) as string,
                onPress: () => {
                  deleteItem();
                },
              },
            ]);
          }}
          style={styles.deleteBtnWrapper}>
          <IconGeneral
            name="trash-outline"
            size={24}
            type="Ionicons"
            color="#CD1C1C"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginTop: '2%',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    flex: 1,
  },

  image: {
    height: width * 0.18,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#ced4da',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  infoContainer: {
    flex: 1,
    paddingLeft: 10,
  },

  name: {
    color: color.grey6,
    fontSize: 15,
    fontWeight: '500',
    paddingTop: '1%',
  },

  sold: {
    paddingBottom: 5,
    fontSize: 15,
  },

  quantity: {
    fontSize: 13,
    fontWeight: '400',
    marginLeft: 5,
    color: '#6c757d',
  },

  price: {
    color: color.primary,
    fontSize: 15,
    marginTop: '2%',
  },

  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },

  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 1,
    marginTop: 5,
    paddingVertical: '2%',
  },

  detail: {
    flexDirection: 'row',
    flex: 2,
    alignItems: 'center',
  },

  editBtnWrapper: {
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.primary,
  },

  deleteBtnWrapper: {
    borderColor: '#CD1C1C',
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.15,
  },
});

export default ListItemBookingRow;
