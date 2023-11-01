import React, {useEffect, useState} from 'react';

import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import {Button} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';

const {width, height} = Dimensions.get('screen');
type Props = {
  onChange: Function;
  modalStatus: boolean;
  setModalStatus: Function;
  defaultValue: Date;
  mode?: 'date' | 'time' | 'datetime';
  minDate?: Date;
  maxDate?: Date;
};

export default function RNDatePickerModal({
  onChange = () => {},
  modalStatus = false,
  setModalStatus = () => {},
  defaultValue,
  mode = 'date',
  minDate,
  maxDate,
}: Props) {
  const {t, i18n} = useTranslation();
  const [dateValue, setDateValue] = useState<Date>(defaultValue);
  const [timeValue, setTimeValue] = useState<Date>(defaultValue);
  useEffect(() => {
    if (modalStatus) {
      setDateValue(defaultValue);
      setTimeValue(defaultValue);
    }
  }, [defaultValue, modalStatus]);

  return (
    <Modal
      isVisible={modalStatus}
      onBackdropPress={() => {
        setModalStatus(false);
      }}>
      <View style={{backgroundColor: 'white', borderRadius: 8}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#75A3C7',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            paddingVertical: 10,
            paddingHorizontal: 10,
          }}>
          <Text style={styles.txtModalTitle}>
            {t(i18nKeys.statistic.sales.byDay)}
          </Text>
          <TouchableOpacity>
            <Text
              style={styles.txtModalTitle}
              onPress={() => {
                setModalStatus(false);
              }}>
              {t(i18nKeys.common.cancel)}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <View style={{transform: [{scale: 0.9}]}}>
            {(mode === 'date' || mode === 'datetime') && (
              <DatePicker
                mode="date"
                maximumDate={maxDate ? maxDate : new Date()}
                minimumDate={minDate ? minDate : new Date(1940, 0, 1)}
                date={dateValue}
                onDateChange={date => {
                  if (date) {
                    setDateValue(date);
                  }
                }}
                locale={i18n.language}
                style={{
                  height: height * 0.24,
                  width: mode === 'date' ? width * 0.9 : width * 0.6,
                }}
                theme="light"
                textColor="#878A9C"
              />
            )}
          </View>
          <View style={{transform: [{scale: 0.9}]}}>
            {(mode === 'time' || mode === 'datetime') && (
              <DatePicker
                mode="time"
                date={timeValue}
                onDateChange={date => {
                  if (date) {
                    setTimeValue(date);
                  }
                }}
                locale={i18n.language}
                style={{
                  height: height * 0.24,
                  width: mode === 'time' ? width * 0.9 : width * 0.25,
                }}
                theme="light"
                textColor="#878A9C"
                is24hourSource="locale"
              />
            )}
          </View>
        </View>

        <Button
          style={[styles.button, styles.saveBtn]}
          onPress={() => {
            setModalStatus(false);
            const submitDate = moment(dateValue).format('YYYY-MM-DD');
            const submitTime = moment(timeValue).format('hh:mm:ss');
            const submitData = moment(submitDate + 'T' + submitTime);
            onChange(submitData.toISOString());
          }}>
          <Text style={{color: '#fff', fontWeight: '700', fontSize: 14}}>
            {t(i18nKeys.common.confirm)}
          </Text>
        </Button>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 5,
  },
  saveBtn: {
    backgroundColor: '#75A3C7',
    borderWidth: 0,
    width: width * 0.8,
    marginBottom: height * 0.015,
    alignSelf: 'center',
  },
  txtModalTitle: {color: 'white', fontSize: 15, fontWeight: '600'},
});
