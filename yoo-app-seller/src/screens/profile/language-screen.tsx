import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TopBar from '@/components/top-bar';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ProfileStackParamList} from '@/routes/profile.route';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {List} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {color} from '@/configs/globalStyles';
import {useAppDispatch} from '@/hooks/redux.hook';
import {setCurrentLanguage} from '@/features/profile/profile.slice';

const LanguageScreen = () => {
  const navigation = useNavigation<NavigationProp<ProfileStackParamList>>();
  const {t, i18n} = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView>
      <TopBar
        title={t(i18nKeys.setting.language)}
        onPressLeft={() => navigation.goBack()}
      />
      <View style={{marginTop: 20, borderRadius: 10}}>
        <List.Accordion
          theme={{colors: {primary: color.blue1}}}
          title={t(i18nKeys.setting.language)}
          // titleStyle={{color: coblacklor.}}
          description={
            i18n.language === 'vi'
              ? t(i18nKeys.setting.vietnamese)
              : t(i18nKeys.setting.english)
          }
          style={{backgroundColor: 'white'}}
          left={props => <List.Icon {...props} icon="bookshelf" />}>
          <List.Item
            title={t(i18nKeys.setting.vietnamese)}
            titleStyle={{
              fontWeight: i18n.language === 'vi' ? 'bold' : 'normal',
            }}
            style={{paddingLeft: 25}}
            onPress={() => {
              i18n.changeLanguage('vi');
              dispatch(setCurrentLanguage('vi'));
            }}
            right={() =>
              i18n.language === 'vi' ? <List.Icon icon={'check'} /> : null
            }
          />
          <List.Item
            title={t(i18nKeys.setting.english)}
            onPress={async () => {
              i18n.changeLanguage('en');
              dispatch(setCurrentLanguage('en'));
            }}
            titleStyle={{
              fontWeight: i18n.language === 'en' ? 'bold' : 'normal',
            }}
            style={{paddingLeft: 25}}
            right={() =>
              i18n.language === 'en' ? <List.Icon icon={'check'} /> : null
            }
          />
        </List.Accordion>
      </View>
    </SafeAreaView>
  );
};

export default LanguageScreen;

const styles = StyleSheet.create({});
