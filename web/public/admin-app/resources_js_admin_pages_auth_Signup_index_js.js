"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_admin_pages_auth_Signup_index_js"],{

/***/ "./node_modules/@mui/material/esm/Checkbox/Checkbox.js":
/*!*************************************************************!*\
  !*** ./node_modules/@mui/material/esm/Checkbox/Checkbox.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/refType.js");
/* harmony import */ var _mui_base__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/base */ "./node_modules/@mui/utils/esm/composeClasses/composeClasses.js");
/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/system */ "./node_modules/@mui/system/esm/colorManipulator.js");
/* harmony import */ var _internal_SwitchBase__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../internal/SwitchBase */ "./node_modules/@mui/material/esm/internal/SwitchBase.js");
/* harmony import */ var _internal_svg_icons_CheckBoxOutlineBlank__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../internal/svg-icons/CheckBoxOutlineBlank */ "./node_modules/@mui/material/esm/internal/svg-icons/CheckBoxOutlineBlank.js");
/* harmony import */ var _internal_svg_icons_CheckBox__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../internal/svg-icons/CheckBox */ "./node_modules/@mui/material/esm/internal/svg-icons/CheckBox.js");
/* harmony import */ var _internal_svg_icons_IndeterminateCheckBox__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../internal/svg-icons/IndeterminateCheckBox */ "./node_modules/@mui/material/esm/internal/svg-icons/IndeterminateCheckBox.js");
/* harmony import */ var _utils_capitalize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/capitalize */ "./node_modules/@mui/material/esm/utils/capitalize.js");
/* harmony import */ var _styles_useThemeProps__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../styles/useThemeProps */ "./node_modules/@mui/material/esm/styles/useThemeProps.js");
/* harmony import */ var _styles_styled__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../styles/styled */ "./node_modules/@mui/material/esm/styles/styled.js");
/* harmony import */ var _checkboxClasses__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./checkboxClasses */ "./node_modules/@mui/material/esm/Checkbox/checkboxClasses.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");


const _excluded = ["checkedIcon", "color", "icon", "indeterminate", "indeterminateIcon", "inputProps", "size", "className"];
















const useUtilityClasses = ownerState => {
  const {
    classes,
    indeterminate,
    color
  } = ownerState;
  const slots = {
    root: ['root', indeterminate && 'indeterminate', `color${(0,_utils_capitalize__WEBPACK_IMPORTED_MODULE_5__["default"])(color)}`]
  };
  const composedClasses = (0,_mui_base__WEBPACK_IMPORTED_MODULE_6__["default"])(slots, _checkboxClasses__WEBPACK_IMPORTED_MODULE_7__.getCheckboxUtilityClass, classes);
  return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, classes, composedClasses);
};

const CheckboxRoot = (0,_styles_styled__WEBPACK_IMPORTED_MODULE_8__["default"])(_internal_SwitchBase__WEBPACK_IMPORTED_MODULE_9__["default"], {
  shouldForwardProp: prop => (0,_styles_styled__WEBPACK_IMPORTED_MODULE_8__.rootShouldForwardProp)(prop) || prop === 'classes',
  name: 'MuiCheckbox',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.indeterminate && styles.indeterminate, ownerState.color !== 'default' && styles[`color${(0,_utils_capitalize__WEBPACK_IMPORTED_MODULE_5__["default"])(ownerState.color)}`]];
  }
})(({
  theme,
  ownerState
}) => (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
  color: (theme.vars || theme).palette.text.secondary
}, !ownerState.disableRipple && {
  '&:hover': {
    backgroundColor: theme.vars ? `rgba(${ownerState.color === 'default' ? theme.vars.palette.action.activeChannel : theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.hoverOpacity})` : (0,_mui_system__WEBPACK_IMPORTED_MODULE_10__.alpha)(ownerState.color === 'default' ? theme.palette.action.active : theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }
}, ownerState.color !== 'default' && {
  [`&.${_checkboxClasses__WEBPACK_IMPORTED_MODULE_7__["default"].checked}, &.${_checkboxClasses__WEBPACK_IMPORTED_MODULE_7__["default"].indeterminate}`]: {
    color: (theme.vars || theme).palette[ownerState.color].main
  },
  [`&.${_checkboxClasses__WEBPACK_IMPORTED_MODULE_7__["default"].disabled}`]: {
    color: (theme.vars || theme).palette.action.disabled
  }
}));

const defaultCheckedIcon = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_internal_svg_icons_CheckBox__WEBPACK_IMPORTED_MODULE_11__["default"], {});

const defaultIcon = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_internal_svg_icons_CheckBoxOutlineBlank__WEBPACK_IMPORTED_MODULE_12__["default"], {});

