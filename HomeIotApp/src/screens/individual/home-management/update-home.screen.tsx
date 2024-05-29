import { yupResolver } from '@hookform/resolvers/yup';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import ArrowDown from '@src/assets/arrow-down.svg';
import GradientButton from '@src/components/gradient-button';
import ImagesPicker from '@src/components/images-picker';
import MainLayout from '@src/components/main.layout';
import globalStyles from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import { HomeManagementRouteStackParamList } from '@src/configs/routes/individual/home-management.route';
import { useAppStore } from '@src/features/app/app.store';
import { HOME_TYPES, IUpdateHome } from '@src/features/home/home.model';
import homeService from '@src/features/home/home.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';

import SelectHomeTypeModal from '../components/select-home-type-modal';

const UpdateHomeScreen = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useAppStore();
  const { t } = useTranslation();
  const navigation =
    useNavigation<
      NavigationProp<HomeManagementRouteStackParamList, 'UpdateHome'>
    >();
  const route =
    useRoute<RouteProp<HomeManagementRouteStackParamList, 'UpdateHome'>>();

  const [isHomeTypeModalVisible, setIsHomeTypeModalVisible] = useState(false);

  const schema = useMemo(
    () =>
      yup.object().shape({
        name: yup.string(),
        description: yup.string().nullable(),
        imageFileUrls: yup.array().min(1, t(i18nKeys.validation.required)),
        imageFileIds: yup.array(),
        type: yup.string(),
      }),
    [t],
  );

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      description: route.params.home.description || '',
      name: route.params.home.name,
      type: route.params.home.type,
      imageFileUrls: route.params.home.imageFileUrls,
      imageFileIds: route.params.home.imageFileIds,
    },
  });

  const updateHomeMutation = useMutation({
    mutationFn: (data: IUpdateHome) => {
      setLoading(true);
      return homeService.updateHome({
        id: route.params.home.id,
        data,
      });
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['home/get-all'],
      });
      queryClient.refetchQueries({
        queryKey: ['home/get-by-id', { id: route.params.home.id }],
      });
      Toast.show({
        type: 'success',
        text1: `${t(i18nKeys.home.updateSuccess)}`,
      });
      setLoading(false);
      navigation.goBack();
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.errors.common.errorOccurred),
        text2: t(i18nKeys.errors.common.tryAgain),
      });
      setLoading(false);
    },
  });

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const onSubmit = (data: any) => {
    updateHomeMutation.mutate(data);
  };

  return (
    <MainLayout title={t(i18nKeys.home.update)} isGoBack>
      <ImageBackground
        source={require('@src/assets/home-iot/background.jpeg')}
        className="flex-1 p-3"
      >
        <ImagesPicker
          imageUrls={watch('imageFileUrls') as any[]}
          setImageUrls={(images) => {
            setValue('imageFileUrls', images);
          }}
        />
        {errors.imageFileUrls && (
          <Text style={{ color: 'red' }}>{errors.imageFileUrls.message}</Text>
        )}
        <View style={{ marginBottom: 20 }} />

        <View
          className="rounded-xl border-2 border-white p-4"
          style={styles.shadowContainer}
        >
          <View>
            <Text className="text-base font-medium text-[#89B05F]">
              {t(i18nKeys.home.name)}
              <Text className="text-red-600">*</Text>
            </Text>
            <TextInput
              placeholder={`${t(i18nKeys.home.namePlaceholder)}`}
              onChangeText={(text) => setValue('name', text)}
              value={watch('name')}
              className="mt-3 font-medium text-[#515151]"
            />
            {errors.name && (
              <Text className="text-red-600">{errors.name.message}</Text>
            )}
          </View>

          <View className="mt-4">
            <Text className="text-base font-medium text-[#89B05F]">
              {t(i18nKeys.common.description)}
            </Text>
            <TextInput
              multiline
              placeholder={`${t(i18nKeys.common.descriptionPlaceholder)}`}
              onChangeText={(text) => setValue('description', text)}
              value={watch('description') as string}
              className="mt-3 font-medium text-[#515151]"
            />
          </View>

          <View className="mt-4">
            <Text className="text-base font-medium text-[#89B05F]">
              {t(i18nKeys.home.type)}
              <Text className="text-red-600">*</Text>
            </Text>
            <TouchableOpacity
              onPress={() => setIsHomeTypeModalVisible(true)}
              className="flex-row items-center justify-between"
            >
              <Text className="mt-3 font-medium text-[#515151]">
                {watch('type')
                  ? t(
                      `${
                        HOME_TYPES.find((type) => type.value === watch('type'))
                          ?.label
                      }`,
                    )
                  : t(i18nKeys.home.typePlaceholder)}
              </Text>

              <ArrowDown width={15} height={15} />
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-auto items-center">
          <GradientButton
            title={t(i18nKeys.common.save)}
            onPress={handleSubmit(onSubmit)}
            additionalStyles={{ marginHorizontal: 10, width: '100%' }}
          />
        </View>
      </ImageBackground>

      <SelectHomeTypeModal
        isVisible={isHomeTypeModalVisible}
        onClose={() => {
          setIsHomeTypeModalVisible(false);
        }}
        onChooseType={(homeType) => {
          setValue('type', homeType.value);
        }}
        selectedType={watch('type')}
      />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  directionRow: {
    flexDirection: 'row',
  },

  shadowContainer: {
    ...globalStyles.commonShadowContainer,
    backgroundColor: '#F7F7F7',
  },
});

export default UpdateHomeScreen;
