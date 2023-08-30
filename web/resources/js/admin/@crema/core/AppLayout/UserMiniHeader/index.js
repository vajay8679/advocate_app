import React from 'react';
import AppSidebar from './AppSidebar/index.js';
import AppContentView from '../../AppContentView';
import AppThemeSetting from '../../AppThemeSetting/index.js';
import AppHeader from './AppHeader/index.js';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import UserMiniHeaderWrapper from './UserMiniHeaderWrapper.js';
import AppFixedFooter from './AppFixedFooter/index.js';
import {useLayoutContext} from '../../../utility/AppContextProvider/LayoutContextProvider.js';
import {LayoutType} from '../../../../shared/constants/AppEnums';
import UserMiniHeaderContainer from './UserMiniHeaderContainer.js';

const UserMiniHeader = () => {
  const {footer, layoutType, footerType} = useLayoutContext();

  return (
    <UserMiniHeaderContainer
      className={clsx({
        boxedLayout: layoutType === LayoutType.BOXED,
        framedLayout: layoutType === LayoutType.FRAMED,
      })}
    >
      <UserMiniHeaderWrapper
        className={clsx('mini-sidebar-collapsed', {
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
      </UserMiniHeaderWrapper>
    </UserMiniHeaderContainer>
  );
};

export default UserMiniHeader;
