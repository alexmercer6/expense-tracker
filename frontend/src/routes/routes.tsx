import { createBrowserRouter, Navigate } from 'react-router-dom';
import Root from '../Root';
import ErrorPage from '../components/ErrorPage';
import { homeRoutes } from './home/routes';
import { expensesRoutes } from './expenses/routes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: (
          <Navigate
            to="/home"
            replace
          />
        ),
      },
      {
        path: 'home',
        children: homeRoutes,
      },
      {
        path: 'expenses',
        children: expensesRoutes,
      },
    ],
  },
]);
