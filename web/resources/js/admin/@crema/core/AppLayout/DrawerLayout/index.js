import React from 'react';
import clsx from 'clsx';
import AppContentView from '../../AppContentView';
import AppFixedFooter from './AppFixedFooter/index.js';
import AppHeader from './AppHeader/index.js';
import {useLayoutContext} from '../../../utility/AppContextProvider/LayoutContextProvider.js';
import AppThemeSetting from '../../AppThemeSetting/index.js';
import DrawerLayoutWrapper from './DrawerLayoutWrapper.js';
import MainContent from './MainContent.js';
import {LayoutType} from '../../../../shared/constants/AppEnums';
import AppSidebar from './AppSidebar/index.js';
import DrawerLayoutContainer from './DrawerLayoutContainer.js';

const DrawerLayout = () => {
  const {footer, layoutType, headerType, footerType} = useLayoutContext();

  return (
    <DrawerLayoutContainer
      className={clsx({
        boxedLayout: layoutType === LayoutType.BOXED,
        framedLayout: layoutType === LayoutType.FRAMED,
      })}
    >
      <DrawerLayoutWrapper
        className={clsx('drawerLayoutWrapper', {
          appMainFooter: footer && footerType === 'fluid',
          appMainFixedFooter: footer && footerType === 'fixed',
          appMainFixedHeader: headerType === 'fixed',
        })}
      >
        <AppSidebar />

        <MainContent>
          <AppHeader />
          <AppContentView />
          <AppFixedFooter />
        </MainContent>
        <AppThemeSetting />
      </DrawerLayoutWrapper>
    </DrawerLayoutContainer>
  );
};

export default DrawerLayout;
