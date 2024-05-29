import { IDevice } from '@src/features/devices/device.model';

export type HomeRouteStackParamList = {
  MainHome: undefined;
  DeviceQRScan: {
    deviceName?: string;
    deviceType?: string;
    areaId?: number;
  };
  DeviceAddManually: {
    deviceName?: string;
    deviceType?: string;
  };
  PairingDevice: {
    device: {
      areaId?: number;
      parentId?: string;
      macAddress?: string;
      type: string;
      name?: string;
    };
  };
  AddSubDevice: {
    isGateway?: boolean;
    parentId?: string;
    deviceName?: string;
    deviceType?: string;
    areaId?: number;
  };
  DeviceDetail: {
    deviceName: string;
    device: IDevice;
  };
  DeviceCategories: {
    areaId?: number;
  };
};
