"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Captcha = Captcha;
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = require("react");

var _Context = require("./Context.js");

var _draw = require("./draw.js");

var _utils = require("./utils.js");

require("./style.css");

const _excluded = ["title", "width", "height", "bgcolor", "colors", "fonts", "resize", "rotate", "vertical", "horizontal", "shadow", "lines", "circles", "className"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

Captcha.propTypes = {
  title: _propTypes.default.string,
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
  className: _propTypes.default.string
};

function Captcha(_ref) {
  let {
    title,
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
    className
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const providerValue = (0, _react.useContext)(_Context.CaptchaContext);
  const canvasRef = (0, _react.useRef)(null);
  const stage = (0, _react.useRef)({});
  const style = (0, _react.useRef)({});
  const elements = (0, _react.useRef)({});
  (0, _react.useMemo)(() => {
    stage.current = {
      width: Number.isInteger(width) ? width : providerValue.stage.width,
      height: Number.isInteger(height) ? height : providerValue.stage.height,
      bgcolor: (0, _utils.getColor)(bgcolor, providerValue.stage.bgcolor),
      title: title !== undefined ? title : providerValue.stage.title
    };
  }, [title, width, height, bgcolor, providerValue.stage]);
  (0, _react.useMemo)(() => {
    style.current = {
      colors: Number.isInteger(colors) || typeof colors === "string" || Array.isArray(colors) ? colors : providerValue.style.colors,
      fonts: Number.isInteger(fonts) || typeof fonts === "string" || Array.isArray(fonts) ? fonts : providerValue.style.fonts,
      resize: typeof resize === "boolean" ? resize : providerValue.style.resize,
      rotate: typeof rotate === "boolean" ? rotate : providerValue.style.rotate,
      vertical: typeof vertical === "boolean" ? vertical : providerValue.style.vertical,
      horizontal: typeof horizontal === "boolean" ? horizontal : providerValue.style.horizontal,
      shadow: typeof shadow === "boolean" ? shadow : providerValue.style.shadow
    };
  }, [colors, fonts, resize, rotate, shadow, vertical, horizontal, providerValue.style]);
  (0, _react.useMemo)(() => {
    elements.current = {
      lines: Number.isInteger(lines) ? lines : providerValue.elements.lines,
      circles: Number.isInteger(circles) ? circles : providerValue.elements.circles
    };
  }, [lines, circles, providerValue.elements]);
  const draw = (0, _react.useCallback)(() => {
    if (canvasRef.current) {
      var _canvasRef$current;

      const context = (_canvasRef$current = canvasRef.current) === null || _canvasRef$current === void 0 ? void 0 : _canvasRef$current.getContext("2d");
      (0, _draw.drawStage)(context, stage.current);
      (0, _draw.drawCircles)(context, stage.current, style.current, elements.current);
      (0, _draw.drawLines)(context, stage.current, style.current, elements.current);
      (0, _draw.drawText)(context, stage.current, style.current, providerValue.code.value);
    }
  }, [stage, style, providerValue.code.value]);
  const onClickHandler = (0, _react.useCallback)(() => {
    providerValue.code.refresh();
  }, [providerValue.code]);
  (0, _react.useEffect)(() => {
    draw();
  }, [providerValue.code.value, draw]);
  return /*#__PURE__*/React.createElement("canvas", {
    title: stage.current.title,
    ref: canvasRef,
    width: stage.current.width,
    height: stage.current.height,
    className: "captcha" + (className ? " " + className : ""),
    onClick: onClickHandler
  });
}

var _default = Captcha;
exports.default = _default;