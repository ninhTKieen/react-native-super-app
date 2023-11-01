import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Pressable,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';
import ChooseImageModal from '@/components/modals/choose-image-modal';
import ImageCustomer from '@/components/common/image-customer';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {color} from '@/configs/globalStyles';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {useTranslation} from 'react-i18next';
import {Controller, useForm, useFormContext} from 'react-hook-form';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import imageService from '@/features/image/image.service';
import {IStore, IStoreUpdate} from '@/features/store/store.model';
import {useStoreUpdateValidator} from '@/validators/store/store.validator';
import storeService from '@/features/store/store.service';
import Toast from 'react-native-toast-message';
import {ModalStackParamsList} from '@/components/modals';
import {useModal} from 'react-native-modalfy';
import ImageViewModal from '@/components/modals/image-view-modal';

type Props = {
  inforStore?: IStore;
};

interface ImageProps {
  uri: string;
  type: string;
  name: string;
  height: number;
  width: number;
  size: number;
}

interface ImageShow {
  type: 'old' | 'new';
  uri: string;
}

const {width, height} = Dimensions.get('screen');

const ListImage = ({inforStore}: Props): JSX.Element => {
  const [isChooseImageVisible, setIsChooseImageVisible] = React.useState(false);
  const [imageList, setImageList] = React.useState<ImageShow[]>([]);
  const [newImageList, setNewImageList] = React.useState<ImageProps[]>([]);
  const [isListImageChange, setIsListImageChange] =
    React.useState<boolean>(false);
  const queryClient = useQueryClient();
  const {t} = useTranslation();
  const {openModal, closeModal} = useModal<ModalStackParamsList>();
  const {handleSubmit, setValue, getValues} = useForm<IStoreUpdate>({
    resolver: useStoreUpdateValidator(),
    defaultValues: inforStore,
  });

  const {mutate: uploadImage} = useMutation({
    mutationFn: () => imageService.uploadListImageStore(newImageList),
    onSuccess: data => {
      if (inforStore?.imageUrls && inforStore?.imageUrls.length > 0) {
        setValue('imageUrls', [...inforStore.imageUrls, ...data.result]);
      } else {
        setValue('imageUrls', data);
      }
      updateStore(getValues());
    },
    onError: _error => {
      closeModal('LoadingModal');
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.common.error) as string,
        text2: t(i18nKeys.store.updateFailedMsg) as string,
      });
    },
  });

  const {mutate: updateStore} = useMutation({
    mutationFn: (data: IStoreUpdate) => storeService.updateProvider(data),
    onSuccess: data => {
      console.log('success', data);
      queryClient.refetchQueries(['currentStoreInfo', inforStore?.id]);
      Toast.show({
        type: 'success',
        text1: t(i18nKeys.common.success) as string,
        text2: t(i18nKeys.store.updateSuccessMsg) as string,
      });
    },
    onError: _ => {
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.common.error) as string,
        text2: t(i18nKeys.store.updateFailedMsg) as string,
      });
    },
    onSettled: () => {
      setIsListImageChange(false);
      closeModal('LoadingModal');
    },
  });

  const onSuccess = (_data: IStoreUpdate) => {
    openModal('LoadingModal');
    if (newImageList.length > 0) {
      uploadImage();
    } else {
      setValue(
        'imageUrls',
        imageList.map(item => item.uri),
      );
      updateStore(getValues());
    }
  };

  const onError = (error: any) => {
    console.log(error);
    Toast.show({
      type: 'error',
      text1: t(i18nKeys.common.error) as string,
      text2: t(i18nKeys.store.updateFailedMsg) as string,
    });
  };

  const checkImageChange = () => {
    if (inforStore?.imageUrls) {
      if (
        JSON.stringify(inforStore.imageUrls) !==
        JSON.stringify(imageList.toString())
      ) {
        setIsListImageChange(true);
      }
    } else {
      if (imageList.length > 0) {
        setIsListImageChange(true);
      }
    }
  };

  React.useEffect(() => {
    if (inforStore?.imageUrls) {
      setImageList(
        inforStore.imageUrls.map(item => ({type: 'old', uri: item})),
      );
    }
  }, [inforStore?.imageUrls]);

  return (
    <View
      style={{
        backgroundColor: '#fff',
      }}>
      {imageList.length > 0 ? (
        <GestureHandlerRootView>
          <Carousel
            width={width}
            height={250}
            data={imageList}
            loop={false}
            mode="parallax"
            scrollAnimationDuration={500}
            renderItem={({item, index}) => (
              <View>
                <ImageCustomer
                  source={{uri: item.uri}}
                  style={styles.image}
                  key={index}
                />
                <TouchableOpacity
                  onPress={() => {
                    let temp = imageList.filter((_, i) => i !== index);
                    setImageList(temp);
                    let tempNew = newImageList.filter(
                      tn => tn.uri !== item.uri,
                    );
                    setNewImageList(tempNew);
                    checkImageChange();
                  }}
                  style={styles.rmvBtn}>
                  <MCIcon name="close" size={20} color={color.grey2} />
                </TouchableOpacity>
              </View>
            )}
          />
        </GestureHandlerRootView>
      ) : null}
      <TouchableOpacity
        onPress={() => setIsChooseImageVisible(true)}
        style={styles.addBtn}>
        <Text style={styles.text}>{t(i18nKeys.store.addImage)}</Text>
      </TouchableOpacity>
      {isListImageChange ? (
        <View style={styles.btnWrapper}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => {
              if (inforStore?.imageUrls) {
                setImageList(
                  inforStore?.imageUrls.map(item => ({
                    type: 'old',
                    uri: item,
                  })),
                );

                setNewImageList([]);
              }
              setIsListImageChange(false);
            }}>
            <View>
              <Text style={styles.cancelText}>{t(i18nKeys.common.cancel)}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={handleSubmit(onSuccess, onError)}>
            <Text style={styles.saveText}>{t(i18nKeys.common.update)}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <ChooseImageModal
        multiple={true}
        visibleChooseImg={isChooseImageVisible}
        setVisibleChooseImg={setIsChooseImageVisible}
        setImages={(images: ImageProps[]) => {
          const newImagesUri: ImageShow[] = images.map(item => ({
            uri: item.uri,
            type: 'new',
          }));
          setImageList([...imageList, ...newImagesUri]);
          setNewImageList([...newImageList, ...images]);
          checkImageChange();
        }}
        compressImageMaxHeight={height}
        compressImageMaxWidth={width}
      />
    </View>
  );
};

