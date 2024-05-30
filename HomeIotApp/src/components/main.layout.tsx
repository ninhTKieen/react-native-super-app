import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';

import IconGeneral from './icon-general';

type MainLayoutProps = {
  children: React.ReactNode;
  title: string;
  isGoBack?: boolean;
  center?: JSX.Element;
  right?: JSX.Element;
  styleTitle?: StyleProp<TextStyle>;
};

const MainLayout = (props: MainLayoutProps): JSX.Element => {
  const navigation = useNavigation();

  return (
    <View className="h-full flex-1">
      <View className="h-[50px] flex-row items-center justify-between bg-transparent px-[16px] py-[8px]">
        {props.isGoBack && (
          <TouchableOpacity
            onPress={() => {
              navigation.canGoBack() && navigation.goBack();
            }}
            style={{ paddingHorizontal: 10 }}
          >
            <IconGeneral
              type="Ionicons"
              name="chevron-back-outline"
              size={20}
            />
          </TouchableOpacity>
        )}

        <View className="flex-1 items-center bg-transparent">
          {props.center ? (
            props.center
          ) : (
            <Text
              className="text-base font-bold text-[#515151]"
              style={[props.styleTitle]}
            >
              {props.title}
            </Text>
          )}
        </View>

        {props.right && props.right}
      </View>
      {props.children}
    </View>
  );
};

export default MainLayout;
