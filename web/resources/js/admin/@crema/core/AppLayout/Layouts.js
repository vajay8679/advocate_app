import Default from './DefaultLayout/index.js';
import {NavStyle} from '../../../shared/constants/AppEnums.js';
import BitBucket from './BitBucket/index.js';
import Standard from './Standard/index.js';
import DrawerLayout from './DrawerLayout/index.js';
import MiniSidebar from './MiniSidebar/index.js';
import MiniSidebarToggle from './MiniSidebarToggle/index.js';
import HeaderUserLayout from './UserHeader/index.js';
import HeaderUserMiniLayout from './UserMiniHeader/index.js';
import HorDefault from './HorDefault/index.js';
import HorHeaderFixed from './HorHeaderFixed/index.js';
import HorDarkLayout from './HorDarkLayout/index.js';

const Layouts = {
  [NavStyle.DEFAULT]: Default,
  [NavStyle.BIT_BUCKET]: BitBucket,
  [NavStyle.STANDARD]: Standard,
  [NavStyle.DRAWER]: DrawerLayout,
  [NavStyle.MINI]: MiniSidebar,
  [NavStyle.MINI_SIDEBAR_TOGGLE]: MiniSidebarToggle,
  [NavStyle.HEADER_USER]: HeaderUserLayout,
  [NavStyle.HEADER_USER_MINI]: HeaderUserMiniLayout,
  [NavStyle.H_DEFAULT]: HorDefault,
  [NavStyle.HOR_HEADER_FIXED]: HorHeaderFixed,
  [NavStyle.HOR_DARK_LAYOUT]: HorDarkLayout,
};
export default Layouts;
