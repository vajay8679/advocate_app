import React from 'react';
import {RoutePermittedRole} from '../../shared/constants/AppConst';
import Account from './MyProfile';

export const accountPagesConfigs = [
  {
    permittedRole: RoutePermittedRole.User,
    path: '/my-profile/:tabName?',
    element: <Account />,
  },
];
