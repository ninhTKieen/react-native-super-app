import {color} from '@/configs/globalStyles';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {IStoreCreate} from '@/features/store/store.model';
import React from 'react';
import {useController, useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {Button} from 'react-native-paper';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';

type Props = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
};

const handleHead = ({tintColor}: any) => (
  <Text style={{color: tintColor}}>H1</Text>
);

const {height} = Dimensions.get('screen');

const EditDescriptionModal = ({isVisible, setIsVisible}: Props) => {
  const richText = React.useRef<RichEditor>(null);
  const scrollRef = React.useRef<ScrollView>(null);
  const [isKeyboardVisible, setKeyboardVisible] =
    React.useState<boolean>(false);
  const {control} = useFormContext<IStoreCreate>();
  const {
    field: {onChange, value},
  } = useController({
    name: 'description',
    control,
    defaultValue: '',
  });
  const [editorValue, setEditorValue] = React.useState<string>(value);
  const handleCursorPosition = React.useCallback((scrollY: number) => {
    scrollRef.current!.scrollTo({y: scrollY - 40, animated: true});
  }, []);
  const {t} = useTranslation();

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

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)}
      onBackButtonPress={() => setIsVisible(false)}
      style={{
        justifyContent: 'flex-end',
        margin: 0,
        bottom: Platform.OS === 'ios' && isKeyboardVisible ? height * 0.35 : 0,
      }}>
      <SafeAreaView
        style={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          marginBottom: Platform.OS === 'ios' && isKeyboardVisible ? 0 : 0,
          maxHeight: height * 0.5,
          backgroundColor: '#fff',
          position: 'relative',
        }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : undefined}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
              paddingTop: 5,
            }}>
            <Button
              onPress={() => {
                setIsVisible(false);
              }}>
              <Text style={{color: color.red}}>{t(i18nKeys.common.close)}</Text>
            </Button>
            <Button
              onPress={() => {
                onChange(editorValue);
                setIsVisible(false);
              }}>
              <Text style={{color: '#339FD9'}}>{t(i18nKeys.common.save)}</Text>
            </Button>
          </View>
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
              paddingVertical: 10,
              marginBottom: 10,
            }}
            ref={scrollRef}>
            <RichEditor
              ref={richText}
              onChange={descriptionText => {
                setEditorValue(descriptionText);
              }}
              initialContentHTML={editorValue}
              textInteractionEnabled={true}
              onCursorPosition={handleCursorPosition}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

export default EditDescriptionModal;
