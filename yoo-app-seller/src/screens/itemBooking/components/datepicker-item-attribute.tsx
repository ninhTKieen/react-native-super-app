import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import RNDatePickerModal from '@/components/modals/rn-date-picker-modal';
import IconGeneral from '@/components/common/icon-general';
import moment from 'moment';
import {useController, useFormContext} from 'react-hook-form';
const {width, height} = Dimensions.get('screen');
type Props = {
  label: string;
  error?: string;
  value?: string | null;
  id: string;
  type: 'objectInput' | 'input' | 'arrayObjectInput';
  idObject?: string;
};
const DatepickerItemAttribute = ({
  label,
  error,
  value,
  id,
  type,
  idObject,
}: Props) => {
  const {control, watch} = useFormContext();
  const {field} = useController({
    name: 'properties',
    control,
  });
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const showDatePicker = () => {
    setModalStatus(true);
  };
  const onChange = (date: string) => {
    switch (type) {
      case 'input':
        let newValue = {...watch('properties')};
        newValue[id] = date;
        field.onChange(newValue);
        break;
      case 'objectInput':
        if (idObject) {
          let newValueObject: any = watch('properties')
            ? {...watch('properties')}
            : {};
          let newObject: any = newValueObject[idObject]
            ? newValueObject[idObject]
            : {};
          newObject[id] = date;
          newValueObject[idObject] = newObject;
          field.onChange(newValueObject);
        }
        break;
      case 'arrayObjectInput':
        let newValueObject: any = watch('properties');
        if (idObject && newValueObject && newValueObject[idObject]) {
          let newArray: any = newValueObject[idObject];
          let newElement = newArray[newArray.length - 1];
          newElement[id] = date;
          newArray.pop();
          newArray.push(newElement);
          newValueObject[idObject] = newArray;
          field.onChange(newValueObject);
        }
    }
  };

  return (
    <View style={{paddingHorizontal: 10}}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={showDatePicker} style={styles.btnDate}>
        <Text
          style={[
            styles.txtInput,
            {
              justifyContent: 'flex-end',
              paddingTop: height * 0.019,
              paddingBottom: height * 0.019,
            },
          ]}>
          {value ? moment(value).format('DD-MM-YYYY') : 'Nhập thời gian'}
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

export default DatepickerItemAttribute;

const styles = StyleSheet.create({
  txtInput: {
    fontSize: 16,
    fontWeight: '500',
    color: '#707386',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#707386',
    paddingVertical: height * 0.01,
  },
  btnDate: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#F1F2F8',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingRight: 10,
  },
});
