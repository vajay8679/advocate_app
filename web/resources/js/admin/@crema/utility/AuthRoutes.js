import React from 'react';
import PropTypes from 'prop-types';
import {useAuthUser} from './AuthHooks.js';
import AppLoader from '../core/AppLoader/index.js';

const AuthRoutes = ({children}) => {
  const {isLoading} = useAuthUser();
  return isLoading ? <AppLoader /> : <>{children}</>;
};

export default AuthRoutes;

AuthRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
