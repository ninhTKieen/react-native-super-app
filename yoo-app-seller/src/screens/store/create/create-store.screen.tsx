import React, {useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Divider, Text, Button} from 'react-native-paper';
import TopBar from '@/components/top-bar';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {AddImageButton} from './components/image-list';
import {set, useFormContext} from 'react-hook-form';
import {IStoreCreate} from '@/features/store/store.model';
import {CommonInput, AreaInput, SelectInput} from './components/common-input';
import storeService from '@/features/store/store.service';
import {useMutation, useQuery} from '@tanstack/react-query';
import {checkGroupType, checkType} from '@/configs/i18n/constants';
import Map from './components/map';
import Buttons from './components/buttons';
import {useAuth} from '@/hooks/useAuth';
import Toast from 'react-native-toast-message';
import {useModal} from 'react-native-modalfy';
import {ModalStackParamsList} from '@/components/modals';
import {useQueryClient} from '@tanstack/react-query';
import {ImageProps} from '@/components/modals/choose-image-modal';
import globalStyles, {color} from '@/configs/globalStyles';
import RenderHTML from 'react-native-render-html';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CreateStoreStackParamList} from '@/routes/store.route';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import httpUtil from '@/utils/http.util';

type Props = NativeStackScreenProps<
  CreateStoreStackParamList,
  'CreateMainPage'
>;

const width = Dimensions.get('window').width;

