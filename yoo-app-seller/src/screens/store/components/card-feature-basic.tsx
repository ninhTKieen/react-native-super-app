import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {useTranslation} from 'react-i18next';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {PartnerStoreStackParamList} from '@/routes/store.route';
import LinearGradient from 'react-native-linear-gradient';
import {IStore} from '@/features/store/store.model';

import ProductIcon from '../../../assets/store/icons/product_feature_icon.svg';
import StatisticIcon from '../../../assets/store/icons/statistic_feature_icon.svg';
import BusinessIcon from '../../../assets/store/icons/business_feature_icon.svg';
import MarketingIcon from '../../../assets/store/icons/marketing_feature_icon.svg';
import {useTypeStore} from '@/hooks/useTypeStore';
import Toast from 'react-native-toast-message';

const {width, height} = Dimensions.get('screen');
const FeatureBasicCard = ({
  currentStoreInfor,
}: {
  currentStoreInfor?: IStore;
}) => {
  const {t} = useTranslation();
  const typeStore = useTypeStore(currentStoreInfor?.type);
  const navigation =
    useNavigation<NavigationProp<PartnerStoreStackParamList>>();
  const FeatureOfStore = [
    {
      name: t(i18nKeys.store.item),
      colors: ['#FF9EB0', '#FFAFD6'],
      icon: <ProductIcon />,
    },
    {
      name: t(i18nKeys.store.statistic),
      colors: ['#93CBFF', '#BAE2FF'],
      icon: <StatisticIcon />,
    },
    {
      name: t(i18nKeys.store.finance),
      colors: ['#FFCD9E', '#FFDCBC'],
      icon: <BusinessIcon />,
    },
    {
      name: t(i18nKeys.store.marketing),
      colors: ['#C99EFF', '#ECB6FF'],
      icon: <MarketingIcon />,
    },
  ];
  return (
    <View
      style={{
        paddingHorizontal: width * 0.04,
      }}>
      <View
        style={{
          paddingVertical: width * 0.01,
        }}>
        <Text style={styles.txtTitle}>{t(i18nKeys.store.titleFeature)}</Text>
      </View>
      <View style={styles.containerFeature}>
        {FeatureOfStore.map((feature, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.containerFeatureItem}
              onPress={() => {
                switch (index) {
                  case 0:
                    switch (typeStore) {
                      case 2:
                        navigation.navigate('ItemBookingStack', {
                          screen: 'ItemBookingList',
                          params: {
                            idStore: currentStoreInfor?.id,
                          },
                        });
                        break;
                      case 3:
                        if (currentStoreInfor) {
                          navigation.navigate('ItemDefaultScreen', {
                            storeInfor: currentStoreInfor,
                          });
                        }
                        break;
                      default:
                        navigation.navigate('ItemStack', {
                          screen: 'ItemList',
                          params: {
                            idStore: currentStoreInfor?.id,
                          },
                        });
                        break;
                    }
                    break;
                  case 1:
                    navigation.navigate('StatisticScreen', {});
                    break;
                  case 2:
                    Toast.show({
                      type: 'success',
                      text1: t(i18nKeys.common.updating) as string,
                      visibilityTime: 1000,
                    });
                    break;
                  case 3:
                    navigation.navigate('MarketingStack', {
                      screen: 'MarketingMainPage',
                    });
                    break;
                  default:
                    break;
                }
              }}>
              <LinearGradient
                colors={feature.colors}
                start={{x: 0, y: 1}}
                end={{x: 0, y: 0}}
                style={styles.containerIcon}>
                {feature.icon}
              </LinearGradient>
              <Text style={styles.txtFeatureItem}>{feature.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default FeatureBasicCard;

const styles = StyleSheet.create({
  containerFeature: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F1F2F8',
    borderRadius: 10,
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.04,
  },
  containerFeatureItem: {
    width: width * 0.19,
    height: width * 0.19,
    alignItems: 'center',
  },
  txtFeatureItem: {
    fontSize: 13,
    fontWeight: '400',
    color: '#2B5783',
    paddingTop: height * 0.01,
  },
  containerIcon: {
    width: width * 0.123,
    aspectRatio: 1,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtTitle: {
    fontSize: 18,
    color: '#2B5783',
    fontWeight: '600',
    paddingVertical: height * 0.015,
  },
});
