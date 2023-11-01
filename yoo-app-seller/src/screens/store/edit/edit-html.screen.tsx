import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  Dimensions,
  Keyboard,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EditStoreStackParamList} from '@/routes/store.route';
import TopBar from '@/components/top-bar';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import {color} from '@/configs/globalStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useController, useFormContext} from 'react-hook-form';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {useTranslation} from 'react-i18next';

const Right = () => {
  return <Icon name="check" size={24} color={color.blue2} />;
};
type Props = NativeStackScreenProps<EditStoreStackParamList, 'EditDescription'>;

const handleHead = ({tintColor}: any) => (
  <Text style={{color: tintColor}}>H1</Text>
);

const {height} = Dimensions.get('screen');

const EditHtmlScreen = ({route: {params}, navigation}: Props) => {
  const richText = React.useRef<RichEditor>(null);
  const scrollRef = React.useRef<ScrollView>(null);
  const [isKeyboardVisible, setKeyboardVisible] =
    React.useState<boolean>(false);
  const {control} = useFormContext();
  const {
    field: {onChange},
  } = useController({
    name: 'description',
    control,
  });
  const [editorValue, setEditorValue] = React.useState<string>(
    params.defaultValue,
  );

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  });

  const handleCursorPosition = React.useCallback((scrollY: number) => {
    scrollRef.current!.scrollTo({y: scrollY - 30, animated: true});
  }, []);
  const {t} = useTranslation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopBar
        title={t(i18nKeys.store.description)}
        onPressLeft={() => navigation.goBack()}
        right={<Right />}
        onPressRight={() => {
          richText.current?.blurContentEditor();
          onChange(editorValue);
          navigation.goBack();
        }}
      />
      <RichToolbar
        editor={richText}
        actions={[
          actions.undo,
          actions.redo,
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.alignLeft,
          actions.alignCenter,
          actions.alignRight,
          actions.heading1,
          actions.insertBulletsList,
          actions.insertOrderedList,
        ]}
        iconMap={{
          [actions.heading1]: handleHead,
        }}
        unselectedButtonStyle={{
          borderWidth: 0.2,
          borderColor: color.grey0,
        }}
        style={{
          backgroundColor: 'white',
        }}
        selectedIconTint={color.blue2}
        selectedButtonStyle={{
          backgroundColor: color.grey0,
        }}
      />
      <ScrollView
        style={{
          backgroundColor: 'white',
          height: height,
          marginBottom:
            Platform.OS === 'ios' && isKeyboardVisible ? height * 0.22 : 0,
        }}
        ref={scrollRef}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <RichEditor
            ref={richText}
            onChange={descriptionText => {
              setEditorValue(descriptionText);
            }}
            initialContentHTML={editorValue}
            initialHeight={height * 0.3}
            textInteractionEnabled={true}
            onCursorPosition={handleCursorPosition}
            containerStyle={{
              borderWidth: 0.5,
              borderRadius: 8,
              marginHorizontal: 10,
              borderColor: '#878A9C',
            }}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditHtmlScreen;
