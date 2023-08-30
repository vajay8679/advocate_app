import React from "react";
import {RoutePermittedRole} from "../../shared/constants/AppConst";
const ManageItems = React.lazy(()=> import('./ManageItems'));
const CaseStages = React.lazy(() => import('./CaseStages'));
export const manageCaseRoutes = [
  {
    path: '/manage-court-cases',
    element: <ManageItems />,
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin]
  },
  {
    path: '/case-stages/:caseId',
    element: <CaseStages />,
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin]
  }
]
