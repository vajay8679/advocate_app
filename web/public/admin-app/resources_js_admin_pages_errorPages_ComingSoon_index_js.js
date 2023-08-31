"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_admin_pages_errorPages_ComingSoon_index_js"],{

/***/ "./resources/js/admin/pages/errorPages/ComingSoon/index.js":
/*!*****************************************************************!*\
  !*** ./resources/js/admin/pages/errorPages/ComingSoon/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @mui/material/Button */ "./node_modules/@mui/material/esm/Button/Button.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! yup */ "./node_modules/yup/es/index.js");
/* harmony import */ var _redux_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../redux/actions */ "./resources/js/admin/redux/actions/index.js");
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mui/material/Box */ "./node_modules/@mui/material/esm/Box/Box.js");
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @mui/material/Typography */ "./node_modules/@mui/material/esm/Typography/Typography.js");
/* harmony import */ var _mui_material_colors__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @mui/material/colors */ "./node_modules/@mui/material/esm/colors/grey.js");
/* harmony import */ var _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../shared/constants/AppEnums */ "./resources/js/admin/shared/constants/AppEnums.js");
/* harmony import */ var _crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../@crema/utility/IntlMessages */ "./resources/js/admin/@crema/utility/IntlMessages.js");
/* harmony import */ var _crema_core_AppFormComponents_AppTextField__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../@crema/core/AppFormComponents/AppTextField */ "./resources/js/admin/@crema/core/AppFormComponents/AppTextField.js");
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/material/styles */ "./node_modules/@mui/material/esm/styles/styled.js");
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/material/styles */ "./node_modules/@mui/material/esm/styles/useTheme.js");
/* harmony import */ var _crema_core_AppInfoView__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../@crema/core/AppInfoView */ "./resources/js/admin/@crema/core/AppInfoView/index.js");
/* harmony import */ var _crema_core_AppAnimate__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../@crema/core/AppAnimate */ "./resources/js/admin/@crema/core/AppAnimate/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");













// import {ReactComponent as Logo} from '../../../assets/icon/comingsoon.svg';






var FormWrapper = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_11__["default"])(formik__WEBPACK_IMPORTED_MODULE_2__.Form)(function () {
  return {
    display: 'flex',
    flexDirection: 'column',
    width: 300,
    alignItems: 'center',
    marginBottom: 12,
    '& .text-field': {
      width: '100%',
      marginBottom: 20
    },
    '& .button': {
      fontWeight: _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_5__.Fonts.MEDIUM,
      fontSize: 16,
      textTransform: 'capitalize'
    }
  };
});
var validationSchema = yup__WEBPACK_IMPORTED_MODULE_3__.object({
  email: yup__WEBPACK_IMPORTED_MODULE_3__.string().email('The Email you entered is not a valid format!').required('Please enter Email Address!')
});
var ComingSoon = function ComingSoon() {
  var theme = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_12__["default"])();
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_crema_core_AppAnimate__WEBPACK_IMPORTED_MODULE_9__["default"], {
    animation: "transition.slideUpIn",
    delay: 200,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_13__["default"], {
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
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_13__["default"], {
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
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_13__["default"], {
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
            fontWeight: _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_5__.Fonts.MEDIUM
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_6__["default"], {
            id: "error.comingSoon"
          }), "!"]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_13__["default"], {
          sx: {
            mb: {
              xs: 4,
              xl: 5
            },
            color: _mui_material_colors__WEBPACK_IMPORTED_MODULE_14__["default"][600]
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_15__["default"], {
            style: {
              fontSize: 18,
              marginTop: 3
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_6__["default"], {
              id: "error.comingSoonMessage1"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_15__["default"], {
            style: {
              fontSize: 18
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_6__["default"], {
              id: "error.comingSoonMessage2"
            })
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_13__["default"], {
        sx: {
          mx: 'auto',
          maxWidth: 384
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(formik__WEBPACK_IMPORTED_MODULE_2__.Formik, {
          validateOnChange: true,
          initialValues: {
            email: ''
          },
          validationSchema: validationSchema,
          onSubmit: function onSubmit(data, _ref) {
            var resetForm = _ref.resetForm;
            dispatch((0,_redux_actions__WEBPACK_IMPORTED_MODULE_4__.showMessage)( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_6__["default"], {
              id: "error.comingSoonNotification"
            })));
            resetForm();
          },
          children: function children() {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(FormWrapper, {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_crema_core_AppFormComponents_AppTextField__WEBPACK_IMPORTED_MODULE_7__["default"], {
                placeholder: "Email",
                name: "email",
                label: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_6__["default"], {
                  id: "common.emailAddress"
                }),
                className: "text-field",
                variant: "outlined"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_mui_material_Button__WEBPACK_IMPORTED_MODULE_16__["default"], {
                variant: "contained",
                color: "primary",
                type: "submit",
                className: "button",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_6__["default"], {
                  id: "error.notifyMe"
                })
              })]
            });
          }
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_crema_core_AppInfoView__WEBPACK_IMPORTED_MODULE_8__["default"], {})]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ComingSoon);

/***/ })

}]);