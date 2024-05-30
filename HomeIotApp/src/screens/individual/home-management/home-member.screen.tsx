import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import GradientButton from '@src/components/gradient-button';
import IconGeneral from '@src/components/icon-general';
import MainLayout from '@src/components/main.layout';
import globalStyles from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import { HomeManagementRouteStackParamList } from '@src/configs/routes/individual/home-management.route';
import { useAuthStore } from '@src/features/auth/auth.store';
import {
  EHomeRole,
  MEMBER_ROLES,
  TMemberRole,
} from '@src/features/home/home.model';
import homeService, {
  checkMemberPermission,
} from '@src/features/home/home.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ImageBackground } from 'react-native';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';

const HomeMemberScreen = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { currentUser } = useAuthStore();
  const navigation =
    useNavigation<NavigationProp<HomeManagementRouteStackParamList>>();
  const route =
    useRoute<RouteProp<HomeManagementRouteStackParamList, 'HomeMember'>>();
  const { member, homeId, currentUserRole } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      nickname: member.nickname,
      role: member.role,
    },
  });

  const updateMemberMutation = useMutation({
    mutationFn: (data: { nickname?: string; role?: TMemberRole }) =>
      homeService.updateHomeMember(homeId, member.userId, data),
    onSuccess: () => {
      navigation.goBack();
      Toast.show({
        type: 'success',
        text1: t(i18nKeys.common.success),
        text2: t(i18nKeys.home.settings.members.updateSuccess),
      });
      queryClient.refetchQueries({
        queryKey: ['home/get-by-id', { id: homeId }],
      });
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.common.error),
        text2: t(i18nKeys.home.settings.members.updateFail),
      });
    },
  });

  const deleteMember = useMutation({
    mutationFn: () => homeService.deleteMemberFromHome(homeId, member.userId),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: t(i18nKeys.common.success),
        text2: t(i18nKeys.home.settings.members.deleteSuccess),
      });
      navigation.goBack();
      queryClient.refetchQueries({
        queryKey: ['home/get-by-id', { id: homeId }],
      });
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.errors.common.errorOccurred),
        text2: t(i18nKeys.home.settings.members.deleteFail),
      });
    },
  });

  const havePermission = useMemo(() => {
    return checkMemberPermission(currentUserRole, member.role);
  }, [currentUserRole, member.role]);

  const itSelf = useMemo(() => {
    return member.userId === currentUser?.id;
  }, [currentUser?.id, member.userId]);

  return (
    <MainLayout title={t(i18nKeys.home.settings.members.title)} isGoBack>
      <ImageBackground
        source={require('@src/assets/home-iot/background.jpeg')}
        className="h-full flex-1"
      >
        <View
          className="m-3 rounded-xl border-2 border-white p-4"
          style={styles.shadowContainer}
        >
          <View className="mb-4 h-28 w-28 self-center overflow-hidden rounded-full border-2 border-white bg-[#EEEEEE] p-2">
            <View className="h-full w-full items-center justify-center bg-transparent">
              <Text className="text-4xl font-bold text-[#515151]">
                {form.watch('nickname')?.[0]}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center">
            <Text
              className="text-[16px] font-medium text-[#89B05F]"
              style={{ flex: 1.5 }}
            >
              {t(i18nKeys.home.settings.members.name)}
            </Text>
            <TextInput
              className="text-[16px] font-medium text-[#696969]"
              style={{ flex: 2.5 }}
              placeholder={t(i18nKeys.home.settings.members.name)}
              value={form.watch('nickname')}
              onChangeText={(text) =>
                form.setValue('nickname', text, {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true,
                })
              }
              editable={havePermission}
            />
          </View>

          <View className="mt-5 flex-row items-center">
            <Text
              className="text-[16px] font-medium text-[#89B05F]"
              style={{ flex: 1.5 }}
            >
              {t(i18nKeys.home.settings.members.account)}
            </Text>
            <TextInput
              className="text-[16px] font-medium text-[#696969]"
              style={{ flex: 2.5 }}
              placeholder={t(i18nKeys.home.settings.members.account)}
              editable={false}
              value={member.account}
            />
          </View>

          <TouchableOpacity
            className="flex-row items-center pt-5"
            onPress={() => {
              setModalVisible(true);
            }}
            disabled={
              itSelf ||
              member.role === EHomeRole.Owner ||
              currentUserRole === 'MEMBER'
            }
          >
            <Text
              className="text-[16px] font-medium text-[#89B05F]"
              style={{ flex: 1.5 }}
            >
              {t(i18nKeys.home.role.title)}
            </Text>
            <Text
              style={{ flex: 2.5 }}
              className="text-[16px] font-medium text-[#696969]"
            >
              {t(
                `${
                  MEMBER_ROLES.find((role) => role.value === form.watch('role'))
                    ?.label
                }`,
              )}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mx-2 mb-4 mt-auto flex-row items-center justify-between">
          <GradientButton
            title={t(i18nKeys.common.save)}
            additionalStyles={{
              width:
                !itSelf && currentUserRole !== 'MEMBER' && havePermission
                  ? '45%'
                  : '100%',
            }}
            onPress={() => {
              updateMemberMutation.mutate({
                nickname: form.watch('nickname'),
                role: form.watch('role'),
              });
            }}
          />

          <TouchableOpacity
            onPress={() => {
              deleteMember.mutate();
            }}
            className="items-center justify-center rounded-full bg-[#FFB800] p-[12px]"
            style={{
              display:
                !itSelf && currentUserRole !== 'MEMBER' && havePermission
                  ? 'flex'
                  : 'none',
              width: '45%',
            }}
          >
            <Text className="text-[16px] font-medium text-white">
              {t(i18nKeys.home.settings.members.delete)}
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          isVisible={modalVisible}
          onBackButtonPress={() => setModalVisible(false)}
          onBackdropPress={() => setModalVisible(false)}
          onDismiss={() => setModalVisible(false)}
        >
          <View className="rounded-xl bg-white p-3">
            <Pressable
              className="my-4 flex-row items-center justify-between"
              onPress={() =>
                form.setValue('role', EHomeRole.Manager, {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true,
                })
              }
            >
              <Text>{t(i18nKeys.home.role.manager)}</Text>
              <IconGeneral
                type="Octicons"
                name={
                  form.watch('role') === EHomeRole.Manager
                    ? 'check-circle-fill'
                    : 'circle'
                }
                color={
                  form.watch('role') === EHomeRole.Manager
                    ? '#89B05F'
                    : '#D1D1D1'
                }
                size={20}
              />
            </Pressable>

            <Pressable
              className="mb-4 flex-row items-center justify-between"
              onPress={() =>
                form.setValue('role', EHomeRole.Member, {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true,
                })
              }
            >
              <Text>{t(i18nKeys.home.role.member)}</Text>
              <IconGeneral
                type="Octicons"
                name={
                  form.watch('role') === EHomeRole.Member
                    ? 'check-circle-fill'
                    : 'circle'
                }
                color={
                  form.watch('role') === EHomeRole.Member
                    ? '#89B05F'
                    : '#D1D1D1'
                }
                size={20}
              />
            </Pressable>
          </View>
        </Modal>
      </ImageBackground>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  rowItem: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
  },

  shadowContainer: {
    backgroundColor: '#F7F7F7',
    ...globalStyles.commonShadowContainer,
  },
});

export default HomeMemberScreen;
