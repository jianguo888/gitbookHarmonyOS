/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "../../../../../../../../Desktop/harmonyos/08HarmonyOS_JS-UI_Advance/entry/src/main/js/default/pages/module/module.hml?entry");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../../../../../../Desktop/harmonyos/08HarmonyOS_JS-UI_Advance/entry/src/main/js/default/pages/module/module.hml?entry":
/*!************************************************************************************************************************!*\
  !*** C:/Users/zyh/Desktop/harmonyos/08HarmonyOS_JS-UI_Advance/entry/src/main/js/default/pages/module/module.hml?entry ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $app_template$ = __webpack_require__(/*! !../../../../../../../../../../AppData/Local/Huawei/Sdk/js/2.1.1.21/build-tools/ace-loader/lib/json.js!../../../../../../../../../../AppData/Local/Huawei/Sdk/js/2.1.1.21/build-tools/ace-loader/lib/template.js!./module.hml */ "./lib/json.js!./lib/template.js!../../../../../../../../Desktop/harmonyos/08HarmonyOS_JS-UI_Advance/entry/src/main/js/default/pages/module/module.hml")
var $app_style$ = __webpack_require__(/*! !../../../../../../../../../../AppData/Local/Huawei/Sdk/js/2.1.1.21/build-tools/ace-loader/lib/json.js!../../../../../../../../../../AppData/Local/Huawei/Sdk/js/2.1.1.21/build-tools/ace-loader/lib/style.js!./module.css */ "./lib/json.js!./lib/style.js!../../../../../../../../Desktop/harmonyos/08HarmonyOS_JS-UI_Advance/entry/src/main/js/default/pages/module/module.css")
var $app_script$ = __webpack_require__(/*! !../../../../../../../../../../AppData/Local/Huawei/Sdk/js/2.1.1.21/build-tools/ace-loader/lib/script.js!../../../../../../../../../../AppData/Local/Huawei/Sdk/js/2.1.1.21/build-tools/ace-loader/node_modules/babel-loader?presets[]=C:/Users/zyh/AppData/Local/Huawei/Sdk/js/2.1.1.21/build-tools/ace-loader/node_modules/@babel/preset-env&plugins[]=C:/Users/zyh/AppData/Local/Huawei/Sdk/js/2.1.1.21/build-tools/ace-loader/node_modules/@babel/plugin-transform-modules-commonjs&comments=false!./module.js */ "./lib/script.js!./node_modules/babel-loader/lib/index.js?presets[]=C:\\Users\\zyh\\AppData\\Local\\Huawei\\Sdk\\js\\2.1.1.21\\build-tools\\ace-loader\\node_modules\\@babel\\preset-env&plugins[]=C:\\Users\\zyh\\AppData\\Local\\Huawei\\Sdk\\js\\2.1.1.21\\build-tools\\ace-loader\\node_modules\\@babel\\plugin-transform-modules-commonjs&comments=false!../../../../../../../../Desktop/harmonyos/08HarmonyOS_JS-UI_Advance/entry/src/main/js/default/pages/module/module.js")

$app_define$('@app-component/module', [], function($app_require$, $app_exports$, $app_module$) {

$app_script$($app_module$, $app_exports$, $app_require$)
if ($app_exports$.__esModule && $app_exports$.default) {
$app_module$.exports = $app_exports$.default
}

$app_module$.exports.template = $app_template$

$app_module$.exports.style = $app_style$

})
$app_bootstrap$('@app-component/module',undefined,undefined)

/***/ }),

/***/ "./lib/json.js!./lib/style.js!../../../../../../../../Desktop/harmonyos/08HarmonyOS_JS-UI_Advance/entry/src/main/js/default/pages/module/module.css":
/*!***********************************************************************************************************************************************!*\
  !*** ./lib/json.js!./lib/style.js!C:/Users/zyh/Desktop/harmonyos/08HarmonyOS_JS-UI_Advance/entry/src/main/js/default/pages/module/module.css ***!
  \***********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  ".container": {
    "flexDirection": "column",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "button": {
    "marginTop": "30px",
    "marginRight": "30px",
    "marginBottom": "30px",
    "marginLeft": "30px"
  }
}

/***/ }),

