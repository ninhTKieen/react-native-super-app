import React, {useEffect, useState} from 'react';

import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Divider, Menu} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import TopBar from '@/components/top-bar';
import IconGeneral from '@/components/common/icon-general';
import DropDownIcon from '@/assets/statistic/chevron-up.svg';
import TickWhiteIcon from '@/assets/statistic/tick-white.svg';
import ChartStatistic from './components/chart-statistic';
import TabBarStatistic from './components/tab-bar-statistic';
import ItemRankingList from './components/item-ranking-list';
import LoadingModal from '@/components/modals/loading-modal';
import TimeOtherPickerModal from '@/components/modals/time-other-picker-modal';
import RNDatePickerModal from '@/components/modals/rn-date-picker-modal';
import CalendarPickerModal from './components/calendar-picker-modal';

import moment from 'moment';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/hooks/redux.hook';
import {useQuery} from '@tanstack/react-query';
import {selectCurrentStore} from '@/features/store/store.slice';
import itemService from '@/features/item/item.service';
import {
  DATE_FILTER,
  ORDER_FILTER,
  TYPE_FILTER,
  TypeChartFilter,
} from './constants/statistic-sale.constants';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {color} from '@/configs/globalStyles';
import {TypeStatistic} from '@/features/statistic/statistic.model';

const {width, height} = Dimensions.get('screen');

type menuDate = {
  visible: boolean;
  value: {
    name: string;
    type: number;
  };
  modalVisible: boolean;
  timeValue?: {
    year: number;
    month?: number;
    quarter?: number;
    day?: number;
    dateFrom?: Date;
  };
};
type menuOrder = {
  visible: boolean;
  value: {
    name: string;
    description: string;
  };
};

