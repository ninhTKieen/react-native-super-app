import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileStackParamList} from '@/routes/profile.route';
import {useAuth} from '@/hooks/useAuth';
import {color} from '@/configs/globalStyles';
import {Button} from 'react-native-paper';
import EditProfileInputText, {
  EditProfileCheckbox,
  EditProfileModal,
} from './components/edit-profile-input';
import {Controller, useForm} from 'react-hook-form';
import {IUpdateProfilePayload} from '@/features/profile/profile.model';
import {useUpdateProfileValidator} from '@/validators/profile/profile.validator';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import profileService from '@/features/profile/profile.service';
import Toast from 'react-native-toast-message';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {useTranslation} from 'react-i18next';
import {useModal} from 'react-native-modalfy';
import {ModalStackParamsList} from '@/components/modals';
import ChooseImageModal, {
  ImageProps,
} from '@/components/modals/choose-image-modal';
import ImageCustomer from '@/components/common/image-customer';
import BackIcon from '@/assets/profile/backEditScreen.svg';
import EditIcon from '@/assets/profile/editIcon.svg';
import EditBlueIcon from '@/assets/profile/editIconBlue.svg';
import httpUtil from '@/utils/http.util';
import ImageViewModal from '@/components/modals/image-view-modal';

const {width, height} = Dimensions.get('screen');

type EditProfileScreenNavigationProp = NativeStackScreenProps<
  ProfileStackParamList,
  'EditProfileScreen'
>;

