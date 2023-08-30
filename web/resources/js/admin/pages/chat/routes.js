import React from 'react';
import {RoutePermittedRole} from "../../shared/constants/AppConst";
//import Chat from './index';
const Chat = React.lazy(() => import('./index'));
export const chatRoutes = [
  {
    path: '/chat',
    element: <Chat />,
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin]
  }
]
