import {authRouteConfig} from './auth';
import {initialUrl} from '../shared/constants/AppConst';
import {Navigate} from 'react-router-dom';
import Error403 from './errorPages/Error403';
import React from 'react';

import {errorPagesConfigs} from './errorPages';

import {accountPagesConfigs} from './account';
import {dashboardPagesConfigs} from './dashboard';
import {manageUserRoutes} from "./users";
import {manageCategoryRoutes} from "./category";
import {authorizationRoutes} from "./authorization";
import {managePageRoutes} from "./page";
import {manageBankRoutes} from "./bank";
import {manageBankBranchRoutes} from "./bankBranch";
import {manageCaseRoutes} from "./courtCase";
import {manageCaseRoutes11} from "./courtCaseMotor";

// import { manageMotorRoutes1 } from "./courtMotor";

// import {chatRoutes} from './chat/routes';

const authorizedStructure = {
  fallbackPath: '/signin',
  unAuthorizedComponent: <Error403 />,
  routes: [
      ...accountPagesConfigs,
      ...dashboardPagesConfigs,
      ...manageUserRoutes,
      ...manageCategoryRoutes,
      ...authorizationRoutes,
      ...managePageRoutes,
      ...manageBankRoutes,
      ...manageBankBranchRoutes,
      // ...manageMotorRoutes1,
      ...manageCaseRoutes11,
      ...manageCaseRoutes,
      // ...chatRoutes,
  ],
};

const unAuthorizedStructure = {
  fallbackPath: initialUrl,
  routes: authRouteConfig,
};

const anonymousStructure = {
  routes: errorPagesConfigs.concat([
    {
      path: '/',
      element: <Navigate to={initialUrl} />,
    },
    {
      path: '*',
      element: <Navigate to='/error-pages/error-404' />,
    },
  ]),
};

export {authorizedStructure, unAuthorizedStructure, anonymousStructure};