const defaultIndeterminateIcon = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_internal_svg_icons_IndeterminateCheckBox__WEBPACK_IMPORTED_MODULE_13__["default"], {});

const Checkbox = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.forwardRef(function Checkbox(inProps, ref) {
  var _icon$props$fontSize, _indeterminateIcon$pr;

  const props = (0,_styles_useThemeProps__WEBPACK_IMPORTED_MODULE_14__["default"])({
    props: inProps,
    name: 'MuiCheckbox'
  });

  const {
    checkedIcon = defaultCheckedIcon,
    color = 'primary',
    icon: iconProp = defaultIcon,
    indeterminate = false,
    indeterminateIcon: indeterminateIconProp = defaultIndeterminateIcon,
    inputProps,
    size = 'medium',
    className
  } = props,
        other = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(props, _excluded);

  const icon = indeterminate ? indeterminateIconProp : iconProp;
  const indeterminateIcon = indeterminate ? indeterminateIconProp : checkedIcon;

  const ownerState = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {
    color,
    indeterminate,
    size
  });

  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(CheckboxRoot, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
    type: "checkbox",
    inputProps: (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
      'data-indeterminate': indeterminate
    }, inputProps),
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.cloneElement(icon, {
      fontSize: (_icon$props$fontSize = icon.props.fontSize) != null ? _icon$props$fontSize : size
    }),
    checkedIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.cloneElement(indeterminateIcon, {
      fontSize: (_indeterminateIcon$pr = indeterminateIcon.props.fontSize) != null ? _indeterminateIcon$pr : size
    }),
    ownerState: ownerState,
    ref: ref,
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_3__["default"])(classes.root, className)
  }, other, {
    classes: classes
  }));
});
 true ? Checkbox.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * If `true`, the component is checked.
   */
  checked: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().bool),

  /**
   * The icon to display when the component is checked.
   * @default <CheckBoxIcon />
   */
  checkedIcon: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().node),

  /**
   * Override or extend the styles applied to the component.
   */
  classes: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().object),

  /**
   * @ignore
   */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().string),

  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
   * @default 'primary'
   */
  color: prop_types__WEBPACK_IMPORTED_MODULE_15___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_15___default().oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']), (prop_types__WEBPACK_IMPORTED_MODULE_15___default().string)]),

  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().bool),

  /**
   * If `true`, the component is disabled.
   */
  disabled: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().bool),

  /**
   * If `true`, the ripple effect is disabled.
   */
  disableRipple: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().bool),

  /**
   * The icon to display when the component is unchecked.
   * @default <CheckBoxOutlineBlankIcon />
   */
  icon: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().node),

  /**
   * The id of the `input` element.
   */
  id: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().string),

  /**
   * If `true`, the component appears indeterminate.
   * This does not set the native input element to indeterminate due
   * to inconsistent behavior across browsers.
   * However, we set a `data-indeterminate` attribute on the `input`.
   * @default false
   */
  indeterminate: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().bool),

  /**
   * The icon to display when the component is indeterminate.
   * @default <IndeterminateCheckBoxIcon />
   */
  indeterminateIcon: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().node),

  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().object),

  /**
   * Pass a ref to the `input` element.
   */
  inputRef: _mui_utils__WEBPACK_IMPORTED_MODULE_16__["default"],

  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().func),

  /**
   * If `true`, the `input` element is required.
   */
  required: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().bool),

  /**
   * The size of the component.
   * `small` is equivalent to the dense checkbox styling.
   * @default 'medium'
   */
  size: prop_types__WEBPACK_IMPORTED_MODULE_15___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_15___default().oneOf(['medium', 'small']), (prop_types__WEBPACK_IMPORTED_MODULE_15___default().string)]),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: prop_types__WEBPACK_IMPORTED_MODULE_15___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_15___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_15___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_15___default().func), (prop_types__WEBPACK_IMPORTED_MODULE_15___default().object), (prop_types__WEBPACK_IMPORTED_MODULE_15___default().bool)])), (prop_types__WEBPACK_IMPORTED_MODULE_15___default().func), (prop_types__WEBPACK_IMPORTED_MODULE_15___default().object)]),

  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().any)
} : 0;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Checkbox);

/***/ }),

/***/ "./node_modules/@mui/material/esm/Checkbox/checkboxClasses.js":
/*!********************************************************************!*\
  !*** ./node_modules/@mui/material/esm/Checkbox/checkboxClasses.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getCheckboxUtilityClass: () => (/* binding */ getCheckboxUtilityClass)
/* harmony export */ });
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js");
/* harmony import */ var _generateUtilityClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../generateUtilityClass */ "./node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js");


