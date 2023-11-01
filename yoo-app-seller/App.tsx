import React, {useEffect} from 'react';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {Provider as ReduxProvider} from 'react-redux';
import {persistor, store} from '@/features/store';
import MainNavigator from '@/navigations';
import stack from '@/components/modals';
import {ModalProvider} from 'react-native-modalfy';
import Toast from 'react-native-toast-message';
import {toastConfig} from '@/components/custom-toast';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as PaperProvider} from 'react-native-paper';
import {PersistGate} from 'redux-persist/integration/react';
import httpUtil from '@/utils/http.util';

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  // useEffect(() => {
  //   httpUtil.checkHealth();
  // }, []);

  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <PaperProvider theme={{dark: false}}>
            <SafeAreaProvider>
              <ModalProvider stack={stack}>
                <MainNavigator />
                <Toast config={toastConfig} />
              </ModalProvider>
            </SafeAreaProvider>
          </PaperProvider>
        </QueryClientProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
