import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { THEME, TonConnectUIProvider } from '@tonconnect/ui-react';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/query-client';
import './index.css';
import { Buffer } from 'buffer';
window.Buffer = Buffer;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TonConnectUIProvider
          manifestUrl="https://openlayer-static.s3.ap-southeast-1.amazonaws.com/ton_manifest.json"
          uiPreferences={{ theme: THEME.LIGHT }}
        >
          <App />
        </TonConnectUIProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
