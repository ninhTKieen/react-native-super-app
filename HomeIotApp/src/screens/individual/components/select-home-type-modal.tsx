import IconGeneral from '@src/components/icon-general';
import { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import { HOME_TYPES } from '@src/features/home/home.model';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

const SelectHomeTypeModal = ({
  isVisible,
  onClose,
  onChooseType,
  selectedType,
}: {
  isVisible: boolean;
  onClose: () => void;
  onChooseType: (homeType: any) => void;
  selectedType?: any;
}): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Modal
      style={{
        margin: 0,
        bottom: 0,
        justifyContent: 'flex-end',
      }}
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
    >
      <View
        style={{ height: '50%', padding: 10, backgroundColor: colors.white }}
      >
        <Text className="text-2xl font-medium text-[#89B05F]">
          {t(i18nKeys.home.typePlaceholder)}
        </Text>
        {HOME_TYPES.map((homeType, index) => (
          <TouchableOpacity
            className="mt-3 flex-row items-center justify-between"
            key={index}
            onPress={() => {
              onChooseType(homeType);
              onClose();
            }}
          >
            <Text className="text-base font-medium text-[#515151]">
              {t(`${homeType.label}`)}
            </Text>

            <IconGeneral
              type="Octicons"
              name={
                selectedType === homeType.value ? 'check-circle-fill' : 'circle'
              }
              color={selectedType === homeType.value ? '#89B05F' : '#D1D1D1'}
              size={20}
            />
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
};

export default SelectHomeTypeModal;
