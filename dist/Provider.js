"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CaptchaProvider = CaptchaProvider;
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = require("react");

var _Context = require("./Context.js");

var _config = require("./config.js");

var _code = require("./code.js");

var _utils = require("./utils.js");

const _excluded = ["title", "length", "format", "width", "height", "bgcolor", "colors", "fonts", "resize", "rotate", "vertical", "horizontal", "shadow", "lines", "circles", "children"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

CaptchaProvider.propTypes = {
  title: _propTypes.default.string,
  length: _propTypes.default.number,
  format: _propTypes.default.string,
  width: _propTypes.default.number,
  height: _propTypes.default.number,
  bgcolor: _propTypes.default.string,
  colors: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.string), _propTypes.default.string, _propTypes.default.number]),
  fonts: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.string), _propTypes.default.string, _propTypes.default.number]),
  resize: _propTypes.default.bool,
  rotate: _propTypes.default.bool,
  vertical: _propTypes.default.bool,
  horizontal: _propTypes.default.bool,
  shadow: _propTypes.default.bool,
  lines: _propTypes.default.number,
  circles: _propTypes.default.number,
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node])
};

function CaptchaProvider(_ref) {
  let {
    title,
    length,
    format,
    width,
    height,
    bgcolor,
    colors,
    fonts,
    resize,
    rotate,
    vertical,
    horizontal,
    shadow,
    lines,
    circles,
    children
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const [code, setCode] = (0, _react.useState)((0, _code.generate)(length, format));

  const refresh = () => {
    setCode((0, _code.generate)(length, format));
    return true;
  };

  const captchaValue = {
    code: {
      value: code,
      length: Number.isInteger(length) ? length : _config.defaultProps.length,
      format: typeof format === "string" ? format : _config.defaultProps.format,
      refresh
    },
    stage: {
      title: title !== undefined ? title : _config.defaultProps.title,
      width: Number.isInteger(width) ? width : _config.defaultProps.width,
      height: Number.isInteger(height) ? height : _config.defaultProps.height,
      bgcolor: (0, _utils.getColor)(bgcolor, _config.defaultProps.bgcolor)
    },
    style: {
      colors: Number.isInteger(colors) || typeof colors === "string" || Array.isArray(colors) ? colors : _config.defaultProps.colors,
      fonts: Number.isInteger(fonts) || typeof fonts === "string" || Array.isArray(fonts) ? fonts : _config.defaultProps.fonts,
      resize: typeof resize === "boolean" ? resize : _config.defaultProps.resize,
      rotate: typeof rotate === "boolean" ? rotate : _config.defaultProps.rotate,
      vertical: typeof vertical === "boolean" ? vertical : _config.defaultProps.vertical,
      horizontal: typeof horizontal === "boolean" ? horizontal : _config.defaultProps.horizontal,
      shadow: typeof shadow === "boolean" ? shadow : _config.defaultProps.shadow
    },
    elements: {
      lines: Number.isInteger(lines) ? lines : _config.defaultProps.lines,
      circles: Number.isInteger(circles) ? circles : _config.defaultProps.circles
    }
  };
  return /*#__PURE__*/React.createElement(_Context.CaptchaContext.Provider, _extends({
    value: captchaValue
  }, props), children);
}

var _default = CaptchaProvider;
exports.default = _default;