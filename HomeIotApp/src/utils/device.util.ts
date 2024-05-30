import i18n, { i18nKeys } from '@src/configs/i18n';
import { EDeviceType, IDeviceDetail } from '@src/features/devices/device.model';
import { useDeviceStore } from '@src/features/devices/device.store';
import { ESceneConditionCompare } from '@src/features/scenes/scene.model';

import { getObjectKeyName } from './common.util';

export const DeviceValueState = (
  value: any,
  type: EDeviceType,
  key?: string,
  compare?: ESceneConditionCompare,
) => {
  switch (type) {
    case EDeviceType.ZIGBEE_SWITCH_1G:
    case EDeviceType.ZIGBEE_SWITCH_2G:
    case EDeviceType.ZIGBEE_SWITCH_3G: {
      if (value === '1') {
        return i18n.t(i18nKeys.device.on);
      } else if (value === '2') {
        return i18n.t(i18nKeys.device.toggle);
      } else if (value === '0') {
        return i18n.t(i18nKeys.device.off);
      } else {
        return i18n.t(i18nKeys.common.notYet);
      }
    }
    case EDeviceType.ZIGBEE_DIMMERSWITCH_1G:
    case EDeviceType.ZIGBEE_DIMMERSWITCH_2G: {
      if (key === 'onoff') {
        if (value === '1') {
          return i18n.t(i18nKeys.device.on);
        } else if (value === '2') {
          return i18n.t(i18nKeys.device.toggle);
        } else if (value === '0') {
          return i18n.t(i18nKeys.device.off);
        } else {
          return i18n.t(i18nKeys.common.notYet);
        }
      } else if (key === 'dimmer') {
        return `${i18n.t(i18nKeys.device.brightness)}: ${(
          (value / 255) *
          100
        ).toFixed(0)} %`;
      } else {
        return '';
      }
    }
    case EDeviceType.ZIGBEE_CURTAIN_SWITCH_1G:
    case EDeviceType.ZIGBEE_CURTAIN_SWITCH_2G: {
      if (key === 'curtain') {
        if (value === '0') {
          return i18n.t(i18nKeys.device.stop);
        } else if (value === '1') {
          return i18n.t(i18nKeys.device.open);
        } else if (value === '2') {
          return i18n.t(i18nKeys.device.close);
        } else if (value === '3') {
          return i18n.t(i18nKeys.device.toggle);
        } else {
          return i18n.t(i18nKeys.common.notYet);
        }
      } else {
        return '';
      }
    }
    case EDeviceType.ZIGBEE_SENSOR_DOOR: {
      if (value === '1') {
        return i18n.t(i18nKeys.device.open);
      } else if (value === '0') {
        return i18n.t(i18nKeys.device.close);
      } else {
        return i18n.t(i18nKeys.common.notYet);
      }
    }
    case EDeviceType.ZIGBEE_SENSOR_TEMPERATURE_HUMIDITY: {
      const unit = key === 'temperature' ? '°C' : '%';

      if (compare === ESceneConditionCompare.GREATER_THAN) {
        return `${i18n.t(i18nKeys.device.compare.greater)} ${value}${unit}`;
      } else if (compare === ESceneConditionCompare.LESS_THAN) {
        return `${i18n.t(i18nKeys.device.compare.less)} ${value}${unit}`;
      } else if (compare === ESceneConditionCompare.LESS_THAN_OR_EQUAL) {
        return `${i18n.t(i18nKeys.device.compare.lessEqual)} ${value}${unit}`;
      } else if (compare === ESceneConditionCompare.NOT_EQUAL) {
        return `${i18n.t(i18nKeys.device.compare.notEqual)} ${value}${unit}`;
      } else if (compare === ESceneConditionCompare.GREATER_THAN_OR_EQUAL) {
        return `${i18n.t(
          i18nKeys.device.compare.greaterEqual,
        )} ${value}${unit}`;
      } else {
        return `${value}${unit}`;
      }
    }
    default:
      return '';
  }
};