const StoreCreateScreen = ({navigation}: Props): JSX.Element => {
  const {t, i18n} = useTranslation();
  const {
    formState: {errors},
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    getFieldState,
  } = useFormContext<IStoreCreate>();

  const [images, setImages] = React.useState<ImageProps[]>([]);
  const {openModal, closeModal} = useModal<ModalStackParamsList>();
  const queryClient = useQueryClient();
  const {currentUser} = useAuth();

  const onSetImages = (data: ImageProps[]) => {
    setImages(data);
    setValue('imageUrls', data.length > 0 ? [data[0].uri] : []);
  };
  useEffect(() => {
    if (currentUser?.id) {
      setValue('ownerId', currentUser?.id);
    }
  }, [currentUser?.id, setValue]);

  const onSubmit = (data: IStoreCreate) => {
    if (images.length !== 0) {
      uploadImages(images);
    } else {
      createProvider(data);
    }
  };

  const onError = (error: any) => {
    console.log('error', error);
  };

  const {data: provinces} = useQuery({
    queryKey: ['provinces'],
    queryFn: () => storeService.getProvinces(),
  });

  const {data: districts} = useQuery({
    queryKey: ['districts', watch('provinceId')],
    queryFn: () => storeService.getDistricts(watch('provinceId')),
    retry: false,
    enabled: !!watch('provinceId'),
  });

  const {data: wards} = useQuery({
    queryKey: ['wards', watch('districtId')],
    queryFn: () => storeService.getWards(watch('districtId')),
    retry: false,
    enabled: !!watch('districtId'),
  });

  //mutation
  const {mutate: uploadImages} = useMutation({
    mutationFn: (data: ImageProps[]) => httpUtil.uploadImage({file: data[0]}),
    onSuccess: response => {
      if (!response.result.success) {
        closeModal('LoadingModal');
        return;
      }

      setValue('imageUrls', [response.result.data]);
      createProvider(getValues());
    },

    onError: _ => {
      closeModal('LoadingModal');
      navigation.goBack();
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.common.error) as string,
        text2: t(i18nKeys.store.createForm.error) as string,
      });
    },

    onMutate: () => {
      openModal('LoadingModal');
    },
  });

  const {mutate: createProvider} = useMutation({
    mutationFn: (data: IStoreCreate) => {
      return storeService.createProvider(data);
    },
    onSuccess: _data => {
      queryClient.resetQueries(['providers']);
      navigation.goBack();
      Toast.show({
        type: 'success',
        text1: t(i18nKeys.common.success) as string,
        text2: t(i18nKeys.store.createForm.success) as string,
      });
    },
    onError: _error => {
      closeModal('LoadingModal');
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.common.error) as string,
        text2: t(i18nKeys.store.createForm.error) as string,
      });
    },

    onSettled: () => {
      closeModal('LoadingModal');
    },
  });

  return (
    <KeyboardAwareScrollView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        marginBottom: 0,
      }}>
      <TopBar title={t(i18nKeys.store.create)} />

      <ScrollView style={{flexGrow: 1}}>
        <AddImageButton
          image={images.length > 0 ? images[0].uri : ''}
          setImage={onSetImages}
        />
        {getFieldState('imageUrls')?.error && (
          <Text
            style={[
              globalStyles.errorMessage,
              {color: color.red, paddingHorizontal: 25, paddingTop: 5},
            ]}>
            {getFieldState('imageUrls')?.error?.message}
          </Text>
        )}
        <CommonInput
          error={errors.name?.message}
          control={control}
          name="name"
          placeholder={t(i18nKeys.store.createForm.placeholder)}
          label={t(i18nKeys.store.createForm.name) as string}
          important={true}
        />
        <CommonInput
          error={errors.email?.message}
          control={control}
          name="email"
          placeholder={t(i18nKeys.store.createForm.placeholder)}
          label={t(i18nKeys.store.createForm.email) as string}
          important={true}
        />
        <CommonInput
          error={errors.phoneNumber?.message}
          control={control}
          name="phoneNumber"
          placeholder={t(i18nKeys.store.createForm.placeholder)}
          label={t(i18nKeys.store.createForm.phoneNumber) as string}
          important={true}
        />
        <CommonInput
          error={errors.contact?.message}
          control={control}
          name="contact"
          placeholder={t(i18nKeys.store.createForm.placeholder)}
          label={t(i18nKeys.store.createForm.contact) as string}
          important={true}
        />
        <Divider
          style={{
            height: 4,
            backgroundColor: color.grey7,
            marginTop: 10,
            marginBottom: 15,
          }}
        />
        <View style={styles.descriptionView}>
          <Text style={styles.label}>
            {t(i18nKeys.store.description)}
            {<Text style={{color: color.red}}>*</Text>}
          </Text>
          <View style={styles.descriptionText}>
            {!watch('description') || watch('description') === '' ? (
              <TouchableOpacity
                style={styles.descriptionEmpty}
                onPress={() => {
                  navigation.navigate('CreateDescription', {});
                }}>
                <Text style={{color: color.grey8}}>
                  {t(i18nKeys.store.createForm.tabToEdit)}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.descriptionEmpty}
                onPress={() => {
                  navigation.navigate('CreateDescription', {
                    defaultValue: watch('description'),
                  });
                }}>
                <RenderHTML
                  source={{html: `${watch('description') || ''}`}}
                  contentWidth={width * 0.8}
                />
              </TouchableOpacity>
            )}
          </View>
          {errors.description && (
            <Text
              style={[
                globalStyles.errorMessage,
                {color: color.red, paddingHorizontal: 15, paddingTop: 5},
              ]}>
              {errors.description.message}
            </Text>
          )}
        </View>
        <SelectInput
          error={errors.groupType?.message}
          control={control}
          name="groupType"
          placeholder={
            t(i18nKeys.store.createForm.select) +
            t(i18nKeys.store.createForm.groupType).toLocaleLowerCase()
          }
          data={checkGroupType(i18n.language)}
          label={t(i18nKeys.store.createForm.groupType) as string}
          important={true}
        />
        {watch('groupType') && (
          <SelectInput
            error={errors.groupType?.message}
            control={control}
            name="type"
            placeholder={
              t(i18nKeys.store.createForm.select) +
              t(i18nKeys.store.createForm.type).toLocaleLowerCase()
            }
            data={checkType(i18n.language, watch('groupType'))}
            label={t(i18nKeys.store.createForm.type) as string}
            important={true}
          />
        )}
        <AreaInput
          error={errors.name?.message}
          control={control}
          name="businessInfo"
          placeholder={t(i18nKeys.store.createForm.placeholder)}
          label={t(i18nKeys.store.createForm.businessInfo) as string}
          important={true}
        />
        <Divider
          style={{height: 4, backgroundColor: color.grey7, marginVertical: 15}}
        />
        <SelectInput
          error={errors.provinceId?.message}
          control={control}
          name="provinceId"
          placeholder={
            t(i18nKeys.store.createForm.select) +
            t(i18nKeys.store.createForm.provinceId).toLocaleLowerCase()
          }
          data={provinces}
          label={t(i18nKeys.store.createForm.provinceId) as string}
          important={true}
        />
        {districts?.length > 0 && (
          <SelectInput
            error={errors.districtId?.message}
            control={control}
            name="districtId"
            placeholder={
              t(i18nKeys.store.createForm.select) +
              t(i18nKeys.store.createForm.districtId).toLocaleLowerCase()
            }
            data={districts}
            label={t(i18nKeys.store.createForm.districtId) as string}
            important={true}
          />
        )}
        {wards?.length > 0 && (
          <SelectInput
            error={errors.wardId?.message}
            control={control}
            name="wardId"
            placeholder={
              t(i18nKeys.store.createForm.select) +
              t(i18nKeys.store.createForm.wardId).toLocaleLowerCase()
            }
            data={wards}
            label={t(i18nKeys.store.createForm.wardId) as string}
            important={true}
          />
        )}
        <CommonInput
          error={errors.address?.message}
          control={control}
          name="address"
          placeholder={t(i18nKeys.store.createForm.placeholder)}
          label={t(i18nKeys.store.createForm.address) as string}
          important={true}
        />
        <Text style={styles.textMap}>
          {'(' + t(i18nKeys.store.createForm.holdToDrag) + ')'}
        </Text>
        <Map />

        <Buttons onCreate={handleSubmit(onSubmit, onError)} />
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'red',
  },
  textMap: {
    fontSize: 12,
    paddingLeft: 15,
    paddingTop: 10,
  },
  descriptionView: {
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 15,
    // marginVertical: 10,
  },
  descriptionText: {
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

export default StoreCreateScreen;
