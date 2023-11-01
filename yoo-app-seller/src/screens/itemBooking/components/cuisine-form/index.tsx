import React from 'react';

import {StyleSheet, View, TextInput, Text, Dimensions} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useFormContext} from 'react-hook-form';

import {color} from '@/configs/globalStyles';
import {i18nKeys} from '@/configs/i18n/i18n_configs';

const {height} = Dimensions.get('screen');

const CuisineForm = (): JSX.Element => {
  const {t} = useTranslation();
  const {
    watch,
    setValue,
    formState: {errors},
  } = useFormContext();

  return (
    <View style={styles.container}>
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
            {t(i18nKeys.itemBooking.attributeDetails.otherContacts)}
          </Text>
        </View>

        <TextInput
          placeholder={
            t(i18nKeys.itemBooking.attributeDetails.otherContacts) as string
          }
          value={watch('properties.otherContacts')}
          onChangeText={text =>
            setValue('properties.otherContacts', text, {
              shouldValidate: true,
            })
          }
          style={{minHeight: height * 0.07}}
          multiline
        />
      </View>
      {errors?.properties && (
        <Text style={styles.errorText}>
          {(errors?.properties as any).otherContacts?.message}
        </Text>
      )}

      <View style={styles.labelContainer}>
        <View>
          <Text style={styles.inputTitle}>
            {t(i18nKeys.itemBooking.attributeDetails.peoplePerTable)}
            <Text style={{color: color.red}}>{' *'}</Text>
          </Text>
        </View>

        <TextInput
          placeholder={
            t(i18nKeys.itemBooking.attributeDetails.peoplePerTable) as string
          }
          value={watch('properties.peoplePerTable')}
          onChangeText={text => setValue('properties.peoplePerTable', text)}
          style={{minHeight: height * 0.07}}
          keyboardType="numeric"
        />
      </View>
      {errors?.properties && (
        <Text style={styles.errorText}>
          {(errors?.properties as any).peoplePerTable?.message}
        </Text>
      )}
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

export default CuisineForm;
