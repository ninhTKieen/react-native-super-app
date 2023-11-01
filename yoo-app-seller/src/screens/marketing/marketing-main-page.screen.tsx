import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {BANNER} from '../store/utils/constants';
import ParallaxImageCustomer from '@/components/parallax-image-customer';
import TopBar from '@/components/top-bar';
import globalStyles, {color} from '@/configs/globalStyles';
import {MarketingIcon} from './components/icons';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MarketingStackParamList} from '@/routes/marketing.route';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const {width, height} = Dimensions.get('screen');

type Props = NativeStackScreenProps<
  MarketingStackParamList,
  'MarketingMainPage'
>;

const MarketingMainPageScreen = ({navigation: {navigate}}: Props) => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <TopBar
        title={t(i18nKeys.marketing.title)}
        styleContainer={{paddingBottom: 10}}
      />
      <ParallaxImageCustomer
        data={BANNER}
        resizeMode="stretch"
        styleImg={{
          borderRadius: 8,
          height: height * 0.15,
          width: width * 0.913,
        }}
        sliderHeight={height * 0.15}
        sliderWidth={width}
        autoPlay={true}
        loop
      />
      <Text style={[styles.text]}>{t(i18nKeys.marketing.title2)}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
          alignItems: 'flex-start',
        }}>
        <View style={styles.wrapper}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              navigate('VoucherStack', {screen: 'VoucherListScreen'});
            }}>
            <MarketingIcon.Voucher width={40} height={40} />
          </TouchableOpacity>
          <Text style={styles.label}>{t(i18nKeys.marketing.voucher)}</Text>
        </View>

        <View style={styles.wrapper}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              // navigate('PromotionStack', {screen: 'PromotionListScreen'});
              //updating
              Toast.show({
                type: 'success',
                text1: t(i18nKeys.common.updating) as string,
                visibilityTime: 1000,
              });
            }}>
            <MarketingIcon.Promotion width={40} height={40} />
          </TouchableOpacity>
          <Text style={styles.label}>{t(i18nKeys.marketing.promotion)}</Text>
        </View>

        <View style={styles.wrapper}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              navigate('AdvertisementStack', {
                screen: 'AdvertisementListScreen',
              });
            }}>
            <MarketingIcon.Advertisement width={40} height={40} />
          </TouchableOpacity>
          <Text style={styles.label}>{t(i18nKeys.marketing.ads)}</Text>
        </View>

        <View style={styles.wrapper}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              // navigate('FlashSaleStack', {
              //   screen: 'FlashSaleListScreen',
              // });
              Toast.show({
                type: 'success',
                text1: t(i18nKeys.common.updating) as string,
                visibilityTime: 1000,
              });
            }}>
            <MarketingIcon.FlashSale width={40} height={40} />
          </TouchableOpacity>
          <Text style={styles.label}>{t(i18nKeys.marketing.flashSale)}</Text>
        </View>
      </View>
    </View>
  );
};

export default MarketingMainPageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    ...globalStyles.title2Regular,
    color: color.blue6,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  item: {
    backgroundColor: color.grey7,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: 60,
    height: 60,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    maxWidth: 70,
    textAlign: 'center',
    color: color.blue6,
    paddingTop: 10,
  },
});
