"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.generate = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.regexp.constructor.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.string.split.js");

var _config = require("./config.js");

var _utils = require("./utils.js");

function escapeRegex(string) {
  return string.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
}

const getChars = function getChars() {
  let format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _config.defaultProps.format;
  var codeChars = "";
  const codeFormat = typeof format === "string" && format.length >= 1 ? format : _config.defaultProps.format;

  for (var charSet in _config.chars) {
    if (new RegExp(_config.chars[charSet].split("").map(c => escapeRegex(c)).join("|")).test(codeFormat)) {
      codeChars += _config.chars[charSet];
    }
  }

  return codeChars;
};

const generate = function generate() {
  let length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _config.defaultProps.length;
  let format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _config.defaultProps.format;
  var code = "";
  const codeLength = Number.isInteger(length) ? length : _config.defaultProps.length;
  const codeChars = typeof format === "string" && format.length >= 5 ? format : getChars(format);

  for (var i = 0; i < codeLength; i++) {
    code += codeChars[(0, _utils.randomNum)(0, codeChars.length - 1)];
  }

  return code;
};

exports.generate = generate;
var _default = generate;
exports.default = _default;