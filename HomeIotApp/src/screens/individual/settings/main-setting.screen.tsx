import ArrowRight from '@src/assets/arrow-right.svg';
import DeleteAccountModal from '@src/components/delete-account-modal';
import IconGeneral from '@src/components/icon-general';
import LanguageModal from '@src/components/languague-modal';
import MainLayout from '@src/components/main.layout';
import globalStyles from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const MainSettingScreen = (): JSX.Element => {
  const { t } = useTranslation();

  const [langModal, setLangModal] = useState(false);
  const [delAccModal, setDelAccModal] = useState(false);

  return (
    <MainLayout isGoBack title={t(i18nKeys.settings.title)}>
      <ImageBackground
        source={require('@src/assets/home-iot/background.jpeg')}
        className="flex-1"
      >
        <View
          className="m-3 rounded-xl border-2 border-white bg-[#F7F7F7]"
          style={styles.shadowContainer}
        >
          <Pressable
            style={{ width: '100%' }}
            onPress={() => setLangModal(true)}
          >
            <View className="mb-2 flex-row items-center justify-between rounded-xl p-3">
              <IconGeneral type="FontAwesome" name="language" size={15} />
              <Text className="ml-3 flex-1 text-base font-medium text-[#515151]">
                {t(i18nKeys.language.title)}
              </Text>
              <ArrowRight width={18} height={18} />
            </View>
          </Pressable>

          <Pressable
            style={{ width: '100%' }}
            onPress={() => {
              setDelAccModal(true);
            }}
          >
            <View className="flex-row items-center justify-between rounded-xl p-3">
              <IconGeneral
                type="MaterialCommunityIcons"
                name="delete"
                size={15}
                color="red"
              />
              <Text className="ml-3 flex-1 text-base font-medium text-[#515151]">
                {t(i18nKeys.settings.deleteAccount)}
              </Text>
              <ArrowRight width={18} height={18} />
            </View>
          </Pressable>
        </View>
      </ImageBackground>

      <LanguageModal isVisible={langModal} setIsVisible={setLangModal} />
      <DeleteAccountModal
        isVisible={delAccModal}
        setIsVisible={setDelAccModal}
      />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    ...globalStyles.commonShadowContainer,
    backgroundColor: '#F7F7F7',
  },
});

export default MainSettingScreen;
