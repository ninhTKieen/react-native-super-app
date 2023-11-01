import React, {useState, useEffect} from 'react';
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
import {Calendar, DateData} from 'react-native-calendars';
import {MarkedDates} from 'react-native-calendars/src/types';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {LocaleConfig} from 'react-native-calendars';
import moment from 'moment';

const {width} = Dimensions.get('screen');
type Props = {
  isVisible: boolean;
  onClose: Function;
  onChange: Function;
  valueDefault?: Date;
};

LocaleConfig.locales.en = LocaleConfig.locales[''];
LocaleConfig.locales.vi = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthNamesShort: [
    'Th 1',
    'Th 2',
    'Th 3',
    'Th 4',
    'Th 5',
    'Th 6',
    'Th 7',
    'Th 8',
    'Th 9',
    'Th 10',
    'Th 11',
    'Th 12',
  ],
  dayNames: [
    'Chủ nhật',
    'Thứ hai',
    'Thứ ba',
    'Thứ tư',
    'Thứ năm',
    'Thứ sáu',
    'Thứ bảy',
  ],
  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
};

const CalendarPickerModal = ({isVisible, onChange, valueDefault}: Props) => {
  const {t, i18n} = useTranslation();
  const renderDay = (day: DateData) => {
    return {
      [day.dateString]: {
        startingDay: true,
        color: '#B0DAFF',
        textColor: 'white',
      },
      [moment(day.dateString).add(1, 'days').format('YYYY-MM-DD')]: {
        color: '#B0DAFF',
        textColor: 'white',
      },
      [moment(day.dateString).add(2, 'days').format('YYYY-MM-DD')]: {
        color: '#B0DAFF',
        textColor: 'white',
      },
      [moment(day.dateString).add(3, 'days').format('YYYY-MM-DD')]: {
        color: '#B0DAFF',
        textColor: 'white',
      },
      [moment(day.dateString).add(4, 'days').format('YYYY-MM-DD')]: {
        color: '#B0DAFF',
        textColor: 'white',
      },
      [moment(day.dateString).add(5, 'days').format('YYYY-MM-DD')]: {
        color: '#B0DAFF',
        textColor: 'white',
      },
      [moment(day.dateString).add(6, 'days').format('YYYY-MM-DD')]: {
        endingDay: true,
        color: '#B0DAFF',
        textColor: 'white',
      },
    };
  };

  const [markedDates, setMarkedDates] = useState<MarkedDates>(
    renderDay({
      year: valueDefault
        ? valueDefault.getFullYear()
        : new Date().getFullYear(),
      month: valueDefault ? valueDefault.getMonth() : new Date().getMonth(),
      day: valueDefault ? valueDefault.getDate() : new Date().getDate(),
      timestamp: valueDefault ? valueDefault.getTime() : new Date().getTime(),
      dateString: valueDefault
        ? valueDefault.toDateString()
        : new Date().toDateString(),
    }),
  );

  const handleDayPress = (day: DateData) => {
    const markNewData = renderDay(day);
    setMarkedDates(markNewData);
  };

  useEffect(() => {
    LocaleConfig.defaultLocale = i18n.language;
  }, [i18n.language]);

  return (
    <Modal visible={isVisible} transparent={true} animationType="fade">
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            // onClose();
            onChange(new Date(Object.keys(markedDates)[0]));
          }}>
          <View style={styles.calenderWrapper}>
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
                  {t(i18nKeys.statistic.sales.byWeek)}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    onChange(new Date(Object.keys(markedDates)[0]));
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
              <Calendar
                markedDates={markedDates}
                markingType={'period'}
                onDayPress={handleDayPress}
                headerStyle={{
                  backgroundColor: 'rgba(183, 212, 255, 0.2)',
                  borderRadius: 5,
                }}
                style={{
                  width: width * 0.85,
                  marginVertical: 5,
                }}
                theme={{
                  textSectionTitleColor: '#75A3C7',
                  textDayHeaderFontSize: 13,
                  textDayHeaderFontWeight: '700',
                  todayTextColor: '#00adf5',
                  dayTextColor: '#878A9C',
                  textDayFontWeight: '600',
                  textDayFontSize: 13,
                }}
              />
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

export default CalendarPickerModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  calenderWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
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
