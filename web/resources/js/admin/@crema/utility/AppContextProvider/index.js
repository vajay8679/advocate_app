import React from 'react';
import PropTypes from 'prop-types';
import ThemeContextProvider from './ThemeContextProvider.js';
import LocaleContextProvider from './LocaleContextProvide.js';
import LayoutContextProvider from './LayoutContextProvider.js';
import SidebarContextProvider from './SidebarContextProvider.js';

const AppContextProvider = ({children}) => {
  return (
    <ThemeContextProvider>
      <LocaleContextProvider>
        <LayoutContextProvider>
          <SidebarContextProvider>{children}</SidebarContextProvider>
        </LayoutContextProvider>
      </LocaleContextProvider>
    </ThemeContextProvider>
  );
};

export default AppContextProvider;

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
