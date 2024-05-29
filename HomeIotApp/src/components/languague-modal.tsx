import { storage } from '@src/common/mmkv.storage';
import { CURRENT_LANGUAGE_KEY } from '@src/configs/constant/constant.config';
import { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Pressable, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import IconGeneral from './icon-general';

const LanguageModal = ({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}): JSX.Element => {
  const { t, i18n } = useTranslation();
  const insets = useSafeAreaInsets();

  const changeLanguage = useCallback(
    (lang: string) => {
      i18n.changeLanguage(lang);
      storage.set(CURRENT_LANGUAGE_KEY, lang);
      setIsVisible(false);
    },
    [i18n, setIsVisible],
  );

  const languages = useMemo(
    () => [
      {
        value: 'vi',
        title: `🇻🇳 Tiếng việt`,
        subTitle: t(i18nKeys.language.vietnamese),
        onPress: () => changeLanguage('vi'),
      },
      {
        value: 'en',
        title: `🇺🇸 English`,
        subTitle: t(i18nKeys.language.english),
        onPress: () => changeLanguage('en'),
      },
    ],
    [t, changeLanguage],
  );

  return (
    <Modal
      animationIn={'fadeInDown'}
      animationOut={'fadeOutUp'}
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)}
      style={{
        margin: 0,
        justifyContent: 'flex-start',
      }}
    >
      <View
        style={{
          padding: 10,
          borderRadius: 10,
          paddingTop: insets.top,
          backgroundColor: colors.white,
        }}
      >
        <FlatList
          data={languages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                item.onPress();
              }}
            >
              <View
                className="m-2 flex-row items-center justify-between bg-transparent p-2"
                style={{
                  margin: 6,
                  padding: 6,
                  borderRadius: 10,
                }}
              >
                <View>
                  <Text className="text-lg font-medium text-[#515151]">
                    {item.title}
                  </Text>
                  <Text className="text-[#515151]">{item.subTitle}</Text>
                </View>

                <IconGeneral
                  type="Octicons"
                  name={
                    i18n.language === item.value
                      ? 'check-circle-fill'
                      : 'circle'
                  }
                  color={i18n.language === item.value ? '#89B05F' : '#D1D1D1'}
                  size={20}
                />
              </View>
            </Pressable>
          )}
        />
      </View>
    </Modal>
  );
};

export default LanguageModal;
