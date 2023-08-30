import React from 'react';
import AppSidebar from './AppSidebar/index.js';
import AppThemeSetting from '../../AppThemeSetting/index.js';
import AppHeader from './AppHeader/index.js';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import StandardWrapper from './StandardWrapper.js';
import AppFixedFooter from './AppFixedFooter/index.js';
import {useLayoutContext} from '../../../utility/AppContextProvider/LayoutContextProvider.js';
import {LayoutType} from '../../../../shared/constants/AppEnums';
import StandardContainer from './StandardContainer.js';
import AppContentView from '../../AppContentView/index.js';

const Standard = () => {
  const {footer, layoutType, footerType} = useLayoutContext();

  return (
    <StandardContainer
      className={clsx({
        boxedLayout: layoutType === LayoutType.BOXED,
        framedLayout: layoutType === LayoutType.FRAMED,
      })}
    >
      <StandardWrapper
        className={clsx('standardWrapper', {
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
      </StandardWrapper>
    </StandardContainer>
  );
};

export default Standard;
