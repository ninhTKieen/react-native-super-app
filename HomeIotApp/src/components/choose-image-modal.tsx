import { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import ImageCropPicker, { Image } from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import { Surface, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';

type TChooseImageModalProps = {
  isVisible: boolean;
  setVisible: (isVisible: boolean) => void;
  setImages: (images: any[]) => void;
  multiple?: boolean;
  compressImageMaxHeight?: number;
  compressImageMaxWidth?: number;
  width?: number;
  height?: number;
  cropping?: boolean;
};

const ChooseImageModal = (props: TChooseImageModalProps) => {
  const { t } = useTranslation();

  const { setImages } = props;

  const addImage = (images: Image[]) => {
    const listImages: any[] = [];
    images.forEach((image) => {
      listImages.push({
        uri: image.path,
        type: image.mime,
        height: image.height,
        width: image.width,
        size: image.size,
        name:
          Platform.OS === 'ios'
            ? image.filename
                ?.replace(/HEIC/g, 'jpg')
                .replace(/heic/g, 'jpg')
                .replace(/heif/g, 'jpg')
                .replace(/HEIF/g, 'jpg') ?? image.path
            : image.path.substring(image.path.lastIndexOf('/') + 1),
      });
    });
    setImages(listImages);
  };

  return (
    <Modal
      isVisible={props.isVisible}
      backdropTransitionOutTiming={100}
      animationOutTiming={100}
      onBackdropPress={() => {
        props.setVisible(false);
      }}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Surface
        style={{
          width: '80%',
          padding: 10,
          backgroundColor: 'white',
          borderRadius: 10,
        }}
      >
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            ImageCropPicker.openPicker({
              width: props.width,
              height: props.height,
              mediaType: 'photo',
              // cropping: props.cropping,
              multiple: props.multiple,
            })
              .then((image) => {
                if (Array.isArray(image)) {
                  addImage(image);
                  props.setVisible(false);
                } else {
                  addImage([image]);
                  props.setVisible(false);
                }
              })
              .catch((_e) => {
                props.setVisible(false);
                Toast.show({
                  type: 'error',
                  position: 'top',
                  text1: t(i18nKeys.errors.common.errorOccurred),
                  text2: t(i18nKeys.errors.common.tryAgain),
                  visibilityTime: 1000,
                });
              });
          }}
        >
          <Text style={[styles.text]}>
            {t(i18nKeys.common.chooseFromLibrary)}
          </Text>
        </TouchableOpacity>
      </Surface>
    </Modal>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 10,
    alignItems: 'center',
  },

  text: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.primary,
  },
});

export default ChooseImageModal;
