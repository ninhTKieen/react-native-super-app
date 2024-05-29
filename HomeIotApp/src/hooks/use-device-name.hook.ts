import i18n, { i18nKeys } from '@src/configs/i18n';
import { EDeviceType } from '@src/features/devices/device.model';

export const useDeviceName = () => {
  const DeviceNames = {
    [EDeviceType.DS_ZIGBEE_GATEWAY]: i18n.t(
      i18nKeys.device.type.DS_ZIGBEE_GATEWAY,
    ),
    [EDeviceType.ZIGBEE_SENSOR_TEMPERATURE_HUMIDITY]: i18n.t(
      i18nKeys.device.type.ZIGBEE_SENSOR_TEMPERATURE_HUMIDITY,
    ),
    [EDeviceType.ZIGBEE_SENSOR_DOOR]: i18n.t(
      i18nKeys.device.type.ZIGBEE_SENSOR_DOOR,
    ),
    [EDeviceType.ZIGBEE_SENSOR_LIGHT]: i18n.t(
      i18nKeys.device.type.ZIGBEE_SENSOR_LIGHT,
    ),
    [EDeviceType.ZIGBEE_SENSOR_PIR]: i18n.t(
      i18nKeys.device.type.ZIGBEE_SENSOR_PIR,
    ),
    [EDeviceType.ZIGBEE_SENSOR_FIRE_ALARM]: i18n.t(
      i18nKeys.device.type.ZIGBEE_SENSOR_FIRE_ALARM,
    ),
    [EDeviceType.ZIGBEE_SENSOR_WATER_LEAK]: i18n.t(
      i18nKeys.device.type.ZIGBEE_SENSOR_WATER_LEAK,
    ),
    [EDeviceType.ZIGBEE_SENSOR_SOS]: i18n.t(
      i18nKeys.device.type.ZIGBEE_SENSOR_SOS,
    ),
    [EDeviceType.ZIGBEE_SWITCH_1G]: i18n.t(
      i18nKeys.device.type.ZIGBEE_SWITCH_1G,
    ),
    [EDeviceType.ZIGBEE_SWITCH_2G]: i18n.t(
      i18nKeys.device.type.ZIGBEE_SWITCH_2G,
    ),
    [EDeviceType.ZIGBEE_SWITCH_3G]: i18n.t(
      i18nKeys.device.type.ZIGBEE_SWITCH_3G,
    ),
    [EDeviceType.ZIGBEE_DIMMERSWITCH_1G]: i18n.t(
      i18nKeys.device.type.ZIGBEE_DIMMERSWITCH_1G,
    ),
    [EDeviceType.ZIGBEE_DIMMERSWITCH_2G]: i18n.t(
      i18nKeys.device.type.ZIGBEE_DIMMERSWITCH_2G,
    ),
    [EDeviceType.ZIGBEE_CURTAIN_SWITCH]: i18n.t(
      i18nKeys.device.type.ZIGBEE_CURTAIN_SWITCH,
    ),
    [EDeviceType.ZIGBEE_FREELOCALTE_SWITCH_2G]: i18n.t(
      i18nKeys.device.type.ZIGBEE_FREELOCALTE_SWITCH_2G,
    ),
    [EDeviceType.ZIGBEE_FREELOCALTE_SWITCH_4G]: i18n.t(
      i18nKeys.device.type.ZIGBEE_FREELOCALTE_SWITCH_4G,
    ),
    [EDeviceType.ZIGBEE_CURTAIN_SWITCH_1G]: i18n.t(
      i18nKeys.device.type.ZIGBEE_CURTAIN_SWITCH_1G,
    ),
    [EDeviceType.ZIGBEE_CURTAIN_SWITCH_2G]: i18n.t(
      i18nKeys.device.type.ZIGBEE_CURTAIN_SWITCH_2G,
    ),
    [EDeviceType.WIFI_IR_REMOTE]: i18n.t(i18nKeys.device.type.WIFI_IR_REMOTE),
  };

  return { DeviceNames };
};
