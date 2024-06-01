import { queryClient } from '@src/common/queryClient';
import { toastConfig } from '@src/components/toast-config';
import AppNavigator from '@src/navigations';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';

// if (__DEV__) {
//   require('./ReactotronConfig');
// }

const App = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PaperProvider
          theme={{
            dark: false,
          }}
        >
          <AppNavigator />
          <Toast config={toastConfig} />
        </PaperProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export default App;
