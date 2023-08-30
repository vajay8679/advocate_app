import React, {useState} from 'react';
import AppSidebar from './AppSidebar/index.js';
import AppContentView from '../../AppContentView';
import AppThemeSetting from '../../AppThemeSetting/index.js';
import AppHeader from './AppHeader/index.js';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import MiniSidebarToggleWrapper from './MiniSidebarToggleWrapper.js';
import AppFixedFooter from './AppFixedFooter/index.js';
import {useLayoutContext} from '../../../utility/AppContextProvider/LayoutContextProvider.js';
import {LayoutType} from '../../../../shared/constants/AppEnums';
import MiniSidebarToggleContainer from './MiniSidebarToggleContainer.js';

const MiniSidebarToggle = () => {
  const [isCollapsed, setCollapsed] = useState(false);
  const {footer, layoutType, headerType, footerType} = useLayoutContext();

  return (
    <MiniSidebarToggleContainer
      className={clsx({
        boxedLayout: layoutType === LayoutType.BOXED,
        framedLayout: layoutType === LayoutType.FRAMED,
      })}
    >
      <MiniSidebarToggleWrapper
        className={clsx('miniSidebarToggleWrapper', {
          'mini-sidebar-collapsed': isCollapsed,
          appMainFooter: footer && footerType === 'fluid',
          appMainFixedFooter: footer && footerType === 'fixed',
          appMainFixedHeader: headerType === 'fixed',
        })}
      >
        <AppSidebar />
        <Box className='mainContent'>
          <AppHeader setCollapsed={setCollapsed} isCollapsed={isCollapsed} />
          <AppContentView />
          <AppFixedFooter />
        </Box>
        <AppThemeSetting />
      </MiniSidebarToggleWrapper>
    </MiniSidebarToggleContainer>
  );
};

export default MiniSidebarToggle;
