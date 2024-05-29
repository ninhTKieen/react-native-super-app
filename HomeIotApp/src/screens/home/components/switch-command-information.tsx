import LedIcon from '@src/assets/smart-home/device/lighting/ic_led.svg';
import IconGeneral from '@src/components/icon-general';
import { colors } from '@src/configs/constant/global-styles';
import i18n, { i18nKeys } from '@src/configs/i18n';
import { EDeviceType } from '@src/features/devices/device.model';
import { useDeviceStore } from '@src/features/devices/device.store';
import socketService from '@src/features/socket/socket.service';
import { getDeviceResponse } from '@src/utils/device.util';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { MD2Colors, Text as PaperText, Surface } from 'react-native-paper';

import { TDeviceInformationProps } from './device-information';
import CurtainSwitchesDetail from './devices/switches/curtains-detail';
import DimmersDetail from './devices/switches/dimmers-detail';

const SwitchCommandInformation = (props: TDeviceInformationProps) => {
  const { profile } = useDeviceStore();
  const metaData = props.metaData;
  const deviceData = getDeviceResponse({
    type: props.deviceType,
    metaData: metaData,
    profile: profile?.[props.deviceType],
  });

  console.log('deviceData', JSON.stringify(deviceData));

  const sendData = (attribute: string, ep: string, value: any) => {
    const commandData = {
      id: props.deviceId,
      attribute,
      ep,
      value,
    };

    socketService.send({
      channel: '/devices/command',
      data: commandData,
    });
  };

  return (
    <>
      {[
        EDeviceType.ZIGBEE_SWITCH_1G,
        EDeviceType.ZIGBEE_SWITCH_2G,
        EDeviceType.ZIGBEE_SWITCH_3G,
      ].includes(props.deviceType) && (
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'transparent',
            height: '70%',
          }}
        >
          {deviceData &&
            deviceData?.switches?.map((switchItem: any, index: number) => {
              const color = Number(switchItem?.currentValue)
                ? MD2Colors.yellow800
                : MD2Colors.grey500;

              return (
                <Surface
                  key={index}
                  style={[
                    styles.switchWrapperItem,
                    Number(switchItem?.currentValue) && {
                      shadowColor: MD2Colors.amber900,
                      shadowOffset: {
                        width: 5,
                        height: 5,
                      },
                    },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => {
                      const commandData = {
                        id: props.deviceId,
                        attribute: switchItem?.key,
                        ep: switchItem.channel,
                        value: switchItem?.options?.filter(
                          (option: { label: string; value: number }) =>
                            Number(option.value) !==
                            Number(switchItem?.currentValue || '0'),
                        )?.[0]?.value,
                      };

                      socketService.send({
                        channel: '/devices/command',
                        data: commandData,
                      });
                    }}
                    style={styles.switchContent}
                  >
                    <PaperText variant="titleMedium" style={{ color }}>
                      {i18n.t(i18nKeys.device.switch)} {index + 1}
                    </PaperText>

                    <LedIcon width={40} height={40} color={color} />

                    <IconGeneral
                      type="MaterialIcons"
                      name="minimize"
                      color={color}
                      size={60}
                    />
                  </TouchableOpacity>
                </Surface>
              );
            })}
        </View>
      )}

      {[
        EDeviceType.ZIGBEE_DIMMERSWITCH_1G,
        EDeviceType.ZIGBEE_DIMMERSWITCH_2G,
      ].includes(props.deviceType) && (
        <DimmersDetail deviceData={deviceData} sendData={sendData} />
      )}

      {[
        EDeviceType.ZIGBEE_CURTAIN_SWITCH_1G,
        EDeviceType.ZIGBEE_CURTAIN_SWITCH_2G,
      ].includes(props.deviceType) && (
        <CurtainSwitchesDetail deviceData={deviceData} sendData={sendData} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '50%',
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },

  switchWrapperItem: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    height: '100%',
    backgroundColor: colors.white,
  },

  switchContent: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },

  iconCurtainWrapper: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    paddingHorizontal: 10,
  },
});

export default SwitchCommandInformation;
