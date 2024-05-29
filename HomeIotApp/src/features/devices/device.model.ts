export interface IDeviceProfileInCateg {
  type: EDeviceType;
  icon?: string;
  description?: string;
  dataAttributes: any[];
  commandAttributes: any[];
}

export interface IDeviceCategory {
  name: string;
  deviceProfiles: IDeviceProfileInCateg[];
}

export enum EDeviceType {
  OTHER = 'OTHER',

  // Zigbee region
  DS_ZIGBEE_GATEWAY = 'DS_ZIGBEE_GATEWAY',

  ZIGBEE_SENSOR_TEMPERATURE_HUMIDITY = 'ZIGBEE_SENSOR_TEMPERATURE_HUMIDITY',
  // ZIGBEE_SENSOR_CO2
  // ZIGBEE_SENSOR_PM25
  // ZIGBEE_SENSOR_PM10
  // ZIGBEE_SENSOR_HCHO
  // ZIGBEE_SENSOR_TVOC
  // ZIGBEE_SENSOR_CO
  // ZIGBEE_SENSOR_VOICEALARM
  // ZIGBEE_SENSOR_VIBRATION
  ZIGBEE_SENSOR_DOOR = 'ZIGBEE_SENSOR_DOOR',
  // ZIGBEE_SENSOR_LEAK
  ZIGBEE_SENSOR_LIGHT = 'ZIGBEE_SENSOR_LIGHT',
  // ZIGBEE_SENSOR_SMOKEDETECTOR
  ZIGBEE_SENSOR_PIR = 'ZIGBEE_SENSOR_PIR',
  ZIGBEE_SENSOR_FIRE_ALARM = 'ZIGBEE_SENSOR_FIRE_ALARM',
  // ZIGBEE_KEYPAD
  ZIGBEE_SWITCH_1G = 'ZIGBEE_SWITCH_1G',
  ZIGBEE_SWITCH_2G = 'ZIGBEE_SWITCH_2G',
  ZIGBEE_SWITCH_3G = 'ZIGBEE_SWITCH_3G',
  ZIGBEE_DIMMERSWITCH_1G = 'ZIGBEE_DIMMERSWITCH_1G',
  ZIGBEE_DIMMERSWITCH_2G = 'ZIGBEE_DIMMERSWITCH_2G',
  ZIGBEE_CURTAIN_SWITCH = 'ZIGBEE_CURTAIN_SWITCH',
  ZIGBEE_FREELOCALTE_SWITCH_2G = 'ZIGBEE_FREELOCALTE_SWITCH_2G',
  ZIGBEE_FREELOCALTE_SWITCH_4G = 'ZIGBEE_FREELOCALTE_SWITCH_4G',
  ZIGBEE_CURTAIN_SWITCH_1G = 'ZIGBEE_CURTAIN_SWITCH_1G',
  ZIGBEE_CURTAIN_SWITCH_2G = 'ZIGBEE_CURTAIN_SWITCH_2G',
  ZIGBEE_SENSOR_WATER_LEAK = 'ZIGBEE_SENSOR_WATER_LEAK',
  ZIGBEE_SENSOR_SOS = 'ZIGBEE_SENSOR_SOS',
  // ZIGBEE_RGBBULB
  // ZIGBEE_SMARTSWITCH
  // ZIGBEE_THERMOSTAT
  // ZIGBEE_PLUG
  // ZIGBEE_RELAY
  // ZIGBEE_PANICBUTTON
  // ZIGBEE_YALELOCK
  // Zigbee region end
  WIFI_IR_REMOTE = 'WIFI_IR_REMOTE',
}

export const DeviceGatewayTypes = [EDeviceType.DS_ZIGBEE_GATEWAY];
export const DeviceSensorTypes = [
  EDeviceType.ZIGBEE_SENSOR_TEMPERATURE_HUMIDITY,
  EDeviceType.ZIGBEE_SENSOR_DOOR,
  EDeviceType.ZIGBEE_SENSOR_LIGHT,
  EDeviceType.ZIGBEE_SENSOR_PIR,
  EDeviceType.ZIGBEE_SENSOR_FIRE_ALARM,
  EDeviceType.ZIGBEE_SENSOR_WATER_LEAK,
  EDeviceType.ZIGBEE_SENSOR_SOS,
];

export const DeviceSwitchTypes = [
  EDeviceType.ZIGBEE_SWITCH_1G,
  EDeviceType.ZIGBEE_SWITCH_2G,
  EDeviceType.ZIGBEE_SWITCH_3G,
  EDeviceType.ZIGBEE_DIMMERSWITCH_1G,
  EDeviceType.ZIGBEE_DIMMERSWITCH_2G,
  EDeviceType.ZIGBEE_CURTAIN_SWITCH,
  EDeviceType.ZIGBEE_FREELOCALTE_SWITCH_2G,
  EDeviceType.ZIGBEE_FREELOCALTE_SWITCH_4G,
  EDeviceType.ZIGBEE_CURTAIN_SWITCH_1G,
  EDeviceType.ZIGBEE_CURTAIN_SWITCH_2G,
];

export interface IDevice {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  estateId: number;
  areaId?: number;
  userId: number;
  parentId: string;
  type: EDeviceType;
  modelName: string;
  manufacturerName?: string;
  serialNumber?: any;
  firmwareVersion?: string;
  hardwareVersion?: string;
  properties?: any;
  pairedAt: Date;
  macAddress: string;
  ipAddress: null;
  lastOnlineAt?: Date;
  isOnline: boolean;
  createdAt: Date;
  updatedAt: Date;
  metaData?: {
    eps: string[];
    epList: any[];
    lastData: any;
  };
}

export interface IDeviceDetail extends IDevice {
  parent?: IDevice;
}

export type TDeviceProfile = {
  [key in EDeviceType]: {
    type: EDeviceType;
    icon?: string;
    description?: string;
    dataAttributes: any[];
    commandAttributes: any[];
  };
};
