import { NavigationProp, useNavigation } from '@react-navigation/native';
import { storage } from '@src/common/mmkv.storage';
import IconGeneral from '@src/components/icon-general';
import {
  CURRENT_HOME_ID_KEY,
  CURRENT_HOME_ROLE_KEY,
} from '@src/configs/constant/constant.config';
import { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import { MainRouteStackParamList } from '@src/configs/routes/main.route';
import homeService from '@src/features/home/home.service';
import socketService from '@src/features/socket/socket.service';
import { useAuth } from '@src/hooks/use-auth.hook';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { Button, MD2Colors, Surface, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type THomeListModalProps = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const HomeListModal = (props: THomeListModalProps) => {
  const { t } = useTranslation();

  const insets = useSafeAreaInsets();

  const navigation = useNavigation<NavigationProp<MainRouteStackParamList>>();

  const { authQuery } = useAuth();

  const homeQuery = useQuery({
    queryKey: ['home/get-all'],
    queryFn: () => homeService.getAllHomes(),
  });
  const currentHomeId = storage.getNumber(CURRENT_HOME_ID_KEY);
  const hasCurrentHomeId = storage.contains(CURRENT_HOME_ID_KEY);

  return (
    <Modal
      isVisible={props.isVisible}
      backdropTransitionOutTiming={100}
      animationIn={'fadeInDown'}
      animationOut={'fadeOutUp'}
      animationOutTiming={100}
      onBackdropPress={() => {
        props.setIsVisible(false);
      }}
      style={styles.modal}
    >
      <Surface
        style={{
          padding: 10,
          borderRadius: 10,
          paddingTop: insets.top,
          backgroundColor: colors.white,
        }}
      >
        <FlatList
          data={
            homeQuery.data?.items?.filter((item) => item.status === 'ACTIVE') ||
            []
          }
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <Pressable
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor:
                    currentHomeId === item.id
                      ? MD2Colors.grey200
                      : 'transparent',
                  padding: 5,
                  borderRadius: 5,
                }}
                onPress={() => {
                  if (hasCurrentHomeId && currentHomeId !== item.id) {
                    socketService.send({
                      channel: '/estates/leave-room',
                      data: {
                        estateId: currentHomeId,
                      },
                    });
                  }
                  storage.set(CURRENT_HOME_ID_KEY, item.id);
                  storage.set(CURRENT_HOME_ROLE_KEY, item.role);
                  props.setIsVisible(false);
                }}
              >
                <Text
                  style={{
                    padding: 10,
                  }}
                >
                  {item.name}
                </Text>

                <IconGeneral
                  type="MaterialCommunityIcons"
                  name="checkbox-marked-circle-outline"
                  size={24}
                  style={{
                    display: currentHomeId === item.id ? 'flex' : 'none',
                  }}
                  color={colors.primary}
                />
              </Pressable>
            );
          }}
          ListEmptyComponent={
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  padding: 10,
                }}
              >
                {t(i18nKeys.home.empty)}
              </Text>

              <Button
                style={{ marginHorizontal: 20, marginVertical: 10 }}
                mode="contained"
                onPress={() => {
                  navigation.navigate('Individual', {
                    screen: 'HomeManagement',
                    params: {
                      screen: 'MainHomeManagement',
                      params: {
                        userId: authQuery.data?.id as number,
                      },
                    },
                  });
                  props.setIsVisible(false);
                }}
                buttonColor={colors.primary}
              >
                {t(i18nKeys.home.create)}
              </Button>
            </View>
          }
        />
      </Surface>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-start',
  },

  container: {
    flex: 0.5,
  },
});

export default HomeListModal;
