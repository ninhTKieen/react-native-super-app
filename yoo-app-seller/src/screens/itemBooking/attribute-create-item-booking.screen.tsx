import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ItemBookingStackParamList} from '@/routes/item-booking.route';
import TopBar from '@/components/top-bar';
import {ITEM_BOOKING_TYPE} from './schema/item-booking-schema';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {color} from '@/configs/globalStyles';
import FootballForm from './components/football-form';
import CuisineForm from './components/cuisine-form';
import AccommodationForm from './components/accommodation-form';

type Props = NativeStackScreenProps<
  ItemBookingStackParamList,
  'AttributeCreateItemBooking'
>;

const AttributeCreateItemBookingScreen = ({navigation}: Props) => {
  const {
    watch,
    handleSubmit,
    formState: {errors},
  } = useFormContext();

  const {t} = useTranslation();
  const onSubmit = () => {
    navigation.goBack();
  };
  const onError = () => {
    if (Object.keys(errors).length !== 0 && !errors?.properties) {
      navigation.goBack();
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      <TopBar title={t(i18nKeys.itemBooking.attributeDetails.title)} />
      {ITEM_BOOKING_TYPE.SPORT.includes(watch('type')) && <FootballForm />}

      {ITEM_BOOKING_TYPE.MEDICAL.includes(watch('type')) && (
        <Text>Medical</Text>
      )}

      {ITEM_BOOKING_TYPE.CUISINE.includes(watch('type')) && <CuisineForm />}
      {ITEM_BOOKING_TYPE.ACCOMMODATION.includes(watch('type')) && (
        <AccommodationForm />
      )}

      <TouchableOpacity
        onPress={handleSubmit(onSubmit, onError)}
        style={[
          styles.btnAddItemArrayObject,
          {marginTop: 10, backgroundColor: '#75A3C7'},
        ]}>
        <Text style={styles.txtSave}>{t(i18nKeys.common.save)}</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputTitle: {
    fontWeight: '600',
    fontSize: 18,
    color: color.primary,
  },

  labelContainer: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    paddingTop: 15,
  },

  typeInput: {
    borderColor: color.primary,
    borderWidth: 1,
    padding: 15,
    marginVertical: 5,
    borderRadius: 30,
  },

  btnAddItemArrayObject: {
    width: '95%',
    padding: '3%',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#75A3C7',
    borderWidth: 1,
  },

  txtSave: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default AttributeCreateItemBookingScreen;
