import {color} from '@/configs/globalStyles';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageViewer from 'react-native-image-zoom-viewer';
import Modal from 'react-native-modal';
import IconGeneral from '../common/icon-general';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('screen');

type Params = {
  images: string[];
  setVisible: (isVisible: boolean) => void;
  isVisible: boolean;
};

const ImageViewModal = (props: Params) => {
  const insets = useSafeAreaInsets();
  return (
    <Modal
      style={styles.modal}
      isVisible={props.isVisible}
      onBackdropPress={() => props.setVisible(false)}
      onBackButtonPress={() => props.setVisible(false)}>
      <SafeAreaView
        style={{
          height: height,
          paddingTop: Math.max(insets.top, 0),
        }}
        edges={['top']}>
        <ImageViewer
          index={0}
          imageUrls={props.images.map(item => ({url: item}))}
          enableSwipeDown={true}
          onSwipeDown={() => props.setVisible(false)}
          renderHeader={() => (
            <TouchableOpacity
              onPress={() => props.setVisible(false)}
              style={{
                position: 'absolute',
                top: 16,
                right: 0,
                zIndex: 999,
                padding: 20,
              }}>
              <IconGeneral
                type="MaterialCommunityIcons"
                name={'close'}
                size={24}
                color={color.white}
              />
            </TouchableOpacity>
          )}
          renderImage={p => {
            return (
              <View>
                <FastImage
                  source={{
                    uri: p.source.uri,
                  }}
                  style={{
                    width: p.style.width ?? width,
                    height: p.style.height ?? height,
                  }}
                />
              </View>
            );
          }}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default ImageViewModal;

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
});
