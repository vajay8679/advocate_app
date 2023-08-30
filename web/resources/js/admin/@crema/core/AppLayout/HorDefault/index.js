import React from 'react';
import clsx from 'clsx';
import AppContentView from '../../AppContentView';
import AppFixedFooter from './AppFixedFooter/index.js';
import AppHeader from './AppHeader/index.js';
import AppSidebar from './AppSidebar/index.js';
import {useLayoutContext} from '../../../utility/AppContextProvider/LayoutContextProvider.js';
import AppThemeSetting from '../../AppThemeSetting/index.js';
import HorDefaultWrapper from './HorDefaultWrapper.js';
import MainContent from './MainContent.js';
import {LayoutType} from '../../../../shared/constants/AppEnums';
import HorDefaultContainer from './HorDefaultContainer.js';

const HorDefault = () => {
  const {footer, layoutType, footerType} = useLayoutContext();

  return (
    <HorDefaultContainer
      className={clsx({
        boxedLayout: layoutType === LayoutType.BOXED,
        framedLayout: layoutType === LayoutType.FRAMED,
      })}
    >
      <HorDefaultWrapper
        className={clsx('horDefaultWrapper', {
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
      </HorDefaultWrapper>
    </HorDefaultContainer>
  );
};

export default HorDefault;
