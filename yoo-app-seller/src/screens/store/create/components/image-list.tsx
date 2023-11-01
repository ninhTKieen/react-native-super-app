import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Pressable,
} from 'react-native';
import ImageItem from './image-item';
import {color} from '@/configs/globalStyles';
import ChooseImageModal, {
  ImageProps,
} from '@/components/modals/choose-image-modal';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {StoreIcon} from '../../icons';
import ImageCustomer from '@/components/common/image-customer';
import IconGeneral from '@/components/common/icon-general';
import ImageViewModal from '@/components/modals/image-view-modal';

interface IImageList {
  value: ImageProps[];
  setValue: (value: any) => void;
}

type AddImageButtonProps = {
  setImage: (value: any) => void;
  image?: string | null;
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ImageList = (props: IImageList): JSX.Element => {
  const [image, setImage] = React.useState<ImageProps[]>([]);
  const [visible, setVisible] = React.useState(false);
  const {t} = useTranslation();

  const handleChoosePhoto = () => {
    setVisible(true);
  };

  React.useEffect(() => {
    setImage(props.value);
  }, [props.value]);

  const removeImage = (index: any) => {
    const newImageList = image.filter((_item: any, i: any) => i !== index);
    setImage(newImageList);
    props.setValue(newImageList);
  };

  return (
    <View style={styles.container}>
      {image.length > 0 && (
        <FlatList
          horizontal
          data={image}
          renderItem={({item, index}) => (
            <ImageItem image={item} removeImage={removeImage} index={index} />
          )}
        />
      )}
      {
        <View style={styles.imageItem}>
          <TouchableOpacity style={styles.addImage} onPress={handleChoosePhoto}>
            <Text style={styles.text}>{t(i18nKeys.common.addImage)}</Text>
          </TouchableOpacity>
        </View>
      }
      <ChooseImageModal
        visibleChooseImg={visible}
        setVisibleChooseImg={setVisible}
        multiple={true}
        setImages={(images: ImageProps[]) => {
          setImage(images);
          props.setValue(images);
        }}
      />
    </View>
  );
};

const AddImageButton = ({
  setImage,
  image,
}: AddImageButtonProps): JSX.Element => {
  const {t} = useTranslation();
  const [visible, setVisible] = React.useState(false);
  const [isViewImage, setIsViewImage] = React.useState(false);
  return image ? (
    <View
      style={{
        alignSelf: 'center',
      }}>
      <Pressable onPress={() => setIsViewImage(true)}>
        <ImageCustomer
          source={{uri: image}}
          style={{
            width: width * 0.95,
            height: 200,
          }}
        />
      </Pressable>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => {
          setImage([]);
        }}>
        <IconGeneral type="MaterialCommunityIcons" name="close" size={18} />
      </TouchableOpacity>
      <ImageViewModal
        images={[image]}
        isVisible={isViewImage}
        setVisible={setIsViewImage}
      />
    </View>
  ) : (
    <TouchableOpacity
      style={{alignItems: 'center'}}
      onPress={() => {
        setVisible(true);
      }}>
      <View
        style={[{alignItems: 'center', marginVertical: 10}, styles.imageBox]}>
        <StoreIcon.Photo width={30} height={30} />
      </View>
      <Text style={{fontSize: 16}}>{t(i18nKeys.common.addImage)}</Text>
      <ChooseImageModal
        visibleChooseImg={visible}
        setVisibleChooseImg={setVisible}
        multiple={false}
        setImages={setImage}
        compressImageMaxHeight={width}
        compressImageMaxWidth={height}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    paddingHorizontal: 10,
    flex: 1,
  },
  addImage: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#2D9CDB',
    borderStyle: 'dashed',
    borderRadius: 5,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#2D9CDB',
  },
  imageItem: {
    paddingRight: 0,
    height: 40,
    justifyContent: 'center',
    width: '100%',
  },
  imageBox: {
    width: 90,
    aspectRatio: 1,
    borderColor: color.primary,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 90,
  },
  icon: {
    backgroundColor: color.white,
    position: 'absolute',
    top: 5,
    right: 5,
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 90,
  },
});
export default ImageList;
export {AddImageButton};
