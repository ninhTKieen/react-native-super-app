import React from 'react';

import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AvatarImage from '@/components/common/avatar-image';
import BellIcon from '../../../assets/store/icons/bell_icon.svg';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {PartnerStoreStackParamList} from '@/routes/store.route';
import IconGeneral from '@/components/common/icon-general';
import {color} from '@/configs/globalStyles';
import {selectCurrentStore} from '@/features/store/store.slice';
import ImageViewModal from '@/components/modals/image-view-modal';
import {useAppSelector} from '@/hooks/redux.hook';
import {useInfiniteQuery} from '@tanstack/react-query';
import notifyServices from '@/features/notify/notify.service';

type Props = {
  avatarUrl?: string;
  name?: string;
  email?: string;
  countRate?: number;
  ratePoint?: number;
  isLoading?: boolean;
  isSuspended?: boolean;
};

const {width, height} = Dimensions.get('screen');

const CardInforStore = (props: Props) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NavigationProp<PartnerStoreStackParamList>>();
  const providerId = useAppSelector(selectCurrentStore);

  const {data: notifications} = useInfiniteQuery({
    queryKey: ['notify', providerId],
    queryFn: ({pageParam}) =>
      notifyServices.getAllNotify({
        skipCount: pageParam,
        providerId: providerId,
      }),

    getNextPageParam: (lastPage, allPages) => {
      let skip = 0;
      allPages.forEach(page => {
        if (page.items) {
          skip += page.items.length;
        }
      });

      if (skip < lastPage.totalCount) {
        return skip;
      }

      return null;
    },
  });

  const [isVisible, setVisible] = React.useState(false);

  return (
    <View style={styles.container}>
      {props.isLoading ? (
        <SkeletonPlaceholder borderRadius={4}>
          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
            <SkeletonPlaceholder.Item
              width={60}
              height={60}
              borderRadius={50}
            />
            <SkeletonPlaceholder.Item marginLeft={20}>
              <SkeletonPlaceholder.Item width={120} height={15} />
              <SkeletonPlaceholder.Item marginTop={6} width={80} height={15} />
              <SkeletonPlaceholder.Item marginTop={6} width={120} height={15} />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      ) : (
        <View style={styles.cartStore}>
          {props.avatarUrl && (
            <View>
              <Pressable onPress={() => setVisible(true)}>
                <AvatarImage
                  source={{uri: props.avatarUrl}}
                  size={width * 0.128}
                />
                {props.isSuspended && (
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: width * 0.04,
                      borderRadius: width * 0.02,
                      height: width * 0.04,
                      backgroundColor: color.red1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <IconGeneral
                      type="Ionicons"
                      name="close"
                      size={10}
                      color={color.white}
                    />
                  </View>
                )}
              </Pressable>
              <ImageViewModal
                images={[props.avatarUrl]}
                isVisible={isVisible}
                setVisible={setVisible}
              />
            </View>
          )}
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              flex: 1,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('DetailStoreScreen', {});
              }}>
              <View style={styles.labelStore}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.nameStore} numberOfLines={1}>
                    {props.name
                      ? props.name
                      : `${t(i18nKeys.store.createForm.name)}: ${t(
                          i18nKeys.common.updating,
                        )}`}
                  </Text>
                  <IconGeneral
                    type="AntDesign"
                    name="doubleright"
                    size={14}
                    color={color.grey9}
                    style={{paddingLeft: 6}}
                  />
                </View>
                <Text numberOfLines={1} style={styles.txtEmail}>
                  {`Email: ${
                    props?.email ? props.email : t(i18nKeys.common.updating)
                  }`}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.containerNotifi}
              onPress={() => {
                navigation.navigate('PartnerStoreNotify', {});
              }}>
              <Text style={styles.txtNotifi}>
                {notifications?.pages?.[0]?.totalUnread}
              </Text>
              <BellIcon />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default CardInforStore;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingHorizontal: width * 0.04,
    paddingTop: height * 0.019,
  },
  cartStore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelStore: {
    paddingHorizontal: '4%',
    justifyContent: 'space-around',
  },
  nameStore: {
    fontSize: 18,
    fontWeight: '700',
    color: color.grey9,
    // lineHeight: 18,
    maxWidth: width * 0.6,
  },
  txtEmail: {
    maxWidth: width * 0.6,
    color: color.grey9,
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 16,
    paddingTop: 4,
  },
  txtCountRate: {
    color: 'white',
  },
  rateTxtStore: {
    paddingLeft: '5%',
    color: 'white',
  },
  txtNotifi: {
    color: '#FFB800',
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 16,
    paddingRight: 4,
  },
  containerNotifi: {
    backgroundColor: '#F1F2F8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width / 39,
    paddingVertical: 9,
    borderRadius: 20,
  },
});
