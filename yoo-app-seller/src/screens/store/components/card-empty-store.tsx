import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import IconGeneral from '@/components/common/icon-general';
import {shadowConstants} from '@/configs/shadowStyles';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {StoreIcon} from '../icons';
import {useTranslation} from 'react-i18next';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {PartnerStoreStackParamList} from '@/routes/store.route';
import {useQuery} from '@tanstack/react-query';
import storeApi from '@/features/store/store.service';

type Props = {
  onPress: () => void;
};

const CardEmptyStore = (props: Props) => {
  const {t} = useTranslation();

  const {data} = useQuery({
    queryKey: ['providers'],
    queryFn: () => storeApi.getAllProviders(),
  });

  const navigation =
    useNavigation<NavigationProp<PartnerStoreStackParamList>>();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => {
          if (data?.length === 0) {
            navigation.navigate('CreateStoreStack', {
              screen: 'CreateMainPage',
              params: {},
            });
          } else {
            props.onPress();
          }
        }}
        style={[styles.headingWrapper, {...shadowConstants[1]}]}>
        <View
          style={[
            styles.buttonWrapper,
            {
              ...shadowConstants[0],
            },
          ]}>
          <IconGeneral
            type="MaterialCommunityIcons"
            name="plus"
            color={'#878A9C'}
            size={20}
          />
        </View>

        <Text style={styles.text}>
          {data?.length === 0
            ? t(i18nKeys.store.noStore)
            : t(i18nKeys.store.selectStore)}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (data?.length === 0) {
            navigation.navigate('CreateStoreStack', {
              screen: 'CreateMainPage',
              params: {},
            });
          } else {
            props.onPress();
          }
        }}
        style={[styles.button, {...shadowConstants[5]}]}>
        <StoreIcon.Home />
      </TouchableOpacity>
      <StoreIcon.Empty />
    </View>
  );
};

export default CardEmptyStore;

const styles = StyleSheet.create({
  button: {
    height: 117,
    width: 117,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  headingWrapper: {
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    width: '90%',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  buttonWrapper: {
    borderRadius: 50,
    width: 28,
    height: 28,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    paddingVertical: 2,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 7,
    color: '#878A9C',
  },
});
