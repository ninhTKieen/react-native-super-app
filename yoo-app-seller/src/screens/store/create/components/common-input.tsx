import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import globalStyles, {color} from '@/configs/globalStyles';
import {useModal} from 'react-native-modalfy';
import {ModalStackParamsList} from '@/components/modals';
import {TextInput} from 'react-native-paper';
import IconGeneral from '@/components/common/icon-general';

interface ICommonInput {
  placeholder: string;
  error: string | undefined;
  data?: any[];
  label?: string;
  important?: boolean;
}

type InputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & ICommonInput;

const CommonInput = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(
  props: InputProps<TFieldValues, TName>,
): JSX.Element => {
  const {
    field: {onChange, value},
  } = useController({
    name: props.name,
    control: props.control,
  });
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {props.label}
        {props.important ? <Text style={{color: color.red}}>*</Text> : null}
      </Text>
      <TextInput
        mode="outlined"
        placeholder={props.placeholder}
        value={value}
        onChangeText={onChange}
        style={[styles.input]}
        activeOutlineColor="#0077b6"
        placeholderTextColor={color.grey8}
        contentStyle={{padding: 0}}
        outlineStyle={{
          borderWidth: 0,
        }}
      />

      {props.error && (
        <Text
          style={[
            globalStyles.errorMessage,
            {color: color.red, paddingHorizontal: 15, paddingTop: 5},
          ]}>
          {props.error}
        </Text>
      )}
    </View>
  );
};

const AreaInput = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(
  props: InputProps<TFieldValues, TName>,
): JSX.Element => {
  const {
    field: {onChange, value},
  } = useController({
    name: props.name,
    control: props.control,
  });
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>
          {props.label}
          {props.important ? <Text style={{color: color.red}}>*</Text> : null}
        </Text>
        <TextInput
          value={value}
          onChangeText={onChange}
          style={[styles.input, styles.areaInput]}
          multiline={true}
          mode="outlined"
          activeOutlineColor="#0077b6"
          contentStyle={{padding: 0}}
          outlineStyle={{
            borderWidth: 0,
            backgroundColor: color.grey7,
          }}
          placeholder={props.placeholder}
          placeholderTextColor={color.grey8}
        />
      </View>
      {props.error && (
        <Text
          style={[
            globalStyles.errorMessage,
            {color: color.red, paddingHorizontal: 15, paddingTop: 5},
          ]}>
          {props.error}
        </Text>
      )}
    </View>
  );
};

const SelectInput = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(
  props: InputProps<TFieldValues, TName>,
): JSX.Element => {
  const {openModal} = useModal<ModalStackParamsList>();
  const {
    field: {onChange, value},
  } = useController({
    name: props.name,
    control: props.control,
  });

  const [name, setName] = React.useState<string>(props.placeholder);

  const onSetname = (data: string) => {
    setName(data);
  };

  if (props.data && props.data.length === 0) {
    return <View />;
  }

  return (
    <View
      style={{
        paddingVertical: 10,
        paddingHorizontal: 15,
      }}>
      <Text style={styles.label}>
        {props.label}
        {props.important ? <Text style={{color: color.red}}>*</Text> : null}
      </Text>
      <TouchableOpacity
        onPress={() => {
          openModal('SelectListModal', {
            data: props.data,
            title: props.placeholder,
            onSelect: onChange,
            onSetName: onSetname,
            value: value,
          });
        }}
        style={{
          backgroundColor: '#B7D4FF26',
          paddingVertical: 13,
          paddingHorizontal: 20,
          marginTop: 15,
          borderWidth: 2,
          borderColor: '#B0DaFF',
          borderRadius: 150,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text>{name}</Text>
        <IconGeneral
          type="Ionicons"
          name="chevron-down-outline"
          color={'#878A9C'}
          size={24}
        />
      </TouchableOpacity>
      {props.error && (
        <Text
          style={[
            globalStyles.errorMessage,
            {color: color.red, paddingHorizontal: 15, paddingTop: 5},
          ]}>
          {props.error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 7,
    paddingBottom: 8,
    paddingHorizontal: 15,
  },
  input: {
    borderRadius: 10,
    fontSize: 14,
    backgroundColor: '#fff',
    // height: 40,
    justifyContent: 'center',
  },
  areaInput: {
    // minHeight: 100,
    // maxHeight: 100,
    textAlignVertical: 'top',
    maxHeight: 140,
  },
  label: {
    color: color.blueDark1,
    fontSize: 17,
  },
});

export {CommonInput, AreaInput, SelectInput};
