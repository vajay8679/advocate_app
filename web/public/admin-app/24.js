(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[24],{

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

/***/ "./resources/js/admin/pages/auth/ConfirmSignupAwsCognito.js":
/*!******************************************************************!*\
  !*** ./resources/js/admin/pages/auth/ConfirmSignupAwsCognito.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _redux_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../redux/actions */ "./resources/js/admin/redux/actions/index.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/index.js");
/* harmony import */ var _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/constants/AppEnums */ "./resources/js/admin/shared/constants/AppEnums.js");
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material/Box */ "./node_modules/@mui/material/esm/Box/index.js");
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material/Typography */ "./node_modules/@mui/material/esm/Typography/index.js");
/* harmony import */ var _crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../@crema/utility/IntlMessages */ "./resources/js/admin/@crema/utility/IntlMessages.js");
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material/Button */ "./node_modules/@mui/material/esm/Button/index.js");
/* harmony import */ var _crema_core_AppInfoView__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../@crema/core/AppInfoView */ "./resources/js/admin/@crema/core/AppInfoView/index.js");
/* harmony import */ var _crema_utility_AuthHooks__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../@crema/utility/AuthHooks */ "./resources/js/admin/@crema/utility/AuthHooks.js");
/* harmony import */ var react_code_input__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-code-input */ "./node_modules/react-code-input/dist/ReactCodeInput.js");
/* harmony import */ var react_code_input__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_code_input__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _AuthWrapper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./AuthWrapper */ "./resources/js/admin/pages/auth/AuthWrapper.js");
/* harmony import */ var _crema_core_AppLayout_components_AppLogo__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../@crema/core/AppLayout/components/AppLogo */ "./resources/js/admin/@crema/core/AppLayout/components/AppLogo/index.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }














var ConfirmSignupAwsCognito = function ConfirmSignupAwsCognito(props) {
  var _useAuthMethod = Object(_crema_utility_AuthHooks__WEBPACK_IMPORTED_MODULE_10__["useAuthMethod"])(),
    confirmCognitoUserSignup = _useAuthMethod.confirmCognitoUserSignup;
  var navigate = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useNavigate"])();
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(''),
    _useState2 = _slicedToArray(_useState, 2),
    pin = _useState2[0],
    setPin = _useState2[1];
  var _useIntl = Object(react_intl__WEBPACK_IMPORTED_MODULE_3__["useIntl"])(),
    messages = _useIntl.messages;
  var handleSubmit = function handleSubmit() {
    var _ref = props.location.state || {},
      email = _ref.email;
    if (email && pin.length === 6) {
      confirmCognitoUserSignup(email, pin);
    } else if (!email) {
      navigate('/signup');
      Object(_redux_actions__WEBPACK_IMPORTED_MODULE_2__["fetchError"])(messages['validation.tryAgain']);
    } else {
      Object(_redux_actions__WEBPACK_IMPORTED_MODULE_2__["fetchError"])(messages['validation.pinLength']);
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AuthWrapper__WEBPACK_IMPORTED_MODULE_12__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_5__["default"], {
    sx: {
      width: '100%'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_5__["default"], {
    sx: {
      mb: 5,
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_crema_core_AppLayout_components_AppLogo__WEBPACK_IMPORTED_MODULE_13__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_6__["default"], {
    variant: "h2",
    component: "h2",
    sx: {
      mb: 1.5,
      color: function color(theme) {
        return theme.palette.text.primary;
      },
      fontWeight: _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_4__["Fonts"].SEMI_BOLD,
      fontSize: {
        xs: 14,
        xl: 16
      }
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_7__["default"], {
    id: "common.emailVerification"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_5__["default"], {
    sx: {
      mb: {
        xs: 5,
        xl: 10
      },
      fontSize: 18
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_6__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_7__["default"], {
    id: "common.verificationMessage"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_5__["default"], {
    sx: {
      mb: {
        xs: 6,
        xl: 10
      }
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_code_input__WEBPACK_IMPORTED_MODULE_11___default.a, {
    type: "password",
    value: pin,
    fields: 6,
    onChange: function onChange(value) {
      return setPin(value);
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Button__WEBPACK_IMPORTED_MODULE_8__["default"], {
    variant: "contained",
    color: "primary",
    type: "submit",
    sx: {
      fontWeight: _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_4__["Fonts"].REGULAR,
      textTransform: 'capitalize',
      fontSize: 16,
      minWidth: 160
    },
    onClick: handleSubmit
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_7__["default"], {
    id: "common.submit"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_crema_core_AppInfoView__WEBPACK_IMPORTED_MODULE_9__["default"], null)));
};
/* harmony default export */ __webpack_exports__["default"] = (ConfirmSignupAwsCognito);

/***/ })

}]);