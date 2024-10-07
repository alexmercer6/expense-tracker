import { RouteObject } from 'react-router-dom';
import HomeRoute from './element';

export const homeRoutes: Array<RouteObject> = [
  {
    index: true,
    path: '/home',
    element: <HomeRoute />,
  },
];
