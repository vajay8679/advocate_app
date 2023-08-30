import React, {useEffect} from 'react';
import AppContentView from '../AppContentView';
import {useAuthUser} from '../../utility/AuthHooks.js';
import {
  useLayoutActionsContext,
  useLayoutContext,
} from '../../utility/AppContextProvider/LayoutContextProvider.js';
import AuthWrapper from './AuthWrapper.js';
import {useUrlSearchParams} from 'use-url-search-params';
import {useSidebarActionsContext} from '../../utility/AppContextProvider/SidebarContextProvider.js';
import Layouts from './Layouts.js';

const AppLayout = () => {
  const {navStyle} = useLayoutContext();

  const {isAuthenticated} = useAuthUser();
  const {updateNavStyle} = useLayoutActionsContext();
  const {updateMenuStyle, setSidebarBgImage} = useSidebarActionsContext();
  const AppLayout = Layouts[navStyle];
  const [params] = useUrlSearchParams();

  useEffect(() => {
    if (params.layout) updateNavStyle(params.layout);
    if (params.menuStyle) updateMenuStyle(params.menuStyle);
    if (params.sidebarImage) setSidebarBgImage(true);
  }, [
    params.layout,
    params.menuStyle,
    params.sidebarImage,
    updateNavStyle,
    updateMenuStyle,
    setSidebarBgImage,
  ]);

  return (
    <>
      {isAuthenticated ? (
        <AppLayout />
      ) : (
        <AuthWrapper>
          <AppContentView />
        </AuthWrapper>
      )}
    </>
  );
};

export default React.memo(AppLayout);
