import React, { useState } from 'react';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

type AdditionalProps = {
  imgWidth: number;
  imgHeight: number;
  isLoading?: boolean;
  isError?: boolean;
  imgStyle?: any;
};

const CustomFastImage = (
  props: AdditionalProps & FastImageProps,
): JSX.Element => {
  const [isLoadingImg, setIsLoadingImg] = useState<boolean>(false);

  return (
    <>
      {(props.isLoading || isLoadingImg) && (
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item
            width={props.imgWidth}
            height={props.imgHeight}
          />
        </SkeletonPlaceholder>
      )}
      <FastImage
        {...props}
        style={[
          isLoadingImg
            ? { opacity: 0, borderRadius: 0, height: 0, width: 0 }
            : {
                ...props.imgStyle,
                width: props.imgWidth,
                height: props.imgHeight,
              },
          props.style,
        ]}
        resizeMode={FastImage.resizeMode.cover}
        onLoadStart={() => {
          setIsLoadingImg(true);
          props?.onLoadStart && props.onLoadStart();
        }}
        onLoadEnd={() => {
          setIsLoadingImg(false);
          props?.onLoadEnd && props.onLoadEnd();
        }}
      />
    </>
  );
};

export default CustomFastImage;
