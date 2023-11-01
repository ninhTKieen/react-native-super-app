import React, {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PromotionStackParamList} from '@/routes/marketing.route';
import TopBar from '@/components/top-bar';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {useTranslation} from 'react-i18next';
import {Divider, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  SettingPromotionAmount,
  SettingPromotionPercent,
} from './components/setting-voucher';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RNDatePickerModal from '@/components/modals/rn-date-picker-modal';
import moment from 'moment';
// import RNDateTimePicker from '@react-native-community/datetimepicker';

type Props = NativeStackScreenProps<
  PromotionStackParamList,
  'PromotionDetailScreen'
>;

const PromotionDetailScreen = ({route: {params}}: Props) => {
  const [type, setType] = React.useState<'percent' | 'amount'>('amount');
  const [modalStatus, setModalStatus] = useState<boolean>(false);

  const {t} = useTranslation();
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <TopBar title={t(i18nKeys.voucher.detail.title)} />
        <ScrollView style={styles.body}>
          <View style={styles.section}>
            <Text style={styles.text_header}>
              {t(i18nKeys.voucher.detail.name)}
            </Text>
            <TextInput
              style={{backgroundColor: '#fff', padding: 0}}
              outlineStyle={{borderRadius: 2}}
              mode="outlined"
              activeOutlineColor="#339FD9"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.text_header}>
              {t(i18nKeys.voucher.detail.setting)}
            </Text>
            <Divider style={{marginTop: 10}} />
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 10,
                justifyContent: 'space-between',
              }}>
              <Pressable
                onPress={() => setType('amount')}
                style={
                  type === 'amount'
                    ? [styles.button, styles.selected_button]
                    : [styles.button]
                }>
                <Text
                  style={
                    type === 'amount'
                      ? [styles.text, styles.selected_text]
                      : [styles.text]
                  }>
                  Muc giam
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setType('percent')}
                style={
                  type === 'percent'
                    ? [styles.button, styles.selected_button]
                    : [styles.button]
                }>
                <Text
                  style={
                    type === 'percent'
                      ? [styles.text, styles.selected_text]
                      : [styles.text]
                  }>
                  Theo %
                </Text>
              </Pressable>
            </View>

            {type === 'amount' ? (
              <SettingPromotionAmount type={'create'} />
            ) : (
              <SettingPromotionPercent type={'create'} />
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.text_header}>
              {t(i18nKeys.voucher.detail.time)}
            </Text>
            <Divider style={{marginTop: 10}} />
            <View style={styles.item}>
              <Text>{t(i18nKeys.voucher.detail.start)}</Text>
              <TouchableOpacity style={styles.sub_item} onPress={() => {}}>
                <Text>24 Th04 2023 14:08</Text>
                <Icon name="chevron-right" size={18} />
              </TouchableOpacity>
            </View>

            <Divider style={{marginTop: 10}} />

            <View style={styles.item}>
              <Text>{t(i18nKeys.voucher.detail.start)}</Text>
              <TouchableOpacity style={styles.sub_item}>
                <Text>24 Th04 2023 14:08</Text>
                <Icon name="chevron-right" size={18} />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={[
              styles.section,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}>
            <Text style={styles.text_header}>
              {t(i18nKeys.voucher.detail.code)}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                width: '30%',
                padding: 5,
                justifyContent: 'space-between',
              }}>
              <Text>HEHE</Text>
              <TextInput
                maxLength={5}
                underlineStyle={{height: 0}}
                activeUnderlineColor="#339FD9"
                style={{
                  width: '50%',
                  paddingHorizontal: 2,
                  height: 20,
                  backgroundColor: '#fff',
                  textAlign: 'right',
                }}
              />
            </View>
          </View>
        </ScrollView>
        <RNDatePickerModal
          setModalStatus={setModalStatus}
          modalStatus={modalStatus}
          onChange={() => {}}
          defaultValue={new Date()}
          mode="datetime"
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default PromotionDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {},
  section: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginTop: 10,
    paddingVertical: 15,
  },
  text_header: {
    fontSize: 14,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#dfe6e9',
    padding: 10,
    width: '46%',
    marginHorizontal: 5,
    alignContent: 'center',
  },
  selected_button: {
    backgroundColor: '#fff',
    borderColor: '#0984e3',
    borderWidth: 2,
  },
  text: {
    textAlign: 'center',
  },
  selected_text: {
    color: '#0984e3',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 10,
  },
  sub_item: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '50%',
  },
});