export const getDeviceKeys = (dataAttributes: any[]) => {
  const attributeKeys = new Set<string>();

  dataAttributes?.forEach((dataAttribute) => {
    attributeKeys.add(dataAttribute.key);
  });

  return Array.from(attributeKeys);
};

export const transformCommandAttributes = (
  commandAttributes: any[],
  stepIndex: number,
) => {
  const transformedCommandAttributes: any[] = [];
  for (let i = 0; i < commandAttributes?.length; i += stepIndex) {
    const tmp: any[] = [];
    commandAttributes.slice(i, i + stepIndex).forEach((commandAttribute) => {
      tmp.push({
        ...commandAttribute,
      });
    });
    transformedCommandAttributes.push(tmp);
  }

  return transformedCommandAttributes;
};

export const getDeviceScenes = (device: {
  profile: {
    type: EDeviceType;
    icon?: string;
    description?: string;
    commandAttributes: any[];
    dataAttributes: any[];
  };
}) => {
  const { type, commandAttributes } = device.profile;

  switch (type) {
    case EDeviceType.ZIGBEE_SWITCH_1G:
    case EDeviceType.ZIGBEE_SWITCH_2G:
    case EDeviceType.ZIGBEE_SWITCH_3G:
      return {
        switches: commandAttributes?.map((commandAttribute) => {
          return {
            ...commandAttribute,
          };
        }),
      };

    case EDeviceType.ZIGBEE_DIMMERSWITCH_1G:
    case EDeviceType.ZIGBEE_DIMMERSWITCH_2G: {
      return {
        dimmers: transformCommandAttributes(commandAttributes, 2),
      };
    }

    case EDeviceType.ZIGBEE_CURTAIN_SWITCH_1G:
    case EDeviceType.ZIGBEE_CURTAIN_SWITCH_2G: {
      return {
        curtains: transformCommandAttributes(commandAttributes, 2),
      };
    }
  }
};

