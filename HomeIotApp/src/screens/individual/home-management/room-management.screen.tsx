import { RouteProp, useRoute } from '@react-navigation/native';
import ConfirmDialog from '@src/components/confirm-dialog';
import GradientButton from '@src/components/gradient-button';
import MainLayout from '@src/components/main.layout';
import globalStyles, { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import { HomeManagementRouteStackParamList } from '@src/configs/routes/individual/home-management.route';
import { useAppStore } from '@src/features/app/app.store';
import { IAddRoomToHome, IUpdateRoom } from '@src/features/home/home.model';
import homeService from '@src/features/home/home.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Toast from 'react-native-toast-message';

import CreateRoomModal from '../components/create-room-modal';
import UpdateRoomModal from '../components/update-room-modal';

const HiddenItem = ({
  data,
  rowMap,
  setDeleteRoomModal,
  setUpdateRoomModal,
}: {
  data: any;
  rowMap: any;
  setDeleteRoomModal: () => void;
  setUpdateRoomModal: (value: { isVisible: boolean; room: any }) => void;
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => {
          setUpdateRoomModal({ isVisible: true, room: data.item });
        }}
      >
        <Text style={{ color: '#000' }}>{t(i18nKeys.common.update)}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.backRightBtn,
          styles.backRightBtnRight,
          {
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          },
        ]}
        onPress={() => {
          rowMap[data.item.id].closeRow();
          setDeleteRoomModal();
        }}
      >
        <Text className="text-red-600">{t(i18nKeys.common.delete)}</Text>
      </TouchableOpacity>
    </View>
  );
};

const RoomManagementScreen = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const route =
    useRoute<RouteProp<HomeManagementRouteStackParamList, 'RoomManagement'>>();

  const homeId = route.params.homeId;
  const { setLoading } = useAppStore();

  const [isCreateRoomModalVisible, setIsCreateRoomModalVisible] =
    useState(false);
  const [updateRoomModal, setUpdateRoomModal] = useState({
    isVisible: false,
    room: null,
  });
  const [deleteRoomModal, setDeleteRoomModal] = useState<{
    isVisible: boolean;
    roomId: number | null;
  }>({
    isVisible: false,
    roomId: null,
  });

  const getRoomsQuery = useQuery({
    queryKey: ['home/get-all-rooms', { homeId }],
    queryFn: () => homeService.getRoomFromHome(homeId),
  });

  const addNewRoom = useMutation({
    mutationFn: (data: IAddRoomToHome) => {
      setLoading(true);
      return homeService.addRoomToHome(homeId, data);
    },
    onSuccess: () => {
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: t(i18nKeys.home.settings.rooms.createSuccess),
      });
      queryClient.refetchQueries({
        queryKey: ['home/get-all-rooms', { homeId }],
      });
      queryClient.refetchQueries({
        queryKey: ['home/get-by-id', { id: homeId }],
      });
    },
    onError: () => {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.home.settings.rooms.createFail),
      });
    },
  });

  const deleteRoom = useMutation({
    mutationFn: (roomId: number) => {
      setDeleteRoomModal((prev) => ({ ...prev, isVisible: false }));
      setLoading(true);
      return homeService.deleteRoomFromHome(homeId, roomId);
    },
    onSuccess: () => {
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: t(i18nKeys.home.settings.rooms.deleteSuccess),
      });
      queryClient.refetchQueries({
        queryKey: ['home/get-all-rooms', { homeId }],
      });
      queryClient.refetchQueries({
        queryKey: ['home/get-by-id', { id: homeId }],
      });
    },
    onError: () => {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.home.settings.rooms.deleteFail),
      });
    },
  });

  const updateRoom = useMutation({
    mutationFn: (data: { roomId: number; room: IUpdateRoom }) => {
      setLoading(true);
      return homeService.updateRoom(homeId, data.roomId, data.room);
    },
    onSuccess: () => {
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: t(i18nKeys.home.settings.rooms.updateSuccess),
      });
      queryClient.refetchQueries({
        queryKey: ['home/get-all-rooms', { homeId }],
      });
      queryClient.refetchQueries({
        queryKey: ['home/get-by-id', { id: homeId }],
      });
    },
    onError: () => {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.home.settings.rooms.updateFail),
      });
    },
  });

  return (
    <MainLayout title={t(i18nKeys.home.settings.rooms.management)} isGoBack>
      <ImageBackground
        source={require('@src/assets/home-iot/background.jpeg')}
        className="h-full flex-1"
      >
        <SwipeListView
          data={getRoomsQuery.data?.items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              className="m-[5] h-[50px] items-center justify-center rounded-xl border-2 border-white"
              style={styles.shadowContainer}
            >
              <Text>{item.name}</Text>
            </View>
          )}
          renderHiddenItem={(data, rowMap) => (
            <HiddenItem
              data={data}
              rowMap={rowMap}
              setDeleteRoomModal={() => {
                setDeleteRoomModal({
                  isVisible: true,
                  roomId: data.item.id,
                });
              }}
              setUpdateRoomModal={setUpdateRoomModal}
            />
          )}
          leftOpenValue={75}
          rightOpenValue={-150}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          disableRightSwipe
        />

        <GradientButton
          title={t(i18nKeys.home.settings.rooms.create)}
          onPress={() => setIsCreateRoomModalVisible(true)}
          additionalStyles={{
            width: '90%',
            backgroundColor: colors.primary,
            borderRadius: 10,
            marginTop: 'auto',
            alignSelf: 'center',
            marginBottom: 20,
          }}
        />

        <ConfirmDialog
          isVisible={deleteRoomModal.isVisible}
          setIsVisible={() =>
            setDeleteRoomModal((prev) => ({
              ...prev,
              isVisible: false,
              roomId: null,
            }))
          }
          warningTitle={t(i18nKeys.home.settings.rooms.warningDelete)}
          warningText={t(i18nKeys.home.settings.rooms.warningDeleteText)}
          onConfirm={() => {
            deleteRoom.mutate(deleteRoomModal.roomId as unknown as number);
            setDeleteRoomModal((prev) => ({
              ...prev,
              isVisible: false,
              roomId: null,
            }));
          }}
        />

        <CreateRoomModal
          isVisible={isCreateRoomModalVisible}
          onClose={() => setIsCreateRoomModalVisible(false)}
          onConfirm={(roomName) => {
            addNewRoom.mutate({ name: roomName });
            setIsCreateRoomModalVisible(false);
          }}
        />

        <UpdateRoomModal
          isVisible={updateRoomModal.isVisible}
          room={updateRoomModal.room as any}
          onClose={() => setUpdateRoomModal({ isVisible: false, room: null })}
          onConfirm={(roomName) => {
            updateRoomModal.room &&
              updateRoom.mutate({
                roomId: (updateRoomModal.room as any).id,
                room: { name: roomName },
              });
          }}
        />
      </ImageBackground>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },

  rowFront: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    margin: 5,
    borderRadius: 10,
    backgroundColor: colors.white,
  },

  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    borderRadius: 10,
  },

  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },

  backRightBtnLeft: {
    right: 75,
  },

  backRightBtnRight: {
    right: 0,
    backgroundColor: 'transparent',
  },

  shadowContainer: {
    ...globalStyles.commonShadowContainer,
    backgroundColor: '#F7F7F7',
  },
});

export default RoomManagementScreen;
