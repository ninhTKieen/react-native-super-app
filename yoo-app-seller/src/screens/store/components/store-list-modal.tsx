import TopBar from '@/components/top-bar';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {ActivityIndicator, Button, Divider} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StoreIcon} from '../icons';
import AvatarImage from '@/components/common/avatar-image';
import {useQuery} from '@tanstack/react-query';
import storeApi from '@/features/store/store.service';
import {useAppDispatch} from '@/hooks/redux.hook';
import {setCurrentStore} from '@/features/store/store.slice';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {useTranslation} from 'react-i18next';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {PartnerStoreStackParamList} from '@/routes/store.route';

type Props = {
  isVisible: boolean;
  setVisible: (value: boolean) => void;
  currentStoreId: number;
};

const StoreListModal = ({isVisible, setVisible, currentStoreId}: Props) => {
  const insets = useSafeAreaInsets();
  const {isLoading, data} = useQuery({
    queryKey: ['providers'],
    queryFn: () => storeApi.getAllProviders(),
  });
  const navigation =
    useNavigation<NavigationProp<PartnerStoreStackParamList>>();
  const dispatch = useAppDispatch();
  const {t} = useTranslation();

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => setVisible(false)}
      onBackButtonPress={() => setVisible(false)}
      swipeDirection={['up']}
      animationOut={'slideOutUp'}
      animationOutTiming={500}
      animationIn={'slideInDown'}
      propagateSwipe={true}
      animationInTiming={500}
      onSwipeComplete={() => setVisible(false)}
      style={styles.modal}>
      <View style={[styles.container, {paddingTop: insets.top}]}>
        <TopBar
          title={t(i18nKeys.store.list)}
          onPressLeft={() => setVisible(false)}
        />
        {!isLoading ? (
          <ScrollView>
            <View style={{flex: 1}} onStartShouldSetResponder={() => true}>
              {data && data.length !== 0 ? (
                data.map((item, index) => (
                  <View key={item.id}>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(setCurrentStore(item));
                        setVisible(false);
                      }}
                      style={{
                        backgroundColor:
                          item.id === currentStoreId ? '#75A3C71A' : '#fff',
                        justifyContent: 'space-between',
                        paddingHorizontal: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 18,
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <AvatarImage
                          source={{
                            uri: item.imageUrls[0],
                          }}
                          size={50}
                        />
                        <View style={{paddingLeft: 5, flexShrink: 1}}>
                          <Text style={styles.header}>{item.name}</Text>
                          {item.email && (
                            <Text style={styles.subheader}>{item.email}</Text>
                          )}
                        </View>
                      </View>
                      {item.id === currentStoreId && (
                        <View
                          style={{
                            backgroundColor: '#75A3C7',
                            width: 27,
                            height: 27,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 50,
                          }}>
                          <StoreIcon.Check />
                        </View>
                      )}
                    </TouchableOpacity>
                    {index !== data.length - 1 && (
                      <Divider style={{marginHorizontal: '10%'}} />
                    )}
                  </View>
                ))
              ) : (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 200,
                  }}>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                    {t(i18nKeys.store.noStore)}
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        ) : (
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <ActivityIndicator />
          </ScrollView>
        )}

        <Divider />
        <View style={{width: '100%', alignItems: 'center', paddingTop: 15}}>
          <View style={{justifyContent: 'center', width: '80%'}}>
            <Button
              mode="contained"
              icon={'plus-circle-outline'}
              contentStyle={{flexDirection: 'row-reverse'}}
              style={{
                backgroundColor: '#75A3C7',
                width: '100%',
                height: 40,
              }}
              onPress={() => {
                setVisible(false);
                navigation.navigate('CreateStoreStack', {
                  screen: 'CreateMainPage',
                  params: {},
                });
              }}>
              <Text style={{textAlign: 'center'}}>{t(i18nKeys.store.add)}</Text>
            </Button>
          </View>
        </View>

        <View style={{padding: 10}}>
          <Divider
            style={{
              height: 6,
              width: '50%',
              alignSelf: 'center',
              borderRadius: 50,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default StoreListModal;

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-start',
  },

  container: {
    backgroundColor: '#fff',
    flex: 0.5,
  },
  header: {
    fontSize: 18,
    fontWeight: '700',
    color: '#707386',
  },
  subheader: {
    fontSize: 16,
    fontWeight: '400',
    color: '#707386',
    paddingTop: 7,
  },
});
