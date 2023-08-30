import React from 'react';
import BucketMinibarWrapper from './BucketMinibarWrapper.js';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AppLngSwitcher from '../../../../AppLngSwitcher/index.js';
import {useThemeContext} from '../../../../../utility/AppContextProvider/ThemeContextProvider.js';
import AppMessages from '../../../../AppMessages/index.js';
import AppNotifications from '../../../../AppNotifications/index.js';
import UserInfo from '../UserInfo/index.js';
// import {ReactComponent as Logo} from '../../../../../../assets/icon/logo.svg';

const BucketMinibar = () => {
  const {theme} = useThemeContext();

  return (
    <BucketMinibarWrapper>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 1.5,
        }}
      >
        <IconButton
          sx={{
            flexDirection: 'column',
            color: 'white',
            mb: 2.5,
          }}
          aria-label='show 17 new notifications'
        >
          {/*<Logo fill={theme.palette.primary.main} />*/}
        </IconButton>

        <IconButton
          className='search-icon-btn'
          aria-label='show 17 new notifications'
        >
          <SearchIcon />
        </IconButton>
        <AppLngSwitcher iconOnly={true} tooltipPosition='right' />

        <AppNotifications
          drawerPosition='left'
          tooltipPosition='right'
          sxNotificationContentStyle={{width: 320}}
        />
        <AppMessages
          drawerPosition='left'
          tooltipPosition='right'
          sxMessageContentStyle={{width: 320}}
        />
      </Box>
      <Box
        sx={{
          mt: 'auto',
        }}
      >
        <UserInfo />
      </Box>
    </BucketMinibarWrapper>
  );
};

export default BucketMinibar;
