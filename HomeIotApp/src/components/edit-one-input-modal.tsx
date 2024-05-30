import { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { Button, Surface, Text } from 'react-native-paper';

type EditOneInputProps = {
  title: string;
  textInputLabel: string;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  onConfirm: (inputValue: string) => void;
  value: string;
  onClose?: () => void;
};

const EditOneInputModal = ({
  title,
  isVisible,
  setIsVisible,
  textInputLabel,
  onConfirm,
  value,
  onClose,
}: EditOneInputProps) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState(value);

  const handleCancel = useCallback(() => {
    setIsVisible(false);
    setInputValue(value);
    onClose && onClose();
  }, [onClose, setIsVisible, value]);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => handleCancel()}
      onBackButtonPress={() => handleCancel()}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
    >
      <Surface
        style={{ padding: 10, borderRadius: 10, backgroundColor: colors.white }}
      >
        <Text variant="titleMedium">{title}</Text>

        <TextInput
          style={{ marginVertical: 10, height: 50 }}
          value={inputValue}
          placeholder={textInputLabel}
          onChangeText={setInputValue}
          placeholderTextColor={colors.grey6}
        />

        <Surface
          style={{
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 20,
          }}
        >
          <Button
            style={{ marginHorizontal: 10 }}
            textColor={colors.red}
            onPress={() => {
              handleCancel();
            }}
          >
            {t(i18nKeys.common.cancel)}
          </Button>

          <Button
            mode="contained"
            style={{ backgroundColor: colors.primary }}
            onPress={() => {
              setIsVisible(false);
              onConfirm(inputValue);
            }}
          >
            {t(i18nKeys.common.confirm)}
          </Button>
        </Surface>
      </Surface>
    </Modal>
  );
};

export default EditOneInputModal;
