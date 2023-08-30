import React from 'react';
import clsx from 'clsx';
import AppContentView from '../../AppContentView';
import AppFixedFooter from './AppFixedFooter/index.js';
import AppHeader from './AppHeader/index.js';
import {useLayoutContext} from '../../../utility/AppContextProvider/LayoutContextProvider.js';
import AppThemeSetting from '../../AppThemeSetting/index.js';
import DefaultLayoutWrapper from './DefaultLayoutWrapper.js';
import MainContent from './MainContent.js';
import {LayoutType} from '../../../../shared/constants/AppEnums';
import AppSidebar from './AppSidebar.js';
import DefaultLayoutContainer from './DefaultLayoutContainer.js';
import AppInfoView from "../../AppInfoView";

const DefaultLayout = () => {
  const {footer, layoutType, headerType, footerType} = useLayoutContext();

  return (
    <DefaultLayoutContainer
      className={clsx({
        boxedLayout: layoutType === LayoutType.BOXED,
        framedLayout: layoutType === LayoutType.FRAMED,
      })}
    >
      <DefaultLayoutWrapper
        className={clsx('defaultLayoutWrapper', {
          appMainFooter: footer && footerType === 'fluid',
          appMainFixedFooter: footer && footerType === 'fixed',
          appMainFixedHeader: headerType === 'fixed',
        })}
      >
        <AppSidebar />

        <MainContent>
          <AppHeader />
            <AppInfoView />
          <AppContentView />
          <AppFixedFooter />
        </MainContent>
        {/*<AppThemeSetting />*/}
      </DefaultLayoutWrapper>
    </DefaultLayoutContainer>
  );
};

export default DefaultLayout;
