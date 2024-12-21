import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { THEME, TonConnectUIProvider } from '@tonconnect/ui-react';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/query-client';
import { AuditNotification } from '@/components/ux/auditNotification.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TonConnectUIProvider
          manifestUrl={import.meta.env.VITE_MANIFESTURL}
          uiPreferences={{ theme: THEME.LIGHT }}
        >
          <App />
          <AuditNotification />
        </TonConnectUIProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
