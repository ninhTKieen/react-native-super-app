import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useCurrentStore} from '@/hooks/useCurrentStore';
import BackIcon from '@/assets/profile/backEditScreen.svg';
import EditIcon from '@/assets/profile/editIcon.svg';
import ImageCustomer from '@/components/common/image-customer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {PartnerStoreStackParamList} from '@/routes/store.route';
import IconGeneral from '@/components/common/icon-general';
import {color} from '@/configs/globalStyles';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {useTranslation} from 'react-i18next';
import StoreInfoItem from './components/store-infor-item';
import {useGetGroupType, useGetType} from '@/configs/i18n/constants';
import {Divider} from 'react-native-paper';
import RenderHTML from 'react-native-render-html';
import {usePosition} from '@/hooks/usePosition';
import ImageViewModal from '@/components/modals/image-view-modal';
import {Pressable} from 'react-native';
const {width, height} = Dimensions.get('screen');

type Props = {};

const StoreDetailScreen = (props: Props) => {
  const {currentStoreInfor} = useCurrentStore();
  const navigation =
    useNavigation<NavigationProp<PartnerStoreStackParamList>>();

  const {t, i18n} = useTranslation();
  const {provinces, wards, districts} = usePosition({
    province: currentStoreInfor?.provinceId,
    district: currentStoreInfor?.districtId,
    ward: currentStoreInfor?.wardId,
  });
  const [isVisible, setVisible] = React.useState(false);

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.heading}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <BackIcon width={24} height={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('EditStoreStack', {
                screen: 'EditMainPage',
                params: {inforStore: currentStoreInfor},
              });
            }}>
            <EditIcon width={24} height={24} />
          </TouchableOpacity>
        </View>
        <Pressable onPress={() => setVisible(true)}>
          <ImageCustomer
            source={
              currentStoreInfor?.imageUrls &&
              currentStoreInfor.imageUrls.length > 0
                ? {uri: currentStoreInfor.imageUrls[0]}
                : require('@/assets/logos/logo.png')
            }
            widthImg={width * 0.92}
            heightImg={height * 0.164}
            borderRadius={13}
            marginHorizontal={width * 0.04}
            style={styles.imageWall}
          />
        </Pressable>
        <View style={styles.containerTitle}>
          <View style={styles.avatarContainer}>
            <Pressable onPress={() => setVisible(true)}>
              <ImageCustomer
                source={
                  currentStoreInfor?.imageUrls &&
                  currentStoreInfor.imageUrls.length > 0
                    ? {uri: currentStoreInfor.imageUrls[0]}
                    : require('@/assets/logos/logo.png')
                }
                resizeMode="stretch"
                widthImg={width * 0.26}
                heightImg={width * 0.26}
                borderRadius={width * 0.26}
                style={styles.image}
              />
            </Pressable>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.txtName}>{`${currentStoreInfor?.name} `}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: color.grey7,
                  width: 80,
                  borderRadius: 10,
                  paddingVertical: 3,
                }}>
                <IconGeneral
                  type="MaterialIcons"
                  name="star-rate"
                  size={14}
                  color={color.yellow1}
                />
                <Text
                  style={{
                    color: color.blue9,
                    fontWeight: '600',
                    fontSize: 16,
                    paddingLeft: 4,
                  }}>
                  {currentStoreInfor?.ratePoint + '/' + '5.0'}
                </Text>
              </View>
              <View
                style={{
                  // borderLeftWidth: 5,
                  // borderLeftColor: 'red',
                  marginHorizontal: 10,
                  borderColor: color.grey6,
                  borderWidth: 1,
                  height: 15,
                }}
              />
              <Text
                style={{
                  color: color.grey6,
                  fontWeight: '600',
                  fontSize: 15,
                }}>
                {currentStoreInfor?.countRate + ' ' + t(i18nKeys.store.review)}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{height: 5, backgroundColor: color.grey7}} />

      <StoreInfoItem
        icon={{type: 'Ionicons', name: 'call-outline'}}
        title={t(i18nKeys.store.createForm.phoneNumber)}
        content={currentStoreInfor?.phoneNumber}
      />
      <StoreInfoItem
        icon={{type: 'Feather', name: 'map-pin'}}
        title={t(i18nKeys.store.createForm.address)}
        content={currentStoreInfor?.address}
      />

      <StoreInfoItem
        icon={{type: 'Feather', name: 'mail'}}
        title={t(i18nKeys.store.createForm.email)}
        content={currentStoreInfor?.email}
      />

      <Divider style={{height: 5, backgroundColor: color.grey7}} />

      <StoreInfoItem
        title={t(i18nKeys.store.createForm.groupType)}
        content={useGetGroupType(currentStoreInfor?.groupType)}
      />

      <StoreInfoItem
        title={t(i18nKeys.store.createForm.type)}
        content={useGetType(currentStoreInfor?.type)}
      />

      <Divider style={{height: 5, backgroundColor: color.grey7}} />

      <StoreInfoItem
        title={t(i18nKeys.store.createForm.provinceId)}
        content={
          provinces?.filter(
            item => item.value === currentStoreInfor?.provinceId,
          )[0]?.label
        }
      />

      <StoreInfoItem
        title={t(i18nKeys.store.createForm.districtId)}
        content={
          districts?.filter(
            (item: any) => item.value === currentStoreInfor?.districtId,
          )[0]?.label
        }
      />

      <StoreInfoItem
        title={t(i18nKeys.store.createForm.wardId)}
        content={
          wards?.filter(
            (item: any) => item.value === currentStoreInfor?.wardId,
          )[0]?.label
        }
      />

      <Divider style={{height: 5, backgroundColor: color.grey7}} />

      <StoreInfoItem
        title={t(i18nKeys.store.createForm.contact)}
        content={currentStoreInfor?.contact}
      />

      <StoreInfoItem
        title={t(i18nKeys.store.createForm.businessInfo)}
        content={currentStoreInfor?.businessInfo}
      />
      <Divider style={{height: 5, backgroundColor: color.grey7}} />

      <View style={{marginVertical: 10, paddingHorizontal: 20}}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: color.grey6,
            paddingBottom: 10,
          }}>
          {t(i18nKeys.store.createForm.description)}
        </Text>
        <RenderHTML
          source={{html: `${currentStoreInfor?.description || 'None'}`}}
          contentWidth={width * 0.8}
        />
      </View>
      <ImageViewModal
        images={currentStoreInfor?.imageUrls || ['']}
        isVisible={isVisible}
        setVisible={setVisible}
      />
    </ScrollView>
  );
};

export default StoreDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    position: 'absolute',
    top: height * 0.01,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: width * 0.04,
    paddingHorizontal: width * 0.02,
    zIndex: 100,
    width: width * 0.92,
  },
  imageWall: {
    borderRadius: 13,
    width: width * 0.92,
    height: height * 0.164,
    marginHorizontal: width * 0.04,
  },
  image: {
    borderRadius: width * 0.26,
    width: width * 0.26,
    height: width * 0.26,
  },
  containerTitle: {
    flexDirection: 'row',
    marginTop: -height * 0.026,
    alignItems: 'center',
    paddingBottom: 10,
  },
  avatarContainer: {
    marginLeft: width * 0.03,
    borderColor: 'white',
    borderWidth: 0.01 * width,
    borderRadius: width * 0.3,
    width: width * 0.28,
  },
  txtName: {
    color: '#707386',
    fontSize: 20,
    fontWeight: '700',
    paddingBottom: height * 0.012,
    paddingTop: height * 0.01,
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'space-around',
    paddingLeft: width * 0.025,
  },
});
