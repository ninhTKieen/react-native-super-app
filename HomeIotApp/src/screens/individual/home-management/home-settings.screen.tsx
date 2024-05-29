import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import ArrowRight from '@src/assets/arrow-right.svg';
import AddRoundIcon from '@src/assets/home-iot/common/add-round-thin.svg';
import { storage } from '@src/common/mmkv.storage';
import ConfirmDialog from '@src/components/confirm-dialog';
import CustomFastImage from '@src/components/custom-fast-image';
import IconGeneral from '@src/components/icon-general';
import MainLayout from '@src/components/main.layout';
import { CURRENT_HOME_ID_KEY } from '@src/configs/constant/constant.config';
import globalStyles from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import { HomeManagementRouteStackParamList } from '@src/configs/routes/individual/home-management.route';
import { useAuthStore } from '@src/features/auth/auth.store';
import {
  HOME_TYPES,
  IAddMemberToHome,
  IGetOneHomeResponse,
} from '@src/features/home/home.model';
import homeService from '@src/features/home/home.service';
import { useHomeStore } from '@src/features/home/home.store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import Carousel from 'react-native-reanimated-carousel';
import Toast from 'react-native-toast-message';

import CreateMemberModal from '../components/create-member-modal';
import HomeMemberItem from '../components/home-member-item';

