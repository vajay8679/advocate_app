(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[30],{

/***/ "./resources/js/admin/pages/errorPages/Error404/index.js":
/*!***************************************************************!*\
  !*** ./resources/js/admin/pages/errorPages/Error404/index.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material/Button */ "./node_modules/@mui/material/esm/Button/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/Box */ "./node_modules/@mui/material/esm/Box/index.js");
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material/Typography */ "./node_modules/@mui/material/esm/Typography/index.js");
/* harmony import */ var _mui_material_colors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material/colors */ "./node_modules/@mui/material/esm/colors/index.js");
/* harmony import */ var _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../shared/constants/AppEnums */ "./resources/js/admin/shared/constants/AppEnums.js");
/* harmony import */ var _shared_constants_AppConst__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../shared/constants/AppConst */ "./resources/js/admin/shared/constants/AppConst.js");
/* harmony import */ var _crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../@crema/utility/IntlMessages */ "./resources/js/admin/@crema/utility/IntlMessages.js");
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material/styles */ "./node_modules/@mui/material/esm/styles/index.js");
/* harmony import */ var _crema_core_AppAnimate__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../@crema/core/AppAnimate */ "./resources/js/admin/@crema/core/AppAnimate/index.js");









// import {ReactComponent as Logo} from '../../../assets/icon/404.svg';


var Error404 = function Error404() {
  var theme = Object(_mui_material_styles__WEBPACK_IMPORTED_MODULE_9__["useTheme"])();
  var navigate = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["useNavigate"])();
  var onGoBackToHome = function onGoBackToHome() {
    navigate(_shared_constants_AppConst__WEBPACK_IMPORTED_MODULE_7__["initialUrl"]);
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_crema_core_AppAnimate__WEBPACK_IMPORTED_MODULE_10__["default"], {
    animation: "transition.slideUpIn",
    delay: 200
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_3__["default"], {
    sx: {
      py: {
        xl: 8
      },
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_3__["default"], {
    sx: {
      mb: {
        xs: 4,
        xl: 8
      },
      width: '100%',
      maxWidth: {
        xs: 200,
        sm: 300,
        xl: 706
      },
      '& svg': {
        width: '100%',
        maxWidth: 400
      }
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_3__["default"], {
    sx: {
      mb: {
        xs: 4,
        xl: 5
      }
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_3__["default"], {
    variant: "h3",
    sx: {
      mb: {
        xs: 3,
        xl: 4
      },
      fontSize: {
        xs: 20,
        md: 24
      },
      fontWeight: _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_6__["Fonts"].MEDIUM
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_8__["default"], {
    id: "error.404Error"
  }), "."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_3__["default"], {
    sx: {
      mb: {
        xs: 4,
        xl: 5
      },
      color: _mui_material_colors__WEBPACK_IMPORTED_MODULE_5__["grey"][600],
      fontSize: 16,
      fontWeight: _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_6__["Fonts"].MEDIUM
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_4__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_8__["default"], {
    id: "error.message1"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_4__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_8__["default"], {
    id: "error.message2"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    variant: "contained",
    color: "primary",
    sx: {
      fontWeight: _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_6__["Fonts"].MEDIUM,
      fontSize: 16,
      textTransform: 'capitalize'
    },
    onClick: onGoBackToHome
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_8__["default"], {
    id: "error.goBackToHome"
  })))));
};
/* harmony default export */ __webpack_exports__["default"] = (Error404);

/***/ })

}]);