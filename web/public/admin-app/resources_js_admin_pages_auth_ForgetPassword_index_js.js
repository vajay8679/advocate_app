"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_admin_pages_auth_ForgetPassword_index_js"],{

/***/ "./resources/js/admin/pages/auth/AuthWrapper.js":
/*!******************************************************!*\
  !*** ./resources/js/admin/pages/auth/AuthWrapper.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material/Typography */ "./node_modules/@mui/material/esm/Typography/Typography.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material/Card */ "./node_modules/@mui/material/esm/Card/Card.js");
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/Box */ "./node_modules/@mui/material/esm/Box/Box.js");
/* harmony import */ var _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/constants/AppEnums */ "./resources/js/admin/shared/constants/AppEnums.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");







var AuthWrapper = function AuthWrapper(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_3__["default"], {
    sx: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_mui_material_Card__WEBPACK_IMPORTED_MODULE_4__["default"], {
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
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_3__["default"], {
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
        },
        children: children
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_3__["default"], {
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
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_3__["default"], {
          sx: {
            maxWidth: 320
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_5__["default"], {
            component: "h2",
            sx: {
              fontWeight: _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_1__.Fonts.BOLD,
              fontSize: 30,
              mb: 4
            },
            children: "Welcome to Crema!"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_5__["default"], {
            children: "Crema is purely based on Material ui components and follows Material ui guidelines."
          })]
        })
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthWrapper);

/***/ }),

/***/ "./resources/js/admin/pages/auth/ForgetPassword/ForgetPasswordJwtAuth.js":
/*!*******************************************************************************!*\
  !*** ./resources/js/admin/pages/auth/ForgetPassword/ForgetPasswordJwtAuth.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _crema_utility_AuthHooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../@crema/utility/AuthHooks */ "./resources/js/admin/@crema/utility/AuthHooks.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @mui/material/Button */ "./node_modules/@mui/material/esm/Button/Button.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! yup */ "./node_modules/yup/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _crema_core_AppInfoView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../@crema/core/AppInfoView */ "./resources/js/admin/@crema/core/AppInfoView/index.js");
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/material/Box */ "./node_modules/@mui/material/esm/Box/Box.js");
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/material/Typography */ "./node_modules/@mui/material/esm/Typography/Typography.js");
/* harmony import */ var _crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../@crema/utility/IntlMessages */ "./resources/js/admin/@crema/utility/IntlMessages.js");
/* harmony import */ var _crema_core_AppFormComponents_AppTextField__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../@crema/core/AppFormComponents/AppTextField */ "./resources/js/admin/@crema/core/AppFormComponents/AppTextField.js");
/* harmony import */ var _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../shared/constants/AppEnums */ "./resources/js/admin/shared/constants/AppEnums.js");
/* harmony import */ var _AuthWrapper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../AuthWrapper */ "./resources/js/admin/pages/auth/AuthWrapper.js");
/* harmony import */ var _crema_core_AppLayout_components_AppLogo__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../@crema/core/AppLayout/components/AppLogo */ "./resources/js/admin/@crema/core/AppLayout/components/AppLogo/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
















var validationSchema = yup__WEBPACK_IMPORTED_MODULE_3__.object({
  email: yup__WEBPACK_IMPORTED_MODULE_3__.string().email( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_5__["default"], {
    id: "validation.emailFormat"
  })).required( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_5__["default"], {
    id: "validation.emailRequired"
  }))
});
var ForgetPasswordJwtAuth = function ForgetPasswordJwtAuth() {
  var _useAuthMethod = (0,_crema_utility_AuthHooks__WEBPACK_IMPORTED_MODULE_0__.useAuthMethod)(),
    forgotPassword = _useAuthMethod.forgotPassword;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_AuthWrapper__WEBPACK_IMPORTED_MODULE_8__["default"], {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_11__["default"], {
      sx: {
        width: '100%'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_11__["default"], {
        sx: {
          mb: {
            xs: 8,
            xl: 10
          }
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_11__["default"], {
          sx: {
            mb: 5,
            display: 'flex',
            alignItems: 'center'
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_crema_core_AppLayout_components_AppLogo__WEBPACK_IMPORTED_MODULE_9__["default"], {})
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_12__["default"], {
          variant: "h2",
          component: "h2",
          sx: {
            mb: 1.5,
            color: function color(theme) {
              return theme.palette.text.primary;
            },
            fontWeight: _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_7__.Fonts.SEMI_BOLD,
            fontSize: {
              xs: 14,
              xl: 16
            }
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_5__["default"], {
            id: "common.forgetPassword"
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_12__["default"], {
          sx: {
            pt: 3,
            fontSize: 15,
            color: 'grey.500'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {
            style: {
              marginRight: 4
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_5__["default"], {
              id: "common.alreadyHavePassword"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_11__["default"], {
            component: "span",
            sx: {
              fontWeight: _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_7__.Fonts.MEDIUM,
              '& a': {
                color: function color(theme) {
                  return theme.palette.primary.main;
                },
                textDecoration: 'none'
              }
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_13__.Link, {
              to: "/signin",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_5__["default"], {
                id: "common.signIn"
              })
            })
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_11__["default"], {
        sx: {
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_11__["default"], {
          sx: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(formik__WEBPACK_IMPORTED_MODULE_2__.Formik, {
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
            },
            children: function children(_ref2) {
              var isSubmitting = _ref2.isSubmitting;
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(formik__WEBPACK_IMPORTED_MODULE_2__.Form, {
                style: {
                  textAlign: 'left'
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_11__["default"], {
                  sx: {
                    mb: {
                      xs: 5,
                      lg: 8
                    }
                  },
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_crema_core_AppFormComponents_AppTextField__WEBPACK_IMPORTED_MODULE_6__["default"], {
                    placeholder: "Email",
                    name: "email",
                    label: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_5__["default"], {
                      id: "common.emailAddress"
                    }),
                    sx: {
                      width: '100%',
                      '& .MuiInputBase-input': {
                        fontSize: 14
                      }
                    },
                    variant: "outlined"
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_mui_material_Button__WEBPACK_IMPORTED_MODULE_14__["default"], {
                    variant: "contained",
                    color: "primary",
                    disabled: isSubmitting,
                    sx: {
                      fontWeight: _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_7__.Fonts.REGULAR,
                      textTransform: 'capitalize',
                      fontSize: 16,
                      minWidth: 160
                    },
                    type: "submit",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_5__["default"], {
                      id: "common.sendNewPassword"
                    })
                  })
                })]
              });
            }
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_crema_core_AppInfoView__WEBPACK_IMPORTED_MODULE_4__["default"], {})]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ForgetPasswordJwtAuth);

/***/ }),

/***/ "./resources/js/admin/pages/auth/ForgetPassword/index.js":
/*!***************************************************************!*\
  !*** ./resources/js/admin/pages/auth/ForgetPassword/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ForgetPasswordJwtAuth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ForgetPasswordJwtAuth */ "./resources/js/admin/pages/auth/ForgetPassword/ForgetPasswordJwtAuth.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



var ForgetPassword = function ForgetPassword() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ForgetPasswordJwtAuth__WEBPACK_IMPORTED_MODULE_1__["default"], {});
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ForgetPassword);

/***/ })

}]);