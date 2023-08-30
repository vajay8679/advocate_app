(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[28],{

/***/ "./resources/js/admin/pages/errorPages/ComingSoon/index.js":
/*!*****************************************************************!*\
  !*** ./resources/js/admin/pages/errorPages/ComingSoon/index.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material/Button */ "./node_modules/@mui/material/esm/Button/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! yup */ "./node_modules/yup/es/index.js");
/* harmony import */ var _redux_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../redux/actions */ "./resources/js/admin/redux/actions/index.js");
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material/Box */ "./node_modules/@mui/material/esm/Box/index.js");
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material/Typography */ "./node_modules/@mui/material/esm/Typography/index.js");
/* harmony import */ var _mui_material_colors__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material/colors */ "./node_modules/@mui/material/esm/colors/index.js");
/* harmony import */ var _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../shared/constants/AppEnums */ "./resources/js/admin/shared/constants/AppEnums.js");
/* harmony import */ var _crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../@crema/utility/IntlMessages */ "./resources/js/admin/@crema/utility/IntlMessages.js");
/* harmony import */ var _crema_core_AppFormComponents_AppTextField__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../@crema/core/AppFormComponents/AppTextField */ "./resources/js/admin/@crema/core/AppFormComponents/AppTextField.js");
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/material/styles */ "./node_modules/@mui/material/esm/styles/index.js");
/* harmony import */ var _crema_core_AppInfoView__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../@crema/core/AppInfoView */ "./resources/js/admin/@crema/core/AppInfoView/index.js");
/* harmony import */ var _crema_core_AppAnimate__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../@crema/core/AppAnimate */ "./resources/js/admin/@crema/core/AppAnimate/index.js");













// import {ReactComponent as Logo} from '../../../assets/icon/comingsoon.svg';



var FormWrapper = Object(_mui_material_styles__WEBPACK_IMPORTED_MODULE_12__["styled"])(formik__WEBPACK_IMPORTED_MODULE_3__["Form"])(function () {
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
      fontWeight: _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_9__["Fonts"].MEDIUM,
      fontSize: 16,
      textTransform: 'capitalize'
    }
  };
});
var validationSchema = yup__WEBPACK_IMPORTED_MODULE_4__["object"]({
  email: yup__WEBPACK_IMPORTED_MODULE_4__["string"]().email('The Email you entered is not a valid format!').required('Please enter Email Address!')
});
var ComingSoon = function ComingSoon() {
  var theme = Object(_mui_material_styles__WEBPACK_IMPORTED_MODULE_12__["useTheme"])();
  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_crema_core_AppAnimate__WEBPACK_IMPORTED_MODULE_14__["default"], {
    animation: "transition.slideUpIn",
    delay: 200
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_6__["default"], {
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
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_6__["default"], {
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
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_6__["default"], {
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
      fontWeight: _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_9__["Fonts"].MEDIUM
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_10__["default"], {
    id: "error.comingSoon"
  }), "!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_6__["default"], {
    sx: {
      mb: {
        xs: 4,
        xl: 5
      },
      color: _mui_material_colors__WEBPACK_IMPORTED_MODULE_8__["grey"][600]
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_7__["default"], {
    style: {
      fontSize: 18,
      marginTop: 3
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_10__["default"], {
    id: "error.comingSoonMessage1"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_7__["default"], {
    style: {
      fontSize: 18
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_10__["default"], {
    id: "error.comingSoonMessage2"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_6__["default"], {
    sx: {
      mx: 'auto',
      maxWidth: 384
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_3__["Formik"], {
    validateOnChange: true,
    initialValues: {
      email: ''
    },
    validationSchema: validationSchema,
    onSubmit: function onSubmit(data, _ref) {
      var resetForm = _ref.resetForm;
      dispatch(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_5__["showMessage"])( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_10__["default"], {
        id: "error.comingSoonNotification"
      })));
      resetForm();
    }
  }, function () {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormWrapper, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_crema_core_AppFormComponents_AppTextField__WEBPACK_IMPORTED_MODULE_11__["default"], {
      placeholder: "Email",
      name: "email",
      label: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_10__["default"], {
        id: "common.emailAddress"
      }),
      className: "text-field",
      variant: "outlined"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mui_material_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
      variant: "contained",
      color: "primary",
      type: "submit",
      className: "button"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_10__["default"], {
      id: "error.notifyMe"
    })));
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_crema_core_AppInfoView__WEBPACK_IMPORTED_MODULE_13__["default"], null)));
};
/* harmony default export */ __webpack_exports__["default"] = (ComingSoon);

/***/ })

}]);