import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Badge} from 'react-native-paper';
import {useController, useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {color} from '@/configs/globalStyles';
import ChooseImageModal, {
  ImageProps,
} from '@/components/modals/choose-image-modal';
import {ItemIcon} from '@/screens/items/icon';
import FastImage from 'react-native-fast-image';

const {width, height} = Dimensions.get('window');

const ImageList = (): JSX.Element => {
  const {t} = useTranslation();
  const [visible, setVisible] = useState(false);
  const [multiple, setMultiple] = useState(false);
  const [curEditIndex, setCurEditIndex] = useState(-1);
  const {control} = useFormContext();
  const {field} = useController({
    name: 'imageUrlList',
    control,
    defaultValue: [],
  });

  const handleChoosePhoto = () => {
    setVisible(true);
    setMultiple(true);
  };

  const handleChangeImage = (index: number) => {
    setVisible(true);
    setMultiple(false);
    setCurEditIndex(index);
  };

  return (
    <ScrollView
      horizontal={true}
      style={styles.container}
      showsHorizontalScrollIndicator={false}>
      <TouchableWithoutFeedback onPress={handleChoosePhoto}>
        <View style={styles.addImage}>
          <View style={{alignItems: 'center', marginVertical: 10}}>
            <ItemIcon.Picture />
          </View>
          <Text style={{textAlign: 'center', color: color.primary}}>
            {t(i18nKeys.common.addImage)}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      {field.value.map((item: string | ImageProps, index: number) => {
        return (
          <TouchableWithoutFeedback
            onPress={() => handleChangeImage(index)}
            key={index}>
            <View>
              <Badge
                style={{
                  position: 'absolute',
                  elevation: 4,
                  zIndex: 4,
                  top: -5,
                  right: 5,
                  backgroundColor: color.red1,
                }}
                size={18}
                onPress={() => {
                  const imageUrl = field.value;
                  imageUrl.splice(index, 1);
                  field.onChange([...imageUrl]);
                }}>
                X
              </Badge>
              <FastImage
                source={{
                  uri: !(item as ImageProps).uri
                    ? (item as string)
                    : (item as ImageProps).uri,
                }}
                style={{width: 100, height: 100, marginHorizontal: 15}}
              />
            </View>
          </TouchableWithoutFeedback>
        );
      })}

      <ChooseImageModal
        multiple={multiple}
        compressImageMaxHeight={height}
        compressImageMaxWidth={width}
        visibleChooseImg={visible}
        setVisibleChooseImg={setVisible}
        setImages={(
          listImg: Array<{
            uri: string;
            width: number;
            height: number;
            type: string;
            size: number;
            name: string;
          }>,
        ) => {
          if (multiple) {
            const imageUrl = field.value;
            field.onChange([...imageUrl, ...listImg]);
          } else {
            const imageUrl = field.value;
            imageUrl[curEditIndex] = listImg[0];
            field.onChange([...imageUrl]);
          }
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingVertical: 10,
  },

  addImage: {
    width: 100,
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: color.primary,
    borderStyle: 'dashed',
    borderRadius: 10,
    justifyContent: 'center',
    marginHorizontal: 15,
  },
});

export default ImageList;
