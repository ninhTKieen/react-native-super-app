import React, {useState} from 'react';

import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import {useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import PitchTypeChoosing from './pitch-type-choosing';
import FootballTimeFrames from './time-frame';
import {color} from '@/configs/globalStyles';
import {i18nKeys} from '@/configs/i18n/i18n_configs';

const {height} = Dimensions.get('screen');

const FootballForm = (): JSX.Element => {
  const {
    watch,
    setValue,
    formState: {errors},
  } = useFormContext();
  const {t} = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <View>
          <Text style={styles.inputTitle}>
            {t(i18nKeys.itemBooking.attributeDetails.football.name)}
            <Text style={{color: color.red}}>{' *'}</Text>
          </Text>
        </View>

        <TextInput
          placeholder={
            t(
              i18nKeys.itemBooking.attributeDetails.football.enterName,
            ) as string
          }
          value={watch('properties.name')}
          onChangeText={text =>
            setValue('properties.name', text, {
              shouldValidate: true,
            })
          }
          maxLength={120}
          style={{minHeight: height * 0.07}}
        />
      </View>
      {errors?.properties && (
        <Text style={styles.errorText}>
          {(errors?.properties as any).name?.message}
        </Text>
      )}

      <View style={styles.labelContainer}>
        <View>
          <Text style={styles.inputTitle}>
            {t(i18nKeys.itemBooking.attributeDetails.football.phoneNumber)}
            <Text style={{color: color.red}}>{' *'}</Text>
          </Text>
        </View>

        <TextInput
          placeholder={
            t(
              i18nKeys.itemBooking.attributeDetails.football.enterPhoneNumber,
            ) as string
          }
          value={watch('properties.phoneNumber')}
          onChangeText={text =>
            setValue('properties.phoneNumber', text, {
              shouldValidate: true,
            })
          }
          maxLength={12}
          style={{minHeight: height * 0.07}}
          keyboardType="numeric"
        />
      </View>
      {errors?.properties && (
        <Text style={styles.errorText}>
          {(errors?.properties as any).phoneNumber?.message}
        </Text>
      )}

      <View style={styles.labelContainer}>
        <View>
          <Text style={styles.inputTitle}>
            {t(i18nKeys.itemBooking.attributeDetails.football.address)}
            <Text style={{color: color.red}}>{' *'}</Text>
          </Text>
        </View>

        <TextInput
          placeholder={
            t(
              i18nKeys.itemBooking.attributeDetails.football.enterAddress,
            ) as string
          }
          value={watch('properties.address')}
          onChangeText={text =>
            setValue('properties.address', text, {
              shouldValidate: true,
            })
          }
          style={{minHeight: height * 0.07}}
        />
      </View>
      {errors?.properties && (
        <Text style={styles.errorText}>
          {(errors?.properties as any).address?.message}
        </Text>
      )}

      <View style={styles.labelContainer}>
        <View>
          <Text style={styles.inputTitle}>
            {t(i18nKeys.itemBooking.attributeDetails.football.pitchType)}
            <Text style={{color: color.red}}>{' *'}</Text>
          </Text>
        </View>

        <TouchableOpacity
          style={styles.typeInput}
          onPress={() => {
            setIsModalVisible(true);
          }}>
          <Text>
            {watch('properties.type') ||
              t(i18nKeys.itemBooking.attributeDetails.football.enterType)}
          </Text>
        </TouchableOpacity>
      </View>
      {errors?.properties && (
        <Text style={styles.errorText}>
          {(errors?.properties as any).type?.message}
        </Text>
      )}

      <View style={styles.labelContainer}>
        <View>
          <Text style={styles.inputTitle}>
            {t(i18nKeys.itemBooking.attributeDetails.football.timeFrames)}
            <Text style={{color: color.red}}>{' *'}</Text>
          </Text>
          <FootballTimeFrames />
        </View>
      </View>
      {errors?.properties && (
        <Text style={styles.errorText}>
          {(errors?.properties as any).timeFrames?.message}
        </Text>
      )}

      <View style={styles.labelContainer}>
        <View>
          <Text style={styles.inputTitle}>
            {t(i18nKeys.itemBooking.attributeDetails.football.priceHour)}
            <Text style={{color: color.red}}>{' *'}</Text>
          </Text>
        </View>

        <CurrencyInput
          style={{minHeight: height * 0.07}}
          keyboardType="numeric"
          value={watch('properties.priceHour') || 0}
          onChangeValue={(value: number) => {
            setValue('properties.priceHour', value, {
              shouldValidate: true,
            });
            setValue('itemModel', {
              ...watch('itemModel'),
              currentPrice: value,
              originalPrice: value,
            });
          }}
          suffix="đ"
          precision={0}
        />
      </View>
      {errors?.properties && (
        <Text style={styles.errorText}>
          {(errors?.properties as any).priceHour?.message}
        </Text>
      )}

      <PitchTypeChoosing
        isVisible={isModalVisible}
        setVisible={setIsModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  errorText: {
    color: color.red,
    paddingHorizontal: 10,
  },
});

export default FootballForm;