export const ImageItem = ({inforStore}: Props): JSX.Element => {
  const [image, setImage] = React.useState<ImageProps | null>();
  const [isChooseImageVisible, setIsChooseImageVisible] = React.useState(false);
  const {t} = useTranslation();
  const {openModal, closeModal} = useModal();
  const queryClient = useQueryClient();
  const [isViewImage, setIsViewImage] = React.useState(false);
  const {handleSubmit, setValue, getValues, control} =
    useFormContext<IStoreUpdate>();

  const {mutate: uploadImage} = useMutation({
    mutationFn: () => imageService.uploadAvatar(image!),
    onSuccess: data => {
      setValue('imageUrls', [data.result]);
      updateStore(getValues());
    },
    onError: _error => {
      closeModal('LoadingModal');
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.common.error) as string,
        text2: t(i18nKeys.store.updateFailedMsg) as string,
      });
    },
  });

  const {mutate: updateStore} = useMutation({
    mutationFn: (data: IStoreUpdate) => storeService.updateProvider(data),
    onSuccess: data => {
      console.log('success', data);
      queryClient.refetchQueries(['currentStoreInfo', inforStore?.id]);
      Toast.show({
        type: 'success',
        text1: t(i18nKeys.common.success) as string,
        text2: t(i18nKeys.store.updateSuccessMsg) as string,
      });
    },
    onError: _ => {
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.common.error) as string,
        text2: t(i18nKeys.store.updateFailedMsg) as string,
      });
    },
    onSettled: () => {
      setImage(null);
      closeModal('LoadingModal');
    },
  });

  const onSubmit = (_data: IStoreUpdate) => {
    openModal('LoadingModal');
    if (image) {
      uploadImage();
      console.log('image', image);
    }
  };

  const onError = (error: any) => {
    console.log(error);
    Toast.show({
      type: 'error',
      text1: t(i18nKeys.common.error) as string,
      text2: t(i18nKeys.store.updateFailedMsg) as string,
    });
  };

  return (
    <View
      style={{
        backgroundColor: color.white,
        paddingVertical: 10,
        paddingTop: 20,
      }}>
      <Controller
        control={control}
        name="imageUrls"
        render={({field: {value}}) => (
          <View
            style={{
              alignSelf: 'center',
            }}>
            <Pressable onPress={() => setIsViewImage(true)}>
              <ImageCustomer
                source={{
                  uri: image ? image?.uri : value?.[0],
                }}
                style={{
                  width: width * 0.95,
                  height: 200,
                  borderRadius: 10,
                }}
              />
            </Pressable>
            <ImageViewModal
              images={image ? [image?.uri] : value || ['']}
              isVisible={isViewImage}
              setVisible={setIsViewImage}
            />
          </View>
        )}
      />

      <TouchableOpacity
        onPress={() => setIsChooseImageVisible(true)}
        style={styles.addBtn}>
        <Text style={styles.text}>{t(i18nKeys.store.useOtherImage)}</Text>
      </TouchableOpacity>
      {image && (
        <View style={styles.btnWrapper}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => {
              setImage(null);
            }}>
            <View>
              <Text style={styles.cancelText}>{t(i18nKeys.common.cancel)}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={handleSubmit(onSubmit, onError)}>
            <Text style={styles.saveText}>{t(i18nKeys.common.update)}</Text>
          </TouchableOpacity>
        </View>
      )}
      <ChooseImageModal
        multiple={false}
        visibleChooseImg={isChooseImageVisible}
        setVisibleChooseImg={setIsChooseImageVisible}
        setImages={(images: ImageProps[]) => {
          setImage(images[0]);
          console.log('test', image);
        }}
        compressImageMaxHeight={height}
        compressImageMaxWidth={width}
      />
    </View>
  );
};

export default ListImage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 10,
  },

  image: {
    width: width - 20,
    height: 250,
    marginHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
  },

  rmvBtn: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#fff',
    borderRadius: 50,
  },

  addBtn: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#3498db',
    borderStyle: 'dashed',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },

  text: {
    fontSize: 18,
    color: color.blueDark,
    fontWeight: '500',
    paddingVertical: 8,
    paddingLeft: 15,
    textAlign: 'center',
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  saveBtn: {
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 10,
    borderColor: '#3498db',
    backgroundColor: '#3498db',
    textAlign: 'center',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    flexGrow: 1,
    justifyContent: 'center',
  },

  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },

  cancelText: {
    color: '#e74c3c',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  cancelBtn: {
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 10,
    borderColor: '#e74c3c',
    backgroundColor: '#fff',
    textAlign: 'center',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    flexGrow: 1,
    justifyContent: 'center',
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