const StatisticSaleScreen = () => {
  const {t} = useTranslation();
  const currentStoreId = useAppSelector(selectCurrentStore);
  const [menuDateState, setMenuDateState] = useState<menuDate>({
    visible: false,
    value: {
      name: 'statistic.sales.byDay',
      type: 5,
    },
    timeValue: {
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    },
    modalVisible: false,
  });
  const [menuOrderState, setMenuOrderState] = useState<menuOrder>({
    visible: false,
    value: {
      name: ORDER_FILTER[2].name,
      description: ORDER_FILTER[2].description,
    },
  });
  const [orderByProductFilter, setOrderByProductFilter] = useState<number>(0);
  const [typeChartFilter, setTypeChartFilter] = useState<number>(
    TypeChartFilter.Orders,
  );

  const {
    data: listItemRanking,
    refetch: refetchItemRanking,
    isLoading: loadingItemRanking,
  } = useQuery({
    queryKey: ['itemRank'],
    queryFn: () =>
      itemService.getItemRanking({
        providerId: currentStoreId,
        formId: orderByProductFilter + 1,
      }),
  });

  const {data: chartData, refetch: refetchChart} = useQuery({
    queryKey: ['chartData'],
    queryFn: () =>
      itemService.getStatisticOrders({
        ProviderId: currentStoreId,
        FormId: 1,
        Type: menuDateState.value.type,
        DateFrom: moment(menuDateState.timeValue?.dateFrom).format(
          'MM-DD-YYYY',
        ) as any,
        DateTo: moment(menuDateState.timeValue?.dateFrom)
          .add(6, 'days')
          .format('MM-DD-YYYY') as any,
        Year: menuDateState.timeValue?.year,
        Month: menuDateState.timeValue?.month,
        Day: menuDateState.timeValue?.day,
      }),
  });

  useEffect(() => {
    if (menuDateState.timeValue) {
      refetchChart();
    }
  }, [menuDateState, refetchChart]);

  useEffect(() => {
    refetchItemRanking();
  }, [orderByProductFilter, refetchItemRanking]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <TopBar
        title={t(i18nKeys.statistic.sales.title)}
        left={
          <View style={styles.iconBack}>
            <IconGeneral
              type="Ionicons"
              name="chevron-back-outline"
              color={'#707386'}
              size={24}
            />
          </View>
        }
        styleContainer={styles.header}
      />
      <ScrollView
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.containerFilter}>
            <Menu
              visible={menuOrderState.visible}
              onDismiss={() =>
                setMenuOrderState({
                  ...menuOrderState,
                  visible: false,
                })
              }
              anchorPosition="bottom"
              contentStyle={styles.itemFilter}
              anchor={
                <TouchableOpacity
                  onPress={() =>
                    setMenuOrderState({
                      ...menuOrderState,
                      visible: true,
                    })
                  }
                  style={styles.btnFilter}>
                  <View
                    style={{
                      height: '100%',
                    }}>
                    <View style={styles.tickIcon}>
                      <TickWhiteIcon />
                    </View>
                  </View>

                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.txtFilter}>
                        {t(i18nKeys.statistic.sales.orderType)}
                      </Text>

                      <DropDownIcon />
                    </View>
                    <Text style={[styles.txtFilter, {paddingBottom: 5}]}>
                      {t(menuOrderState.value.name)}
                    </Text>
                  </View>
                </TouchableOpacity>
              }>
              <View style={styles.headerFilter} />

              {ORDER_FILTER.map((item, index) => {
                return (
                  <TouchableOpacity
                    disabled
                    key={index}
                    onPress={() => {
                      setMenuOrderState({
                        visible: false,
                        value: item,
                      });
                    }}
                    style={{
                      paddingHorizontal: width * 0.04,
                      paddingVertical: height * 0.005,
                    }}>
                    <Text style={styles.txtItemFilter}>{t(item.name)}</Text>

                    <Text style={styles.txtDescription}>
                      {t(item.description)}
                    </Text>
                    {index !== 2 && <Divider />}
                  </TouchableOpacity>
                );
              })}
            </Menu>

            <Menu
              visible={menuDateState.visible}
              onDismiss={() =>
                setMenuDateState({
                  ...menuDateState,
                  visible: false,
                })
              }
              anchorPosition="bottom"
              contentStyle={styles.itemFilter}
              anchor={
                <TouchableOpacity
                  onPress={() => {
                    setMenuDateState({
                      ...menuDateState,
                      visible: true,
                    });
                  }}
                  style={styles.btnFilter}>
                  <View
                    style={{
                      height: '100%',
                    }}>
                    <View style={styles.tickIcon}>
                      <TickWhiteIcon />
                    </View>
                  </View>

                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.txtFilter}>
                        {t(i18nKeys.statistic.sales.timeFrames)}
                      </Text>

                      <DropDownIcon />
                    </View>
                    <Text style={[styles.txtFilter, {paddingBottom: 5}]}>
                      {t(menuDateState.value.name)}
                    </Text>
                  </View>
                </TouchableOpacity>
              }>
              <View>
                <View style={styles.headerFilter} />
                {DATE_FILTER.map((item, index) => {
                  return (
                    <View key={index}>
                      <TouchableOpacity
                        onPress={() => {
                          setMenuDateState({
                            modalVisible: true,
                            visible: false,
                            value: item,
                          });
                        }}
                        style={{
                          height: height * 0.058,
                          justifyContent: 'space-between',
                          paddingHorizontal: width * 0.035,
                          flexDirection: 'row',
                          alignItems: 'center',
                          backgroundColor:
                            item.type === menuDateState.value.type
                              ? color.grey7
                              : color.white,
                        }}>
                        <Text style={styles.txtItemFilter}>{t(item.name)}</Text>
                        {item.type === menuDateState.value.type && (
                          <View style={styles.tickIcon}>
                            <TickWhiteIcon />
                          </View>
                        )}
                      </TouchableOpacity>
                      {index !== 4 && <Divider />}
                    </View>
                  );
                })}
              </View>
            </Menu>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: width * 0.04,
              paddingBottom: height * 0.026,
            }}>
            <Text style={styles.txtLabelSection}>
              {t(i18nKeys.statistic.sales.keyMetrics.title)}
            </Text>
            <Text style={styles.txtTitleSection}>
              {t(i18nKeys.statistic.sales.lastUpdatedAt)}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingHorizontal: width * 0.02,
            }}>
            {TYPE_FILTER.map((item, index) => {
              return (
                <TouchableOpacity
                  disabled={index === TypeChartFilter.Visitors}
                  key={index}
                  style={[
                    styles.typeFilterItem,
                    {
                      backgroundColor:
                        typeChartFilter === item.type
                          ? '#A0E8FF'
                          : 'rgba(183, 212, 255, 0.2)',
                    },
                  ]}
                  onPress={() => {
                    setTypeChartFilter(item.type);
                  }}>
                  <Text
                    style={[
                      styles.typeFilterTitle,
                      {
                        color:
                          typeChartFilter === item.type ? '#2B5783' : '#707386',
                      },
                    ]}>
                    {t(item.name)} {item.value ? `(${item.value})` : ''}
                  </Text>
                  <Text
                    style={[
                      styles.typeFilterValue,
                      {
                        color:
                          typeChartFilter === item.type ? '#2B5783' : '#707386',
                      },
                    ]}>
                    0
                  </Text>
                  <Text
                    style={[
                      styles.typeFilterPercent,
                      {
                        color:
                          typeChartFilter === item.type ? '#2B5783' : '#707386',
                      },
                    ]}>
                    %
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View
            style={{
              paddingVertical: height * 0.02,
              flexDirection: 'row',
            }}>
            <Text
              style={[
                styles.txtLabelSection,
                {paddingHorizontal: width * 0.04},
              ]}>
              {typeChartFilter === TypeChartFilter.Orders
                ? `${t(i18nKeys.statistic.sales.orderChart.title)} `
                : `${t(i18nKeys.statistic.sales.salesChart.title)} `}
              {menuDateState.value.type === TypeStatistic.DAY
                ? `${t(i18nKeys.statistic.sales.day)} ${
                    menuDateState.timeValue?.day
                  }/${menuDateState.timeValue?.month}/${
                    menuDateState.timeValue?.year
                  }`
                : menuDateState.value.type === TypeStatistic.WEEK
                ? `${t(i18nKeys.statistic.sales.week)} ${t(
                    i18nKeys.statistic.sales.from,
                  )} ${moment(menuDateState.timeValue?.dateFrom).format(
                    'DD/MM/YYYY',
                  )}`
                : menuDateState.value.type === TypeStatistic.MONTH
                ? `${t(i18nKeys.statistic.sales.month)} ${
                    menuDateState.timeValue?.month
                  }/${menuDateState.timeValue?.year}`
                : menuDateState.value.type === TypeStatistic.YEAR
                ? `${t(i18nKeys.statistic.sales.year)} ${
                    menuDateState.timeValue?.year
                  }`
                : ''}
            </Text>
          </View>

          <ChartStatistic
            typeXLabel={menuDateState.value.type}
            year={menuDateState.timeValue?.year}
            month={menuDateState.timeValue?.month}
            day={menuDateState.timeValue?.day}
            dateFrom={menuDateState.timeValue?.dateFrom}
            dataChart={
              chartData
                ? typeChartFilter === TypeChartFilter.Orders
                  ? chartData.listCount
                  : chartData.listRevenue
                : menuDateState.value.type === 1
                ? [...Array(12).keys()]
                : menuDateState.value.type === 3
                ? [...Array(30).keys()]
                : menuDateState.value.type === 4
                ? [...Array(7).keys()]
                : menuDateState.value.type === 5
                ? [...Array(24).keys()]
                : []
            }
          />
        </View>

        <View>
          <View
            style={{
              backgroundColor: 'white',
            }}>
            <Text
              style={{
                paddingHorizontal: width * 0.04,
                paddingVertical: height * 0.01,
                color: '#2B5783',
                fontSize: 18,
                fontWeight: '600',
                backgroundColor: 'white',
              }}>
              {t(i18nKeys.statistic.sales.itemRanking)}
            </Text>
          </View>

          <TabBarStatistic
            stateIndex={orderByProductFilter}
            setStateIndex={setOrderByProductFilter}
            numberTab={2}
            routes={[
              {
                title: t(i18nKeys.statistic.sales.name),
                icon: {
                  normal: {
                    type: 'Ionicons',
                    name: 'ios-swap-vertical-outline',
                    color: '#6c757d',
                    size: 18,
                  },
                  focused: {
                    type: 'Ionicons',
                    name: 'ios-swap-vertical-outline',
                    color: '#75A3C7',
                    size: 18,
                  },
                },
              },
              {
                title: t(i18nKeys.statistic.sales.unitsSold),
                icon: {
                  normal: {
                    type: 'Ionicons',
                    name: 'ios-swap-vertical-outline',
                    color: '#6c757d',
                    size: 18,
                  },
                  focused: {
                    type: 'Ionicons',
                    name: 'ios-swap-vertical-outline',
                    color: '#75A3C7',
                    size: 18,
                  },
                },
              },
            ]}
            txtStyles={focused => {
              return {
                color: focused ? '#75A3C7' : '#6c757d',
                fontSize: 14,
                fontWeight: focused ? '700' : '400',
                textAlign: 'center',
              };
            }}
            containerStyles={{
              paddingHorizontal: 0,
            }}
            indicatorStyles={{
              borderBottomWidth: 3,
              borderColor: '#75A3C7',
              paddingVertical: 5.5,
            }}
            tabItemStyle={{
              borderBottomWidth: 3,
              paddingVertical: 2,
              borderBottomColor: '#D9D9D9',
            }}
            widthTab={width}
          />
        </View>
        <ItemRankingList data={listItemRanking} />
      </ScrollView>

      <TimeOtherPickerModal
        isVisible={
          (menuDateState.value.type === TypeStatistic.YEAR ||
            menuDateState.value.type === TypeStatistic.QUARTER ||
            menuDateState.value.type === TypeStatistic.MONTH) &&
          menuDateState.modalVisible
        }
        mode={
          menuDateState.value.type === TypeStatistic.MONTH
            ? 'month'
            : menuDateState.value.type === TypeStatistic.QUARTER
            ? 'quarter'
            : 'year'
        }
        timeStart={new Date('2000-01-01')}
        timeEnd={new Date()}
        onChange={(value: any) => {
          setMenuDateState({
            ...menuDateState,
            timeValue: value,
            modalVisible: false,
          });
        }}
        onClose={() => {
          setMenuDateState({
            ...menuDateState,
            modalVisible: false,
          });
        }}
        valueDefault={menuDateState.timeValue}
      />

      <CalendarPickerModal
        isVisible={
          menuDateState.value.type === TypeStatistic.WEEK &&
          menuDateState.modalVisible
        }
        onClose={() => {
          setMenuDateState({
            ...menuDateState,
            modalVisible: false,
          });
        }}
        onChange={(value: Date) => {
          setMenuDateState({
            ...menuDateState,
            timeValue: {
              ...menuDateState.timeValue,
              year: menuDateState.timeValue?.year ?? new Date().getFullYear(),
              dateFrom: value ?? new Date(),
            },
            modalVisible: false,
          });
        }}
        valueDefault={menuDateState.timeValue?.dateFrom ?? new Date()}
      />

      <RNDatePickerModal
        modalStatus={
          menuDateState.value.type === TypeStatistic.DAY &&
          menuDateState.modalVisible
        }
        defaultValue={
          menuDateState.timeValue?.day
            ? moment(
                `${menuDateState.timeValue?.day}-${menuDateState.timeValue.month}-${menuDateState.timeValue.year}`,
              ).toDate()
            : new Date()
        }
        mode="date"
        setModalStatus={() => {
          setMenuDateState({
            ...menuDateState,
            modalVisible: false,
            timeValue: {
              ...menuDateState.timeValue,
              month: new Date().getMonth() + 1,
              year: new Date().getFullYear(),
              day: new Date().getDate(),
            },
          });
        }}
        onChange={(date: string) => {
          setMenuDateState({
            ...menuDateState,
            timeValue: {
              ...menuDateState.timeValue,
              month: moment(date).month() + 1,
              year: moment(date).year(),
              day: new Date(date).getDate(),
            },
            modalVisible: false,
          });
        }}
      />
      {loadingItemRanking && <LoadingModal />}
    </View>
  );
};

export default StatisticSaleScreen;

const styles = StyleSheet.create({
  txtFilter: {
    fontSize: 13,
    fontWeight: '500',
    color: '#75A3C7',
    paddingTop: 5,
    paddingHorizontal: 7,
  },
  txtItemFilter: {
    fontSize: 13,
    fontWeight: '600',
    color: '#707386',
  },
  headerFilter: {
    height: height * 0.015,
    backgroundColor: '#75A3C7',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tickIcon: {
    backgroundColor: '#75A3C7',
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  btnFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#75A3C7',
    borderRadius: 10,
    width: width * 0.44,
  },
  itemFilter: {
    backgroundColor: 'white',
    width: width * 0.918,
    paddingVertical: 0,
    borderRadius: 10,
  },
  txtDescription: {
    paddingTop: height * 0.007,
    paddingBottom: height * 0.015,
    fontSize: 13,
    fontWeight: '300',
    color: '#75A3C7',
    textAlign: 'justify',
  },
  iconBack: {
    backgroundColor: '#F1F2F8',
    borderRadius: width * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.062,
    aspectRatio: 1,
  },
  header: {
    borderBottomWidth: 4,
    borderColor: '#F1F2F8',
  },
  containerFilter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: width * 0.015,
    paddingVertical: height * 0.015,
  },
  txtLabelSection: {
    color: '#707386',
    fontSize: 16,
    fontWeight: '600',
  },
  txtTitleSection: {
    color: '#878A9C',
    fontSize: 14.6,
    fontWeight: '500',
  },
  typeFilterTitle: {
    color: '#707386',
    fontSize: 13,
    fontWeight: '600',
  },
  typeFilterValue: {
    color: '#707386',
    fontSize: 13,
    fontWeight: '700',
  },
  typeFilterPercent: {
    color: '#707386',
    fontSize: 12,
    fontWeight: '500',
  },
  typeFilterItem: {
    borderRadius: 5,
    backgroundColor: 'rgba(183, 212, 255, 0.2)',
    width: width * 0.29,
    height: height * 0.084,
    justifyContent: 'space-around',
    paddingHorizontal: width * 0.025,
  },
});