/***/ "./lib/json.js!./lib/template.js!../../../../../../../../Desktop/harmonyos/08HarmonyOS_JS-UI_Advance/entry/src/main/js/default/pages/module/module.hml":
/*!**************************************************************************************************************************************************!*\
  !*** ./lib/json.js!./lib/template.js!C:/Users/zyh/Desktop/harmonyos/08HarmonyOS_JS-UI_Advance/entry/src/main/js/default/pages/module/module.hml ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  "attr": {
    "debugLine": "pages/module/module:1",
    "className": "container"
  },
  "type": "div",
  "classList": [
    "container"
  ],
  "children": [
    {
      "attr": {
        "debugLine": "pages/module/module:2",
        "value": "?????????????????????"
      },
      "type": "button",
      "events": {
        "click": "obtainAppInfo"
      }
    },
    {
      "attr": {
        "debugLine": "pages/module/module:3",
        "value": "??????????????????"
      },
      "type": "button",
      "events": {
        "click": "terminateThisApp"
      }
    },
    {
      "attr": {
        "debugLine": "pages/module/module:4",
        "value": "????????????"
      },
      "type": "button",
      "events": {
        "click": "pushNotification"
      }
    },
    {
      "attr": {
        "debugLine": "pages/module/module:5",
        "value": "????????????"
      },
      "type": "button",
      "events": {
        "click": "obtainDeviceInfo"
      }
    },
    {
      "attr": {
        "debugLine": "pages/module/module:6",
        "value": "??????JavaUI??????????????????"
      },
      "type": "button",
      "events": {
        "click": "checkJavaUIAppInstalled"
      }
    },
    {
      "attr": {
        "debugLine": "pages/module/module:7",
        "value": "????????????????????????"
      },
      "type": "button",
      "events": {
        "click": "obtainGeoInformation"
      }
    },
    {
      "attr": {
        "debugLine": "pages/module/module:8",
        "value": "????????????????????????"
      },
      "type": "button",
      "events": {
        "click": "subcribeGeoInformation"
      }
    },
    {
      "attr": {
        "debugLine": "pages/module/module:9",
        "value": "??????????????????????????????"
      },
      "type": "button",
      "events": {
        "click": "unsubcribeGeoInformation"
      }
    },
    {
      "attr": {
        "debugLine": "pages/module/module:10",
        "value": "?????????"
      },
      "type": "button",
      "events": {
        "click": "shortVibrate"
      }
    },
    {
      "attr": {
        "debugLine": "pages/module/module:11",
        "value": "?????????"
      },
      "type": "button",
      "events": {
        "click": "longVibrate"
      }
    }
  ]
}

/***/ }),

