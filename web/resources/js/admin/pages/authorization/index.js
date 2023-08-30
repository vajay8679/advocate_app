import React from "react";
import {RoutePermittedRole} from "../../shared/constants/AppConst";
const Roles = React.lazy(()=> import('./Roles'))
export const authorizationRoutes = [
  {
    path: '/manage-roles',
    element: <Roles />,
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin]
  }
];
