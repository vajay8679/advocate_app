import React, {useState} from 'react';
import AppSidebar from './AppSidebar/index.js';
import AppThemeSetting from '../../AppThemeSetting/index.js';
import AppHeader from './AppHeader/index.js';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import MiniSidebarWrapper from './MiniSidebarWrapper.js';
import AppFixedFooter from './AppFixedFooter/index.js';
import {useLayoutContext} from '../../../utility/AppContextProvider/LayoutContextProvider.js';
import {LayoutType} from '../../../../shared/constants/AppEnums';
import MiniSidebarContainer from './MiniSidebarContainer.js';
import AppContentView from '../../AppContentView/index.js';

const MiniSidebar = () => {
  const [isCollapsed, setCollapsed] = useState(true);
  const {footer, layoutType, headerType, footerType} = useLayoutContext();

  return (
    <MiniSidebarContainer
      className={clsx({
        boxedLayout: layoutType === LayoutType.BOXED,
        framedLayout: layoutType === LayoutType.FRAMED,
      })}
    >
      <MiniSidebarWrapper
        className={clsx('miniSidebarWrapper', {
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
      </MiniSidebarWrapper>
    </MiniSidebarContainer>
  );
};

export default MiniSidebar;
