import IconGeneral from '@src/components/icon-general';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Modal from 'react-native-modal';

type TSelectDeviceModalProps = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  devices: any[];
  deviceName: string;
  selectedIndex: number;
  setSelectedDeviceIndex: React.Dispatch<React.SetStateAction<number>>;
};

const SelectDeviceModal = ({
  isVisible,
  setIsVisible,
  devices,
  deviceName,
  selectedIndex,
  setSelectedDeviceIndex,
}: TSelectDeviceModalProps) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)}
      onBackButtonPress={() => setIsVisible(false)}
    >
      <View className="mb-80 rounded-xl bg-white p-2">
        {devices?.map((_scene: any, index: number) => (
          <Pressable
            key={index}
            onPress={() => {
              setIsVisible(false);
              setSelectedDeviceIndex(index);
            }}
            className="mx-3 flex-row items-center justify-between border-b border-[#EEEEEE] bg-transparent py-2"
          >
            <Text className="text-base font-medium">
              {deviceName} {index + 1}
            </Text>

            <IconGeneral
              type="Octicons"
              name={selectedIndex === index ? 'check-circle-fill' : 'circle'}
              color={selectedIndex === index ? '#89B05F' : '#D1D1D1'}
              size={20}
            />
          </Pressable>
        ))}
      </View>
    </Modal>
  );
};

export default SelectDeviceModal;
