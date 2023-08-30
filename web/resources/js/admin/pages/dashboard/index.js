import React from 'react';
import {RoutePermittedRole} from "../../shared/constants/AppConst";
import Dashboard from "./Dashboard";
const Dasboard1 = React.lazy(() => import('./Dashboard'));
export const dashboardPagesConfigs = [
    {
        permittedRole: RoutePermittedRole.User,
        path: '/dashboard',
        element: <Dasboard1 />,
    },
];
