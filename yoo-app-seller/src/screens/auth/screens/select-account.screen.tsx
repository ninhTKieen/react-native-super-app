import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import globalStyles, {color} from '@/configs/globalStyles';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import AppLogo from '../components/logo-app';
import {useTranslation} from 'react-i18next';
import ImageCustomer from '@/components/common/image-customer';
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {RootStackParamList} from '@/navigations/auth-navigator';
import {useAppDispatch, useAppSelector} from '@/hooks/redux.hook';
import {
  authActions,
  selectAccounts,
  selectTokens,
} from '@/features/auth/auth.slice';
import {useQueryClient} from '@tanstack/react-query';
import {IAccount} from '@/features/auth/auth.model';
import IconGeneral from '@/components/common/icon-general';
import ConfirmModal from '@/components/modals/confirm-modal';
import {saveTokens} from '@/utils/token.util';

type Props = {};

const width = Dimensions.get('window').width;

interface RenderComponentProps {
  item: IAccount;
  onPress: (id: number) => void;
  onDelete: (id: number) => void;
}

enum ActionTypes {
  'LOGIN' = 1,
  'DELETE' = 2,
}

const RenderComponent = ({item, onPress, onDelete}: RenderComponentProps) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState('');
  const [actionType, setActionType] = React.useState(ActionTypes.LOGIN);
  const {t} = useTranslation();

  return (
    <View style={[styles.item]}>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
          setActionType(ActionTypes.LOGIN);
          setModalMessage(
            t(i18nKeys.auth.signIn.cfLogin) + ' ' + item.fullName,
          );
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flexGrow: 1,
        }}>
        <ImageCustomer
          style={styles.image}
          source={
            item.imageUrl
              ? {uri: item.imageUrl}
              : require('@/assets/logos/logo.png')
          }
        />

        <View style={{}}>
          <Text style={styles.name}>{item.fullName}</Text>
          <Text style={styles.email}>{item.emailAddress}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
          setActionType(ActionTypes.DELETE);
          setModalMessage(
            t(i18nKeys.auth.signIn.cfDelete) + ' ' + item.fullName,
          );
        }}>
        <IconGeneral
          type="AntDesign"
          name="close"
          size={18}
          style={{
            justifyContent: 'flex-end',
            padding: 10,
          }}
        />
      </TouchableOpacity>
      <ConfirmModal
        isVisible={modalVisible}
        setVisible={setModalVisible}
        onPressCancel={() => setModalVisible(false)}
        onPressConfirm={() => {
          if (actionType === ActionTypes.LOGIN) {
            onPress(item.id);
          } else {
            onDelete(item.id);
          }
          setModalVisible(false);
        }}
        message={modalMessage}
        textComponent={
          <>
            <Text style={styles.textModal}>
              {actionType === ActionTypes.LOGIN
                ? t(i18nKeys.auth.signIn.cfLogin) + ' '
                : t(i18nKeys.auth.signIn.cfDelete) + ' '}
            </Text>
            <Text style={styles.textHighLight}>{`'${item.fullName}'`}</Text>
          </>
        }
      />
    </View>
  );
};

const SelectAccountScreen = (props: Props) => {
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectAccounts);

  const {accessToken, encryptedAccessToken} = useAppSelector(selectTokens);

  const handleChooseAccount = async (id: number) => {
    try {
      const account = data.find((item: IAccount) => item.id === id);
      if (account) {
        await saveTokens({
          accessToken: account.accessToken,
          encryptedAccessToken: account.encryptedAccessToken,
          refreshToken: account.refreshToken,
        });
      }
      dispatch(authActions.chooseAccount(id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAccount = async (id: number) => {
    try {
      await dispatch(authActions.deleteAccount(id));
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    queryClient.refetchQueries(['currentUser']);
  }, [accessToken, encryptedAccessToken, queryClient]);

  React.useEffect(() => {
    if (data.length === 0) {
      navigation.navigate('Login');
      navigation.dispatch(state => {
        const routes = state.routes.filter(
          r => r.name !== 'SelectAccountScreen',
        );
        return CommonActions.reset({
          ...state,
          routes,
          index: routes.length - 1,
        });
      });
    }
  });

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: color.white, height: '100%'}}
      showsVerticalScrollIndicator={false}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <Text
          style={[
            globalStyles.title3Bold,
            {
              color: color.blue1,
              textAlign: 'center',
              width: '80%',
              marginTop: 50,
            },
          ]}>
          {t(i18nKeys.intro)}
        </Text>
        <AppLogo />
        <View style={{paddingHorizontal: width * 0.1, marginTop: 30}}>
          <Text style={styles.text}>
            {t(i18nKeys.auth.detectMulAccountMsg)}
          </Text>
          <View style={styles.wrapper}>
            <ScrollView>
              {data.map((item: IAccount) => (
                <RenderComponent
                  key={item.id}
                  item={item}
                  onPress={handleChooseAccount}
                  onDelete={handleDeleteAccount}
                />
              ))}
            </ScrollView>
          </View>
          <View
            style={{
              paddingTop: 20,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={styles.text}>{t(i18nKeys.auth.also) + ' '}</Text>
            <Text
              style={styles.pressableText}
              onPress={() => navigation.navigate('Login')}>
              {t(i18nKeys.auth.loginWithAnotherAccount)}
            </Text>
          </View>
          <View
            style={{
              paddingTop: 20,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={styles.text}>{' ' + t(i18nKeys.common.or) + ' '}</Text>
            <Text
              style={styles.pressableText}
              onPress={() => navigation.navigate('Register')}>
              {t(i18nKeys.auth.registerNewAccount)}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SelectAccountScreen;

const styles = StyleSheet.create({
  text: {
    color: color.grey9,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  wrapper: {
    marginTop: 20,
    borderRadius: 10,
    width: width * 0.8,
    maxHeight: 250,
    // borderWidth: 1,
    borderColor: color.grey5,
  },
  item: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: color.grey7,
    marginVertical: 5,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 14,
    fontWeight: '500',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    color: color.blueDark1,
    fontWeight: '500',
    fontSize: 16,
  },
  email: {
    color: color.grey3,
  },
  pressableText: {
    fontSize: 14,
    fontWeight: '500',
    color: color.blue1,
  },
  textHighLight: {
    color: color.blue1,
    fontWeight: '600',
    fontSize: 16,
    paddingBottom: 20,
  },
  textModal: {
    color: color.blueDark,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    paddingTop: 20,
  },
});
