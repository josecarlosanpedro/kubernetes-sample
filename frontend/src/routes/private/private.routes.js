import { lazy } from 'react';

const HomeModule = lazy(() =>
  import('../../modules/Home'),
);
const AddedListModule = lazy(() =>
  import('../../modules/AddedList'),
);

const privateRoutes = [
  {
    id: 'homeModule',
    path: '/home',
    component: HomeModule,
    exact: true,
  },
  {
    id: 'AddedListModule',
    path: '/added',
    component: AddedListModule,
    exact: true,
  },
];

export default privateRoutes;
