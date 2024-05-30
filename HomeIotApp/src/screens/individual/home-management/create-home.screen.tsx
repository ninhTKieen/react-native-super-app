import { yupResolver } from '@hookform/resolvers/yup';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ArrowDown from '@src/assets/arrow-down.svg';
import AddRoundIcon from '@src/assets/home-iot/common/add-round-thin.svg';
import GradientButton from '@src/components/gradient-button';
import IconGeneral from '@src/components/icon-general';
import ImagesPicker from '@src/components/images-picker';
import MainLayout from '@src/components/main.layout';
import globalStyles, { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import { HomeManagementRouteStackParamList } from '@src/configs/routes/individual/home-management.route';
import { useAppStore } from '@src/features/app/app.store';
import { HOME_TYPES, ICreateHome } from '@src/features/home/home.model';
import homeService from '@src/features/home/home.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';

import CreateRoomModal from '../components/create-room-modal';
import SelectHomeTypeModal from '../components/select-home-type-modal';

const CreateHomeScreen = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useAppStore();
  const { t } = useTranslation();
  const navigation =
    useNavigation<
      NavigationProp<HomeManagementRouteStackParamList, 'CreateHome'>
    >();
  const [isHomeTypeModalVisible, setIsHomeTypeModalVisible] = useState(false);
  const [isCreateRoomModalVisible, setIsCreateRoomModalVisible] =
    useState(false);

  const schema = useMemo(
    () =>
      yup.object().shape({
        tenantId: yup.number().nullable(),
        name: yup.string().required(t(i18nKeys.validation.required)),
        description: yup.string(),
        imageFileUrls: yup.array(),
        type: yup.string().required(t(i18nKeys.validation.required)),
        areas: yup.array().of(
          yup.object().shape({
            name: yup.string().required(t(i18nKeys.validation.required)),
            imageUrls: yup.array(),
            description: yup.string(),
          }),
        ),
      }),
    [t],
  );

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const createHomeMutation = useMutation({
    mutationFn: (data: ICreateHome) => {
      setLoading(true);
      return homeService.createHome(data);
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['home/get-all'],
      });
      Toast.show({
        type: 'success',
        text1: `${t(i18nKeys.home.createSuccess)}`,
        text2: '👍👍👍',
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
    createHomeMutation.mutate(data);
  };

  return (
    <MainLayout title={t(i18nKeys.home.create)} isGoBack>
      <ImageBackground
        source={require('@src/assets/home-iot/background.jpeg')}
        className="flex-1 p-3"
      >
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <ImagesPicker
            imageUrls={watch('imageFileUrls') as any[]}
            setImageUrls={(images) => {
              setValue('imageFileUrls', images);
            }}
          />
          {errors.imageFileUrls && (
            <Text className="text-red-600">{errors.imageFileUrls.message}</Text>
          )}
          <View style={{ marginBottom: 20 }} />

          <View
            className="rounded-xl border-2 border-white p-4"
            style={styles.shadowContainer}
          >
            <Text className="text-base font-medium text-[#89B05F]">
              {t(i18nKeys.home.name)}
              <Text className="text-red-600">*</Text>
            </Text>
            <TextInput
              style={{
                height: 50,
              }}
              placeholder="Nhập tên nhà"
              placeholderTextColor={colors.grey6}
              onChangeText={(text) => setValue('name', text)}
              value={watch('name')}
            />
            {errors.name && (
              <Text className="text-red-600">{errors.name.message}</Text>
            )}

            <View className="my-3 border-b border-[#EEEEEE]" />

            <Text className="text-base font-medium text-[#89B05F]">
              {t(i18nKeys.common.description)}
            </Text>
            <TextInput
              style={{
                height: 100,
              }}
              multiline
              placeholder="Nhập mô tả"
              placeholderTextColor={colors.grey6}
              onChangeText={(text) => setValue('description', text)}
              value={watch('description')}
            />

            <View className="my-3 border-b border-[#EEEEEE]" />

            <Text className="text-base font-medium text-[#89B05F]">
              {t(i18nKeys.home.type)}
              <Text className="text-red-600">*</Text>
            </Text>
            <TouchableOpacity
              className="flex-row items-center justify-between bg-transparent"
              onPress={() => setIsHomeTypeModalVisible(true)}
            >
              <Text
                className="text-base font-medium text-[#515151]"
                style={{ opacity: watch('type') ? 1 : 0.5 }}
              >
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
            {errors.type && (
              <Text style={{ color: 'red' }}>{errors.type.message}</Text>
            )}
            <View className="my-3 border-b border-[#EEEEEE]" />
          </View>

          <View className="mb-5" />

          <View
            className="rounded-xl border-2 border-white p-4"
            style={styles.shadowContainer}
          >
            <View className="mb-3 flex-row items-center justify-between">
              <Text className="text-base font-medium text-[#89B05F]">
                {t(i18nKeys.home.settings.rooms.title)}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setIsCreateRoomModalVisible(true);
                }}
                className="py- flex-row items-center rounded-2xl border border-[#696969] px-4 py-1"
              >
                <Text className="mx-1 text-sm text-[#696969]">
                  {t(i18nKeys.common.add)}
                </Text>

                <AddRoundIcon className="mr-1" />
              </TouchableOpacity>
            </View>

            {watch('areas') && (watch('areas') as any[]).length > 0 && (
              <View className="mt-2">
                {watch('areas')?.map((area, areaIndex: number) => (
                  <View
                    className="relative mb-4 items-center justify-center rounded-full border-2 border-white bg-[#f7f7f7] p-3"
                    key={areaIndex}
                  >
                    <TextInput
                      className="text-[16px] font-semibold text-[#515151]"
                      value={area.name}
                      onChangeText={(text) => {
                        setValue('areas', [
                          ...(watch('areas') || []).map((item, index) => {
                            if (index === areaIndex) {
                              return {
                                ...item,
                                name: text,
                              };
                            }
                            return item;
                          }),
                        ]);
                      }}
                    />

                    <IconGeneral
                      type="AntDesign"
                      name="minuscircle"
                      className="absolute right-2 px-2 text-red-600"
                      size={20}
                      onPress={() => {
                        setValue(
                          'areas',
                          (watch('areas') || []).filter(
                            (_, index) => index !== areaIndex,
                          ),
                        );
                      }}
                    />
                  </View>
                ))}
              </View>
            )}
          </View>

          <View className="mt-6 items-center">
            <GradientButton
              title={t(i18nKeys.common.save)}
              onPress={handleSubmit(onSubmit)}
              additionalStyles={{ marginHorizontal: 10, width: '100%' }}
            />
          </View>
        </KeyboardAwareScrollView>
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
      <CreateRoomModal
        isVisible={isCreateRoomModalVisible}
        onClose={() => {
          setIsCreateRoomModalVisible(false);
        }}
        onConfirm={(homeName) => {
          setIsCreateRoomModalVisible(false);
          setValue('areas', [
            ...(watch('areas') || []),
            {
              name: homeName,
            },
          ]);
        }}
      />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  shadowContainer: {
    ...globalStyles.commonShadowContainer,
    backgroundColor: '#F7F7F7',
  },
});

export default CreateHomeScreen;
