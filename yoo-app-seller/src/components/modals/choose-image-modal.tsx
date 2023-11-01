import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {Divider} from 'react-native-paper';
import ImageCropPicker, {Image} from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import {compressImageHandle} from '@/utils/compress-handle';
type Props = {
  visibleChooseImg: boolean;
  setVisibleChooseImg: Function;
  setImages: Function;
  multiple: boolean;
  compressImageMaxHeight?: number;
  compressImageMaxWidth?: number;
  width?: number;
  height?: number;
  cropping?: boolean;
  mediaType?: 'photo' | 'video' | 'any';
};

export type ImageProps = {
  uri: string;
  width: number;
  height: number;
  type: string;
  size: number;
  name: string;
};

const ChooseImageModal = ({
  visibleChooseImg = false,
  setVisibleChooseImg = () => {},
  setImages = () => {},
  multiple = true,
  compressImageMaxHeight = undefined,
  compressImageMaxWidth = undefined,
  width = undefined,
  height = undefined,
  cropping = false,
  mediaType = 'photo',
}: Props) => {
  const addImage = async (images: Image[]) => {
    let listImgs = [];
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      let imgPushed = null;
      if (!img.mime.includes('video') && img.size > 1048576) {
        imgPushed = await compressImageHandle({
          width: img.width,
          height: img.height,
          uri: img.path,
          source: img.sourceURL,
          size: img.size,
        });
        // console.log(imgPushed);
      }
      listImgs.push({
        // uri: imgPushed ? imgPushed.path : img.path,
        uri: imgPushed ? imgPushed.uri : img.path,
        width: imgPushed ? imgPushed.width : img.width,
        height: imgPushed ? imgPushed.height : img.height,
        type: img.mime,
        size: imgPushed ? imgPushed.size : img.size,
        name: imgPushed
          ? imgPushed.name
          : Platform.OS === 'ios'
          ? img.filename
              ?.replace(/HEIC/g, 'jpg')
              .replace(/heic/g, 'jpg')
              .replace(/heif/g, 'jpg')
              .replace(/HEIF/g, 'jpg') ?? img.path
          : img.path.substring(img.path.lastIndexOf('/') + 1),
      });
    }
    setImages(listImgs);
  };

  const {t} = useTranslation();

  return (
    <Modal
      isVisible={visibleChooseImg}
      backdropTransitionOutTiming={100}
      animationOutTiming={100}
      onBackdropPress={() => {
        setVisibleChooseImg(false);
      }}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 8,
          padding: '3%',
          width: '70%',
        }}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            ImageCropPicker.openCamera({
              width: width,
              height: height,
              mediaType: mediaType,
              cropping: cropping,
              // compressImageQuality: 0.1,
              // compressImageMaxHeight: compressImageMaxHeight,
              // compressImageMaxWidth: compressImageMaxWidth,
            })
              .then(image => {
                setVisibleChooseImg(false);
                addImage([image]);
              })
              .catch(err => {
                console.log(err);
                setVisibleChooseImg(false);
                Toast.show({
                  type: 'error',
                  position: 'top',
                  text1: t(i18nKeys.common.errOpenCamera) as string,
                  text2: t(i18nKeys.common.plsTryAgain) as string,
                  visibilityTime: 1000,
                });
              });
          }}>
          <Text style={[styles.textItem]}>
            {t(i18nKeys.common.takePhotoFromCamera)}
          </Text>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            ImageCropPicker.openPicker({
              width: width,
              height: height,
              mediaType: mediaType,
              multiple: multiple,
              // compressImageQuality: Platform.OS === 'ios' ? 0.2 : 0.1,
              // compressImageMaxHeight: compressImageMaxHeight,
              // compressImageMaxWidth: compressImageMaxWidth,
              // compressImageQuality: 0.1,
              cropping: cropping,
            })
              .then(image => {
                if (Array.isArray(image)) {
                  addImage(image);
                  setVisibleChooseImg(false);
                } else {
                  addImage([image]);
                  setVisibleChooseImg(false);
                }
              })
              .catch(err => {
                setVisibleChooseImg(false);
                const isCancel =
                  err.message === 'User cancelled image selection';
                Toast.show({
                  type: isCancel ? 'info' : 'error',
                  position: 'top',
                  text1: isCancel
                    ? (t(i18nKeys.common.cancelPickImage) as string)
                    : (t(i18nKeys.common.errPickImage) as string),
                  text2: t(i18nKeys.common.plsTryAgain) as string,
                  visibilityTime: 1000,
                });
              });
          }}>
          <Text style={[styles.textItem]}>
            {t(i18nKeys.common.choosePhotoFromLibrary)}
          </Text>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          style={styles.item}
          onPress={() => setVisibleChooseImg(false)}>
          <Text style={[styles.textItem, {color: '#d90429'}]}>
            {t(i18nKeys.common.cancel)}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ChooseImageModal;

const styles = StyleSheet.create({
  item: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  textItem: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
});
