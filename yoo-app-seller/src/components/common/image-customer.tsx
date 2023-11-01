import {Dimensions, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage, {FastImageProps, ImageStyle} from 'react-native-fast-image';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
type Props = {
  style: ImageStyle;
  widthImg?: number;
  heightImg?: number;
  borderRadius?: number;
  marginHorizontal?: number;
};
const {width, height} = Dimensions.get('screen');
const ImageCustomer = ({
  style,
  source,
  resizeMode,
  widthImg,
  heightImg,
  borderRadius,
  marginHorizontal,
}: Props & FastImageProps) => {
  const [loading, setLoading] = useState(true);
  const [Error, setError] = useState(false);
  useEffect(() => {
    setError(false);
  }, [source]);
  return (
    <View>
      {loading && (
        <View style={{}}>
          <SkeletonPlaceholder>
            <View
              style={{
                width: widthImg ? widthImg : width,
                height: heightImg ? heightImg : height / 3,
                borderRadius: borderRadius ? borderRadius : 0,
                marginHorizontal: marginHorizontal ? marginHorizontal : 0,
              }}
            />
          </SkeletonPlaceholder>
        </View>
      )}
      {Error ? (
        <View
        // style={{
        //   backgroundColor: 'gray',
        //   width: widthImg ? widthImg : width,
        //   height: heightImg ? heightImg : height / 3,
        // }}
        />
      ) : (
        <FastImage
          style={
            loading
              ? {height: 0, borderRadius: borderRadius ? borderRadius : 0}
              : style
          }
          resizeMode={resizeMode}
          source={source}
          onLoadStart={() => {
            setLoading(true);
          }}
          onLoadEnd={() => {
            setLoading(false);
          }}
          onError={() => {
            setError(true);
          }}
          //   onProgress={(event: OnProgressEvent) => {
          //     console.log(event);
          //   }}
        />
      )}
    </View>
  );
};

export default ImageCustomer;
