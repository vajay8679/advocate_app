(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[19],{

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

/***/ "./resources/js/admin/pages/auth/ForgetPassword/ForgetPasswordJwtAuth.js":
/*!*******************************************************************************!*\
  !*** ./resources/js/admin/pages/auth/ForgetPassword/ForgetPasswordJwtAuth.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _crema_utility_AuthHooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../@crema/utility/AuthHooks */ "./resources/js/admin/@crema/utility/AuthHooks.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/Button */ "./node_modules/@mui/material/esm/Button/index.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! yup */ "./node_modules/yup/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _crema_core_AppInfoView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../@crema/core/AppInfoView */ "./resources/js/admin/@crema/core/AppInfoView/index.js");
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material/Box */ "./node_modules/@mui/material/esm/Box/index.js");
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material/Typography */ "./node_modules/@mui/material/esm/Typography/index.js");
/* harmony import */ var _crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../@crema/utility/IntlMessages */ "./resources/js/admin/@crema/utility/IntlMessages.js");
/* harmony import */ var _crema_core_AppFormComponents_AppTextField__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../@crema/core/AppFormComponents/AppTextField */ "./resources/js/admin/@crema/core/AppFormComponents/AppTextField.js");
/* harmony import */ var _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../shared/constants/AppEnums */ "./resources/js/admin/shared/constants/AppEnums.js");
/* harmony import */ var _AuthWrapper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../AuthWrapper */ "./resources/js/admin/pages/auth/AuthWrapper.js");
/* harmony import */ var _crema_core_AppLayout_components_AppLogo__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../@crema/core/AppLayout/components/AppLogo */ "./resources/js/admin/@crema/core/AppLayout/components/AppLogo/index.js");














var validationSchema = yup__WEBPACK_IMPORTED_MODULE_4__["object"]({
  email: yup__WEBPACK_IMPORTED_MODULE_4__["string"]().email( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_9__["default"], {
    id: "validation.emailFormat"
  })).required( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_9__["default"], {
    id: "validation.emailRequired"
  }))
});
var ForgetPasswordJwtAuth = function ForgetPasswordJwtAuth() {
  var _useAuthMethod = Object(_crema_utility_AuthHooks__WEBPACK_IMPORTED_MODULE_0__["useAuthMethod"])(),
    forgotPassword = _useAuthMethod.forgotPassword;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_AuthWrapper__WEBPACK_IMPORTED_MODULE_12__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_7__["default"], {
    sx: {
      width: '100%'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_7__["default"], {
    sx: {
      mb: {
        xs: 8,
        xl: 10
      }
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_7__["default"], {
    sx: {
      mb: 5,
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_crema_core_AppLayout_components_AppLogo__WEBPACK_IMPORTED_MODULE_13__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__["default"], {
    variant: "h2",
    component: "h2",
    sx: {
      mb: 1.5,
      color: function color(theme) {
        return theme.palette.text.primary;
      },
      fontWeight: _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_11__["Fonts"].SEMI_BOLD,
      fontSize: {
        xs: 14,
        xl: 16
      }
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_9__["default"], {
    id: "common.forgetPassword"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__["default"], {
    sx: {
      pt: 3,
      fontSize: 15,
      color: 'grey.500'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    style: {
      marginRight: 4
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_9__["default"], {
    id: "common.alreadyHavePassword"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_7__["default"], {
    component: "span",
    sx: {
      fontWeight: _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_11__["Fonts"].MEDIUM,
      '& a': {
        color: function color(theme) {
          return theme.palette.primary.main;
        },
        textDecoration: 'none'
      }
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Link"], {
    to: "/signin"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_9__["default"], {
    id: "common.signIn"
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_7__["default"], {
    sx: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_7__["default"], {
    sx: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_3__["Formik"], {
    validateOnChange: true,
    initialValues: {
      email: ''
    },
    validationSchema: validationSchema,
    onSubmit: function onSubmit(data, _ref) {
      var setSubmitting = _ref.setSubmitting,
        resetForm = _ref.resetForm;
      setSubmitting(true);
      forgotPassword({
        email: data.email
      });
      //reset password api goes here
      setSubmitting(false);
      resetForm();
    }
  }, function (_ref2) {
    var isSubmitting = _ref2.isSubmitting;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_3__["Form"], {
      style: {
        textAlign: 'left'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_7__["default"], {
      sx: {
        mb: {
          xs: 5,
          lg: 8
        }
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_crema_core_AppFormComponents_AppTextField__WEBPACK_IMPORTED_MODULE_10__["default"], {
      placeholder: "Email",
      name: "email",
      label: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_9__["default"], {
        id: "common.emailAddress"
      }),
      sx: {
        width: '100%',
        '& .MuiInputBase-input': {
          fontSize: 14
        }
      },
      variant: "outlined"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
      variant: "contained",
      color: "primary",
      disabled: isSubmitting,
      sx: {
        fontWeight: _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_11__["Fonts"].REGULAR,
        textTransform: 'capitalize',
        fontSize: 16,
        minWidth: 160
      },
      type: "submit"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_9__["default"], {
      id: "common.sendNewPassword"
    }))));
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_crema_core_AppInfoView__WEBPACK_IMPORTED_MODULE_6__["default"], null))));
};
/* harmony default export */ __webpack_exports__["default"] = (ForgetPasswordJwtAuth);

/***/ }),

/***/ "./resources/js/admin/pages/auth/ForgetPassword/index.js":
/*!***************************************************************!*\
  !*** ./resources/js/admin/pages/auth/ForgetPassword/index.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ForgetPasswordJwtAuth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ForgetPasswordJwtAuth */ "./resources/js/admin/pages/auth/ForgetPassword/ForgetPasswordJwtAuth.js");


var ForgetPassword = function ForgetPassword() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ForgetPasswordJwtAuth__WEBPACK_IMPORTED_MODULE_1__["default"], null);
};
/* harmony default export */ __webpack_exports__["default"] = (ForgetPassword);

/***/ })

}]);