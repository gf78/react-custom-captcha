"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CaptchaProvider", {
  enumerable: true,
  get: function get() {
    return _Provider.CaptchaProvider;
  }
});
Object.defineProperty(exports, "Captcha", {
  enumerable: true,
  get: function get() {
    return _Captcha.Captcha;
  }
});
Object.defineProperty(exports, "useCaptcha", {
  enumerable: true,
  get: function get() {
    return _useCaptcha.useCaptcha;
  }
});
exports.default = void 0;

var _Provider = require("./Provider.js");

var _Captcha = require("./Captcha.js");

var _useCaptcha = require("./useCaptcha.js");

const captcha = {
  CaptchaProvider: _Provider.CaptchaProvider,
  Captcha: _Captcha.Captcha,
  useCaptcha: _useCaptcha.useCaptcha
};
var _default = captcha;
exports.default = _default;