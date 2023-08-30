(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[20],{

/***/ "./resources/js/admin/pages/auth/AuthWrapper.js":
/*!******************************************************!*\
  !*** ./resources/js/admin/pages/auth/AuthWrapper.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/material/Typography */ "./node_modules/@mui/material/esm/Typography/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_Card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/Card */ "./node_modules/@mui/material/esm/Card/index.js");
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/Box */ "./node_modules/@mui/material/esm/Box/index.js");
/* harmony import */ var _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/constants/AppEnums */ "./resources/js/admin/shared/constants/AppEnums.js");





var AuthWrapper = function AuthWrapper(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_3__["default"], {
    sx: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_Card__WEBPACK_IMPORTED_MODULE_2__["default"], {
    sx: {
      maxWidth: 900,
      minHeight: {
        xs: 320,
        sm: 450
      },
      width: '100%',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_3__["default"], {
    sx: {
      width: {
        xs: '100%',
        sm: '50%',
        lg: '40%'
      },
      padding: {
        xs: 5,
        lg: 10
      },
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, children), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_3__["default"], {
    sx: {
      width: {
        xs: '100%',
        sm: '50%',
        lg: '60%'
      },
      position: 'relative',
      padding: {
        xs: 5,
        lg: 10
      },
      display: {
        xs: 'none',
        sm: 'flex'
      },
      alignItems: {
        sm: 'center'
      },
      justifyContent: {
        sm: 'center'
      },
      flexDirection: {
        sm: 'column'
      },
      backgroundColor: function backgroundColor(theme) {
        return theme.palette.grey[900];
      },
      color: function color(theme) {
        return theme.palette.common.white;
      },
      fontSize: 14
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_3__["default"], {
    sx: {
      maxWidth: 320
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_0__["default"], {
    component: "h2",
    sx: {
      fontWeight: _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_4__["Fonts"].BOLD,
      fontSize: 30,
      mb: 4
    }
  }, "Welcome to Crema!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_0__["default"], null, "Crema is purely based on Material ui components and follows Material ui guidelines.")))));
};
/* harmony default export */ __webpack_exports__["default"] = (AuthWrapper);

/***/ }),

/***/ "./resources/js/admin/pages/auth/Signin/SigninJwtAuth.js":
/*!***************************************************************!*\
  !*** ./resources/js/admin/pages/auth/Signin/SigninJwtAuth.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mui_material_Checkbox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/material/Checkbox */ "./node_modules/@mui/material/esm/Checkbox/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/Button */ "./node_modules/@mui/material/esm/Button/index.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! yup */ "./node_modules/yup/es/index.js");
/* harmony import */ var _crema_core_AppInfoView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../@crema/core/AppInfoView */ "./resources/js/admin/@crema/core/AppInfoView/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material/Box */ "./node_modules/@mui/material/esm/Box/index.js");
/* harmony import */ var _crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../@crema/utility/IntlMessages */ "./resources/js/admin/@crema/utility/IntlMessages.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/index.js");
/* harmony import */ var _crema_core_AppFormComponents_AppTextField__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../@crema/core/AppFormComponents/AppTextField */ "./resources/js/admin/@crema/core/AppFormComponents/AppTextField.js");
/* harmony import */ var _crema_utility_AuthHooks__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../@crema/utility/AuthHooks */ "./resources/js/admin/@crema/utility/AuthHooks.js");
/* harmony import */ var _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../shared/constants/AppEnums */ "./resources/js/admin/shared/constants/AppEnums.js");













var validationSchema = yup__WEBPACK_IMPORTED_MODULE_4__["object"]({
  email: yup__WEBPACK_IMPORTED_MODULE_4__["string"]().email( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_8__["default"], {
    id: "validation.emailFormat"
  })).required( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_8__["default"], {
    id: "validation.emailRequired"
  })),
  password: yup__WEBPACK_IMPORTED_MODULE_4__["string"]().required( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_8__["default"], {
    id: "validation.passwordRequired"
  }))
});
var SigninJwtAuth = function SigninJwtAuth() {
  var navigate = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["useNavigate"])();
  var _useAuthMethod = Object(_crema_utility_AuthHooks__WEBPACK_IMPORTED_MODULE_11__["useAuthMethod"])(),
    signInUser = _useAuthMethod.signInUser;
  var onGoToForgetPassword = function onGoToForgetPassword() {
    navigate('/forget-password', {
      tab: 'jwtAuth'
    });
  };
  var _useIntl = Object(react_intl__WEBPACK_IMPORTED_MODULE_9__["useIntl"])(),
    messages = _useIntl.messages;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_7__["default"], {
    sx: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_7__["default"], {
    sx: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      mb: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_3__["Formik"], {
    validateOnChange: true,
    initialValues: {
      email: 'admin@admin.com',
      password: 'admin'
    },
    validationSchema: validationSchema,
    onSubmit: function onSubmit(data, _ref) {
      var setSubmitting = _ref.setSubmitting;
      setSubmitting(true);
      signInUser({
        email: data.email,
        password: data.password
      });
      setSubmitting(false);
    }
  }, function (_ref2) {
    var isSubmitting = _ref2.isSubmitting;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_3__["Form"], {
      style: {
        textAlign: 'left'
      },
      noValidate: true,
      autoComplete: "off"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_7__["default"], {
      sx: {
        mb: {
          xs: 5,
          xl: 8
        }
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_crema_core_AppFormComponents_AppTextField__WEBPACK_IMPORTED_MODULE_10__["default"], {
      placeholder: messages['common.email'],
      name: "email",
      label: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_8__["default"], {
        id: "common.email"
      }),
      variant: "outlined",
      sx: {
        width: '100%',
        '& .MuiInputBase-input': {
          fontSize: 14
        }
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_7__["default"], {
      sx: {
        mb: {
          xs: 3,
          xl: 4
        }
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_crema_core_AppFormComponents_AppTextField__WEBPACK_IMPORTED_MODULE_10__["default"], {
      type: "password",
      placeholder: messages['common.password'],
      label: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_8__["default"], {
        id: "common.password"
      }),
      name: "password",
      variant: "outlined",
      sx: {
        width: '100%',
        '& .MuiInputBase-input': {
          fontSize: 14
        }
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_7__["default"], {
      sx: {
        mb: {
          xs: 3,
          xl: 4
        }
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_7__["default"], {
      sx: {
        display: 'flex',
        alignItems: 'center'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_Checkbox__WEBPACK_IMPORTED_MODULE_0__["default"], {
      color: "primary",
      sx: {
        ml: -3
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_7__["default"], {
      component: "span",
      sx: {
        color: 'grey.500'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_8__["default"], {
      id: "common.rememberMe"
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_7__["default"], {
      component: "span",
      sx: {
        color: function color(theme) {
          return theme.palette.primary.main;
        },
        fontWeight: _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_12__["Fonts"].MEDIUM,
        cursor: 'pointer',
        display: 'block',
        textAlign: 'right'
      },
      onClick: onGoToForgetPassword
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_8__["default"], {
      id: "common.forgetPassword"
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
      variant: "contained",
      color: "primary",
      type: "submit",
      disabled: isSubmitting,
      sx: {
        minWidth: 160,
        fontWeight: _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_12__["Fonts"].REGULAR,
        fontSize: 16,
        textTransform: 'capitalize',
        padding: '4px 16px 8px'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_8__["default"], {
      id: "common.login"
    }))));
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_7__["default"], {
    sx: {
      color: 'grey.500'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    style: {
      marginRight: 4
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_8__["default"], {
    id: "common.dontHaveAccount"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_7__["default"], {
    component: "span",
    sx: {
      fontWeight: _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_12__["Fonts"].MEDIUM,
      '& a': {
        color: function color(theme) {
          return theme.palette.primary.main;
        },
        textDecoration: 'none'
      }
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["Link"], {
    to: "/signup"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_8__["default"], {
    id: "common.signup"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_crema_core_AppInfoView__WEBPACK_IMPORTED_MODULE_5__["default"], null));
};
/* harmony default export */ __webpack_exports__["default"] = (SigninJwtAuth);

/***/ }),

/***/ "./resources/js/admin/pages/auth/Signin/index.js":
/*!*******************************************************!*\
  !*** ./resources/js/admin/pages/auth/Signin/index.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material/Box */ "./node_modules/@mui/material/esm/Box/index.js");
/* harmony import */ var _AuthWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AuthWrapper */ "./resources/js/admin/pages/auth/AuthWrapper.js");
/* harmony import */ var _SigninJwtAuth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SigninJwtAuth */ "./resources/js/admin/pages/auth/Signin/SigninJwtAuth.js");
/* harmony import */ var _crema_core_AppLayout_components_AppLogo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../@crema/core/AppLayout/components/AppLogo */ "./resources/js/admin/@crema/core/AppLayout/components/AppLogo/index.js");



// import SigninFirebase from './SigninFirebase';


var Signin = function Signin() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AuthWrapper__WEBPACK_IMPORTED_MODULE_2__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_1__["default"], {
    sx: {
      width: '100%'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_1__["default"], {
    sx: {
      mb: {
        xs: 6,
        xl: 8
      }
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_1__["default"], {
    sx: {
      mb: 5,
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_crema_core_AppLayout_components_AppLogo__WEBPACK_IMPORTED_MODULE_4__["default"], null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SigninJwtAuth__WEBPACK_IMPORTED_MODULE_3__["default"], null)));
};
/* harmony default export */ __webpack_exports__["default"] = (Signin);

/***/ })

}]);