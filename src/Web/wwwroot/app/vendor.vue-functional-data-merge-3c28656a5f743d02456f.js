/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([["vendor.vue-functional-data-merge"],{

/***/ 2802:
/*!****************************************************************!*\
  !*** ./node_modules/vue-functional-data-merge/dist/lib.esm.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"mergeData\": () => (/* binding */ a)\n/* harmony export */ });\nvar e = function () {\n  return (e = Object.assign || function (e) {\n    for (var t, r = 1, s = arguments.length; r < s; r++) for (var a in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);\n\n    return e;\n  }).apply(this, arguments);\n},\n    t = {\n  kebab: /-(\\w)/g,\n  styleProp: /:(.*)/,\n  styleList: /;(?![^(]*\\))/g\n};\n\nfunction r(e, t) {\n  return t ? t.toUpperCase() : \"\";\n}\n\nfunction s(e) {\n  for (var s, a = {}, c = 0, o = e.split(t.styleList); c < o.length; c++) {\n    var n = o[c].split(t.styleProp),\n        i = n[0],\n        l = n[1];\n    (i = i.trim()) && (\"string\" == typeof l && (l = l.trim()), a[(s = i, s.replace(t.kebab, r))] = l);\n  }\n\n  return a;\n}\n\nfunction a() {\n  for (var t, r, a = {}, c = arguments.length; c--;) for (var o = 0, n = Object.keys(arguments[c]); o < n.length; o++) switch (t = n[o]) {\n    case \"class\":\n    case \"style\":\n    case \"directives\":\n      if (Array.isArray(a[t]) || (a[t] = []), \"style\" === t) {\n        var i = void 0;\n        i = Array.isArray(arguments[c].style) ? arguments[c].style : [arguments[c].style];\n\n        for (var l = 0; l < i.length; l++) {\n          var y = i[l];\n          \"string\" == typeof y && (i[l] = s(y));\n        }\n\n        arguments[c].style = i;\n      }\n\n      a[t] = a[t].concat(arguments[c][t]);\n      break;\n\n    case \"staticClass\":\n      if (!arguments[c][t]) break;\n      void 0 === a[t] && (a[t] = \"\"), a[t] && (a[t] += \" \"), a[t] += arguments[c][t].trim();\n      break;\n\n    case \"on\":\n    case \"nativeOn\":\n      a[t] || (a[t] = {});\n\n      for (var p = 0, f = Object.keys(arguments[c][t] || {}); p < f.length; p++) r = f[p], a[t][r] ? a[t][r] = [].concat(a[t][r], arguments[c][t][r]) : a[t][r] = arguments[c][t][r];\n\n      break;\n\n    case \"attrs\":\n    case \"props\":\n    case \"domProps\":\n    case \"scopedSlots\":\n    case \"staticStyle\":\n    case \"hook\":\n    case \"transition\":\n      a[t] || (a[t] = {}), a[t] = e({}, arguments[c][t], a[t]);\n      break;\n\n    case \"slot\":\n    case \"key\":\n    case \"ref\":\n    case \"tag\":\n    case \"show\":\n    case \"keepAlive\":\n    default:\n      a[t] || (a[t] = arguments[c][t]);\n  }\n\n  return a;\n}\n\n\n\n//# sourceURL=webpack://client/./node_modules/vue-functional-data-merge/dist/lib.esm.js?");

/***/ })

}]);