import React from 'react';

import {useSelector} from 'react-redux';
import AppMessageView from '../AppMessageView';
import AppLoader from '../AppLoader';

const AppInfoView = () => {
  const {error, loading, message} = useSelector(({common}) => common);

  const showMessage = () => {
    return <AppMessageView variant='success' message={message.toString()} />;
  };

  const showError = () => {
    return <AppMessageView variant='error' message={error.toString()} />;
  };

  return (
    <>
      {loading && <AppLoader />}

      {message && showMessage()}
      {error && showError()}
    </>
  );
};

export default AppInfoView;
