import React from 'react';
import {CustomizerItemWrapper} from '../index.style.js';
import Box from '@mui/material/Box';
import IntlMessages from '../../../utility/IntlMessages.js';
import {navStyles} from '../../../services/db/navigationStyle.js';
import {
  useLayoutActionsContext,
  useLayoutContext,
} from '../../../utility/AppContextProvider/LayoutContextProvider.js';
import AppSelectedIcon from '../../AppSelectedIcon/index.js';

const NavStyles = () => {
  const {updateNavStyle} = useLayoutActionsContext();
  const {navStyle} = useLayoutContext();

  const onNavStyleChange = (navStyle) => {
    updateNavStyle(navStyle);
  };

  return (
    <CustomizerItemWrapper
      sx={{
        pb: 1,
      }}
    >
      <Box component='h4' sx={{mb: 3}}>
        <IntlMessages id='customizer.navigationStyles' />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          mx: -1.25,
        }}
      >
        {navStyles.map((navLayout) => {
          return (
            <Box
              sx={{
                px: 1.25,
                mb: 1.25,
              }}
              key={navLayout.id}
            >
              <Box
                sx={{
                  position: 'relative',
                  cursor: 'pointer',
                }}
                onClick={() => onNavStyleChange(navLayout.alias)}
              >
                <img src={navLayout.image} alt='nav' />
                {navStyle === navLayout.alias ? <AppSelectedIcon /> : null}
              </Box>
            </Box>
          );
        })}
      </Box>
    </CustomizerItemWrapper>
  );
};

export default NavStyles;
