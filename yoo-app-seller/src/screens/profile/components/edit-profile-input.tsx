import {i18nKeys} from '@/configs/i18n/i18n_configs';
import React, {useState} from 'react';
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import RNDatePickerModal from '@/components/modals/rn-date-picker-modal';
import IconGeneral from '@/components/common/icon-general';
const {width, height} = Dimensions.get('screen');
type TextInputProps = {
  label?: string;
  error?: string | undefined;
  disabled?: boolean;
};

type CheckboxProps = {
  label?: string;
  error?: string | undefined;
  choice?: {
    label: string;
    value: string;
  }[];
  disabled?: boolean;
};

type InputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName>;

const EditProfileInputText = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(
  props: InputProps<TFieldValues, TName> & TextInputProps,
): JSX.Element => {
  const {control} = props;

  const {
    field: {value, onChange},
  } = useController({
    control,
    name: props.name,
    defaultValue: props.defaultValue,
  });
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
      }}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        value={value}
        multiline={true}
        onChangeText={onChange}
        editable={!props.disabled}
        onBlur={() => {
          if (value === '') {
            onChange(props.defaultValue);
          }
        }}
        style={[
          styles.txtInput,
          {
            justifyContent: 'flex-end',
            borderBottomWidth: 2,
            paddingTop: height * 0.019,
            paddingBottom: height * 0.019,
            borderColor: '#F1F2F8',
          },
        ]}
      />
    </View>
  );
};

export const EditProfileCheckbox = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(
  props: InputProps<TFieldValues, TName> & CheckboxProps,
) => {
  const {control} = props;
  const {
    field: {value, onChange},
  } = useController({
    control,
    name: props.name,
    defaultValue: props.defaultValue,
  });

  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      <Text style={styles.label}>{props.label}</Text>
      <View style={styles.checkboxContainer}>
        <View style={styles.checkboxWrapper}>
          {props.choice?.map((item, index) => {
            return (
              <TouchableOpacity
                disabled={props.disabled}
                key={index}
                onPress={() => {
                  onChange(item.value);
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={[styles.checkboxLabel, {paddingRight: '2%'}]}>
                  {item.label}
                </Text>
                <Ionicons
                  name={
                    value === item.value ? 'checkbox' : 'ios-square-outline'
                  }
                  size={24}
                  color={'#78B7EE'}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export const EditProfileModal = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(
  props: InputProps<TFieldValues, TName> & TextInputProps,
): JSX.Element => {
  const {control} = props;

  const {t} = useTranslation();

  const {
    field: {value, onChange},
  } = useController({
    control,
    name: props.name,
    defaultValue: props.defaultValue,
  });
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const showDatePicker = () => {
    setModalStatus(true);
  };

  return (
    <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
      <Text style={styles.label}>{props.label}</Text>
      <TouchableOpacity
        onPress={showDatePicker}
        style={styles.btnDate}
        disabled={props.disabled}>
        <Text
          style={[
            styles.txtInput,
            {
              justifyContent: 'flex-end',
              paddingTop: height * 0.019,
              paddingBottom: height * 0.019,
            },
          ]}>
          {value
            ? moment(value).format('DD-MM-YYYY')
            : t(i18nKeys.profile.chooseBirthday)}
        </Text>
        <IconGeneral
          type="Ionicons"
          name="ios-calendar"
          color={'#0077b6'}
          size={24}
        />
      </TouchableOpacity>
      <RNDatePickerModal
        setModalStatus={setModalStatus}
        modalStatus={modalStatus}
        onChange={onChange}
        defaultValue={value ? moment(value).toDate() : new Date()}
      />
    </View>
  );
};

export default EditProfileInputText;

const styles = StyleSheet.create({
  checkboxContainer: {
    paddingVertical: 10,
    borderColor: '#F1F2F8',
    borderBottomWidth: 2,
    borderRadius: 5,
    flex: 1,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  checkbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#707386',
  },
  txtInput: {
    fontSize: 16,
    fontWeight: '500',
    color: '#707386',
    backgroundColor: '#fff',
    flex: 1,
  },
  label: {
    width: width * 0.4,
    fontSize: 16,
    fontWeight: '500',
    color: '#707386',
    paddingVertical: height * 0.019,
  },
  button: {
    borderWidth: 2,
    borderRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingVertical: 5,
  },
  saveBtn: {
    backgroundColor: '#3498db',
    borderWidth: 0,
    flexGrow: 0.5,
  },
  btnDate: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#F1F2F8',
  },
});
