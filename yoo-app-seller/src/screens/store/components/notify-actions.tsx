import React from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {INotifyItem, NotifyState} from '@/features/notify/notify.model';
import {Surface} from 'react-native-paper';
import {color} from '@/configs/globalStyles';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import Modal from 'react-native-modal';
import IconGeneral from '@/components/common/icon-general';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import notifyServices from '@/features/notify/notify.service';

const NotifyActions = ({
  isVisible,
  setModalVisible,
  notifyItem,
}: {
  isVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  notifyItem: INotifyItem;
}): JSX.Element => {
  const {t} = useTranslation();
  const queryClient = useQueryClient();

  const {mutate: markAsRead} = useMutation(
    () => notifyServices.markAsRead(notifyItem.id),
    {
      onSuccess: () => {
        setModalVisible(false);
        queryClient.refetchQueries(['notify']);
      },
      onError: () => {
        console.log('[NotifyActions] markAsRead error');
      },
    },
  );

  const {mutate: markAsUnread} = useMutation(
    () => notifyServices.markAsUnread(notifyItem.id),
    {
      onSuccess: () => {
        setModalVisible(false);
        queryClient.refetchQueries(['notify']);
      },
      onError: () => {
        console.log('[NotifyActions] markAsUnread error');
      },
    },
  );

  const {mutate: deleteNotify} = useMutation(
    () => notifyServices.deleteNotify(notifyItem.id),
    {
      onSuccess: () => {
        setModalVisible(false);
        queryClient.refetchQueries(['notify']);
      },
      onError: () => {
        console.log('[NotifyActions] deleteNotify error');
      },
    },
  );

  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      onBackButtonPress={() => setModalVisible(false)}
      onBackdropPress={() => setModalVisible(false)}
      backdropTransitionOutTiming={0}
      backdropTransitionInTiming={400}
      animationOutTiming={200}
      avoidKeyboard={true}
      swipeDirection={['down']}
      onSwipeComplete={() => setModalVisible(false)}
      animationInTiming={500}>
      <View style={styles.modalContainer}>
        <Text style={{textAlign: 'center', fontSize: 18, marginHorizontal: 15}}>
          {notifyItem.notificationName}
        </Text>

        <TouchableOpacity
          style={styles.actionRow}
          onPress={() => {
            if (notifyItem.state === NotifyState.UNREAD) {
              markAsRead();
            } else {
              markAsUnread();
            }
          }}>
          <Surface style={styles.iconWrapper}>
            <IconGeneral
              name={
                notifyItem.state === NotifyState.UNREAD
                  ? 'shield-checkmark-outline'
                  : 'close-circle-outline'
              }
              size={24}
              type="Ionicons"
              color={color.green1}
            />
          </Surface>

          <Text
            style={{
              marginLeft: 15,
              fontSize: 18,
              fontWeight: '500',
            }}>
            {notifyItem.state === NotifyState.UNREAD
              ? t(i18nKeys.notify.actions.markAsRead)
              : t(i18nKeys.notify.actions.markAsUnread)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionRow}
          onPress={() => {
            deleteNotify();
          }}>
          <Surface style={styles.iconWrapper}>
            <IconGeneral
              name="trash-outline"
              size={24}
              type="Ionicons"
              color={color.red}
            />
          </Surface>

          <Text
            style={{
              marginLeft: 15,
              fontSize: 18,
              fontWeight: '500',
            }}>
            {t(i18nKeys.notify.actions.remove)}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    bottom: 0,
  },

  modalContainer: {
    backgroundColor: '#FFFFFF',
    padding: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    minHeight: '20%',
  },

  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 20,
  },

  iconWrapper: {
    backgroundColor: color.white,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotifyActions;
