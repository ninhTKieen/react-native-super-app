import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import TopBar from '@/components/top-bar';
import ImageList from '../items/components/create/image-list';
import PressableLabel from '../items/components/create/press-label';
import ItemPriceInput from './components/item-price-input';
import {color} from '@/configs/globalStyles';
import {ICreateItemBooking} from '@/features/itemBooking/item-booking.model';
import {useFormContext} from 'react-hook-form';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/hooks/redux.hook';
import {ItemIcon} from '../items/icon';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ItemBookingStackParamList} from '@/routes/item-booking.route';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import Toast from 'react-native-toast-message';
import httpUtil from '@/utils/http.util';
import itemBookingService from '@/features/itemBooking/item-booking.service';
import {selectCurrentStore} from '@/features/store/store.slice';

const {height} = Dimensions.get('screen');

type Props = NativeStackScreenProps<
  ItemBookingStackParamList,
  'CreateItemBooking'
>;
const CreateItemBookingScreen = ({navigation}: Props) => {
  const queryClient = useQueryClient();
  const {
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: {errors},
  } = useFormContext<ICreateItemBooking>();
  // const dispatch = useAppDispatch();
  const idStore = useAppSelector(selectCurrentStore);
  const {t} = useTranslation();

  const {mutate: createItemBookingMutate} = useMutation(
    async (data: ICreateItemBooking) => {
      const response = await httpUtil.uploadListImage({
        files: data.imageUrlList,
      });
      data.imageUrlList = response.result.data;
      console.log(data);

      return await itemBookingService.createItemBooking({
        item: data,
      });
    },
    {
      onSuccess: _data => {
        Toast.show({
          type: 'success',
          text1: t(i18nKeys.item.create.success) as string,
        });
        queryClient.refetchQueries(['itembooking']);
        navigation.goBack();
        reset();
      },
      onError: error => {
        console.log((error as AxiosError).message);
        Toast.show({
          type: 'error',
          text1: t(i18nKeys.common.error) as string,
          text2: t(i18nKeys.item.create.error) as string,
        });
        navigation.goBack();
        reset();
      },
    },
  );

  const onSubmit = (data: any) => {
    const dataSubmit = {
      ...data,
      providerId: idStore,
      properties: JSON.stringify(data.properties),
    };
    createItemBookingMutate(dataSubmit);
  };

  const onError = (err: any) => {
    console.log(err);
    Toast.show({
      type: 'error',
      text1: t(i18nKeys.common.error) as string,
      text2: t(i18nKeys.common.missingField) as string,
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView behavior={'position'}>
        <TopBar
          title={t(i18nKeys.itemBooking.create.title)}
          onPressLeft={() => {
            reset();
            navigation.goBack();
          }}
        />
        <ImageList />
        <View style={{paddingHorizontal: 10, backgroundColor: '#fff'}}>
          {errors.imageUrlList && (
            <Text style={styles.errTxt}>{errors?.imageUrlList.message}</Text>
          )}
        </View>

        <View style={styles.labelContainer}>
          <View>
            <Text style={styles.inputTitle}>
              {t(i18nKeys.itemBooking.create.name)}
              <Text style={{color: color.red}}>{' *'}</Text>
            </Text>
          </View>

          <TextInput
            placeholder={t(i18nKeys.itemBooking.create.enterName) as string}
            value={watch('name')}
            onChangeText={text =>
              setValue('name', text, {
                shouldValidate: true,
              })
            }
            maxLength={120}
            style={{minHeight: height * 0.07}}
          />
          <Text style={styles.txtNumberInput}>
            {watch('name')?.length ?? 0}/120
          </Text>
          {errors.name && (
            <Text style={styles.errTxt}>{errors?.name.message}</Text>
          )}
        </View>
        <View style={{height: 5, backgroundColor: '#F1F2F8'}} />

        <View style={styles.labelContainer}>
          <View>
            <Text style={styles.inputTitle}>
              {t(i18nKeys.itemBooking.create.description)}
              <Text style={{color: color.red}}>{' *'}</Text>
            </Text>
          </View>

          <TextInput
            placeholder={
              t(i18nKeys.itemBooking.create.enterDescription) as string
            }
            value={watch('description')}
            onChangeText={text =>
              setValue('description', text, {
                shouldValidate: true,
              })
            }
            textAlignVertical="top"
            multiline={true}
            style={{minHeight: height * 0.13, paddingBottom: 0}}
            maxLength={3000}
          />
          <Text style={styles.txtNumberInput}>
            {watch('description')?.length ?? 0}/3000
          </Text>
          {errors.description && (
            <Text style={styles.errTxt}>{errors?.description.message}</Text>
          )}
        </View>
        <View style={{height: 5, backgroundColor: '#F1F2F8'}} />

        <PressableLabel
          label={t(i18nKeys.itemBooking.create.attributes)}
          iconLeft={ItemIcon.Variation}
          onPress={() => {
            navigation.navigate('AttributeCreateItemBooking');
          }}
        />

        <ItemPriceInput
          label={t(i18nKeys.itemBooking.create.price)}
          isRequired={true}
          error={errors?.itemModel?.currentPrice?.message}
        />
        <View style={{paddingBottom: 10}} />

        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            flex: 1,
          }}>
          <View style={{flex: 1.5}}>
            <Button
              textColor={color.primary}
              mode="outlined"
              style={{borderColor: color.primary}}
              onPress={() => {
                reset();
              }}>
              {t(i18nKeys.common.clear)}
            </Button>
          </View>
          <View style={{width: 20}} />

          <View style={{flex: 1.5}}>
            <Button
              mode="contained"
              buttonColor={color.primary}
              onPress={handleSubmit(onSubmit, onError)}>
              {t(i18nKeys.common.save)}
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default CreateItemBookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  input: {
    width: '90%',
    height: 50,
    marginBottom: 20,
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
  errTxt: {
    color: color.red,
    paddingBottom: 5,
    fontSize: 12,
    fontWeight: '500',
    paddingLeft: 4,
  },
  txtNumberInput: {
    color: '#C4C8D9',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
  },
});
