import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Profile from './pages/Profile';
import Page404 from './pages/Page404';
import Admin from './pages/Admin';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, // shared layout
    children: [
      { index: true, element: <Home /> },
      { path: 'registration', element: <Registration /> },
      { path: 'login', element: <Login /> },
      { path: 'profile', element: <ProtectedRoute> <Profile /> </ProtectedRoute> },
      { path: 'admin', element: <ProtectedRoute> <Admin /> </ProtectedRoute>},
      { path: '*', element: <Page404 /> },
    ],
  },
]);

export default router;
