import React from 'react';
import {useThemeContext} from '../../../../utility/AppContextProvider/ThemeContextProvider.js';
import {Box} from '@mui/material';
//import {alpha} from '@mui/material/styles';
//import {ReactComponent as Logo} from '../../../../../assets/icon/logo.svg';
import {getMediaUrl} from '../../../../../shared/Helper';


const AppLogo = () => {
  const {theme} = useThemeContext();

  return (
    <Box
      sx={{
        height: {xs: 56, sm: 70},
        padding: 2.5,
        display: 'flex',
        flexDirection: 'row',
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        '& svg': {
          height: {xs: 40, sm: 45},
        },
        '& img': {
          height: {xs: 40, sm: 45},
        },
      }}
      className='app-logo'
    >
      {/*<Logo fill={theme.palette.primary.main} />*/}
        <img src={getMediaUrl('logo.svg', 'images')} alt="" />
      <Box
        sx={{
          mt: 1,
          display: {xs: 'none', md: 'block'},
          '& svg': {
            height: {xs: 25, sm: 30},
          },
          '& img': {
            height: {xs: 25, sm: 30},
          },
        }}
      >
        {/*<LogoText fill={alpha(theme.palette.text.primary, 0.8)} />*/}
          <img src={getMediaUrl('logo_text.svg', 'images')} alt="" />
      </Box>
    </Box>
  );
};

export default AppLogo;