/***/ "./lib/script.js!./node_modules/babel-loader/lib/index.js?presets[]=C:\\Users\\zyh\\AppData\\Local\\Huawei\\Sdk\\js\\2.1.1.21\\build-tools\\ace-loader\\node_modules\\@babel\\preset-env&plugins[]=C:\\Users\\zyh\\AppData\\Local\\Huawei\\Sdk\\js\\2.1.1.21\\build-tools\\ace-loader\\node_modules\\@babel\\plugin-transform-modules-commonjs&comments=false!../../../../../../../../Desktop/harmonyos/08HarmonyOS_JS-UI_Advance/entry/src/main/js/default/pages/module/module.js":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./lib/script.js!./node_modules/babel-loader/lib?presets[]=C:/Users/zyh/AppData/Local/Huawei/Sdk/js/2.1.1.21/build-tools/ace-loader/node_modules/@babel/preset-env&plugins[]=C:/Users/zyh/AppData/Local/Huawei/Sdk/js/2.1.1.21/build-tools/ace-loader/node_modules/@babel/plugin-transform-modules-commonjs&comments=false!C:/Users/zyh/Desktop/harmonyos/08HarmonyOS_JS-UI_Advance/entry/src/main/js/default/pages/module/module.js ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(module, exports, $app_require$){"use strict";

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _system = _interopRequireDefault($app_require$("@app-module/system.app"));

var _system2 = _interopRequireDefault($app_require$("@app-module/system.configuration"));

var _system3 = _interopRequireDefault(systemplugin.notification);

var _system4 = _interopRequireDefault($app_require$("@app-module/system.device"));

var _system5 = _interopRequireDefault(systemplugin.package);

var _system6 = _interopRequireDefault(systemplugin.geolocation);

var _system7 = _interopRequireDefault(systemplugin.vibrator);

var _default = {
  obtainAppInfo: function obtainAppInfo() {
    console.info("???????????????" + _system["default"].getInfo().appName);
    console.info("????????????" + _system["default"].getInfo().versionCode);
    console.info("???????????????" + _system["default"].getInfo().versionName);
    console.info("?????????" + _system2["default"].getLocale().countryOrRegion);
    console.info("?????????" + _system2["default"].getLocale().language);
    console.info("???????????????" + _system2["default"].getLocale().dir);
  },
  terminateThisApp: function terminateThisApp() {
    _system["default"].terminate();
  },
  pushNotification: function pushNotification() {
    _system3["default"].show({
      contentText: "?????????????????????????????????",
      contentTitle: "JavaScript UI???????????????",
      clickAction: {
        bundleName: "com.example.javascriptui",
        abilityName: "com.example.javascriptui.MainAbility",
        uri: "pages/dialogtest/dialogtest"
      }
    });
  },
  obtainDeviceInfo: function obtainDeviceInfo() {
    _system4["default"].getInfo({
      success: function success(data) {
        console.info('???????????????' + data.brand);
        console.info('??????????????????' + data.manufacturer);
        console.info('???????????????' + data.model);
        console.info('???????????????' + data.product);
        console.info('???????????????' + data.language);
        console.info('???????????????' + data.region);
        console.info('???????????????????????????' + data.windowWidth);
        console.info('???????????????????????????' + data.windowHeight);
        console.info('???????????????' + data.screenDensity);
        console.info('???????????????' + data.screenShape);
      },
      fail: function fail(data, code) {
        console.info('??????????????????????????????????????????' + code + ' ??????????????? ' + data);
      },
      complete: function complete() {
        console.info("???????????????????????????");
      }
    });
  },
  checkJavaUIAppInstalled: function checkJavaUIAppInstalled() {
    _system5["default"].hasInstalled({
      bundleName: 'com.example.javaui',
      success: function success(data) {
        console.info('JavaUI????????????????????????: ' + data);
      },
      fail: function fail(data, code) {
        console.info('??????????????????????????????????????????' + code + ' ??????????????? ' + data);
      },
      complete: function complete() {
        console.info("???????????????????????????");
      }
    });
  },
  obtainGeoInformation: function obtainGeoInformation() {
    _system6["default"].getLocation({
      success: function success(data) {
        console.info('???????????????????????????????????????:' + data.longitude + " ?????????" + data.latitude);
      },
      fail: function fail(data, code) {
        console.info('????????????????????????????????????????????????' + code + ' ??????????????? ' + data);
      },
      complete: function complete() {
        console.info("?????????????????????????????????");
      }
    });
  },
  subcribeGeoInformation: function subcribeGeoInformation() {
    _system6["default"].subscribe({
      success: function success(data) {
        console.info('???????????????????????????????????????:' + data.longitude + " ?????????" + data.latitude);
      },
      fail: function fail(data, code) {
        console.info('????????????????????????????????????????????????' + code + ' ??????????????? ' + data);
      }
    });
  },
  unsubcribeGeoInformation: function unsubcribeGeoInformation() {
    _system6["default"].unsubscribe();
  },
  longVibrate: function longVibrate() {
    _system7["default"].vibrate({
      mode: "long"
    });
  },
  shortVibrate: function shortVibrate() {
    _system7["default"].vibrate({
      mode: "short"
    });
  }
};
exports["default"] = _default;
var moduleOwn = exports.default || module.exports;
var accessors = ['public', 'protected', 'private'];
if (moduleOwn.data && accessors.some(function (acc) {
    return moduleOwn[acc];
  })) {
  throw new Error('For VM objects, attribute data must not coexist with public, protected, or private. Please replace data with public.');
} else if (!moduleOwn.data) {
  moduleOwn.data = {};
  moduleOwn._descriptor = {};
  accessors.forEach(function(acc) {
    var accType = typeof moduleOwn[acc];
    if (accType === 'object') {
      moduleOwn.data = Object.assign(moduleOwn.data, moduleOwn[acc]);
      for (var name in moduleOwn[acc]) {
        moduleOwn._descriptor[name] = {access : acc};
      }
    } else if (accType === 'function') {
      console.warn('For VM objects, attribute ' + acc + ' value must not be a function. Change the value to an object.');
    }
  });
}}
/* generated by ace-loader */


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ })

/******/ });
//# sourceMappingURL=module.js.map