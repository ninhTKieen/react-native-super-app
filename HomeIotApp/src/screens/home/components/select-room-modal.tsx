import { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import deviceService from '@src/features/devices/device.service';
import homeService from '@src/features/home/home.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { Button, Surface, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';

type TSelectRoomModalProps = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  homeId: number;
  deviceId: string;
  areaId?: number;
};

const SelectRoomModal = ({
  isVisible,
  setIsVisible,
  homeId,
  deviceId,
  areaId,
}: TSelectRoomModalProps) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const [selectedAreaId, setSelectedAreaId] = React.useState<
    number | undefined
  >(areaId);

  const getRoomsQuery = useQuery({
    queryKey: ['home/get-all-rooms', { homeId }],
    queryFn: () => homeService.getRoomFromHome(homeId),
  });

  const updateDeviceMutation = useMutation({
    mutationFn: (data: {
      areaId?: number;
      name?: string;
      description?: string;
    }) => deviceService.update(deviceId, data),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: t(i18nKeys.common.success),
        text2: t(i18nKeys.device.updateSuccess),
      });
      queryClient.refetchQueries({
        queryKey: ['devices/get', { deviceId }],
      });
      queryClient.refetchQueries({
        queryKey: ['devices/get-all', { homeId }],
      });
      setIsVisible(false);
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.common.error),
        text2: t(i18nKeys.device.updateFail),
      });
    },
  });

  return (
    <Modal
      isVisible={isVisible}
      backdropTransitionOutTiming={100}
      animationOutTiming={100}
    >
      <Surface
        style={{
          height: '70%',
          borderRadius: 10,
          backgroundColor: colors.white,
          padding: 10,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Button
            onPress={() => {
              setIsVisible(false);
              setSelectedAreaId(areaId);
            }}
            textColor={colors.green1}
          >
            {t(i18nKeys.common.cancel)}
          </Button>
        </View>
        <FlatList
          data={getRoomsQuery.data?.items}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({ item }) => (
            <Pressable onPress={() => setSelectedAreaId(item.id)}>
              <Surface
                elevation={
                  (
                    selectedAreaId
                      ? selectedAreaId === item.id
                      : areaId === item.id
                  )
                    ? 4
                    : 1
                }
                style={styles.itemContainer}
              >
                <Text variant="titleMedium">{item.name}</Text>
              </Surface>
            </Pressable>
          )}
        />

        <Button
          mode="contained"
          style={{
            marginTop: 'auto',
            marginHorizontal: 10,
            marginBottom: 10,
          }}
          buttonColor={colors.primary}
          disabled={!selectedAreaId || selectedAreaId === areaId}
          onPress={() => {
            selectedAreaId &&
              updateDeviceMutation.mutate({
                areaId: selectedAreaId,
              });
          }}
        >
          {t(i18nKeys.common.confirm)}
        </Button>
      </Surface>
    </Modal>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
});

export default SelectRoomModal;
