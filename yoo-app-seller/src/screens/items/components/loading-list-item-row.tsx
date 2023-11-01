import {Dimensions} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const {width, height} = Dimensions.get('screen');
const LoadingListItemRow = () => {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <SkeletonPlaceholder.Item padding={10}>
        <SkeletonPlaceholder.Item flexDirection="row">
          <SkeletonPlaceholder.Item width={width * 0.18} aspectRatio={1} />
          <SkeletonPlaceholder.Item padding={width * 0.02}>
            <SkeletonPlaceholder.Item
              width={width * 0.6}
              height={height * 0.02}
            />
            <SkeletonPlaceholder.Item
              width={width * 0.4}
              height={height * 0.02}
              marginTop={height * 0.01}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-around"
          borderBottomWidth={1}
          borderTopWidth={1}
          marginVertical={5}>
          <SkeletonPlaceholder.Item
            width={width * 0.3}
            height={height * 0.015}
            marginVertical={height * 0.01}
          />
          <SkeletonPlaceholder.Item
            width={width * 0.3}
            marginVertical={height * 0.01}
            height={height * 0.015}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default LoadingListItemRow;
