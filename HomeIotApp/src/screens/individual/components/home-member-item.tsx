import { NavigationProp, useNavigation } from '@react-navigation/native';
import ArrowRight from '@src/assets/arrow-right.svg';
import IconGeneral from '@src/components/icon-general';
import { i18nKeys } from '@src/configs/i18n';
import { HomeManagementRouteStackParamList } from '@src/configs/routes/individual/home-management.route';
import {
  IGetOneHomeResponse,
  MEMBER_ROLES,
  TMemberRole,
} from '@src/features/home/home.model';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

type THomeMemberItemProps = {
  member: IGetOneHomeResponse['members'][number];
  currentUserRole?: TMemberRole;
  homeId: number;
};

const HomeMemberItem = ({
  member,
  currentUserRole,
  homeId,
}: THomeMemberItemProps) => {
  const navigation =
    useNavigation<
      NavigationProp<HomeManagementRouteStackParamList, 'HomeSettings'>
    >();
  const { t } = useTranslation();

  return (
    <View style={{ padding: 5 }}>
      <TouchableOpacity
        className="mb-2 flex-row items-center justify-between rounded-full border border-white bg-[#EEEEEE] p-3"
        onPress={() =>
          navigation.navigate('HomeMember', {
            currentUserRole: currentUserRole as any,
            homeId,
            member,
          })
        }
      >
        <View className="h-10 w-10 overflow-hidden rounded-full border-2 border-white p-2">
          <View className="h-full w-full items-center justify-center bg-[#EEEEEE]">
            <Text className="font-bold text-[#515151]">
              {member?.nickname?.charAt(0) ||
                t(i18nKeys.common.noName).charAt(0)}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text
            className="text-base font-medium text-[#515151]"
            style={{
              opacity: member?.nickname ? 1 : 0.5,
            }}
          >
            {member?.nickname || t(i18nKeys.common.noName)}
          </Text>
          <Text className="text-[#89B05F]">
            {t(
              `${
                MEMBER_ROLES.find((role) => role.value === member?.role)?.label
              }`,
            )}
          </Text>
        </View>
        <View className="flex-row items-center justify-center">
          <IconGeneral
            name="dot-single"
            type="Entypo"
            size={40}
            color={
              {
                BLOCKED: 'red',
                PENDING: 'orange',
                ACTIVE: 'green',
              }[member?.status]
            }
          />
          <ArrowRight width={18} height={18} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HomeMemberItem;
