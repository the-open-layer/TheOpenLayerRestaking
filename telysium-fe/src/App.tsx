import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import Fallback from '@/layout/Fallback';

function App() {
  return <RouterProvider router={routes} fallbackElement={<Fallback />} />;
}

export default App;
