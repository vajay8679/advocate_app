import React, {useState} from 'react';
import AppSidebar from './AppSidebar/index.js';
import AppThemeSetting from '../../AppThemeSetting/index.js';
import AppHeader from './AppHeader/index.js';
import clsx from 'clsx';
import Hidden from '@mui/material/Hidden';
import Box from '@mui/material/Box';
import BitBucketWrapper from './BitBucketWrapper.js';
import {LayoutType} from '../../../../shared/constants/AppEnums';
import {useLayoutContext} from '../../../utility/AppContextProvider/LayoutContextProvider.js';
import BitBucketContainer from './BitBucketContainer.js';
import AppContentView from '../../AppContentView/index.js';

const BitBucket = () => {
  const [isCollapsed, setCollapsed] = useState(false);
  const {layoutType} = useLayoutContext();

  return (
    <BitBucketContainer
      className={clsx({
        boxedLayout: layoutType === LayoutType.BOXED,
        framedLayout: layoutType === LayoutType.FRAMED,
      })}
    >
      <BitBucketWrapper
        className={clsx('bitBucketWrapper', {
          bitBucketCollapsed: isCollapsed,
        })}
      >
        <Hidden lgUp>
          <AppHeader />
        </Hidden>
        <AppSidebar isCollapsed={isCollapsed} setCollapsed={setCollapsed} />
        <Box className='mainContent'>
          <AppContentView />
        </Box>
        <AppThemeSetting />
      </BitBucketWrapper>
    </BitBucketContainer>
  );
};

export default BitBucket;
