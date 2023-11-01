import React, {useState} from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import {Button} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {color} from '@/configs/globalStyles';
import DatePicker from 'react-native-date-picker';
import {useFormContext} from 'react-hook-form';

type ITimeFrames = {
  timeFrom: string;
  timeTo: string;
  price: number;
};

const TimeFrameRow = ({
  frame,
  setTimeFrames,
}: {
  index: number;
  frame: ITimeFrames;
  setTimeFrames: (value: any) => void;
}) => {
  const {t} = useTranslation();
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isTimeFrom, setIsTimeFrom] = useState(false);

  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text>{t(i18nKeys.common.from)}</Text>
        <TouchableOpacity
          style={[styles.textInputRow, styles.timeInput]}
          onPress={() => {
            setIsTimeFrom(true);
            setShowTimePicker(true);
          }}>
          <Text>{frame.timeFrom}</Text>
        </TouchableOpacity>

        <Text>{t(i18nKeys.common.to)}</Text>
        <TouchableOpacity
          style={[styles.textInputRow, styles.timeInput]}
          onPress={() => {
            setIsTimeFrom(false);
            setShowTimePicker(true);
          }}>
          <Text>{frame.timeTo}</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginVertical: 10,
          alignItems: 'center',
          flex: 1,
        }}>
        <Text>{t(i18nKeys.itemBooking.create.price)}: </Text>
        <CurrencyInput
          style={[
            styles.textInputRow,
            {
              flex: 1,
              padding: 10,
              borderRadius: 20,
            },
          ]}
          keyboardType="numeric"
          value={frame.price}
          onChangeValue={(value: number) => {
            setTimeFrames({price: value});
          }}
          suffix="đ"
          precision={0}
        />
      </View>

      <DatePicker
        modal
        mode="time"
        date={new Date()}
        open={showTimePicker}
        theme="light"
        androidVariant="iosClone"
        onConfirm={(date: Date) => {
          // time include am or pm
          const time = date.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
          });
          if (isTimeFrom) {
            setTimeFrames({timeFrom: time});
          } else {
            setTimeFrames({timeTo: time});
          }
          setShowTimePicker(false);
        }}
        onCancel={() => setShowTimePicker(false)}
      />
    </View>
  );
};

const FootballTimeFrames = () => {
  const {t} = useTranslation();
  const {watch, setValue} = useFormContext();

  return (
    <View style={styles.container}>
      <View style={{marginTop: 10}}>
        {watch('properties.timeFrames')?.map(
          (item: ITimeFrames, index: number) => (
            <TimeFrameRow
              key={index}
              frame={item}
              index={index}
              setTimeFrames={value => {
                const newTimeFrames = [...watch('properties.timeFrames')];
                const tmp = newTimeFrames[index];
                newTimeFrames[index] = {
                  ...tmp,
                  ...value,
                };
                setValue('properties.timeFrames', newTimeFrames);
              }}
            />
          ),
        )}
      </View>
      <Button
        onPress={() => {
          setValue('properties.timeFrames', [
            ...(watch('properties.timeFrames') || []),
            {
              timeFrom: '00:00',
              timeTo: '00:00',
              price: 0,
            },
          ]);
        }}
        textColor={color.primary}>
        {t(i18nKeys.common.add)}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},

  textInputRow: {
    borderWidth: 1,
  },

  timeInput: {
    width: '35%',
    padding: 5,
    borderRadius: 20,
  },
});

export default FootballTimeFrames;
