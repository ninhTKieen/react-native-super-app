import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ArrowDown from '@src/assets/arrow-down.svg';
import { EWeekDay } from '@src/common/common.model';
import GradientButton from '@src/components/gradient-button';
import MainLayout from '@src/components/main.layout';
import { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import {
  CreateAutomationStackParamList,
  UpdateAutomationStackParamList,
} from '@src/configs/routes/scene.route';
import { ICreateAutomationScene } from '@src/features/scenes/scene.model';
import { cronStringToTimeAndDays } from '@src/utils/common.util';
import { CronTime } from 'cron-time-generator';
import React, { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TimerPickerModal } from 'react-native-timer-picker';

import ActionDeviceList from '../components/action-device-list';
import RepeatDaysModal from '../components/repeat-days-modal';

const AddConditionScreen = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<CreateAutomationStackParamList, 'CreateAddCondition'>
    >();
  const uNavigation =
    useNavigation<StackNavigationProp<UpdateAutomationStackParamList>>();

  const route =
    useRoute<RouteProp<CreateAutomationStackParamList, 'CreateAddCondition'>>();

  const { currentIndex, mode } = route.params;
  console.log('mode', mode);

  const { t, i18n } = useTranslation();

  const form = useFormContext<ICreateAutomationScene>();

  const isUpdateSchedule =
    currentIndex !== undefined &&
    mode === 'EDIT' &&
    form.getValues('conditions')?.[currentIndex]?.schedule;

  const [repeatDays, setRepeatDays] = useState(
    [
      { id: 0, value: EWeekDay.SUNDAY },
      { id: 1, value: EWeekDay.MONDAY },
      { id: 2, value: EWeekDay.TUESDAY },
      { id: 3, value: EWeekDay.WEDNESDAY },
      { id: 4, value: EWeekDay.THURSDAY },
      { id: 5, value: EWeekDay.FRIDAY },
      { id: 6, value: EWeekDay.SATURDAY },
    ].map((item) => ({
      ...item,
      isSelected: isUpdateSchedule
        ? cronStringToTimeAndDays(
            form.getValues('conditions')[currentIndex].schedule as string,
          )?.days.includes(item.value)
          ? true
          : false
        : true,
    })),
  );
  const [showPicker, setShowPicker] = useState(false);
  const [showRepeatDaysModal, setShowRepeatDaysModal] = useState(false);
  const [time, setTime] = useState<{
    hours: number;
    minutes: number;
  }>({
    hours: isUpdateSchedule
      ? Number(
          cronStringToTimeAndDays(
            form.getValues('conditions')[currentIndex].schedule as string,
          )?.hour,
        )
      : 0,
    minutes: isUpdateSchedule
      ? Number(
          cronStringToTimeAndDays(
            form.getValues('conditions')[currentIndex].schedule as string,
          )?.minute,
        )
      : 0,
  });

  const handleSelectCondition = () => {
    if (route.params.type === 'SCHEDULE') {
      let cron = '';
      if (repeatDays.filter((item) => item.isSelected).length === 7) {
        cron = CronTime.everyDayAt(time.hours, time.minutes);
      } else {
        cron = CronTime.onSpecificDaysAt(
          repeatDays
            .filter((item) => item.isSelected)
            .map((item) => item.value),
          time.hours,
          time.minutes,
        );
      }

      const currentConditions = form.getValues('conditions');
      if (mode === 'EDIT') {
        form.setValue('conditions', [
          ...(currentConditions || []).map((item, index) =>
            index === currentIndex
              ? {
                  ...item,
                  schedule: cron,
                }
              : item,
          ),
        ]);
      } else {
        form.setValue('conditions', [
          ...(currentConditions || []),
          {
            schedule: cron,
          },
        ]);
      }

      navigation.goBack();
    }
  };

  const formatUnitHour = useCallback(
    (hour: number) => {
      if (i18n.language === 'vi') {
        return 'Giờ';
      } else if (i18n.language === 'en') {
        if (hour >= 12) {
          return 'PM';
        } else {
          return 'AM';
        }
      }
    },
    [i18n.language],
  );

  const formatTimeAndMinutes = useCallback(
    (hour: number, minute: number) => {
      const sMinute = minute < 10 ? `0${minute}` : minute;
      if (i18n.language === 'vi') {
        return {
          minutes: sMinute,
          hours: hour,
        };
      } else {
        if (hour > 12) {
          return {
            minutes: sMinute,
            hours: hour - 12,
          };
        } else {
          return {
            minutes: sMinute,
            hours: hour,
          };
        }
      }
    },
    [i18n.language],
  );

  return (
    <MainLayout
      isGoBack
      title={
        route.params.type === 'SCHEDULE'
          ? t(i18nKeys.scene.automation.schedule)
          : route.params.type === 'WEATHER_CHANGES'
          ? t(i18nKeys.scene.automation.whenWeatherChange)
          : t(i18nKeys.scene.automation.deviceStatusChange)
      }
    >
      <ImageBackground
        source={require('@src/assets/home-iot/background.jpeg')}
        style={styles.container}
      >
        {route.params.type === 'SCHEDULE' && (
          <View
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
              zIndex: 50,
            }}
            className="m-2 rounded-2xl border-2 border-white bg-[#F7F7F7]"
          >
            <Text className="my-2 text-center text-lg font-medium text-[#515151]">
              {t(i18nKeys.scene.automation.hour)} -{' '}
              {t(i18nKeys.scene.automation.minute)}
            </Text>

            <Pressable onPress={() => setShowRepeatDaysModal(true)}>
              <View className="m-3 flex-row items-center justify-between rounded-full bg-[#EEEEEE] p-2 px-4">
                <Text className="text-base font-medium text-[#515151]">
                  {t(i18nKeys.scene.automation.repeat)}
                </Text>
                <View className="flex-row items-center">
                  <Text className="mx-2 text-base font-normal text-[#696969]">
                    {repeatDays.filter((item) => item.isSelected).length === 7
                      ? t(i18nKeys.dayOfWeek.everyDay)
                      : repeatDays
                          .filter((item) => item.isSelected)
                          .map((item) =>
                            t(i18nKeys.dayOfWeek.short[item.value]),
                          )
                          .join(',')}
                  </Text>

                  <ArrowDown />
                </View>
              </View>
            </Pressable>

            <LinearGradient
              colors={['#9CC76F', '#C5DA8B']}
              className="m-6 h-28 overflow-hidden rounded-xl p-[1]"
            >
              <Pressable
                className="h-full items-center justify-center rounded-xl bg-white"
                onPress={() => setShowPicker(true)}
              >
                <View className="w-1/2 flex-row items-center justify-between">
                  <View className="h-9 w-20 flex-row rounded-lg border border-[#EEEEEE]">
                    <View className="flex-1 items-center justify-center">
                      <Text className="text-center text-lg font-medium text-[#515151]">
                        {time &&
                          formatTimeAndMinutes(time.hours, time.minutes).hours}
                      </Text>
                    </View>
                    <View className="flex-1 items-center justify-center bg-[#EEEEEE]">
                      <Text className="text-center text-lg font-medium text-[#515151]">
                        {formatUnitHour(time.hours)}
                      </Text>
                    </View>
                  </View>

                  <View className="h-9 w-20 flex-row rounded-lg border border-[#EEEEEE]">
                    <View className="flex-1 items-center justify-center">
                      <Text className="text-center text-lg font-medium text-[#515151]">
                        {time &&
                          formatTimeAndMinutes(time.hours, time.minutes)
                            .minutes}
                      </Text>
                    </View>
                    <View className="flex-1 items-center justify-center bg-[#EEEEEE]">
                      <Text className="text-center text-lg font-medium text-[#515151]">
                        {i18n.language === 'en' ? 'Min' : 'Phút'}
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            </LinearGradient>

            <View className="mb-2 items-center">
              <GradientButton
                additionalStyles={{ width: '90%' }}
                title={t(i18nKeys.common.save)}
                onPress={handleSelectCondition}
              />
            </View>
          </View>
        )}

        {route.params.type === 'DEVICE_CHANGES' && (
          <>
            <ActionDeviceList
              isForCondition
              onPressDeviceItem={(device) => {
                if (mode === 'CREATE') {
                  navigation.replace('CreateSelectDeviceConditionFunc', {
                    device,
                  });
                } else if (mode === 'UPDATE') {
                  uNavigation.replace('UpdateSelectDeviceConditionFunc', {
                    device,
                  });
                }
              }}
            />
          </>
        )}
      </ImageBackground>

      <TimerPickerModal
        visible={showPicker}
        setIsVisible={setShowPicker}
        onConfirm={(pickedDuration) => {
          setTime({
            hours: pickedDuration.hours,
            minutes: pickedDuration.minutes,
          });
          setShowPicker(false);
        }}
        modalTitle={t(i18nKeys.scene.automation.setExecutionTime)}
        onCancel={() => setShowPicker(false)}
        closeOnOverlayPress
        use12HourPicker={i18n.language === 'en' ? true : false}
        styles={{
          theme: 'light',
        }}
        modalProps={{
          overlayOpacity: 0.2,
        }}
        LinearGradient={LinearGradient}
        cancelButtonText={t(i18nKeys.common.cancel)}
        confirmButtonText={t(i18nKeys.common.confirm)}
        hideSeconds
        initialHours={time.hours}
        initialMinutes={time.minutes}
      />

      <RepeatDaysModal
        isVisible={showRepeatDaysModal}
        setIsVisible={setShowRepeatDaysModal}
        repeatDays={repeatDays}
        setRepeatDays={setRepeatDays}
      />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },

  itemRow: {
    margin: 10,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },
});

export default AddConditionScreen;
