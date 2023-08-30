// ForJWT Auth
import { getUserFromJwtAuth } from "./helper/AuthHelper";
import {
  useJWTAuth,
  useJWTAuthActions,
} from "../services/auth/jwt-auth/JWTAuthProvider";

export const useAuthUser = () => {
    const { user, isAuthenticated, isLoading } = useJWTAuth();
    return {
        isLoading,
        isAuthenticated,
        user: getUserFromJwtAuth(user),
    };
};

export const useAuthMethod = () => {
  const { signInUser, signUpUser,forgotPassword, logout, reloadAuthUser } = useJWTAuthActions();

  return {
    signInUser,
    forgotPassword,
    logout,
    signUpUser,
    reloadAuthUser
  };
};
//For Firebase Auth
// import {
//   useFirebase,
//   useFirebaseActions,
// } from '../services/auth/firebase/FirebaseAuthProvider.js';
// import {getUserFromFirebase} from './helper/AuthHelper.js';
//
// export const useAuthUser = () => {
//   const {user, isAuthenticated, isLoading} = useFirebase();
//   return {
//     isLoading,
//     isAuthenticated,
//     user: getUserFromFirebase(user),
//   };
// };
//
// export const useAuthMethod = () => {
//   const {
//     logInWithEmailAndPassword,
//     registerUserWithEmailAndPassword,
//     logInWithPopup,
//     logout,
//   } = useFirebaseActions();
//
//   return {
//     logInWithEmailAndPassword,
//     registerUserWithEmailAndPassword,
//     logInWithPopup,
//     logout,
//   };
// };

/*
// For AWS Auth
import {getUserFromAWS} from './helper/AuthHelper';
import {
  useAwsCognito,
  useAwsCognitoActions,
} from '../services/auth/aws-cognito/AWSAuthProvider';

export const useAuthUser = () => {
  const {user, isAuthenticated, isLoading} = useAwsCognito();
  return {
    isLoading,
    isAuthenticated,
    user: getUserFromAWS(user),
  };
};

export const useAuthMethod = () => {
  const {
    signIn,
    signUpCognitoUser,
    confirmCognitoUserSignup,
    logout,
  } = useAwsCognitoActions();

  return {
    signIn,
    signUpCognitoUser,
    confirmCognitoUserSignup,
    logout,
  };
};*/
/*

//For Auth0
import { useAuth0 } from "@auth0/auth0-react";
import { useMemo } from "react";
import { getUserFromAuth0 } from "./helper/AuthHelper";

export const useAuthUser = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  return {
    isLoading,
    isAuthenticated,
    user: useMemo(() => getUserFromAuth0(user), []),
  };
};

export const useAuthMethod = () => {
  const { loginWithRedirect, logout } = useAuth0();
  return { loginWithRedirect, logout };
};
*/
