import { DeviceSubIcon } from '@src/components/devices-icon';
import { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-reanimated-carousel';

type TCurtainsDetailProps = {
  sendData: (attribute: string, ep: string, value: any) => void;
  deviceData: any;
};

const CurtainSwitchesDetail = ({
  sendData,
  deviceData,
}: TCurtainsDetailProps) => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();

  const [currentSwitch, setCurrentSwitch] = React.useState(0);

  return (
    <View className="h-4/5 items-center bg-transparent">
      <FastImage
        source={require('@src/assets/home-iot/devices/curtain.jpeg')}
        className="mb-2 h-1/2 w-full object-cover"
      />
      {deviceData && (
        <>
          <Carousel
            width={width - 20}
            height={150}
            data={deviceData.curtains}
            loop={false}
            onSnapToItem={(index) => setCurrentSwitch(index)}
            renderItem={({ item, index }) => {
              const curtain = item as any;

              return (
                <View
                  className="m-3 mt-4 rounded-xl bg-white"
                  style={[{ alignItems: 'center', justifyContent: 'center' }]}
                >
                  <Text style={{ marginBottom: 10 }}>
                    {t(i18nKeys.device.switch)} {index + 1}
                  </Text>
                  <View className="w-full flex-row justify-between rounded-full bg-[#F7F7F7] px-8 py-2">
                    <TouchableOpacity
                      onPress={() => {
                        sendData(curtain.curtain.key, curtain.channel, 1);
                      }}
                    >
                      <DeviceSubIcon.curtain_on
                        color={
                          Number(curtain?.curtain?.currentValue) === 1
                            ? colors.yellow1
                            : colors.primary
                        }
                        width={50}
                        height={50}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() =>
                        sendData(curtain.curtain.key, curtain.channel, 0)
                      }
                    >
                      <DeviceSubIcon.curtain_stop
                        color={
                          Number(curtain?.curtain?.currentValue) === 0
                            ? colors.yellow1
                            : colors.primary
                        }
                        width={50}
                        height={50}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() =>
                        sendData(curtain.curtain.key, curtain.channel, 2)
                      }
                    >
                      <DeviceSubIcon.curtain_off
                        color={
                          Number(curtain?.curtain?.currentValue) === 2
                            ? colors.yellow1
                            : colors.primary
                        }
                        width={50}
                        height={50}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />

          <AnimatedDotsCarousel
            length={deviceData.curtains?.length}
            currentIndex={currentSwitch}
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

export default CurtainSwitchesDetail;
