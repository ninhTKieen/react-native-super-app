export const DATE_FILTER = [
  {
    name: 'statistic.sales.byDay',
    type: 5,
  },
  {
    name: 'statistic.sales.byWeek',
    type: 4,
  },
  {
    name: 'statistic.sales.byMonth',
    type: 3,
  },
  {
    name: 'statistic.sales.byYear',
    type: 1,
  },
];

export const ORDER_FILTER = [
  {
    name: 'statistic.sales.orderFilter.placed',
    description: 'statistic.sales.orderFilter.placedDescription',
  },
  {
    name: 'statistic.sales.orderFilter.confirmed',
    description: 'statistic.sales.orderFilter.confirmedDescription',
  },
  {
    name: 'statistic.sales.orderFilter.completed',
    description: 'statistic.sales.orderFilter.completedDescription',
  },
];

export const TypeChartFilter = {
  Orders: 0,
  Sales: 1,
  Visitors: 2,
};

export const TYPE_FILTER = [
  {
    type: TypeChartFilter.Orders,
    name: 'statistic.sales.keyMetrics.orders',
    value: '',
  },
  {
    type: TypeChartFilter.Sales,
    name: 'statistic.sales.keyMetrics.sales',
    value: '₫',
  },
  {
    type: TypeChartFilter.Visitors,
    name: 'statistic.sales.keyMetrics.visitors',
    value: '',
  },
];
