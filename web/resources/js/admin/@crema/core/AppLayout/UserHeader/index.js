import React from 'react';
import AppSidebar from './AppSidebar/index.js';
import AppContentView from '../../AppContentView';
import AppThemeSetting from '../../AppThemeSetting/index.js';
import AppHeader from './AppHeader/index.js';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import UserHeaderWrapper from './UserHeaderWrapper.js';
import AppFixedFooter from './AppFixedFooter/index.js';
import {useLayoutContext} from '../../../utility/AppContextProvider/LayoutContextProvider.js';
import {LayoutType} from '../../../../shared/constants/AppEnums';
import UserHeaderContainer from './UserHeaderContainer.js';

const UserHeader = () => {
  const {footer, layoutType, footerType} = useLayoutContext();

  return (
    <UserHeaderContainer
      className={clsx({
        boxedLayout: layoutType === LayoutType.BOXED,
        framedLayout: layoutType === LayoutType.FRAMED,
      })}
    >
      <UserHeaderWrapper
        className={clsx('userHeaderWrapper', {
          appMainFooter: footer && footerType === 'fluid',
          appMainFixedFooter: footer && footerType === 'fixed',
        })}
      >
        <AppHeader />
        <Box className='mainContent'>
          <AppSidebar />
          <AppContentView />
          <AppFixedFooter />
        </Box>
        <AppThemeSetting />
      </UserHeaderWrapper>
    </UserHeaderContainer>
  );
};

export default UserHeader;
