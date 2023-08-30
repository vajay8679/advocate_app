import React from 'react';
import {Provider} from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import AuthRoutes from './@crema/utility/AuthRoutes';
import AppContextProvider from './@crema/utility/AppContextProvider';
import AppThemeProvider from './@crema/utility/AppThemeProvider';
import AppStyleProvider from './@crema/utility/AppStyleProvider';
import AppLocaleProvider from './@crema/utility/AppLocaleProvider';
import AppLayout from './@crema/core/AppLayout';
import configureStore, {history} from './redux/store';
// import FirebaseAuthProvider from '@crema/services/auth/firebase/FirebaseAuthProvider';
import JWTAuthProvider from './@crema/services/auth/jwt-auth/JWTAuthProvider';
import {BrowserRouter} from 'react-router-dom';
// import './firebase';
import './style.css';
const store = configureStore();

const App = () => {
    return (
    <AppContextProvider>
      <Provider store={store}>
        <AppThemeProvider>
          <AppStyleProvider>
            <AppLocaleProvider>
              <BrowserRouter history={history}>
                <JWTAuthProvider>
                  <AuthRoutes>
                    <CssBaseline/>
                    <AppLayout/>
                  </AuthRoutes>
                </JWTAuthProvider>
              </BrowserRouter>
            </AppLocaleProvider>
          </AppStyleProvider>
        </AppThemeProvider>
      </Provider>
    </AppContextProvider>
  )
};

export default App;