export const getDeviceResponse = (device: {
  type: EDeviceType;
  metaData: any;
  profile?: {
    type: EDeviceType;
    icon?: string;
    description?: string;
    dataAttributes: any[];
  };
}) => {
  const { metaData, profile } = device;
  const attributeKeys = getDeviceKeys(profile?.dataAttributes as any[]);

  switch (device.type) {
    case EDeviceType.ZIGBEE_SENSOR_DOOR:
      return {
        door: metaData?.lastData?.door?.[
          getObjectKeyName(metaData.lastData.door)
        ],
      };

    case EDeviceType.ZIGBEE_SENSOR_TEMPERATURE_HUMIDITY:
      return {
        temperature:
          metaData?.lastData?.temperature?.[
            getObjectKeyName(metaData?.lastData?.temperature)
          ],
        humidity:
          metaData?.lastData?.humidity?.[
            getObjectKeyName(metaData?.lastData?.humidity)
          ],
      };

    case EDeviceType.ZIGBEE_SENSOR_PIR:
      return {
        pir: metaData?.lastData?.pir?.[getObjectKeyName(metaData.lastData.pir)],
        lux: metaData?.lastData?.lux?.[getObjectKeyName(metaData.lastData.lux)],
      };

    case EDeviceType.ZIGBEE_SENSOR_WATER_LEAK:
      return {
        leak: metaData?.lastData?.leak?.[
          getObjectKeyName(metaData.lastData.leak)
        ],
      };

    case EDeviceType.ZIGBEE_SWITCH_1G:
    case EDeviceType.ZIGBEE_SWITCH_2G:
    case EDeviceType.ZIGBEE_SWITCH_3G: {
      const currentValues = attributeKeys.map((key) => ({
        name: key,
        value: metaData?.lastData?.[key],
      }));

      return {
        switches: metaData?.eps?.map((ep: any, index: number) => {
          return {
            channel: ep,
            ...profile?.dataAttributes?.[index],
            currentValue: currentValues?.find(
              (curr) => curr.name === profile?.dataAttributes?.[index]?.key,
            )?.value?.[Number(ep)],
          };
        }),
      };
    }

    case EDeviceType.ZIGBEE_DIMMERSWITCH_1G:
    case EDeviceType.ZIGBEE_DIMMERSWITCH_2G: {
      return {
        dimmers: metaData?.eps?.map((ep: any, index: number) => {
          const currentValues = attributeKeys.map((key) => ({
            name: key,
            value: metaData?.lastData?.[key]?.[Number(ep)],
          }));

          return {
            channel: ep,
            onOff: {
              ...profile?.dataAttributes?.[index * 2],
              currentValue: currentValues?.find(
                (curr) =>
                  curr.name === profile?.dataAttributes?.[index * 2]?.key,
              )?.value,
            },
            dim: {
              ...profile?.dataAttributes?.[index * 2 + 1],
              currentValue: currentValues?.find(
                (curr) =>
                  curr.name === profile?.dataAttributes?.[index * 2 + 1]?.key,
              )?.value,
            },
          };
        }),
      }; // TODO
    }

    case EDeviceType.ZIGBEE_CURTAIN_SWITCH_1G:
    case EDeviceType.ZIGBEE_CURTAIN_SWITCH_2G: {
      return {
        curtains: metaData?.eps?.map((ep: any, index: number) => {
          const currentValues = attributeKeys.map((key) => ({
            name: key,
            value: metaData?.lastData?.[key]?.[Number(ep)],
          }));

          return {
            channel: ep,
            curtain: {
              ...profile?.dataAttributes?.[index * 2],
              currentValue: currentValues?.find(
                (curr) =>
                  curr.name === profile?.dataAttributes?.[index * 2]?.key,
              )?.value,
            },
            dimmer: {
              ...profile?.dataAttributes?.[index * 2 + 1],
              currentValue: currentValues?.find(
                (curr) =>
                  curr.name === profile?.dataAttributes?.[index * 2 + 1]?.key,
              )?.value,
            },
          };
        }),
      };
    }

    default:
      return null;
  }
};

export const getDeviceConditions = (device: IDeviceDetail) => {
  const profiles = useDeviceStore.getState().profile;

  const deviceProfile = profiles?.[device.type];

  const commandAttributes = deviceProfile?.commandAttributes;
  const dataAttributes = deviceProfile?.dataAttributes;

  switch (device.type) {
    case EDeviceType.ZIGBEE_SWITCH_1G:
    case EDeviceType.ZIGBEE_SWITCH_2G:
    case EDeviceType.ZIGBEE_SWITCH_3G: {
      return {
        switches: commandAttributes?.map((commandAttribute) => {
          return {
            ...commandAttribute,
          };
        }),
      };
    }
    case EDeviceType.ZIGBEE_DIMMERSWITCH_1G:
    case EDeviceType.ZIGBEE_DIMMERSWITCH_2G: {
      return {
        dimmers: transformCommandAttributes(commandAttributes as any, 2),
      };
    }
    case EDeviceType.ZIGBEE_CURTAIN_SWITCH_1G:
    case EDeviceType.ZIGBEE_CURTAIN_SWITCH_2G: {
      return {
        curtains: transformCommandAttributes(commandAttributes as any, 2),
      };
    }
    case EDeviceType.ZIGBEE_SENSOR_DOOR:
      return {
        doors: dataAttributes?.map((dataAttribute) => {
          return {
            ...dataAttribute,
          };
        }),
      };
    case EDeviceType.ZIGBEE_SENSOR_TEMPERATURE_HUMIDITY:
      return {
        temp: dataAttributes?.find(
          (dataAttribute) => dataAttribute.key === 'temperature',
        ),
        humidity: dataAttributes?.find(
          (dataAttribute) => dataAttribute.key === 'humidity',
        ),
      };
    default:
      return null;
  }
};
