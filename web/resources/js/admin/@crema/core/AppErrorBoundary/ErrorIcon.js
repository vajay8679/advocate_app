import React from 'react';
import {ReactComponent as Logo} from '../../../assets/icon/something-wrong.svg';
import {useTheme} from '@mui/material/styles';
import {getMediaUrl} from '../../../shared/Helper'

const ErrorIcon = () => {
  const theme = useTheme();
  return <img src={getMediaUrl('logo.svg', 'images')} alt="" />;
};

export default ErrorIcon;