function getCheckboxUtilityClass(slot) {
  return (0,_generateUtilityClass__WEBPACK_IMPORTED_MODULE_0__["default"])('MuiCheckbox', slot);
}
const checkboxClasses = (0,_mui_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('MuiCheckbox', ['root', 'checked', 'disabled', 'indeterminate', 'colorPrimary', 'colorSecondary']);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (checkboxClasses);

/***/ }),

/***/ "./node_modules/@mui/material/esm/internal/svg-icons/CheckBox.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@mui/material/esm/internal/svg-icons/CheckBox.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_createSvgIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/createSvgIcon */ "./node_modules/@mui/material/esm/utils/createSvgIcon.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");


/**
 * @ignore - internal component.
 */


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_utils_createSvgIcon__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
  d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
}), 'CheckBox'));

/***/ }),

/***/ "./node_modules/@mui/material/esm/internal/svg-icons/CheckBoxOutlineBlank.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@mui/material/esm/internal/svg-icons/CheckBoxOutlineBlank.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_createSvgIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/createSvgIcon */ "./node_modules/@mui/material/esm/utils/createSvgIcon.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");


/**
 * @ignore - internal component.
 */


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_utils_createSvgIcon__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
  d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
}), 'CheckBoxOutlineBlank'));

/***/ }),

/***/ "./node_modules/@mui/material/esm/internal/svg-icons/IndeterminateCheckBox.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@mui/material/esm/internal/svg-icons/IndeterminateCheckBox.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_createSvgIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/createSvgIcon */ "./node_modules/@mui/material/esm/utils/createSvgIcon.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");


/**
 * @ignore - internal component.
 */


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_utils_createSvgIcon__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
  d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"
}), 'IndeterminateCheckBox'));

/***/ }),

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

/***/ "./resources/js/admin/pages/auth/Signup/SignupJwtAuth.js":
/*!***************************************************************!*\
  !*** ./resources/js/admin/pages/auth/Signup/SignupJwtAuth.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mui_material_Checkbox__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material/Checkbox */ "./node_modules/@mui/material/esm/Checkbox/Checkbox.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/material/Button */ "./node_modules/@mui/material/esm/Button/Button.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! yup */ "./node_modules/yup/es/index.js");
/* harmony import */ var _crema_core_AppInfoView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../@crema/core/AppInfoView */ "./resources/js/admin/@crema/core/AppInfoView/index.js");
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material/Box */ "./node_modules/@mui/material/esm/Box/Box.js");
/* harmony import */ var _crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../@crema/utility/IntlMessages */ "./resources/js/admin/@crema/utility/IntlMessages.js");
/* harmony import */ var _crema_core_AppFormComponents_AppTextField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../@crema/core/AppFormComponents/AppTextField */ "./resources/js/admin/@crema/core/AppFormComponents/AppTextField.js");
/* harmony import */ var _crema_utility_AuthHooks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../@crema/utility/AuthHooks */ "./resources/js/admin/@crema/utility/AuthHooks.js");
/* harmony import */ var _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../shared/constants/AppEnums */ "./resources/js/admin/shared/constants/AppEnums.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");














