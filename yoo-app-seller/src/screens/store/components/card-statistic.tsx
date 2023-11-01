import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {useTranslation} from 'react-i18next';
import ArrowIcon from '../../../assets/store/icons/arrow_increase.svg';
import {BarChart} from 'react-native-chart-kit';
import {shadowConstants} from '@/configs/shadowStyles';

const {width, height} = Dimensions.get('screen');
const chartConfigs = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(122, 138, 237,${opacity})`,
  labelColor: () => 'rgba(112, 115, 134, 1)',
  fillShadowGradientTo: '#A1C4FD',
  fillShadowGradientToOpacity: '#A1C4FD',
  fillShadowGradientFrom: '#C2E9FB',
  fillShadowGradientFromOpacity: '#C2E9FB',
  barRadius: 8,
  decimalPlaces: 0,
  propsForVerticalLabels: {
    fontSize: 13,
    fontWeight: '700',
  },
  propsForHorizontalLabels: {
    fontSize: 13,
    fontWeight: '600',
  },
  propsForBackgroundLines: {
    strokeDasharray: '',
    strokeWidth: 1.5,
  },
  formatYLabel: (ylabel: number) => {
    const fomartUnit = [1000000000, 1000000, 1000];
    for (let i = 0; i < fomartUnit.length; i++) {
      if ((ylabel as unknown) !== '0' && ylabel >= fomartUnit[i]) {
        const unit = i === 0 ? 'B' : i === 1 ? 'M' : 'K';
        const numberAfterCom = String(ylabel % fomartUnit[i]).replaceAll(
          '0',
          '',
        ).length;
        return `${(ylabel / fomartUnit[i]).toFixed(
          numberAfterCom >= 2 ? 2 : numberAfterCom,
        )}${unit} `;
      }
    }
    return `${ylabel} `;
  },
  formatTopBarValue: (topBarValue: number) => {
    const fomartUnit = [1000000000, 1000000, 1000];
    for (let i = 0; i < fomartUnit.length; i++) {
      if ((topBarValue as unknown) !== '0' && topBarValue > fomartUnit[i]) {
        const unit = i === 0 ? 'B' : i === 1 ? 'M' : 'K';
        const numberAfterCom = String(topBarValue % fomartUnit[i]).replaceAll(
          '0',
          '',
        ).length;
        return `${(topBarValue / fomartUnit[i]).toFixed(
          numberAfterCom >= 2 ? 2 : numberAfterCom,
        )}${unit} `;
      }
    }
    return `${topBarValue} `;
  },
};
const data = {
  labels: [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ],
  legend: ['Rainy Days'], // optional
};

const CardMoney = ({
  title,
  valueMoney,
  preValue,
  color,
}: {
  title: string;
  valueMoney: number;
  preValue?: string;
  color: string;
}) => {
  return (
    <View
      style={[
        styles.containerCardMoney,
        {
          backgroundColor: color,
        },
      ]}>
      <Text style={styles.titleCardMoney}>{title}</Text>
      <View style={styles.row}>
        <Text style={styles.txtContentCardMoney}>
          {preValue}
          {valueMoney.toLocaleString('vi', {
            style: 'currency',
            currency: 'VND',
          })}
        </Text>
        <ArrowIcon />
      </View>
    </View>
  );
};
const CardStatistic = ({dataChart}: {dataChart: number[]}) => {
  const {t} = useTranslation();
  const DATA = {
    ...data,
    labels: [
      `${t(i18nKeys.months.shortcut.jan)}`,
      `${t(i18nKeys.months.shortcut.feb)}`,
      `${t(i18nKeys.months.shortcut.mar)}`,
      `${t(i18nKeys.months.shortcut.apr)}`,
      `${t(i18nKeys.months.shortcut.may)}`,
      `${t(i18nKeys.months.shortcut.jun)}`,
      `${t(i18nKeys.months.shortcut.jul)}`,
      `${t(i18nKeys.months.shortcut.aug)}`,
      `${t(i18nKeys.months.shortcut.sep)}`,
      `${t(i18nKeys.months.shortcut.oct)}`,
      `${t(i18nKeys.months.shortcut.nov)}`,
      `${t(i18nKeys.months.shortcut.dec)}`,
    ],
    datasets: [
      {
        data: dataChart ? dataChart : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
  };
  return (
    <View
      style={{
        paddingHorizontal: width * 0.04,
      }}>
      <View
        style={{
          paddingVertical: width * 0.01,
        }}>
        <Text style={styles.txtTitle}>{t(i18nKeys.store.statistic)}</Text>
      </View>
      {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <CardMoney
          title={t(i18nKeys.finance.inflows)}
          valueMoney={2000000}
          preValue="+ "
          color="#FFEAA0"
        />
        <CardMoney
          title={t(i18nKeys.finance.outflows)}
          valueMoney={500000}
          preValue="- "
          color="#A0E8FF"
        />
      </View> */}
      <View style={styles.containerChart}>
        <Text style={styles.txtTitle}>{t(i18nKeys.report.monthlyDetails)}</Text>
        <View style={{flexDirection: 'row'}}>
          <BarChart
            fromZero={true}
            width={width * 0.12}
            height={height * 0.38}
            data={{
              ...DATA,
              labels: [],
            }}
            chartConfig={chartConfigs as any}
            yLabelsOffset={width * 0.04}
            withInnerLines={false}
            yAxisLabel={''}
            yAxisSuffix={''}
            style={{paddingTop: 12}}
          />
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <BarChart
              fromZero={true}
              width={width * 1.8}
              height={height * 0.385}
              data={DATA}
              chartConfig={chartConfigs as any}
              style={styles.graphStyle}
              withHorizontalLabels={false}
              yAxisLabel={''}
              yAxisSuffix={''}
              showValuesOnTopOfBars={true}
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default CardStatistic;

const styles = StyleSheet.create({
  txtTitle: {
    fontSize: 18,
    color: '#2B5783',
    fontWeight: '600',
    paddingVertical: height * 0.015,
    textAlignVertical: 'center',
  },
  titleCardMoney: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2B5783',
    lineHeight: 20,
  },
  containerCardMoney: {
    width: width * 0.438,
    height: height * 0.1025,
    borderRadius: 8,
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.036,
    paddingVertical: height * 0.0178,
  },
  txtContentCardMoney: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2B5783',
    lineHeight: 22.5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  graphStyle: {
    marginLeft: -(width * 0.18),
    paddingVertical: 8,
    paddingLeft: 0,
  },
  containerChart: {
    ...shadowConstants[2],
    borderRadius: 18,
    width: width * 0.918,
    height: height * 0.45,
    backgroundColor: '#fff',
    paddingHorizontal: width * 0.035,
    marginVertical: height * 0.0154,
  },
});
