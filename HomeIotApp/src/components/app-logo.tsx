import React from 'react';
import { Image, View, useWindowDimensions } from 'react-native';

const AppLogo = (): JSX.Element => {
  const { width, height } = useWindowDimensions();

  return (
    <View
      style={{
        width: width < 440 ? '40%' : '30%',
        alignItems: 'center',
        paddingTop: height * 0.02,
      }}
    >
      <Image
        source={require('@src/assets/yoohome.png')}
        style={{ width: 145, height: 145 }}
      />
    </View>
  );
};

export default AppLogo;
