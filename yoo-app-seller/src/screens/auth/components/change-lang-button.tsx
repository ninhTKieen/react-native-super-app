import React from 'react';
import {Image, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '@/hooks/redux.hook';
import {setCurrentLanguage} from '@/features/profile/profile.slice';

const ChangeLanguageButton = (): JSX.Element => {
  const {i18n} = useTranslation();
  const dispatch = useAppDispatch();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{marginBottom: 10, opacity: i18n.language === 'vi' ? 1 : 0.3}}
        onPress={() => {
          i18n.changeLanguage('vi');
          dispatch(setCurrentLanguage('vi'));
        }}>
        <Image
          source={require('@/assets/flags/vn_flag.webp')}
          style={styles.image}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{marginBottom: 10, opacity: i18n.language === 'en' ? 1 : 0.3}}
        onPress={() => {
          i18n.changeLanguage('en');
          dispatch(setCurrentLanguage('en'));
        }}>
        <Image
          source={require('@/assets/flags/uk_flag.webp')}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 10,
  },
  image: {
    width: 30,
    height: 20,
  },
});

export default ChangeLanguageButton;
