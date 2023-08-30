import React from "react";
import {RoutePermittedRole} from "../../shared/constants/AppConst";
const ManageItems = React.lazy(()=> import('./ManageItems'));
const PageCategory = React.lazy(()=> import('./PageCategory'));

export const manageBankBranchRoutes = [
  {
    path: '/manage-bank-branch',
    element: <ManageItems />,
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin]
  }
]
