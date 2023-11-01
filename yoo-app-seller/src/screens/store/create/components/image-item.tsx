import ImageCustomer from '@/components/common/image-customer';
import {ImageProps} from '@/components/modals/choose-image-modal';
import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

type ImageItemProps = {
  image: ImageProps;
  removeImage: (index: number) => void;
  index: number;
};

const ImageItem = (props: ImageItemProps): JSX.Element => {
  const item = props.image;
  const onRemove = props.removeImage;
  return (
    <View style={styles.imageItem}>
      <ImageCustomer source={{uri: item.uri}} style={styles.image} />
      <TouchableOpacity
        style={styles.icon}
        onPress={() => {
          onRemove(props.index);
          console.log(props.index);
        }}>
        <Icon name="x" size={15} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 90,
    marginRight: 10,
    borderRadius: 5,
  },
  addImage: {
    height: 100,
    width: 90,
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
    paddingRight: 7,
    height: 110,
    justifyContent: 'center',
  },
  icon: {
    zIndex: 1,
    position: 'absolute',
    right: 8,
    top: 0,
    backgroundColor: '#A3A3A3',
    color: '#FFFFFF',
    borderRadius: 12,
    padding: 1,
  },
});

export default ImageItem;
