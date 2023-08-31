"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_admin_pages_errorPages_Maintenance_index_js"],{

/***/ "./resources/js/admin/pages/errorPages/Maintenance/index.js":
/*!******************************************************************!*\
  !*** ./resources/js/admin/pages/errorPages/Maintenance/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/material/Button */ "./node_modules/@mui/material/esm/Button/Button.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/node_modules/react-router/dist/index.js");
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material/Box */ "./node_modules/@mui/material/esm/Box/Box.js");
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material/Typography */ "./node_modules/@mui/material/esm/Typography/Typography.js");
/* harmony import */ var _mui_material_colors__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material/colors */ "./node_modules/@mui/material/esm/colors/grey.js");
/* harmony import */ var _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/constants/AppEnums */ "./resources/js/admin/shared/constants/AppEnums.js");
/* harmony import */ var _shared_constants_AppConst__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/constants/AppConst */ "./resources/js/admin/shared/constants/AppConst.js");
/* harmony import */ var _crema_core_AppAnimate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../@crema/core/AppAnimate */ "./resources/js/admin/@crema/core/AppAnimate/index.js");
/* harmony import */ var _crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../@crema/utility/IntlMessages */ "./resources/js/admin/@crema/utility/IntlMessages.js");
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material/styles */ "./node_modules/@mui/material/esm/styles/useTheme.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");











// import {ReactComponent as Logo} from '../../../assets/icon/maintenance.svg';


var Maintenance = function Maintenance() {
  var theme = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_6__["default"])();
  var navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useNavigate)();
  var onGoBackToHome = function onGoBackToHome() {
    navigate(_shared_constants_AppConst__WEBPACK_IMPORTED_MODULE_2__.initialUrl);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_crema_core_AppAnimate__WEBPACK_IMPORTED_MODULE_3__["default"], {
    animation: "transition.slideUpIn",
    delay: 200,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_8__["default"], {
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
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_8__["default"], {
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
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_8__["default"], {
        sx: {
          mb: {
            xs: 4,
            xl: 5
          }
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_8__["default"], {
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
            fontWeight: _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_1__.Fonts.MEDIUM
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_4__["default"], {
            id: "error.mantainanceMessage1"
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_8__["default"], {
          sx: {
            mb: {
              xs: 4,
              xl: 5
            },
            color: _mui_material_colors__WEBPACK_IMPORTED_MODULE_9__["default"][600],
            fontSize: 16,
            fontWeight: _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_1__.Fonts.MEDIUM
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_10__["default"], {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_4__["default"], {
              id: "error.mantainanceMessage2"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_10__["default"], {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_4__["default"], {
              id: "error.mantainanceMessage3"
            }), "."]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_mui_material_Button__WEBPACK_IMPORTED_MODULE_11__["default"], {
          variant: "contained",
          color: "primary",
          sx: {
            fontWeight: _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_1__.Fonts.MEDIUM,
            fontSize: 16,
            textTransform: 'capitalize'
          },
          onClick: onGoBackToHome,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_4__["default"], {
            id: "error.goBackToHome"
          })
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Maintenance);

/***/ })

}]);