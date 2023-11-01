import React from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';

const {width, height} = Dimensions.get('screen');
type Props = {
  typeXLabel: number;
  year?: number;
  month?: number;
  day?: number;
  dateFrom?: Date;
  dataChart: number[];
};

const ChartStatistic = ({
  typeXLabel,
  year,
  month,
  dateFrom,
  dataChart,
}: Props) => {
  const {t} = useTranslation();

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
    strokeWidth: 2,
  };

  const renderXLabelChart = () => {
    switch (typeXLabel) {
      case 1:
        return [
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

      case 3:
        if (year && month) {
          const numberDays =
            moment(`${year}-${month}`, 'YYYY-MM').daysInMonth() ?? 30;
          return [...Array(numberDays).keys()].map(el => `${el + 1}/${month}`);
        } else {
          return [];
        }
      case 4:
        return [...Array(7).keys()].map(el =>
          moment(dateFrom).add(el, 'days').format('DD/MM'),
        );
      case 5:
        return [...Array(24).keys()].map(el => {
          const key = `times.chart.${el}`;
          return `${t(key)}`;
        });
      default:
        return [];
    }
  };
  const data = {
    labels: renderXLabelChart(),
    datasets: [
      // {
      //   data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      //   color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      //   strokeWidth: 2, // optional
      // },
    ],
    // legend: ['Rainy Days'], // optional
  };
  const CHART_DATA = {
    ...data,
    datasets: [
      {
        data: dataChart,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={{flexDirection: 'row'}}>
      {dataChart && (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <LineChart
            fromZero={true}
            width={
              width * (typeXLabel === 4 ? 0.2 : 0.15) * CHART_DATA.labels.length
            }
            height={height * 0.385}
            data={CHART_DATA}
            chartConfig={chartConfigs as any}
            style={styles.graphStyle}
            withHorizontalLabels={true}
            bezier
            yLabelsOffset={-1}
            formatYLabel={(yValue: string) => {
              let numYValue = Number(yValue);
              let formatYValue = '';
              if (numYValue >= 1000000000) {
                formatYValue = (numYValue / 1000000000).toFixed(2) + 'B';
              } else if (numYValue >= 1000000) {
                formatYValue = (numYValue / 1000000).toFixed(2) + 'M';
              } else if (numYValue >= 1000) {
                formatYValue = (numYValue / 1000).toFixed(2) + 'K';
              } else {
                formatYValue = numYValue.toString();
              }
              return `${formatYValue}`;
            }}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default ChartStatistic;

const styles = StyleSheet.create({
  graphStyle: {
    marginLeft: width * 0.05,
    paddingVertical: 8,
    paddingLeft: 0,
  },
});
