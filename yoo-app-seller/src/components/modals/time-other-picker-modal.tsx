import React, {useState} from 'react';

import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import TimePickerOther from '../common/time-picker-other';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';

const {width} = Dimensions.get('screen');

type Props = {
  isVisible: boolean;
  mode: 'month' | 'year' | 'quarter';
  /**
   example: new Date('1970-01-01')
   */
  timeStart: Date;
  /**
    example: new Date() : for now
    🤧
    */
  timeEnd: Date;
  onChange: Function;
  onClose: Function;
  valueDefault?: {
    month?: number;
    quarter?: number;
    year: number;
  };
};

export const TimePickerMode = {
  month: 'month',
  year: 'year',
  quarter: 'quarter',
};

const TimeOtherPickerModal = ({
  isVisible,
  mode,
  timeStart,
  timeEnd,
  onChange,
  valueDefault,
}: Props) => {
  const {t} = useTranslation();

  const [timeValue, setTimeValue] = useState(
    valueDefault ?? {
      year: new Date().getFullYear(),
      month: undefined,
      quarter: undefined,
    },
  );

  return (
    <Modal visible={isVisible} transparent={true} animationType="fade">
      <View style={styles.container}>
        <TouchableWithoutFeedback
          style={{
            flex: 1,
          }}
          onPress={() => {
            onChange(timeValue);
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.2)',
            }}>
            <Pressable
              style={{
                backgroundColor: 'white',
                width: width * 0.9,
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <View style={styles.header}>
                <Text
                  style={{
                    color: '#F1F2F8',
                    fontSize: 15,
                    fontWeight: '600',
                  }}>
                  {mode === TimePickerMode.year
                    ? `${t(i18nKeys.statistic.sales.byYear)}`
                    : mode === TimePickerMode.month
                    ? `${t(i18nKeys.statistic.sales.byMonth)}`
                    : `${t(i18nKeys.statistic.sales.byQuarter)}`}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    // onClose();
                    onChange(timeValue);
                  }}>
                  <Text
                    style={{
                      color: '#F1F2F8',
                      fontSize: 15,
                      fontWeight: '600',
                    }}>
                    {t(i18nKeys.common.done)}
                  </Text>
                </TouchableOpacity>
              </View>
              <TimePickerOther
                mode={mode}
                timeEnd={timeEnd}
                timeStart={timeStart}
                valueDefault={timeValue}
                onChangeValue={setTimeValue}
              />
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

export default TimeOtherPickerModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: width * 0.04,
    paddingVertical: 5,
    backgroundColor: '#75A3C7',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
