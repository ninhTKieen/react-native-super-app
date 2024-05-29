import MainLayout from '@src/components/main.layout';
import { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import { useAuth } from '@src/hooks/use-auth.hook';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageView from 'react-native-image-viewing';

import { EditProfileInputText } from './components/profile-base-input';

const { width, height } = Dimensions.get('screen');

const ProfileScreen = () => {
  const { t } = useTranslation();
  const [isImgVisible, setIsImgVisible] = useState(false);

  const { authQuery } = useAuth();

  return (
    <MainLayout title={t(i18nKeys.individual.profile.title)} isGoBack>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="m-4 flex-row items-center">
            <View className="h-24 w-24 overflow-hidden rounded-full border-2 border-white">
              {authQuery?.data?.imageUrl ? (
                <FastImage
                  className="h-full w-full"
                  source={{
                    uri: authQuery?.data?.imageUrl,
                  }}
                  style={{ backgroundColor: colors.transparent }}
                />
              ) : (
                <View className="h-full w-full items-center justify-center bg-[#EEEEEE]">
                  <Text className="text-4xl font-bold text-[#515151]">
                    {authQuery?.data?.fullName?.[0]}
                  </Text>
                </View>
              )}
            </View>

            <View style={{ marginLeft: '3%' }}>
              <Text className="text-2xl font-semibold text-[#515151]">
                {authQuery?.data?.fullName}
              </Text>
              <Text style={{ marginTop: 5 }}>{authQuery?.data?.name}</Text>
            </View>
          </View>

          <View
            style={{
              borderTopWidth: 5,
              borderColor: colors.primary,
              alignItems: 'flex-start',
              overflow: 'hidden',
            }}
          >
            <View
              style={{
                backgroundColor: colors.primary,
                borderBottomRightRadius: 40,
                paddingTop: 35,
                paddingLeft: width * 0.04,
                paddingRight: width * 0.065,
                paddingVertical: height * 0.007,
                marginTop: -32,
              }}
            >
              <Text className="text-[17px] font-medium text-white">
                {t(i18nKeys.individual.profile.basicInfo)}
              </Text>
            </View>
          </View>

          <View style={{ paddingHorizontal: 20 }}>
            <EditProfileInputText
              label={t(i18nKeys.individual.profile.email)}
              defaultValue={authQuery.data?.emailAddress}
              value={authQuery.data?.emailAddress as string}
              disabled
              onChange={() => {}}
            />
            <View className="border-b border-[#EEEEEE]" />

            <EditProfileInputText
              label={t(i18nKeys.individual.profile.username)}
              defaultValue={authQuery.data?.userName}
              value={authQuery.data?.userName as string}
              disabled
              onChange={() => {}}
            />
            <View className="border-b border-[#EEEEEE]" />

            <EditProfileInputText
              label={t(i18nKeys.individual.profile.name)}
              defaultValue={authQuery.data?.name}
              value={authQuery.data?.name as string}
              disabled
              onChange={() => {}}
            />
            <View className="border-b border-[#EEEEEE]" />

            <ImageView
              images={[
                {
                  uri: authQuery?.data?.imageUrl,
                },
              ]}
              imageIndex={0}
              visible={isImgVisible}
              onRequestClose={() => setIsImgVisible(false)}
            />
          </View>
        </ScrollView>
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#FFF',
  },
});

export default ProfileScreen;