var validationSchema = yup__WEBPACK_IMPORTED_MODULE_2__.object({
  name: yup__WEBPACK_IMPORTED_MODULE_2__.string().required( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_4__["default"], {
    id: "validation.nameRequired"
  })),
  email: yup__WEBPACK_IMPORTED_MODULE_2__.string().email( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_4__["default"], {
    id: "validation.emailFormat"
  })).required( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_4__["default"], {
    id: "validation.emailRequired"
  })),
  password: yup__WEBPACK_IMPORTED_MODULE_2__.string().required( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_4__["default"], {
    id: "validation.passwordRequired"
  }))
});
var SignupJwtAuth = function SignupJwtAuth() {
  var _useAuthMethod = (0,_crema_utility_AuthHooks__WEBPACK_IMPORTED_MODULE_6__.useAuthMethod)(),
    signUpUser = _useAuthMethod.signUpUser;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_9__["default"], {
    sx: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_9__["default"], {
      sx: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        mb: 5
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(formik__WEBPACK_IMPORTED_MODULE_1__.Formik, {
        validateOnChange: true,
        initialValues: {
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        },
        validationSchema: validationSchema,
        onSubmit: function onSubmit(data, _ref) {
          var setSubmitting = _ref.setSubmitting;
          setSubmitting(true);
          signUpUser({
            email: data.email,
            password: data.password,
            name: data.name
          });
          setSubmitting(false);
        },
        children: function children(_ref2) {
          var isSubmitting = _ref2.isSubmitting;
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(formik__WEBPACK_IMPORTED_MODULE_1__.Form, {
            style: {
              textAlign: 'left'
            },
            noValidate: true,
            autoComplete: "off",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_9__["default"], {
              sx: {
                mb: {
                  xs: 4,
                  xl: 5
                }
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_crema_core_AppFormComponents_AppTextField__WEBPACK_IMPORTED_MODULE_5__["default"], {
                label: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_4__["default"], {
                  id: "common.name"
                }),
                name: "name",
                variant: "outlined",
                sx: {
                  width: '100%',
                  '& .MuiInputBase-input': {
                    fontSize: 14
                  }
                }
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_9__["default"], {
              sx: {
                mb: {
                  xs: 4,
                  xl: 5
                }
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_crema_core_AppFormComponents_AppTextField__WEBPACK_IMPORTED_MODULE_5__["default"], {
                label: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_4__["default"], {
                  id: "common.email"
                }),
                name: "email",
                variant: "outlined",
                sx: {
                  width: '100%',
                  '& .MuiInputBase-input': {
                    fontSize: 14
                  }
                }
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_9__["default"], {
              sx: {
                mb: {
                  xs: 4,
                  xl: 5
                }
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_crema_core_AppFormComponents_AppTextField__WEBPACK_IMPORTED_MODULE_5__["default"], {
                label: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_4__["default"], {
                  id: "common.password"
                }),
                name: "password",
                type: "password",
                variant: "outlined",
                sx: {
                  width: '100%',
                  '& .MuiInputBase-input': {
                    fontSize: 14
                  }
                }
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_9__["default"], {
              sx: {
                mb: {
                  xs: 3,
                  xl: 4
                },
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_9__["default"], {
                sx: {
                  display: 'flex',
                  alignItems: 'center'
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_mui_material_Checkbox__WEBPACK_IMPORTED_MODULE_10__["default"], {
                  sx: {
                    ml: -3
                  }
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_9__["default"], {
                  component: "span",
                  sx: {
                    mr: 2,
                    color: 'grey.500'
                  },
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_4__["default"], {
                    id: "common.iAgreeTo"
                  })
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_9__["default"], {
                component: "span",
                sx: {
                  color: function color(theme) {
                    return theme.palette.primary.main;
                  },
                  cursor: 'pointer'
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_4__["default"], {
                  id: "common.termConditions"
                })
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_mui_material_Button__WEBPACK_IMPORTED_MODULE_11__["default"], {
                variant: "contained",
                color: "primary",
                disabled: isSubmitting,
                sx: {
                  minWidth: 160,
                  fontWeight: _shared_constants_AppEnums__WEBPACK_IMPORTED_MODULE_7__.Fonts.REGULAR,
                  fontSize: 16,
                  textTransform: 'capitalize',
                  padding: '4px 16px 8px'
                },
                type: "submit",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_4__["default"], {
                  id: "common.signup"
                })
              })
            })]
          });
        }
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_9__["default"], {
      sx: {
        color: 'grey.500'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
        style: {
          marginRight: 4
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_4__["default"], {
          id: "common.alreadyHaveAccount"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_9__["default"], {
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
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_12__.Link, {
          to: "/signIn",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_crema_utility_IntlMessages__WEBPACK_IMPORTED_MODULE_4__["default"], {
            id: "common.signIn"
          })
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_crema_core_AppInfoView__WEBPACK_IMPORTED_MODULE_3__["default"], {})]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SignupJwtAuth);

/***/ }),

/***/ "./resources/js/admin/pages/auth/Signup/index.js":
/*!*******************************************************!*\
  !*** ./resources/js/admin/pages/auth/Signup/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material/Box */ "./node_modules/@mui/material/esm/Box/Box.js");
/* harmony import */ var _AuthWrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AuthWrapper */ "./resources/js/admin/pages/auth/AuthWrapper.js");
/* harmony import */ var _SignupJwtAuth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SignupJwtAuth */ "./resources/js/admin/pages/auth/Signup/SignupJwtAuth.js");
/* harmony import */ var _crema_core_AppLayout_components_AppLogo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../@crema/core/AppLayout/components/AppLogo */ "./resources/js/admin/@crema/core/AppLayout/components/AppLogo/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



// import SignupFirebase from './SignupFirebase';




var Signup = function Signup() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_AuthWrapper__WEBPACK_IMPORTED_MODULE_1__["default"], {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_5__["default"], {
      sx: {
        width: '100%'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_5__["default"], {
        sx: {
          mb: {
            xs: 6,
            xl: 8
          }
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_5__["default"], {
          sx: {
            mb: 5,
            display: 'flex',
            alignItems: 'center'
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_crema_core_AppLayout_components_AppLogo__WEBPACK_IMPORTED_MODULE_3__["default"], {})
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_SignupJwtAuth__WEBPACK_IMPORTED_MODULE_2__["default"], {})]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Signup);

/***/ })

}]);