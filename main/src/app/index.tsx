import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { SWRConfig } from 'swr';
import { Provider } from 'react-redux';
import store, { persistor } from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'react-hot-toast';

import AppRoutes from 'pages';
import Navbar from 'widgets/Navbar';
import ErrorFallback from 'shared/ui/fallbacks/ErrorFallback';
import Loading from 'shared/ui/fallbacks/Loading';

import { fetcher } from 'shared/lib/fetcher';
import ContextProviders from './context';
import ThemeProvider from './theme';

import 'shared/styles/styles.scss';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SWRConfig
          value={{
            fetcher,
            suspense: true,
            revalidateOnFocus: false,
            revalidateIfStale: false,
          }}
        >
          <BrowserRouter>
            <ThemeProvider>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Navbar />
                <ContextProviders>
                  <Suspense fallback={<Loading />}>
                    <AppRoutes />
                  </Suspense>
                  <Toaster />
                </ContextProviders>
              </ErrorBoundary>
            </ThemeProvider>
          </BrowserRouter>
        </SWRConfig>
      </PersistGate>
    </Provider>
  );
}

export default App;