const HomeSettingsScreen = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const navigation =
    useNavigation<
      NavigationProp<HomeManagementRouteStackParamList, 'HomeSettings'>
    >();

  const { width, height } = useWindowDimensions();

  const route =
    useRoute<RouteProp<HomeManagementRouteStackParamList, 'HomeSettings'>>();
  const homeId = route.params.id;
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);
  const [isAddMemberDialogVisible, setIsAddMemberDialogVisible] =
    useState(false);
  const [isImgVisible, setIsImgVisible] = useState(false);

  const { currentUser } = useAuthStore();
  const { setCurrentHome, clearCurrentHome } = useHomeStore();

  const currentHomeId = storage.getNumber(CURRENT_HOME_ID_KEY);

  const getHomeById = useCallback(async () => {
    try {
      const home = await homeService.getHomeById(homeId);

      if (currentHomeId === home.id) {
        setCurrentHome(home);
      }

      return home;
    } catch {
      throw Promise.reject();
    }
  }, [currentHomeId, homeId, setCurrentHome]);

  const homeQuery = useQuery({
    queryKey: ['home/get-by-id', { id: homeId }],
    queryFn: () => getHomeById(),
    retry: false,
  });

  const deleteHomeMutation = useMutation({
    mutationFn: () => homeService.deleteHome(homeId),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: t(i18nKeys.home.deleteSuccess),
        text2: '👋👋👋',
      });
      navigation.goBack();
      queryClient.refetchQueries({ queryKey: ['home/get-all'] });
      if (currentHomeId === homeId) {
        clearCurrentHome();
      }
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.errors.common.errorOccurred),
        text2: t(i18nKeys.errors.common.tryAgain),
      });
    },
  });

  const leaveHomeMutation = useMutation({
    mutationFn: () =>
      homeService.deleteMemberFromHome(homeId, currentUser?.id as number),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: t(i18nKeys.home.leaveSuccess),
        text2: '👋👋👋',
      });
      navigation.goBack();
      queryClient.refetchQueries({ queryKey: ['home/get-all'] });
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.errors.common.errorOccurred),
        text2: t(i18nKeys.errors.common.tryAgain),
      });
      if (currentHomeId === homeId) {
        clearCurrentHome();
      }
    },
  });

  const addMemberMutation = useMutation({
    mutationFn: (data: IAddMemberToHome) =>
      homeService.addMemberToHome(homeId, data),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: t(i18nKeys.home.settings.members.addSuccess),
        text2: '👋👋👋',
      });
      queryClient.refetchQueries({ queryKey: ['home/get-all'] });
      queryClient.refetchQueries({
        queryKey: ['home/get-by-id', { id: homeId }],
      });
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.errors.common.errorOccurred),
        text2: t(i18nKeys.errors.common.tryAgain),
      });
    },
  });

  const currentUserRole = useMemo(() => {
    return homeQuery.data?.members?.find(
      (member) => member.userId === currentUser?.id,
    )?.role;
  }, [currentUser?.id, homeQuery.data?.members]);

  return (
    <MainLayout
      title={t(i18nKeys.home.settings.title)}
      right={
        <IconGeneral
          type="MaterialCommunityIcons"
          name="home-edit"
          size={30}
          onPress={() => {
            navigation.navigate('UpdateHome', {
              home: homeQuery.data as IGetOneHomeResponse,
            });
          }}
          style={{
            display: currentUserRole === 'MEMBER' ? 'none' : 'flex',
          }}
        />
      }
      isGoBack
    >
      <ImageBackground
        source={require('@src/assets/home-iot/background.jpeg')}
        className="flex-1"
      >
        <ScrollView
          style={{ minHeight: '100%' }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={styles.shadowContainer}
            className="m-3 rounded-xl border-2 border-white p-4"
          >
            <Carousel
              width={width}
              height={height / 5}
              data={homeQuery.data?.imageFileUrls || []}
              scrollAnimationDuration={1000}
              loop={false}
              onSnapToItem={(index) => console.log('current index:', index)}
              renderItem={({ item }) => {
                return (
                  <Pressable onPress={() => setIsImgVisible(true)}>
                    <CustomFastImage
                      source={{ uri: item }}
                      imgWidth={width - 60}
                      imgHeight={height / 5}
                      resizeMode="cover"
                      style={{ borderRadius: 12 }}
                    />
                  </Pressable>
                );
              }}
            />
          </View>

          <View
            className="m-3 rounded-xl border-2 border-white p-4"
            style={styles.shadowContainer}
          >
            <View className="border-b-1 flex-row bg-transparent">
              <Text className="text-base text-[#89B05F]" style={{ flex: 1.5 }}>
                {t(i18nKeys.home.name)}
                <Text className="text-red-600">*</Text>
              </Text>
              <Text className="text-base text-[#AAAAAA]" style={{ flex: 3.5 }}>
                {homeQuery.data?.name}
              </Text>
            </View>
            <View className="mt-3 border-b-2 border-[#EEEEEE]" />

            <View className="mt-3 flex-row bg-transparent">
              <Text className="text-base text-[#89B05F]" style={{ flex: 1.5 }}>
                {t(i18nKeys.common.description)}
              </Text>
              <Text className="text-base text-[#AAAAAA]" style={{ flex: 3.5 }}>
                {homeQuery.data?.description}
              </Text>
            </View>
            <View className="mt-3 border-b-2 border-[#EEEEEE]" />

            <View className="mt-3 flex-row bg-transparent">
              <Text className="text-base text-[#89B05F]" style={{ flex: 1.5 }}>
                {t(i18nKeys.home.type)}
                <Text className="text-red-600">*</Text>
              </Text>
              <Text className="text-base text-[#AAAAAA]" style={{ flex: 3.5 }}>
                {t(
                  `${
                    HOME_TYPES.find(
                      (type) => type.value === homeQuery.data?.type,
                    )?.label
                  }`,
                )}
              </Text>
            </View>
            <View className="mt-3 border-b-2 border-[#EEEEEE]" />
          </View>

          <Pressable
            onPress={() => {
              navigation.navigate('RoomManagement', {
                homeId,
                areas: homeQuery.data?.areas || [],
              });
            }}
            className="m-3 flex-row items-center justify-between rounded-xl border-2 border-white px-4 py-2"
            style={styles.shadowContainer}
          >
            <Text className="text-base text-[#89B05F]">
              {t(i18nKeys.home.settings.rooms.management)}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text className="mr-3 text-base font-semibold text-[#515151]">
                {homeQuery.data?.areas?.length}{' '}
                {t(i18nKeys.home.settings.rooms.title)}
              </Text>

              <ArrowRight width={18} height={18} />
            </View>
          </Pressable>
          <View style={{ marginBottom: 10 }} />

          <View
            className="m-3 rounded-xl border-2 border-white px-4 py-2"
            style={styles.shadowContainer}
          >
            <View className="flex-row items-center justify-between">
              <Text>{t(i18nKeys.home.settings.members.title)}</Text>
              <TouchableOpacity
                onPress={() => setIsAddMemberDialogVisible(true)}
                className="py- flex-row items-center rounded-2xl border border-[#696969] px-4 py-1"
              >
                <Text className="mx-1 text-sm text-[#696969]">
                  {t(i18nKeys.common.add)}
                </Text>

                <AddRoundIcon className="mr-1" />
              </TouchableOpacity>
            </View>

            {homeQuery.data?.members?.map((member) => (
              <HomeMemberItem
                key={member.userId}
                homeId={homeId}
                member={member}
                currentUserRole={currentUserRole as any}
              />
            ))}
          </View>
          <View style={{ marginBottom: 10 }} />

          <TouchableOpacity
            onPress={() => setIsDeleteDialogVisible(true)}
            className="mb-3 mt-auto w-11/12 flex-row items-center justify-center self-center rounded-full bg-[#FFB800] p-2"
          >
            <Text className="text-base font-medium text-white">
              {currentUserRole === 'OWNER'
                ? t(i18nKeys.home.delete)
                : t(i18nKeys.home.leave)}
            </Text>
          </TouchableOpacity>

          <ConfirmDialog
            isVisible={isDeleteDialogVisible}
            setIsVisible={setIsDeleteDialogVisible}
            warningTitle={t(i18nKeys.common.warning)}
            warningText={t(i18nKeys.common.deleteWarning)}
            onConfirm={() => {
              setIsDeleteDialogVisible(false);
              if (currentUserRole === 'OWNER') {
                deleteHomeMutation.mutate();
              } else {
                leaveHomeMutation.mutate();
              }
            }}
            onCancel={() => setIsDeleteDialogVisible(false)}
          />

          <CreateMemberModal
            isVisible={isAddMemberDialogVisible}
            onClose={() => setIsAddMemberDialogVisible(false)}
            onConfirm={(nickname, account, role) => {
              addMemberMutation.mutate({
                role,
                nickname,
                account,
              });
            }}
          />

          <ImageView
            images={
              homeQuery.data?.imageFileUrls?.map((url) => ({ uri: url })) || []
            }
            imageIndex={0}
            visible={isImgVisible}
            onRequestClose={() => setIsImgVisible(false)}
            FooterComponent={({ imageIndex }) => (
              <Text
                style={{
                  color: 'white',
                  marginBottom: 50,
                  textAlign: 'center',
                }}
              >
                {imageIndex + 1}/{homeQuery.data?.imageFileUrls?.length}
              </Text>
            )}
          />
        </ScrollView>
      </ImageBackground>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  directionRow: {
    flexDirection: 'row',
  },

  shadowContainer: {
    backgroundColor: '#F7F7F7',
    ...globalStyles.commonShadowContainer,
    shadowRadius: 10,
  },
});

export default HomeSettingsScreen;
