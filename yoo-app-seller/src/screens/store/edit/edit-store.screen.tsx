import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import TopBar from '@/components/top-bar';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EditStoreStackParamList} from '@/routes/store.route';
import {useFormContext} from 'react-hook-form';
import globalStyles, {color} from '@/configs/globalStyles';
import {Button, TextInput} from 'react-native-paper';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useModal} from 'react-native-modalfy';
import {ModalStackParamsList} from '@/components/modals';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import storeService from '@/features/store/store.service';
import {IStoreUpdate} from '@/features/store/store.model';
import StoreInputText from '../components/edit-store-input';
import {checkGroupType, checkType} from '@/configs/i18n/constants';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {ImageItem} from '../components/list-image';
import Toast from 'react-native-toast-message';
import RenderHTML from 'react-native-render-html';
import MapEdit from './components/map-edit';

type Props = NativeStackScreenProps<EditStoreStackParamList, 'EditMainPage'>;

const width = Dimensions.get('window').width;

const EditStoreScreen = ({route: {params}, navigation}: Props) => {
  const {watch, control, setValue, handleSubmit, getFieldState} =
    useFormContext<IStoreUpdate>();
  const {inforStore} = params;

  const queryClient = useQueryClient();
  const {openModal, closeModal} = useModal<ModalStackParamsList>();

  const {data: provinces} = useQuery({
    queryKey: ['provinces'],
    queryFn: () => storeService.getProvinces(),
  });

  const {data: districts, isSuccess: isFetchedDistricts} = useQuery({
    queryKey: ['districts', watch('provinceId')],
    queryFn: () => storeService.getDistricts(watch('provinceId') as string),
    retry: false,
    enabled: !!watch('provinceId'),
  });

  const {data: wards, isSuccess: isFetchedWards} = useQuery({
    queryKey: ['wards', watch('districtId')],
    queryFn: () => storeService.getWards(watch('districtId') as string),
    retry: false,
    enabled: !!watch('districtId'),
  });

  const {mutate: updateStore} = useMutation({
    mutationFn: (data: IStoreUpdate) => storeService.updateProvider(data),
    onSuccess: _ => {
      queryClient.refetchQueries(['currentStoreInfo', inforStore?.id]);
      Toast.show({
        type: 'success',
        text1: t(i18nKeys.common.success) as string,
        text2: t(i18nKeys.store.updateSuccessMsg) as string,
      });
    },
    onError: _ => {
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.common.error) as string,
        text2: t(i18nKeys.store.updateFailedMsg) as string,
      });
    },
    onSettled: () => {
      setTimeout(() => {
        closeModal('LoadingModal');
        navigation.goBack();
      }, 500);
    },
  });

  const onSuccess = (data: any) => {
    openModal('LoadingModal');
    updateStore(data);
  };

  const onError = (error: any) => {
    console.log(error);
  };

  const {t, i18n} = useTranslation();
  const supplierType = checkType(i18n.language, watch('groupType'));

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 80}
      style={styles.container}>
      <TopBar title={t(i18nKeys.store.edit)} />
      <ScrollView>
        <Text style={styles.heading}>{t(i18nKeys.store.image)}</Text>

        <ImageItem inforStore={inforStore} />
        <View>
          <Text style={styles.heading}>
            {t(i18nKeys.store.storeInformation)}
          </Text>
          <View style={{backgroundColor: '#fff', paddingVertical: 10}}>
            <StoreInputText
              name="name"
              label={t(i18nKeys.store.name) as string}
              control={control}
              defaultValue={inforStore?.name}
              important
            />

            <View style={styles.descriptionView2}>
              <Text style={styles.label}>
                {t(i18nKeys.store.description)}
                {<Text style={{color: color.red}}>*</Text>}
              </Text>
              <View style={styles.descriptionText2}>
                {!watch('description') || watch('description') === '' ? (
                  <TouchableOpacity
                    style={styles.descriptionEmpty}
                    onPress={() => {
                      navigation.navigate('EditDescription', {
                        defaultValue: `${watch('description')}`,
                      });
                    }}>
                    <Text style={{color: color.grey8}}>
                      {t(i18nKeys.store.createForm.tabToEdit)}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.descriptionEmpty}
                    onPress={() => {
                      navigation.navigate('EditDescription', {
                        defaultValue: `${watch('description')}`,
                      });
                    }}>
                    <RenderHTML
                      source={{html: `${watch('description') || ''}`}}
                      contentWidth={width * 0.8}
                    />
                  </TouchableOpacity>
                )}
              </View>
              {getFieldState('description').error && (
                <Text
                  style={[
                    globalStyles.errorMessage,
                    {color: color.red, paddingHorizontal: 15, paddingTop: 5},
                  ]}>
                  {getFieldState('description').error?.message}
                </Text>
              )}
            </View>

            <StoreInputText
              control={control}
              name="email"
              label={t(i18nKeys.store.email) as string}
              defaultValue={inforStore?.email}
              important
            />

            <StoreInputText
              control={control}
              name="phoneNumber"
              label={t(i18nKeys.store.phoneNumber) as string}
              defaultValue={inforStore?.phoneNumber}
              important
            />

            <StoreInputText
              control={control}
              name="contact"
              label={t(i18nKeys.store.contact) as string}
              defaultValue={inforStore?.contact}
            />

            <StoreInputText
              disabled={true}
              control={control}
              name="groupType"
              label={t(i18nKeys.store.createForm.groupType) as string}
              editable={false}
              buttonProps={{
                data: checkGroupType(i18n.language),
                isButton: true,
              }}
              defaultValue={inforStore?.groupType as any}
              important
            />

            <StoreInputText
              disabled={true}
              control={control}
              name="type"
              label={t(i18nKeys.store.createForm.type) as string}
              editable={false}
              buttonProps={{
                data: supplierType,
                isButton: true,
              }}
              defaultValue={inforStore?.type as any}
              important
            />
          </View>
        </View>

        <View>
          <Text style={styles.heading}>{t(i18nKeys.store.business)}</Text>
          <View style={{backgroundColor: '#fff', paddingVertical: 10}}>
            <StoreInputText
              control={control}
              name="businessInfo"
              label={t(i18nKeys.store.businessInfo) as string}
              defaultValue={inforStore?.businessInfo}
              multiline={true}
              important
            />
          </View>
        </View>

        <View>
          <Text style={styles.heading}>{t(i18nKeys.store.address)}</Text>
          <View style={{backgroundColor: '#fff', paddingVertical: 10}}>
            <StoreInputText
              control={control}
              name="address"
              label={t(i18nKeys.store.address) as string}
              defaultValue={inforStore?.address}
              multiline={true}
              important
            />

            <StoreInputText
              control={control}
              name="provinceId"
              defaultValue={watch('provinceId')}
              label={t(i18nKeys.store.province) as string}
              editable={false}
              buttonProps={{
                data: provinces,
                isButton: true,
              }}
              important
            />
            {districts?.length > 0 && isFetchedDistricts && (
              <StoreInputText
                control={control}
                name="districtId"
                label={t(i18nKeys.store.district) as string}
                defaultValue={watch('districtId')}
                editable={false}
                buttonProps={{
                  data: districts,
                  isButton: true,
                }}
                important
              />
            )}

            {wards?.length > 0 && isFetchedWards && (
              <StoreInputText
                control={control}
                name="wardId"
                label={t(i18nKeys.store.ward) as string}
                defaultValue={watch('wardId')}
                editable={false}
                buttonProps={{
                  data: wards,
                  isButton: true,
                }}
                mode="outlined"
                important
              />
            )}
            <MapEdit />
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            onPress={handleSubmit(onSuccess, onError)}
            style={styles.button}>
            <Text style={{color: '#fff', fontWeight: '700', fontSize: 14}}>
              {t(i18nKeys.common.save) as string}
            </Text>
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditStoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonWrapper: {
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  button: {
    borderWidth: 2,
    borderRadius: 30,
    paddingVertical: 2,
    borderColor: '#3498db',
    backgroundColor: '#3498db',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  descriptionView: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: color.grey3,
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  descriptionText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    color: color.blueDark,
    fontWeight: '500',
    paddingVertical: 12,
    paddingLeft: 15,
  },
  coordination: {
    marginVertical: 10,
    marginHorizontal: 10,
    maxWidth: '45%',
    minWidth: '45%',
    backgroundColor: '#fff',
  },
  descriptionView2: {
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 15,
    // marginVertical: 10,
  },
  descriptionText2: {
    marginTop: 15,
  },
  label: {
    color: color.blueDark1,
    fontSize: 17,
  },
  descriptionEmpty: {
    backgroundColor: color.grey7,
    borderRadius: 5,
    paddingVertical: 18,
    paddingHorizontal: 15,
  },
});
