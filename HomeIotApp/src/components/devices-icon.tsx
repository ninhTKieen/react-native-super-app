import GatewayIcon from '@src/assets/home-iot/devices/icons/Gateway.svg';
import CurtainSwCommonIcon from '@src/assets/home-iot/devices/icons/curtain/03.svg';
import LightingCommonIcon from '@src/assets/home-iot/devices/icons/lighting/01.svg';
import DimmerCommonIcon from '@src/assets/home-iot/devices/icons/lighting/03.svg';
import HumidTempCommonIcon from '@src/assets/home-iot/devices/icons/sensor/02.svg';
import DoorCommonIcon from '@src/assets/home-iot/devices/icons/sensor/06.svg';
import FireAlarmCommonIcon from '@src/assets/home-iot/devices/icons/sensor/firealaram.svg';
import PirCommonIcon from '@src/assets/home-iot/devices/icons/sensor/pir.svg';
import SwitchCommonIcon from '@src/assets/home-iot/devices/icons/switch/02.svg';
import TemperatureIcon from '@src/assets/smart-home/common/action/ic_nhietdo.svg';
import HumidityIcon from '@src/assets/smart-home/device/air/humidity.svg';
import AcCoolIcon from '@src/assets/smart-home/device/conditioner/ic_cool.svg';
import AcDryIcon from '@src/assets/smart-home/device/conditioner/ic_dry.svg';
import FanIcon from '@src/assets/smart-home/device/conditioner/ic_fan.svg';
import AcWindIcon from '@src/assets/smart-home/device/conditioner/ic_wind.svg';
import CloseCurtainIcon from '@src/assets/smart-home/device/curtain/close.svg';
import OpenCurtainIcon from '@src/assets/smart-home/device/curtain/open.svg';
import StopCurtainIcon from '@src/assets/smart-home/device/curtain/pause.svg';
import DoorCloseIcon from '@src/assets/smart-home/device/door-close.svg';
import DoorOpenIcon from '@src/assets/smart-home/device/door-open.svg';
import { EDeviceType } from '@src/features/devices/device.model';
import React from 'react';
import FastImage from 'react-native-fast-image';

