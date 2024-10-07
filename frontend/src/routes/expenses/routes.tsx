import { redirect, RouteObject } from 'react-router-dom';
import ExpensesRoute from './element';
import UploadRoute from './upload/element';

export const expensesRoutes: Array<RouteObject> = [
  {
    index: true,
    loader: () => redirect('table'),
  },

  {
    path: 'table',
    element: <ExpensesRoute />,
  },
  {
    path: 'upload',
    element: <UploadRoute />,
  },
];
