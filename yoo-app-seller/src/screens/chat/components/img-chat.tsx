import React, {useState, useEffect} from 'react';
import {Image, Dimensions, StyleSheet, View} from 'react-native';
const {width, height} = Dimensions.get('window');
import FastImage from 'react-native-fast-image';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ImgChat = ({
  mess,
  overlayReview,
}: {
  mess: string;
  overlayReview: boolean;
}) => {
  const [sizeImg, setSizeImg] = useState({
    width: width,
    height: width,
    ratio: 0,
  });
  useEffect(() => {
    Image.getSize(mess, (w, h) => {
      setSizeImg({
        width: w,
        height: h,
        ratio: w / h,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const setWidthImg = () => {
    if (sizeImg.ratio && sizeImg.ratio < 2 / 3) {
      if (sizeImg.height > height / 2) {
        return (height / 2) * sizeImg.ratio;
      } else {
        return sizeImg.width;
      }
    } else {
      if (sizeImg.width > width * 0.8) {
        return width * 0.75;
      } else {
        return width * 0.5;
      }
    }
  };
  const setHeightImg = () => {
    if (sizeImg.ratio && sizeImg.ratio < 2 / 3) {
      if (sizeImg.height > height / 2) {
        return height / 2;
      } else {
        return sizeImg.height;
      }
    } else {
      if (sizeImg.width > width * 0.8) {
        return sizeImg.ratio ? (width * 0.75) / sizeImg.ratio : width * 0.75;
      } else {
        return sizeImg.ratio ? (width * 0.5) / sizeImg.ratio : width * 0.5;
      }
    }
  };
  return overlayReview ? (
    <FastImage
      source={{uri: mess}}
      style={{
        width:
          sizeImg.ratio && width / sizeImg.ratio >= height
            ? height * sizeImg.ratio
            : width,
        height:
          sizeImg.ratio && width / sizeImg.ratio >= height
            ? height
            : sizeImg.ratio
            ? width / sizeImg.ratio
            : width,
      }}
    />
  ) : sizeImg.ratio ? (
    <FastImage
      style={{
        ...styles.image,
        width: setWidthImg(),
        height: setHeightImg(),
      }}
      source={{uri: mess}}
    />
  ) : (
    <SkeletonPlaceholder>
      <View
        style={{
          ...styles.image,
          width: setWidthImg(),
          height: setHeightImg(),
        }}
      />
    </SkeletonPlaceholder>
  );
};
export default ImgChat;
const styles = StyleSheet.create({
  image: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
});
