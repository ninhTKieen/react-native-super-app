import ImagesIcon from '@src/assets/images.svg';
import { TLocalImgProps } from '@src/common/common.model';
import globalStyles from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, FlatList, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Badge, Text } from 'react-native-paper';

import ChooseImageModal from './choose-image-modal';
import CustomFastImage from './custom-fast-image';

const { width, height } = Dimensions.get('window');

type TImagesPickerProps = {
  imageUrls: string[] | TLocalImgProps[];
  setImageUrls: (imageUrls: string[] | TLocalImgProps[]) => void;
};

const ImagesPicker = (props: TImagesPickerProps) => {
  const { t } = useTranslation();
  const [isChooseImgModalVisible, setIsChooseImgModalVisible] = useState(false);
  const { imageUrls, setImageUrls } = props;

  return (
    <View className="">
      <View
        className="mb-4 items-center justify-center rounded-xl border-2 border-white bg-[#f7f7f7] p-4"
        style={[globalStyles.commonShadowContainer]}
      >
        <TouchableOpacity
          onPress={() => setIsChooseImgModalVisible(true)}
          className="w-full items-center rounded-xl border-2 border-dashed border-[#D9D9D9] p-4"
        >
          <ImagesIcon width={120} height={90} />

          <LinearGradient
            colors={['#9CC76F', '#c5da8b']}
            className=" items-center rounded-md p-2 px-4"
          >
            <Text className="mx-2 text-[16px] text-white">
              {t(i18nKeys.common.addImage)}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <FlatList
        data={(imageUrls as any[]) || []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View>
            <Badge
              style={{
                position: 'absolute',
                elevation: 4,
                zIndex: 4,
                top: 0,
                right: 5,
                backgroundColor: 'red',
              }}
              size={18}
              onPress={() => {
                const newImageUrls = [...imageUrls];
                newImageUrls.splice(index, 1);
                setImageUrls(newImageUrls as any[]);
              }}
            >
              X
            </Badge>
            <CustomFastImage
              imgWidth={200}
              imgHeight={100}
              source={{
                uri: !(item as unknown as TLocalImgProps).uri
                  ? (item as string)
                  : (item as unknown as TLocalImgProps).uri,
              }}
              className="my-[10px] mr-[10px] h-[100px] w-[200px] rounded-xl"
            />
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <ChooseImageModal
        isVisible={isChooseImgModalVisible}
        setVisible={setIsChooseImgModalVisible}
        multiple
        height={height}
        width={width}
        setImages={(images) => {
          console.log('images', images);
          setImageUrls([...(imageUrls || []), ...images]);
        }}
      />
    </View>
  );
};

export default ImagesPicker;
