import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {TextInput} from 'react-native-paper';

import {color} from '@/configs/globalStyles';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import InputNormal from './input-normal';
const {height} = Dimensions.get('screen');
const AccommodationForm = () => {
  const {t} = useTranslation();
  const {
    watch,
    setValue,
    formState: {errors},
  } = useFormContext();
  return (
    <View style={styles.container}>
      <InputNormal
        placeholder={
          t(
            i18nKeys.itemBooking.attributeDetails.accommodation.enterAddress,
          ) as string
        }
        label={
          t(
            i18nKeys.itemBooking.attributeDetails.accommodation.address,
          ) as string
        }
        value={watch('properties.address')}
        onChangeText={text =>
          setValue('properties.address', text, {
            shouldValidate: true,
          })
        }
        error={
          errors?.properties
            ? (errors?.properties as any).address?.message
            : undefined
        }
        required
      />

      <InputNormal
        placeholder={
          t(
            i18nKeys.itemBooking.attributeDetails.football.enterPhoneNumber,
          ) as string
        }
        label={
          t(
            i18nKeys.itemBooking.attributeDetails.football.phoneNumber,
          ) as string
        }
        value={watch('properties.phoneNumber')}
        onChangeText={text =>
          setValue('properties.phoneNumber', text, {
            shouldValidate: true,
          })
        }
        maxLength={12}
        keyboardType="numeric"
        error={
          errors?.properties
            ? (errors?.properties as any).phoneNumber?.message
            : undefined
        }
        required
      />

      <InputNormal
        placeholder={
          t(i18nKeys.itemBooking.attributeDetails.otherContacts) as string
        }
        label={t(i18nKeys.itemBooking.attributeDetails.otherContacts) as string}
        value={watch('properties.otherContacts')}
        onChangeText={text =>
          setValue('properties.otherContacts', text, {
            shouldValidate: true,
          })
        }
        multiline
        error={
          errors?.properties
            ? (errors?.properties as any).otherContacts?.message
            : undefined
        }
      />

      <InputNormal
        placeholder={
          t(
            i18nKeys.itemBooking.attributeDetails.accommodation.peoplePerRoom,
          ) as string
        }
        label={
          t(
            i18nKeys.itemBooking.attributeDetails.accommodation.peoplePerRoom,
          ) as string
        }
        value={watch('properties.peoplePerRoom')}
        onChangeText={text => setValue('properties.peoplePerRoom', text)}
        keyboardType="numeric"
        error={
          errors?.properties
            ? (errors?.properties as any).peoplePerRoom?.message
            : undefined
        }
        required
      />

      <InputNormal
        placeholder={
          t(
            i18nKeys.itemBooking.attributeDetails.accommodation.acreage,
          ) as string
        }
        label={
          t(
            i18nKeys.itemBooking.attributeDetails.accommodation.acreage,
          ) as string
        }
        value={watch('properties.acreage')}
        onChangeText={text => setValue('properties.acreage', text)}
        keyboardType="numeric"
        error={
          errors?.properties
            ? (errors?.properties as any).acreage?.message
            : undefined
        }
        required
      />

      {watch('type') === 3302 && (
        <View>
          <InputNormal
            placeholder={
              t(
                i18nKeys.itemBooking.attributeDetails.accommodation
                  .priceElectric,
              ) as string
            }
            label={
              (t(
                i18nKeys.itemBooking.attributeDetails.accommodation
                  .priceElectric,
              ) as string) + '*'
            }
            value={watch('properties.priceElectric')}
            onChangeText={text => setValue('properties.priceElectric', text)}
            keyboardType="numeric"
            error={
              errors?.properties
                ? (errors?.properties as any).priceElectric?.message
                : undefined
            }
          />
          <InputNormal
            placeholder={
              t(
                i18nKeys.itemBooking.attributeDetails.accommodation.priceWater,
              ) as string
            }
            label={
              (t(
                i18nKeys.itemBooking.attributeDetails.accommodation.priceWater,
              ) as string) + '*'
            }
            value={watch('properties.priceWater')}
            onChangeText={text => setValue('properties.priceWater', text)}
            keyboardType="numeric"
            error={
              errors?.properties
                ? (errors?.properties as any).priceWater?.message
                : undefined
            }
          />
          <InputNormal
            placeholder={
              t(
                i18nKeys.itemBooking.attributeDetails.accommodation
                  .priceServiceOther,
              ) as string
            }
            label={
              t(
                i18nKeys.itemBooking.attributeDetails.accommodation
                  .priceServiceOther,
              ) as string
            }
            value={watch('properties.priceServiceOther')}
            onChangeText={text =>
              setValue('properties.priceServiceOther', text)
            }
            keyboardType="numeric"
            error={
              errors?.properties
                ? (errors?.properties as any).priceServiceOther?.message
                : undefined
            }
          />
        </View>
      )}
    </View>
  );
};

export default AccommodationForm;

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
    paddingHorizontal: 20,
    fontSize: 11,
  },
});
