import React from 'react';
import {View, Dimensions} from 'react-native';

import ImaxHitechLogo from '@/assets/logos/yoo_seller.svg';

const {width, height} = Dimensions.get('window');

const AppLogo = (): JSX.Element => {
  return (
    <View
      style={{
        width: width < 440 ? '40%' : '30%',
        alignItems: 'center',
        paddingTop: height * 0.02,
      }}>
      <ImaxHitechLogo height={145} width={145} />
    </View>
  );
};

export default AppLogo;