export const DeviceIcons = new Map([
  [
    EDeviceType.DS_ZIGBEE_GATEWAY,
    (width?: number, height?: number) => (
      <GatewayIcon width={width || 38} height={height || 38} />
    ),
  ],
  [
    EDeviceType.ZIGBEE_SWITCH_3G,
    (width?: number, height?: number) => (
      <SwitchCommonIcon width={width || 38} height={height || 38} />
    ),
  ],
  [
    EDeviceType.ZIGBEE_SWITCH_2G,
    (width?: number, height?: number) => (
      <SwitchCommonIcon width={width || 38} height={height || 38} />
    ),
  ],
  [
    EDeviceType.ZIGBEE_SWITCH_1G,
    (width?: number, height?: number) => (
      <SwitchCommonIcon width={width || 38} height={height || 38} />
    ),
  ],
  [
    EDeviceType.ZIGBEE_SENSOR_PIR,
    (width?: number, height?: number) => (
      <PirCommonIcon width={width || 38} height={height || 38} />
    ),
  ],
  [
    EDeviceType.ZIGBEE_SENSOR_SOS,
    (width?: number, height?: number) => (
      <FastImage
        source={require('@src/assets/home-iot/devices/sos-button.webp')}
        style={{ width: width || 65, height: height || 65 }}
      />
    ),
  ],
  [
    EDeviceType.ZIGBEE_SENSOR_WATER_LEAK,
    (width?: number, height?: number) => (
      <FastImage
        source={require('@src/assets/home-iot/devices/water-leak-sensor.jpeg')}
        style={{ width: width || 65, height: height || 65 }}
      />
    ),
  ],
  [
    EDeviceType.ZIGBEE_SENSOR_TEMPERATURE_HUMIDITY,
    (width?: number, height?: number) => (
      <HumidTempCommonIcon width={width || 38} height={height || 38} />
    ),
  ],
  [
    EDeviceType.ZIGBEE_SENSOR_DOOR,
    (width?: number, height?: number) => (
      <DoorCommonIcon width={width || 38} height={height || 38} />
    ),
  ],
  [
    EDeviceType.ZIGBEE_SENSOR_LIGHT,
    (width?: number, height?: number) => (
      <LightingCommonIcon width={width || 38} height={height || 38} />
    ),
  ],
  [
    EDeviceType.ZIGBEE_SENSOR_FIRE_ALARM,
    (width?: number, height?: number) => (
      <FireAlarmCommonIcon width={width || 38} height={height || 38} />
    ),
  ],
  [
    EDeviceType.ZIGBEE_DIMMERSWITCH_1G,
    (width?: number, height?: number) => (
      <DimmerCommonIcon width={width || 38} height={height || 38} />
    ),
  ],
  [
    EDeviceType.ZIGBEE_DIMMERSWITCH_2G,
    (width?: number, height?: number) => (
      <DimmerCommonIcon width={width || 38} height={height || 38} />
    ),
  ],
  [
    EDeviceType.ZIGBEE_CURTAIN_SWITCH_1G,
    (width?: number, height?: number) => (
      <CurtainSwCommonIcon width={width || 38} height={height || 38} />
    ),
  ],
  [
    EDeviceType.ZIGBEE_CURTAIN_SWITCH_2G,
    (width?: number, height?: number) => (
      <CurtainSwCommonIcon width={width || 38} height={height || 38} />
    ),
  ],
  [
    EDeviceType.ZIGBEE_FREELOCALTE_SWITCH_2G,
    (width?: number, height?: number) => (
      <FastImage
        source={require('@src/assets/home-iot/devices/freelocate-2k.webp')}
        style={{ width: width || 65, height: height || 65 }}
      />
    ),
  ],
  [
    EDeviceType.ZIGBEE_FREELOCALTE_SWITCH_4G,
    (width?: number, height?: number) => (
      <FastImage
        source={require('@src/assets/home-iot/devices/freelocate-4k.webp')}
        style={{ width: width || 65, height: height || 65 }}
      />
    ),
  ],
  [
    EDeviceType.WIFI_IR_REMOTE,
    (width?: number, height?: number) => (
      <FastImage
        source={require('@src/assets/home-iot/devices/wifi-ir-remote.jpeg')}
        style={{ width: width || 65, height: height || 65 }}
      />
    ),
  ],
  [
    EDeviceType.YOOTEK_AI_BOX,
    (width?: number, height?: number) => (
      <FastImage
        source={require('@src/assets/home-iot/devices/ai-box.png')}
        style={{ width: width || 65, height: height || 65 }}
      />
    ),
  ],
]);

