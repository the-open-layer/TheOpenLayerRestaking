import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import Fallback from '@/layout/Fallback';
import WebApp from '@twa-dev/sdk';

WebApp.ready();
WebApp.expand();
function App() {
  return <RouterProvider router={routes} fallbackElement={<Fallback />} />;
}

export default App;
