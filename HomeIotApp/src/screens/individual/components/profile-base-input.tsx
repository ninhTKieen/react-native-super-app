import IconGeneral from '@src/components/icon-general';
import { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import i18n from '@src/configs/i18n';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');

type TProfileInputText = {
  label: string;
  defaultValue?: string;
  value: string;
  onChange: (text: string) => void;
  disabled?: boolean;
};

type TCheckboxInput = {
  label: string;
  value: string;
  onChange: (text: string) => void;
  disabled?: boolean;
};

export const EditProfileInputText = (props: TProfileInputText): JSX.Element => {
  const { label, value, onChange, defaultValue, disabled } = props;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
      }}
    >
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        multiline={true}
        onChangeText={onChange}
        editable={!disabled}
        onBlur={() => {
          if (value === '') {
            defaultValue && onChange(defaultValue);
          }
        }}
        placeholder={i18n.t(i18nKeys.individual.profile.noInfo)}
        style={[
          styles.txtInput,
          {
            justifyContent: 'flex-end',
            paddingTop: height * 0.019,
            paddingBottom: height * 0.019,
          },
        ]}
      />
    </View>
  );
};

export const EditProfileCheckbox = (props: TCheckboxInput) => {
  const { value, onChange, label, disabled } = props;

  const choice = [
    {
      label: i18n.t(i18nKeys.individual.profile.male),
      value: 'male',
    },
    {
      label: i18n.t(i18nKeys.individual.profile.female),
      value: 'female',
    },
  ];

  return (
    <View
      style={{
        flexDirection: 'row',
      }}
    >
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.checkboxContainer,
          {
            borderColor: disabled ? '#fff' : '#F1F2F8',
          },
        ]}
      >
        <View style={styles.checkboxWrapper}>
          {choice?.map((item, index) => {
            return (
              <TouchableOpacity
                disabled={disabled}
                key={index}
                onPress={() => {
                  onChange(item.value);
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={[
                    styles.checkboxLabel,
                    {
                      paddingRight: '2%',
                      color: value === item.value ? colors.primary : '#707386',
                      fontWeight: value === item.value ? 'bold' : 'normal',
                    },
                  ]}
                >
                  {item.label}
                </Text>
                <IconGeneral
                  type="Ionicons"
                  name={value === item.value ? 'checkbox' : 'checkbox-outline'}
                  size={24}
                  color={colors.primary}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

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
