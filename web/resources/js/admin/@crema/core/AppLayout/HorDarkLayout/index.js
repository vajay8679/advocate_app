import React from 'react';
import clsx from 'clsx';
import AppContentView from '../../AppContentView';
import AppFixedFooter from './AppFixedFooter/index.js';
import AppHeader from './AppHeader/index.js';
import AppSidebar from './AppSidebar/index.js';
import {useLayoutContext} from '../../../utility/AppContextProvider/LayoutContextProvider.js';
import AppThemeSetting from '../../AppThemeSetting/index.js';
import HorDarkWrapper from './HorDarkWrapper.js';
import MainContent from './MainContent.js';
import {LayoutType} from '../../../../shared/constants/AppEnums';
import HorDarkContainer from './HorDarkContainer.js';

const HorDarkLayout = () => {
  const {footer, layoutType, footerType} = useLayoutContext();

  return (
    <HorDarkContainer
      className={clsx({
        boxedLayout: layoutType === LayoutType.BOXED,
        framedLayout: layoutType === LayoutType.FRAMED,
      })}
    >
      <HorDarkWrapper
        className={clsx('horDarkWrapper', {
          appMainFooter: footer && footerType === 'fluid',
          appMainFixedFooter: footer && footerType === 'fixed',
        })}
      >
        <AppSidebar />

        <MainContent>
          <AppHeader />
          <AppContentView />
          <AppFixedFooter />
        </MainContent>
        <AppThemeSetting />
      </HorDarkWrapper>
    </HorDarkContainer>
  );
};

export default HorDarkLayout;
