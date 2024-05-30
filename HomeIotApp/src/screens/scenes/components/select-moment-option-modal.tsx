import IconGeneral from '@src/components/icon-general';
import { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import { DeviceValueState } from '@src/utils/device.util';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { Surface, Text } from 'react-native-paper';

type TSelectMomentActionModalProps = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  options: {
    label: string;
    value: string;
  }[];
  onOptionPress: (option: string) => void;
  deviceType?: string;
};

const SelectMomentOptionModal = (props: TSelectMomentActionModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      isVisible={props.isVisible}
      onBackdropPress={() => props.setIsVisible(false)}
      onBackButtonPress={() => props.setIsVisible(false)}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
      style={styles.modal}
    >
      <Surface
        style={{ padding: 10, borderRadius: 10, backgroundColor: colors.white }}
      >
        <Text variant="headlineSmall" style={{ textAlign: 'center' }}>
          {t(i18nKeys.scene.addAction)}
        </Text>

        <View style={{ marginBottom: 20 }} />

        {props.options?.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.itemRow}
            onPress={() => {
              props.onOptionPress(option.value);
            }}
          >
            <Text variant="titleMedium" style={{ marginLeft: 10, flex: 1 }}>
              {props.deviceType
                ? DeviceValueState(
                    String(option.value),
                    props.deviceType as any,
                  )
                : t(
                    i18nKeys.device.state[
                      option.label as keyof typeof i18nKeys.device.state
                    ],
                  )}
            </Text>

            <IconGeneral
              type="MaterialIcons"
              name="keyboard-arrow-right"
              size={30}
            />
          </TouchableOpacity>
        ))}

        <View style={{ marginBottom: 50 }} />
      </Surface>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 20,
    marginBottom: 50,
    justifyContent: 'flex-end',
  },

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    justifyContent: 'space-between',
  },
});

export default SelectMomentOptionModal;
