import React, {useState} from 'react';
import {View, ViewStyle} from 'react-native';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {Picker} from 'react-native-wheel-pick';

type Props = {
  /**
   mode: filter by month, year or quarter
   */
  mode: 'month' | 'year' | 'quarter';
  /**
   example: new Date('1970-01-01')
   */
  timeStart: Date;
  /**
   example: new Date() : for now
   */
  timeEnd: Date;
  valueDefault?: {
    year: number;
    month?: number;
    quarter?: number;
  };
  stylePickerYear?: ViewStyle;
  stylePickerMonth?: ViewStyle;
  stylePickerQuarter?: ViewStyle;
  styleContainer?: ViewStyle;
  onChangeValue: ({
    year,
    month,
    quarter,
  }: {
    year: number;
    month?: number;
    quarter?: number;
  }) => void;
};

const arrayRange = (start: number, stop: number, step: number) =>
  Array.from(
    {length: (stop - start) / step + 1},
    (value, index) => start + index * step,
  );

const TimePickerOther = ({
  mode,
  timeStart,
  timeEnd,
  stylePickerYear,
  stylePickerMonth,
  stylePickerQuarter,
  styleContainer,
  valueDefault,
  onChangeValue,
}: Props) => {
  const {t} = useTranslation();

  const [timeValue, setTimeValue] = useState(
    valueDefault ?? {
      month: undefined,
      year: new Date().getFullYear(),
      quarter: undefined,
    },
  );
  const dataYear = arrayRange(
    timeStart.getFullYear(),
    timeEnd.getFullYear(),
    1,
  );

  const listMonth = [
    t(i18nKeys.months.shortcut.jan),
    t(i18nKeys.months.shortcut.feb),
    t(i18nKeys.months.shortcut.mar),
    t(i18nKeys.months.shortcut.apr),
    t(i18nKeys.months.shortcut.may),
    t(i18nKeys.months.shortcut.jun),
    t(i18nKeys.months.shortcut.jul),
    t(i18nKeys.months.shortcut.aug),
    t(i18nKeys.months.shortcut.sep),
    t(i18nKeys.months.shortcut.oct),
    t(i18nKeys.months.shortcut.nov),
    t(i18nKeys.months.shortcut.dec),
  ];

  return (
    <View
      style={{
        flexDirection: 'row',
        ...(styleContainer ?? {}),
      }}>
      {mode === 'quarter' && (
        <Picker
          style={{
            backgroundColor: 'white',
            width: 120,
            height: 215,
            ...(stylePickerQuarter ?? {}),
          }}
          selectedValue={
            valueDefault?.quarter
              ? valueDefault?.quarter
              : t(i18nKeys.quarter.first)
          }
          pickerData={[
            t(i18nKeys.quarter.first),
            t(i18nKeys.quarter.second),
            t(i18nKeys.quarter.third),
            t(i18nKeys.quarter.fourth),
          ]}
          onValueChange={(value: any) => {
            setTimeValue({
              ...timeValue,
              quarter: value,
            });
            onChangeValue({
              ...timeValue,
              quarter: value,
            });
          }}
        />
      )}

      {mode === 'month' && (
        <Picker
          style={{
            backgroundColor: '#fff',
            width: 125,
            height: 215,
            ...(stylePickerMonth ?? {}),
          }}
          selectedValue={`${
            valueDefault?.month
              ? listMonth[valueDefault?.month - 1]
              : listMonth[new Date().getMonth()]
          }`}
          pickerData={listMonth}
          onValueChange={(value: any) => {
            const indexItem = listMonth.findIndex(element => element === value);
            setTimeValue({
              ...timeValue,
              month: (indexItem !== -1 ? indexItem : 0) + 1,
            });
            onChangeValue({
              ...timeValue,
              month: (indexItem !== -1 ? indexItem : 0) + 1,
            });
          }}
        />
      )}
      <Picker
        style={{
          backgroundColor: 'white',
          width: 120,
          height: 215,
          ...(stylePickerYear ?? {}),
        }}
        selectedValue={
          valueDefault?.year
            ? valueDefault?.year
            : dataYear[Math.floor(dataYear.length / 2)].toString()
        }
        pickerData={dataYear}
        onValueChange={(value: any) => {
          setTimeValue({
            ...timeValue,
            year: value,
          });
          onChangeValue({
            ...timeValue,
            year: value,
          });
        }}
      />
    </View>
  );
};

export default TimePickerOther;
