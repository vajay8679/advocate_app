import React from "react";
import {RoutePermittedRole} from "../../shared/constants/AppConst";
const ManageItems = React.lazy(()=> import('./ManageItems'));

export const manageCategoryRoutes = [
  {
    path: '/manage-categories',
    element: <ManageItems />,
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin]
  }
]
