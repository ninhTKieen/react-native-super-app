import * as React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import FastImage, {FastImageProps} from 'react-native-fast-image';

// import {useInternalTheme} from '../../core/theming';
// import type {ThemeProp} from '../../types';

const defaultSize = 64;

export type AvatarImageSource =
  | FastImageProps['source']
  | ((props: {size: number}) => React.ReactNode);

export type Props = React.ComponentPropsWithRef<typeof View> & {
  /**
   * Image to display for the `Avatar`.
   * It accepts a standard React Native Image `source` prop
   * Or a function that returns an `Image`.
   */
  source: AvatarImageSource;
  /**
   * Size of the avatar.
   */
  size?: number;
  style?: StyleProp<ViewStyle>;
  /**
   * Invoked on load error.
   */
  onError?: FastImageProps['onError'];
  /**
   * Invoked on mount and on layout changes.
   */
  onLayout?: FastImageProps['onLayout'];
  /**
   * Invoked when load completes successfully.
   */
  onLoad?: FastImageProps['onLoad'];
  /**
   * Invoked when load either succeeds or fails.
   */
  onLoadEnd?: FastImageProps['onLoadEnd'];
  /**
   * Invoked on load start.
   */
  onLoadStart?: FastImageProps['onLoadStart'];
  /**
   * Invoked on download progress.
   */
  onProgress?: FastImageProps['onProgress'];
  /**
   * @optional
   */
  // theme?: ThemeProp;
};

/**
 * Avatars can be used to represent people in a graphical way.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="medium" src="screenshots/avatar-image.png" />
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Avatar } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Avatar.Image size={24} source={require('../assets/avatar.png')} />
 * );
 * export default MyComponent
 * ```
 */
const AvatarImage = ({
  size = defaultSize,
  source,
  style,
  onError,
  onLayout,
  onLoad,
  onLoadEnd,
  onLoadStart,
  onProgress,
  // theme: themeOverrides,
  testID,
  ...rest
}: Props) => {
  // const {colors} = useInternalTheme(themeOverrides);
  const {backgroundColor = 'black'} = StyleSheet.flatten(style) || {};

  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
        style,
      ]}
      {...rest}>
      {typeof source === 'function' && source({size})}
      {typeof source !== 'function' && (
        <FastImage
          testID={testID}
          source={source}
          style={{width: size, height: size, borderRadius: size / 2}}
          onError={onError}
          onLayout={onLayout}
          onLoad={onLoad}
          onLoadEnd={onLoadEnd}
          onLoadStart={onLoadStart}
          onProgress={onProgress}
          accessibilityIgnoresInvertColors
        />
      )}
    </View>
  );
};

// AvatarImage.displayName = 'Avatar.Image';

export default AvatarImage;
