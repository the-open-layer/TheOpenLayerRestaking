import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { THEME, TonConnectUIProvider } from '@tonconnect/ui-react';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/query-client';
import stagingManifest from '@/assets/manifest/staging.tonconnect-manifest.json?url';
import proManifest from '@/assets/manifest/pro.tonconnect-manifest.json?url';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TonConnectUIProvider
          manifestUrl={
            import.meta.env.MODE === 'staging' ? stagingManifest : proManifest
          }
          uiPreferences={{ theme: THEME.LIGHT }}
        >
          <App />
        </TonConnectUIProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
