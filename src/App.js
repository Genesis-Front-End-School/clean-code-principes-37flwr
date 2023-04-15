import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { SWRConfig } from "swr";
import { Provider } from "react-redux";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";

import AppRoutes from "./routes/routeList";
import Navbar from "./components/Navbar";
import ErrorFallback from "./components/fallbacks/ErrorFallback";
import Loading from "./components/fallbacks/Loading";

import { fetcher } from "./utils/fetcher";
import ContextProviders from "./context";

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
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Navbar />
              <ContextProviders>
                <Suspense fallback={<Loading />}>
                  <AppRoutes />
                </Suspense>
                <Toaster />
              </ContextProviders>
            </ErrorBoundary>
          </BrowserRouter>
        </SWRConfig>
      </PersistGate>
    </Provider>
  );
}

export default App;
