import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import InputItemAttribute from './components/input-item-attribute';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ItemBookingStackParamList} from '@/routes/item-booking.route';
import {useController, useFormContext} from 'react-hook-form';
import DatepickerItemAttribute from './components/datepicker-item-attribute';
import TopBar from '@/components/top-bar';
type Props = NativeStackScreenProps<
  ItemBookingStackParamList,
  'ArrayObjectAttributeCreate'
>;
const ArrayObjectAttributeCreateScreen = ({navigation, route}: Props) => {
  const data = route.params.item;
  const {control, watch} = useFormContext();
  const {field} = useController({
    name: 'properties',
    control,
  });

  return (
    <View>
      <TopBar
        title={data?.label ?? 'Chi tiết'}
        onPressLeft={() => {
          let newValueObject: any = watch('properties');
          if (newValueObject && newValueObject[data.id]) {
            const newArray: any = newValueObject[data.id];
            newArray.pop();
            newValueObject[data.id] = newArray;
            field.onChange(newValueObject);
          }
          navigation.goBack();
        }}
      />
      {data.properties.map((val: any, i: number) => {
        return (
          <View key={i} style={{paddingBottom: 20}}>
            {val.type === 'date' ? (
              <DatepickerItemAttribute
                id={val.id}
                label={val.label}
                type="arrayObjectInput"
                value={
                  watch('properties') &&
                  watch('properties')[data.id] &&
                  watch('properties')[data.id][
                    watch('properties')[data.id].length - 1
                  ]
                    ? watch('properties')[data.id][
                        watch('properties')[data.id].length - 1
                      ][val.id]
                    : undefined
                }
                idObject={data.id}
                error={''}
              />
            ) : (
              <InputItemAttribute
                id={val.id}
                label={val.label}
                type="arrayObjectInput"
                value={
                  watch('properties') &&
                  watch('properties')[data.id] &&
                  watch('properties')[data.id][
                    watch('properties')[data.id].length - 1
                  ]
                    ? watch('properties')[data.id][
                        watch('properties')[data.id].length - 1
                      ][val.id]
                    : undefined
                }
                idObject={data.id}
                error={''}
              />
            )}
          </View>
        );
      })}
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          backgroundColor: '#75A3C7',
          width: '70%',
          padding: '3%',
          alignSelf: 'center',
          alignItems: 'center',
          borderRadius: 10,
        }}>
        <Text style={{color: 'white', fontSize: 14, fontWeight: '500'}}>
          Lưu
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ArrayObjectAttributeCreateScreen;

const styles = StyleSheet.create({});
