const config = {
  screens: {
    Login: 'login',
    Register: 'register',
    VerifiCodeScreen: 'verify-code',
    Home: 'home',
    Order: {
      path: 'order',
      screens: {
        ListOrderScreen: {
          path: 'list',
          screens: {
            PendingOrder: 'pending',
            ToShipOrder: {
              path: 'to-ship',
              screens: {
                GetAll: 'get-all',
                GetByProcessing: 'get-by-processing',
                GetByProcessed: 'get-by-processed',
              },
            },
            ShippingOrder: 'shipping',
            CompleteOrder: 'complete',
            CancelOrder: {
              path: 'cancel',
              screens: {
                GetAll: 'get-all',
                WaitingResponse: 'waiting-response',
                Cancelled: 'cancelled',
              },
            },
            RefundOrder: 'refund',
          },
        },
        OrderDetailScreen: 'detail',
      },
    },
    PartnerStoreChatStack: 'partner-store-chat',
    Individual: 'individual',
  },
};

export const APP_SCHEME = 'yooseller://';

export const screenUrls = {
  login: 'login',
  register: 'register',
  verifyCode: 'verify-code',
  home: 'home',
  order: {
    list: {
      pending: 'order/list/pending',
      toShip: {
        getAll: 'order/list/to-ship/get-all',
        getByProcessing: 'order/list/to-ship/get-by-processing',
        getByProcessed: 'order/list/to-ship/get-by-processed',
      },
      shipping: 'order/list/shipping',
      complete: 'order/list/complete',
      cancel: {
        getAll: 'order/list/cancel/get-all',
        waitingResponse: 'order/list/cancel/waiting-response',
        cancelled: 'order/list/cancel/cancelled',
      },
      refund: 'order/list/refund',
    },
  },
};

export const linking = {
  prefixes: [APP_SCHEME],
  config,
};