const EditProfileScreen = ({
  navigation,
}: EditProfileScreenNavigationProp): JSX.Element => {
  const queryClient = useQueryClient();
  const {t} = useTranslation();
  const {openModal, closeModal} = useModal<ModalStackParamsList>();
  const [isVisibleChooseImageModal, setIsVisibleChooseImageModal] =
    React.useState(false);
  const [avatarImage, setAvatarImage] = React.useState<ImageProps[]>();
  const [editable, setEditable] = React.useState<boolean>(false);
  const {currentUser} = useAuth();
  const [isPreview, setIsPreview] = React.useState<boolean>(false);
  const {control, getValues, setValue, handleSubmit, formState, reset} =
    useForm<IUpdateProfilePayload>({
      resolver: useUpdateProfileValidator(),
      defaultValues: {
        name: currentUser.name,
        emailAddress: currentUser.emailAddress,
        phoneNumber: currentUser.phoneNumber,
        homeAddress: currentUser.homeAddress,
        imageUrl: currentUser.imageUrl,
        dateOfBirth: currentUser.dateOfBirth,
        gender: currentUser.gender,
        surname: currentUser.surname,
        userName: currentUser.userName,
      },
    });

  const onSubmit = (data: any) => {
    if (avatarImage && avatarImage.length > 0) {
      updateProfilePicture(avatarImage[0]);
    } else {
      updateProfile(data, currentUser.id);
    }
  };

  const onError = (error: any) => {
    console.log('error', error);
  };

  const {mutate: updateProfile} = useMutation({
    mutationFn: (data: any) =>
      profileService.updateProfile(data, currentUser.id),
    onSuccess: _data => {
      queryClient.refetchQueries(['currentUser']);
      setEditable(false);
      formState.isDirty = false;
      Toast.show({
        type: 'success',
        text1: t(i18nKeys.common.success) as string,
        text2: t(i18nKeys.profile.updateForm.success) as string,
      });
    },

    onError: _error => {
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.common.error) as string,
        text2: t(i18nKeys.profile.updateForm.error) as string,
      });
    },

    onMutate: () => {
      openModal('LoadingModal');
    },
    onSettled: () => {
      // reset();
      setTimeout(() => {
        closeModal('LoadingModal');
      }, 1000);
    },
  });

  const {mutate: updateProfilePicture} = useMutation({
    mutationFn: (data: ImageProps) => httpUtil.uploadImage({file: data}),
    onSuccess: res => {
      setValue('imageUrl', res.result.data);
      updateProfile(getValues());
    },
    onError: error => {
      console.log(error);
      Toast.show({
        text1: 'Xảy ra lỗi',
        text2: 'Đẩy ảnh lên thất bại',
        type: 'error',
      });
    },
    onSettled: () => {
      setAvatarImage([]);
      closeModal('LoadingModal');
    },
    onMutate: () => {
      openModal('LoadingModal');
    },
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 70 : 0}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Controller
          name="imageUrl"
          control={control}
          defaultValue={currentUser.imageUrl}
          render={({field: {value}}) => (
            <View style={[styles.imageWrapper]}>
              <View>
                <View style={styles.heading}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <BackIcon width={24} height={24} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      if (!editable) {
                        Toast.show({
                          text1: 'Bắt đầu chỉnh sửa',
                          text2: 'Chỉnh sửa thông tin người dùng',
                          type: 'info',
                          visibilityTime: 1000,
                        });
                      } else {
                        Toast.show({
                          text1: 'Hoãn chỉnh sửa',
                          text2: 'Không thể chỉnh sửa thông tin người dùng nữa',
                          type: 'error',
                          visibilityTime: 1000,
                        });
                      }
                      setEditable(!editable);
                    }}>
                    {editable ? (
                      <EditBlueIcon width={24} height={24} />
                    ) : (
                      <EditIcon width={24} height={24} />
                    )}
                  </TouchableOpacity>
                </View>
                <Pressable onPress={() => setIsPreview(true)}>
                  <ImageCustomer
                    source={
                      avatarImage && avatarImage.length > 0
                        ? {uri: avatarImage[0].uri}
                        : value
                        ? {uri: value}
                        : require('@/assets/logos/logo.png')
                    }
                    widthImg={width * 0.92}
                    heightImg={height * 0.164}
                    borderRadius={13}
                    marginHorizontal={width * 0.04}
                    style={styles.imageWall}
                  />
                </Pressable>
                <View style={styles.containerTitle}>
                  <View style={styles.avatarContainer}>
                    <Pressable onPress={() => setIsPreview(true)}>
                      <ImageCustomer
                        source={
                          avatarImage && avatarImage.length > 0
                            ? {uri: avatarImage[0].uri}
                            : value
                            ? {uri: value}
                            : require('@/assets/logos/logo.png')
                        }
                        resizeMode="stretch"
                        widthImg={width * 0.26}
                        heightImg={width * 0.26}
                        borderRadius={width * 0.26}
                        style={styles.image}
                      />
                    </Pressable>
                  </View>
                  <View style={styles.nameContainer}>
                    <Text style={styles.txtName}>
                      {`${currentUser.surname} ${currentUser.name}`}
                    </Text>
                    <TouchableOpacity
                      disabled={!editable}
                      onPress={() => {
                        setIsVisibleChooseImageModal(true);
                      }}>
                      <Text style={styles.txtChangeImg}>
                        Thay đổi ảnh đại diện
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <ChooseImageModal
                multiple={false}
                visibleChooseImg={isVisibleChooseImageModal}
                setVisibleChooseImg={setIsVisibleChooseImageModal}
                setImages={setAvatarImage}
                compressImageMaxHeight={height}
                compressImageMaxWidth={width}
                width={300}
                height={300}
                cropping={true}
              />
            </View>
          )}
        />
        <ImageViewModal
          isVisible={isPreview}
          setVisible={setIsPreview}
          images={[currentUser.imageUrl]}
        />
        <View
          style={{
            borderTopWidth: 5,
            borderColor: '#F1F2F8',
            alignItems: 'flex-start',
            overflow: 'hidden',
          }}>
          <View
            style={{
              backgroundColor: '#F1F2F8',
              borderBottomRightRadius: 40,
              paddingTop: 35,
              paddingLeft: width * 0.04,
              paddingRight: width * 0.065,
              paddingVertical: height * 0.007,
              marginTop: -32,
            }}>
            <Text
              style={{
                color: '#78B7EE',
                fontSize: 17,
                fontWeight: '600',
              }}>
              Thông tin người dùng
            </Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 18}}>
          <EditProfileInputText
            label={t(i18nKeys.profile.surname) as string}
            control={control}
            name="surname"
            disabled={!editable}
          />

          <EditProfileInputText
            label={t(i18nKeys.profile.name) as string}
            control={control}
            name="name"
            disabled={!editable}
          />

          <EditProfileInputText
            label={t(i18nKeys.profile.username) as string}
            defaultValue={currentUser.userName}
            control={control}
            name="userName"
            disabled={true}
          />

          <EditProfileInputText
            label={t(i18nKeys.profile.email) as string}
            control={control}
            name="emailAddress"
            disabled={!editable}
          />

          <EditProfileInputText
            label={t(i18nKeys.profile.address) as string}
            control={control}
            name="homeAddress"
            disabled={!editable}
          />

          <EditProfileInputText
            label={t(i18nKeys.profile.phoneNumber) as string}
            control={control}
            name="phoneNumber"
            disabled={!editable}
          />

          <EditProfileModal
            label={t(i18nKeys.profile.birthday) as string}
            control={control}
            name="dateOfBirth"
            disabled={!editable}
          />

          <EditProfileCheckbox
            label={t(i18nKeys.profile.gender) as string}
            control={control}
            name="gender"
            choice={[
              {
                label: t(i18nKeys.profile.male) as string,
                value: 'male',
              },
              {
                label: t(i18nKeys.profile.female) as string,
                value: 'female',
              },
            ]}
            disabled={!editable}
          />
        </View>
        {(formState.isDirty || avatarImage) && (
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'center',
              paddingVertical: '8%',
            }}>
            <Button
              disabled={!editable}
              style={[
                styles.button,
                editable ? styles.saveBtn : styles.saveDisableBtn,
              ]}
              onPress={handleSubmit(onSubmit, onError)}>
              <Text
                style={{
                  color: editable ? '#fff' : '#707386',
                  fontWeight: '600',
                  fontSize: 17,
                }}>
                {t(i18nKeys.common.update)}
              </Text>
            </Button>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    borderRadius: width * 0.26,
    width: width * 0.26,
    height: width * 0.26,
  },
  imageWall: {
    borderRadius: 13,
    width: width * 0.92,
    height: height * 0.164,
    marginHorizontal: width * 0.04,
  },
  imageWrapper: {
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  heading: {
    position: 'absolute',
    top: height * 0.01,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: width * 0.04,
    paddingHorizontal: width * 0.02,
    zIndex: 100,
    width: width * 0.92,
  },
  button: {
    borderRadius: 30,
    paddingVertical: 3,
    width: width * 0.9,
  },
  saveBtn: {
    backgroundColor: '#3498db',
  },
  saveDisableBtn: {
    backgroundColor: '#F1F2F8',
  },
  xIcon: {
    borderColor: color.red,
    borderWidth: 1,
    backgroundColor: color.white,
  },
  checkIcon: {
    backgroundColor: '#339FD9',
  },
  iconWrapper: {
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    width: '100%',
  },
  avatarContainer: {
    marginLeft: width * 0.03,
    borderColor: 'white',
    borderWidth: 0.01 * width,
    borderRadius: width * 0.3,
    width: width * 0.28,
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'space-around',
    paddingLeft: width * 0.025,
  },
  txtName: {
    color: '#707386',
    fontSize: 20,
    fontWeight: '700',
    paddingBottom: height * 0.012,
    paddingTop: height * 0.01,
  },
  txtChangeImg: {
    color: '#37B8FE',
    fontSize: 15,
    fontWeight: '500',
  },
  containerTitle: {
    flexDirection: 'row',
    marginTop: -height * 0.026,
    alignItems: 'center',
    paddingBottom: height * 0.026,
  },
});
