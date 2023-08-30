import React from "react";
import {RoutePermittedRole} from "../../shared/constants/AppConst";
const ManageItems = React.lazy(()=> import('./ManageItems'));
const CaseStages = React.lazy(() => import('./CaseStages'));
export const manageCaseRoutes11 = [
  {
    path: '/manage-court-cases-motor',
    element: <ManageItems />,
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin]
  },
  {
    path: '/case-stages-motor/:caseId',
    element: <CaseStages />,
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin]
  }
]
