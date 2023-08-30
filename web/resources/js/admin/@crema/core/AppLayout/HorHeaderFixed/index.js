import React from 'react';
import clsx from 'clsx';
import AppContentView from '../../AppContentView';
import AppFixedFooter from './AppFixedFooter/index.js';
import AppHeader from './AppHeader/index.js';
import AppSidebar from './AppSidebar/index.js';
import {useLayoutContext} from '../../../utility/AppContextProvider/LayoutContextProvider.js';
import AppThemeSetting from '../../AppThemeSetting/index.js';
import HorHeaderFixedWrapper from './HorHeaderFixedWrapper.js';
import MainContent from './MainContent.js';
import {LayoutType} from '../../../../shared/constants/AppEnums';
import HorHeaderFixedContainer from './HorHeaderFixedContainer.js';

const HorHeaderFixed = () => {
  const {footer, layoutType, footerType} = useLayoutContext();

  return (
    <HorHeaderFixedContainer
      className={clsx({
        boxedLayout: layoutType === LayoutType.BOXED,
        framedLayout: layoutType === LayoutType.FRAMED,
      })}
    >
      <HorHeaderFixedWrapper
        className={clsx('horHeaderFixedWrapper', {
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
      </HorHeaderFixedWrapper>
    </HorHeaderFixedContainer>
  );
};

export default HorHeaderFixed;
