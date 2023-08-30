import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {BiUser} from 'react-icons/bi';
import {AiOutlineLock} from 'react-icons/ai';
import {IoMdInformationCircleOutline} from 'react-icons/io';
import {IoShareSocialOutline} from 'react-icons/io5';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountTabsWrapper from './AccountTabsWrapper';
import PersonalInfo from './PersonalInfo';
import ChangePassword from './ChangePassword';
import Information from './Information';
import Social from './Social';
import Notification from './Notification';
import accountData from '../../../@crema/services/db/account';
import AppAnimate from '../../../@crema/core/AppAnimate';
import {Fonts} from '../../../shared/constants/AppEnums';
import {Link, useParams} from 'react-router-dom';

function a11yProps(index) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`,
  };
}

const tabs = [
  {
    id: 1,
    icon: <BiUser />,
    name: <IntlMessages id='common.personalInfo' />,
    url: '/my-profile/personal-information',
    tabId: 'personal-information',
  },
  {
    id: 2,
    icon: <AiOutlineLock />,
    name: <IntlMessages id='common.changePassword' />,
    url: '/my-profile/change-password',
    tabId: 'change-password',
  },
  // {
  //   id: 3,
  //   icon: <IoMdInformationCircleOutline />,
  //   name: <IntlMessages id='common.information' />,
  //   url: '/my-profile/information',
  //   tabId: 'information',
  // },
  // {
  //   id: 4,
  //   icon: <IoShareSocialOutline />,
  //   name: <IntlMessages id='common.social' />,
  //   url: '/my-profile/social-accounts',
  //   tabId: 'social-accounts',
  // },
  // {
  //   id: 5,
  //   icon: <NotificationsNoneIcon />,
  //   name: <IntlMessages id='healthCare.notification' />,
  //   url: '/my-profile/notifications',
  //   tabId: 'notifications',
  // },
];

const Account = () => {
  const {tabName} = useParams();
  const [value, setValue] = React.useState(tabName || 'personal-information');

  const onTabsChange = (event, newValue) => {
    setValue(newValue);
  };
  // React.useEffect(() => {
  //   console.log(tabName);
  // }, []);


  return (
    <>
      <Box
        component='h2'
        variant='h2'
        sx={{
          fontSize: 16,
          color: 'text.primary',
          fontWeight: Fonts.SEMI_BOLD,
          mb: {
            xs: 2,
            lg: 4,
          },
        }}
      >
        My Account
      </Box>
      <AppAnimate animation='transition.slideUpIn' delay={200}>
        <AccountTabsWrapper>
          <Tabs
            className='account-tabs'
            value={value}
            onChange={onTabsChange}
            aria-label='profile settings tab'
            orientation='vertical'
          >
            {tabs.map((tab, index) => (
              <Tab
                className='account-tab'
                label={tab.name}
                icon={tab.icon}
                key={tab.tabId}
                value={tab.tabId}
                to={tab.url}
                component={Link}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
          <Box className='account-tabs-content'>
            {value === 'personal-information' && <PersonalInfo />}
            {value === 'change-password' && <ChangePassword />}
            {value === 'information' && <Information />}
            {value === 'social-accounts' && <Social social={accountData.member} />}
            {value === 'notifications' && <Notification />}
          </Box>
        </AccountTabsWrapper>
      </AppAnimate>
    </>
  );
};

export default Account;
