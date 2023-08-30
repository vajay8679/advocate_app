import React from "react";
import {RoutePermittedRole} from "../../shared/constants/AppConst";
const ManageItems = React.lazy(()=> import('./ManageItems'));
export const manageUserRoutes = [
    {
        path: '/manage-users',
        element: <ManageItems />,
        permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin]
    }
]
