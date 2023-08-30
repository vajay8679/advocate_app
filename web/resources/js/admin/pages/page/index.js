import React from "react";
import {RoutePermittedRole} from "../../shared/constants/AppConst";
const ManageItems = React.lazy(()=> import('./ManageItems'));
const PageCategory = React.lazy(()=> import('./PageCategory'));

export const managePageRoutes = [
  {
    path: '/manage-pages',
    element: <ManageItems />,
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin]
  },
  {
    path: '/manage-page-category',
    element: <PageCategory />,
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin]
  }
]
