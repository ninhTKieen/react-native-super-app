import LightIcon from '@src/assets/home-iot/common/light-bulb-dimmer.svg';
import OffIcon from '@src/assets/home-iot/common/off-icon.svg';
import OnIcon from '@src/assets/home-iot/common/on-icon.svg';
import ThumbIcon from '@src/assets/home-iot/common/thumb-icon.svg';
import { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View, useWindowDimensions } from 'react-native';
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';
import { Slider } from 'react-native-awesome-slider';
import FastImage from 'react-native-fast-image';
import { MD2Colors } from 'react-native-paper';
import { useSharedValue } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { Switch } from 'react-native-switch';

type TDimmersDetailProps = {
  sendData: (attribute: string, ep: string, value: any) => void;
  deviceData: any;
};

const DimmerSlider = ({ dimmer, sendData }: any) => {
  const dimValue = Number(dimmer?.dim?.currentValue);
  const lightValue = Number(dimmer?.onOff?.currentValue || '0');

  console.log('dimValue', dimValue);

  const min = useSharedValue(0);
  const max = useSharedValue(255);
  const progress = useSharedValue(dimValue || 0);

  useEffect(() => {
    progress.value = dimValue;
  }, [dimValue, progress]);

  return (
    <Slider
      style={{
        width: '100%',
        height: 40,
      }}
      containerStyle={{
        borderRadius: 10,
      }}
      minimumValue={min}
      maximumValue={max}
      progress={lightValue ? progress : min}
      onSlidingComplete={(value) => {
        sendData(dimmer.dim.key, dimmer.channel, value.toFixed(0));
      }}
      sliderHeight={18}
      theme={{
        maximumTrackTintColor: '#EEEEEE',
        minimumTrackTintColor: colors.primary,
        bubbleBackgroundColor: colors.primary,
      }}
      renderThumb={() => (
        <View className="h-8 w-8 items-center justify-center rounded-full border border-[#9CC76F] bg-white">
          <ThumbIcon width={20} height={20} />
        </View>
      )}
      disable={!lightValue}
    />
  );
};

const DimmersDetail = ({ deviceData, sendData }: TDimmersDetailProps) => {
  const { width } = useWindowDimensions();

  const [currentDim, setCurrentDim] = useState(0);

  const toggleWidth = 120;
  const circleSize = 50;
  const switchWidthMultiplier = toggleWidth / circleSize;
  const multiplierFix =
    circleSize / ((circleSize * switchWidthMultiplier - circleSize) / 2);

  const { t } = useTranslation();

  return (
    <View className="h-full items-center bg-transparent">
      {deviceData && (
        <>
          <Carousel
            width={width - 20}
            data={deviceData.dimmers}
            loop={false}
            height={400}
            onSnapToItem={(index) => setCurrentDim(index)}
            renderItem={({ item, index }) => {
              const dimmer = item as any;

              const lightValue = Number(dimmer?.onOff?.currentValue || '0');

              return (
                <View
                  key={index}
                  className="m-3 h-full w-full self-center rounded-xl shadow-none"
                >
                  <FastImage
                    source={require('@src/assets/home-iot/devices/lamp.jpeg')}
                    className="mb-2 h-2/5 w-full object-cover"
                  />

                  <View className="items-center rounded-xl bg-white ">
                    <View style={{ justifyContent: 'space-between' }}>
                      <Text className="mb-4 text-center text-xl font-semibold text-[#89B05F]">
                        {t(i18nKeys.device.switch)} {index + 1}
                      </Text>

                      <View className="my-2 w-full flex-row">
                        <View className="flex-1 flex-row items-center self-center">
                          <View className="h-[1px] flex-1 bg-[#EEEEEE]" />
                          <View className="h-[16px] w-[16px] rounded-full bg-[#EEEEEE]" />
                        </View>
                        <View className="mx-2">
                          <Switch
                            value={Boolean(lightValue)}
                            onValueChange={(val) => {
                              sendData(
                                dimmer.onOff.key,
                                dimmer.channel,
                                val ? 1 : 0,
                              );
                            }}
                            activeText={t(i18nKeys.device.on).toUpperCase()}
                            inActiveText={t(i18nKeys.device.off).toUpperCase()}
                            switchLeftPx={multiplierFix}
                            circleSize={circleSize}
                            backgroundActive="#F7F7F7"
                            backgroundInactive="#F7F7F7"
                            activeTextStyle={{
                              color: '#696969',
                              fontSize: 20,
                              fontWeight: '800',
                            }}
                            inactiveTextStyle={{
                              color: '#AAAAAA',
                              fontSize: 20,
                              fontWeight: '800',
                            }}
                            switchRightPx={multiplierFix}
                            switchWidthMultiplier={switchWidthMultiplier}
                            renderInsideCircle={() => {
                              return !lightValue ? (
                                <OffIcon width={50} height={50} />
                              ) : (
                                <OnIcon width={50} height={50} />
                              );
                            }}
                            containerStyle={{
                              marginHorizontal: 20,
                            }}
                          />
                        </View>
                        <View className="flex-1 flex-row items-center self-center">
                          <View className="h-[16px] w-[16px] rounded-full bg-[#EEEEEE]" />
                          <View className="h-[1px] flex-1 bg-[#EEEEEE]" />
                        </View>
                      </View>
                    </View>
                  </View>

                  <View className="px-4">
                    <Text className="text-sm font-medium leading-4 text-[#89B05F]">
                      {t(i18nKeys.device.brightness)}
                    </Text>
                    <View className="mt-4 flex-row items-center">
                      <LightIcon width={34} height={34} className="mr-2" />
                      <DimmerSlider dimmer={dimmer} sendData={sendData} />

                      <View className="ml-2 h-[40px] w-[40px] items-center justify-center rounded-full bg-[#F7F7F7]">
                        <Text
                          style={{
                            color: lightValue
                              ? MD2Colors.yellow800
                              : MD2Colors.grey500,
                            textAlign: 'center',
                            fontWeight: '500',
                            fontSize: 12,
                          }}
                        >
                          {dimmer?.dim?.currentValue && lightValue
                            ? `${(
                                (dimmer.dim.currentValue / 255) *
                                100
                              ).toFixed(0)}%`
                            : '0%'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
          />

          <AnimatedDotsCarousel
            length={deviceData.dimmers?.length}
            currentIndex={currentDim}
            maxIndicators={10}
            interpolateOpacityAndColor={true}
            activeIndicatorConfig={{
              color: '#9CC76F',
              margin: 3,
              opacity: 1,
              size: 8,
            }}
            inactiveIndicatorConfig={{
              color: '#515151',
              margin: 3,
              opacity: 0.5,
              size: 8,
            }}
            decreasingDots={[
              {
                config: { color: 'white', margin: 3, opacity: 0.5, size: 6 },
                quantity: 1,
              },
              {
                config: { color: 'white', margin: 3, opacity: 0.5, size: 4 },
                quantity: 1,
              },
            ]}
          />
        </>
      )}
    </View>
  );
};

export default DimmersDetail;
