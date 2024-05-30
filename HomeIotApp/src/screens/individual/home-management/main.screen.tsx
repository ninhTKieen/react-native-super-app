import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import ArrowRight from '@src/assets/arrow-right.svg';
import ConfirmDialog from '@src/components/confirm-dialog';
import IconGeneral from '@src/components/icon-general';
import MainLayout from '@src/components/main.layout';
import { colors } from '@src/configs/constant/global-styles';
import globalStyles from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import { HomeManagementRouteStackParamList } from '@src/configs/routes/individual/home-management.route';
import { MEMBER_ROLES, TMemberStatus } from '@src/features/home/home.model';
import homeService from '@src/features/home/home.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  ImageBackground,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { FAB } from 'react-native-paper';
import Toast from 'react-native-toast-message';

const MainHomeManagementScreen = () => {
  const { height } = useWindowDimensions();

  const queryClient = useQueryClient();
  const navigation =
    useNavigation<
      NavigationProp<HomeManagementRouteStackParamList, 'MainHomeManagement'>
    >();
  const route =
    useRoute<
      RouteProp<HomeManagementRouteStackParamList, 'MainHomeManagement'>
    >();
  const userId = route.params.userId;

  const { t } = useTranslation();

  const [fabOpen, setFabOpen] = useState(false);
  const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
  const [selectedEstateId, setSelectedEstateId] = useState<number | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const homeQuery = useQuery({
    queryKey: ['home/get-all'],
    queryFn: () => homeService.getAllHomes(),
  });

  const updateMemberStatus = useMutation({
    mutationFn: (data: {
      estateId: number;
      userId: number;
      status: TMemberStatus;
    }) =>
      homeService.updateHomeMemberStatus(
        data.estateId,
        data.userId,
        data.status,
      ),
    onSuccess: (_, sendData) => {
      setSelectedEstateId(null);
      setSelectedUserId(null);
      queryClient.refetchQueries({
        queryKey: ['home/get-all'],
      });
      sendData.status === 'ACTIVE' &&
        Toast.show({
          type: 'success',
          text1: t(i18nKeys.home.confirmInvitation),
          text2: t(i18nKeys.home.joinHomeSuccess),
        });
    },
    onError: () => {
      setSelectedEstateId(null);
      setSelectedUserId(null);
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.errors.common.errorOccurred),
        text2: t(i18nKeys.errors.common.tryAgain),
      });
    },
  });

  return (
    <MainLayout title={t(i18nKeys.individual.homeManagement)} isGoBack>
      <ImageBackground
        source={require('@src/assets/home-iot/background.jpeg')}
        className="h-full flex-1"
      >
        <View
          className="m-3 rounded-xl border border-white bg-[#F7F7F7] p-3"
          style={{
            ...globalStyles.commonShadowContainer,
          }}
        >
          <FlatList
            data={homeQuery.data?.items || []}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={
              <RefreshControl
                refreshing={homeQuery.isFetching}
                onRefresh={() => homeQuery.refetch()}
              />
            }
            renderItem={({ item: home }) => (
              <Pressable
                key={home.id}
                style={[styles.directionRow, { marginVertical: 10 }]}
                onPress={() => {
                  if (home.status === 'PENDING') {
                    setIsConfirmDialogVisible(true);
                    setSelectedEstateId(home.id);
                    setSelectedUserId(userId);
                  } else {
                    navigation.navigate('HomeSettings', {
                      id: home.id,
                      userId,
                    });
                  }
                }}
              >
                <View>
                  <Text className="text-base font-semibold text-[#515151]">
                    {home.name}
                  </Text>
                  <Text className="text-sm text-[#515151]">
                    {home.status === 'PENDING'
                      ? t(i18nKeys.home.waitingToJoin)
                      : t(
                          `${
                            MEMBER_ROLES.find(
                              (role) => role.value === home.role,
                            )?.label
                          }`,
                        )}
                  </Text>
                </View>

                <ArrowRight width={18} height={18} />
              </Pressable>
            )}
            ListEmptyComponent={
              <View
                style={{
                  height: height * 0.3,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconGeneral
                  type="MaterialCommunityIcons"
                  name="home-alert-outline"
                  size={56}
                  color={'#ced4da'}
                />
                <Text
                  style={{ fontSize: 16, fontWeight: '500', color: '#adb5bd' }}
                >
                  {t(i18nKeys.home.empty)}
                </Text>
              </View>
            }
          />
        </View>

        <FAB.Group
          style={styles.fab}
          visible
          color={colors.white}
          fabStyle={{ backgroundColor: colors.green1 }}
          open={fabOpen}
          onStateChange={({ open }) => setFabOpen(open)}
          icon={fabOpen ? 'close' : 'plus'}
          actions={[
            {
              icon: 'home-plus',
              label: t(i18nKeys.home.create),
              onPress: () => navigation.navigate('CreateHome', { userId }),
              style: { backgroundColor: colors.greenOfficial },
              color: colors.white,
            },
            {
              icon: 'home-group-plus',
              label: t(i18nKeys.home.join),
              onPress: () => {},
              style: { backgroundColor: colors.greenOfficial },
              color: colors.white,
            },
          ]}
        />

        <ConfirmDialog
          isVisible={isConfirmDialogVisible}
          setIsVisible={setIsConfirmDialogVisible}
          warningTitle={t(i18nKeys.home.confirmInvitation)}
          warningText={t(i18nKeys.home.confirmInviteText)}
          onConfirm={() => {
            updateMemberStatus.mutate({
              estateId: selectedEstateId as number,
              userId: selectedUserId as number,
              status: 'ACTIVE',
            });
          }}
          onCancel={() => {
            updateMemberStatus.mutate({
              estateId: selectedEstateId as number,
              userId: selectedUserId as number,
              status: 'BLOCKED',
            });
          }}
        />
      </ImageBackground>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  surface: {
    padding: 10,
    elevation: 4,
  },

  icon: {
    marginRight: 8,
    fontSize: 30,
  },

  directionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  fab: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});

export default MainHomeManagementScreen;
