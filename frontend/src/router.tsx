import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Profile from './pages/Profile';
import Page404 from './pages/Page404';
import Admin from './pages/Admin';
import AdminScan from './pages/AdminScan';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, // shared layout
    children: [
      { index: true, element: <Home /> },
      { path: 'registration', element: <Registration /> },
      { path: 'login', element: <Login /> },
      { path: 'profile', element: <Profile /> },
      { path: 'admin', element: <Admin /> },
      { path: 'admin/scan', element: <AdminScan /> },
      { path: '*', element: <Page404 /> },
    ],
  },
]);

export default router;