export const DeviceImages = new Map([
  [
    EDeviceType.DS_ZIGBEE_GATEWAY,
    (width?: number, height?: number) => (
      <FastImage
        source={require('@src/assets/home-iot/devices/yoo-gateway.jpeg')}
        style={{ width: width || 65, height: height || 65 }}
      />
    ),
  ],
  [
    EDeviceType.ZIGBEE_SWITCH_3G,
    (width?: number, height?: number) => (
      <FastImage
        source={require('@src/assets/home-iot/devices/switch-3gang.webp')}
        style={{ width: width || 65, height: height || 65 }}
      />
    ),
  ],
  [
    EDeviceType.ZIGBEE_SWITCH_2G,
    (width?: number, height?: number) => (
      <FastImage
        source={require('@src/assets/home-iot/devices/switch-2gang.jpeg')}
        style={{ width: width || 65, height: height || 65 }}
      />
    ),
  ],
  [
    EDeviceType.ZIGBEE_SWITCH_1G,
    (width?: number, height?: number) => (
      <FastImage
        source={require('@src/assets/home-iot/devices/switch-1gang.jpeg')}
        style={{ width: width || 65, height: height || 65 }}
      />
    ),
  ],
  [
    EDeviceType.ZIGBEE_SENSOR_PIR,
    (width?: number, height?: number) => (
      <FastImage
        source={require('@src/assets/home-iot/devices/sensor-pir.webp')}
        style={{ width: width || 65, height: height || 65 }}
      />
    ),
  ],
  [
    EDeviceType.ZIGBEE_SENSOR_SOS,
    (width?: number, height?: number) => (
      <FastImage
        source={require('@src/assets/home-iot/devices/sos-button.webp')}
        style={{ width: width || 65, height: height || 65 }}
      />
    ),
  ],
  [
    EDeviceType.ZIGBEE_SENSOR_WATER_LEAK,
    (width?: number, height?: number) => (
      <FastImage
        source={require('@src/assets/home-iot/devices/water-leak-sensor.jpeg')}
        style={{ width: width || 65, height: height || 65 }}
      />
    ),
  ],
  [
    EDeviceType.ZIGBEE_SENSOR_TEMPERATURE_HUMIDITY,
    (width?: number, height?: number) => (
      <FastImage
        source={require('@src/assets/home-iot/devices/temperature-humidity.jpeg')}
        style={{ width: width || 65, height: height || 65 }}
      />
    ),
  ],
  [
    EDeviceType.ZIGBEE_SENSOR_DOOR,
    (width?: number, height?: number) => (
      <FastImage
        source={require('@src/assets/home-iot/devices/door-sensor.jpeg')}
        style={{ width: width || 65, height: height || 65 }}
      />
    ),
  ],
  [
    EDeviceType.ZIGBEE_SENSOR_LIGHT,
    (width?: number, height?: number) => (
      <FastImage
        source={require('@src/assets/home-iot/devices/light-sensor.webp')}
        style={{ width: width || 65, height: height || 65 }}
      />
    ),
  ],
  [
    EDeviceType.ZIGBEE_SENSOR_FIRE_ALARM,
    (width?: number, height?: number) => (
      <FastImage
        source={require('@src/assets/home-iot/devices/smoke-alarm.jpeg')}
        style={{ width: width || 65, height: height || 65 }}
      />
    ),
  ],
  [
    EDeviceType.ZIGBEE_DIMMERSWITCH_1G,
    (width?: number, height?: number) => (
      <FastImage
        source={require('@src/assets/home-iot/devices/dimmer-1g.jpeg')}
        style={{ width: width || 65, height: height || 65 }}
      />
    ),
  ],
  [
    EDeviceType.ZIGBEE_DIMMERSWITCH_2G,
    (width?: number, height?: number) => (
      <FastImage
        source={require('@src/assets/home-iot/devices/dimmer-2g.jpeg')}
        style={{ width: width || 65, height: height || 65 }}
      />
    ),
  ],
  [
    EDeviceType.ZIGBEE_CURTAIN_SWITCH_1G,
    (width?: number, height?: number) => (
      <FastImage
        source={require('@src/assets/home-iot/devices/curtain-1g.webp')}
        style={{ width: width || 65, height: height || 65 }}
      />
    ),
  ],
  [
    EDeviceType.ZIGBEE_CURTAIN_SWITCH_2G,
    (width?: number, height?: number) => (
      <FastImage
        source={require('@src/assets/home-iot/devices/curtain-2g.webp')}
        style={{ width: width || 65, height: height || 65 }}
      />
    ),
  ],
  [
    EDeviceType.ZIGBEE_FREELOCALTE_SWITCH_2G,
    (width?: number, height?: number) => (
      <FastImage
        source={require('@src/assets/home-iot/devices/freelocate-2k.webp')}
        style={{ width: width || 65, height: height || 65 }}
      />
    ),
  ],
  [
    EDeviceType.ZIGBEE_FREELOCALTE_SWITCH_4G,
    (width?: number, height?: number) => (
      <FastImage
        source={require('@src/assets/home-iot/devices/freelocate-4k.webp')}
        style={{ width: width || 65, height: height || 65 }}
      />
    ),
  ],
  [
    EDeviceType.WIFI_IR_REMOTE,
    (width?: number, height?: number) => (
      <FastImage
        source={require('@src/assets/home-iot/devices/wifi-ir-remote.jpeg')}
        style={{ width: width || 65, height: height || 65 }}
      />
    ),
  ],
  [
    EDeviceType.YOOTEK_AI_BOX,
    (width?: number, height?: number) => (
      <FastImage
        source={require('@src/assets/home-iot/devices/ai-box.png')}
        style={{ width: width || 65, height: height || 65 }}
      />
    ),
  ],
]);

export const DeviceSubIcon = {
  curtain_off: CloseCurtainIcon,
  curtain_on: OpenCurtainIcon,
  curtain_stop: StopCurtainIcon,
  temperature: TemperatureIcon,
  humidity: HumidityIcon,
  door_close: DoorCloseIcon,
  door_open: DoorOpenIcon,
  ac_cool: AcCoolIcon,
  ac_wind: AcWindIcon,
  ac_dry: AcDryIcon,
  fan: FanIcon,
};
