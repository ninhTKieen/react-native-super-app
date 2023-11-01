import {StyleSheet, View, Dimensions, StyleProp, ViewStyle} from 'react-native';

import Carousel from 'react-native-reanimated-carousel';
import React from 'react';
import {ResizeMode, ImageStyle} from 'react-native-fast-image';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ImageCustomer from './common/image-customer';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const ParallaxImageCustomer = ({
  data,
  styleItem,
  sliderHeight,
  sliderWidth,
  resizeMode,
  styleImg,
  loop = false,
  autoPlay = true,
  scrollAnimationDuration = 1000,
}: {
  data: any;
  styleItem?: StyleProp<ViewStyle>;
  sliderHeight?: number;
  sliderWidth?: number;
  resizeMode?: ResizeMode;
  styleImg?: StyleProp<ImageStyle>;
  loop?: boolean;
  autoPlay?: boolean;
  scrollAnimationDuration?: number;
}) => {
  const _renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <View key={index} style={[styles.item, styleItem]}>
        <ImageCustomer
          source={typeof item === 'string' ? {uri: item} : item}
          resizeMode={resizeMode ? resizeMode : 'contain'}
          style={[styles.imageContainer, styleImg]}
          widthImg={sliderWidth}
          heightImg={sliderHeight}
        />
      </View>
    );
  };

  return (
    <GestureHandlerRootView>
      <Carousel
        data={data}
        renderItem={_renderItem}
        width={sliderWidth ? sliderWidth : screenWidth}
        height={sliderHeight ? sliderHeight : screenHeight / 3}
        autoPlay={autoPlay}
        pagingEnabled={true}
        scrollAnimationDuration={scrollAnimationDuration}
        onSnapToItem={() => {}}
        loop={loop}
      />
    </GestureHandlerRootView>
  );
};

export default ParallaxImageCustomer;

const styles = StyleSheet.create({
  item: {
    // width: screenWidth - 60,
    // height: screenWidth - 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    // marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
});
