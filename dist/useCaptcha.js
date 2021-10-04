"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.useCaptcha = void 0;

var _react = require("react");

var _Context = require("./Context.js");

const useCaptcha = () => {
  const providerValue = (0, _react.useContext)(_Context.CaptchaContext);
  return {
    refresh: providerValue.code.refresh,
    validate: code => {
      const isValid = code === providerValue.code.value;
      providerValue.code.refresh();
      return isValid;
    }
  };
};

exports.useCaptcha = useCaptcha;
var _default = useCaptcha;
exports.default = _default;