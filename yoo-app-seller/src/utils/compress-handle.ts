import ImageResizer from '@bam.tech/react-native-image-resizer';
import {Platform} from 'react-native';
export type TImageCompressInput = {
  width: number;
  height: number;
  uri: string;
  source?: string;
  size: number;
};
export const compressImageHandle = async (image: TImageCompressInput) => {
  const imageRatio = image.width / image.height;
  let width;
  let height;
  if (image.width > 3000 || image.height > 3000) {
    if (image.width > image.height) {
      width = 3000;
      height = 3000 / imageRatio;
    } else {
      height = 3000;
      width = 3000 * imageRatio;
    }
  } else {
    height = image.height;
    width = image.width;
  }
  let url =
    Platform.OS === 'android' || !image.source ? image.uri : image.source;
  return await ImageResizer.createResizedImage(
    url,
    width,
    height,
    'JPEG',
    Math.floor((1048576 * 100) / image.size)
      ? Math.floor((1048576 * 100) / image.size) / 2
      : 1,
  );
};
