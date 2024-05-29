import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { HomeRouteStackParamList } from '@src/configs/routes/home.route';
import { isMacAddressValid } from '@src/utils/common.util';
import React from 'react';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

const ScanDeviceQrScreen = () => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const navigation =
    useNavigation<NavigationProp<HomeRouteStackParamList, 'DeviceQRScan'>>();
  const route = useRoute<RouteProp<HomeRouteStackParamList, 'DeviceQRScan'>>();
  const [isScanning, setIsScanning] = React.useState(false);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (data) => {
      setIsScanning(true);

      if (data?.[0]?.value && isMacAddressValid(data[0].value)) {
        navigation.navigate('PairingDevice', {
          device: {
            macAddress: data[0].value,
            name: route.params.deviceName,
            type: route.params.deviceType as string,
            areaId: route.params.areaId,
          },
        });
        setIsScanning(false);
      }
    },
  });

  React.useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  if (device === null) {
    return null;
  }

  return (
    hasPermission &&
    device && (
      <Camera
        style={{ flex: 1, height: '100%', width: '100%' }}
        device={device}
        isActive={true}
        codeScanner={isScanning ? undefined : codeScanner}
      />
    )
  );
};

export default ScanDeviceQrScreen;
