"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.colors = exports.fonts = exports.chars = exports.defaultProps = exports.config = void 0;
const defaultProps = {
  length: 5,
  title: "Refresh code",
  format: "a1",
  width: 150,
  height: 50,
  bgcolor: "#eee",
  colors: 5,
  fonts: 8,
  resize: true,
  rotate: true,
  vertical: true,
  horizontal: true,
  shadow: true,
  lines: 5,
  circles: 5
};
exports.defaultProps = defaultProps;
const chars = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  number: "1234567890",
  symbol: "!§$%&()?+*#<>@"
};
exports.chars = chars;
const fonts = ["Arial, sans-serif", "Arial Black, sans-serif", "Verdana, sans-serif", "Tahoma, sans-serif", "Trebuchet MS, sans-serif", "Impact, sans-serif", "Times New Roman, serif", "Didot, serif", "Georgia, serif", "American Typewriter, serif", "Courier, monospace", "Bradley Hand, cursive", "Brush Script MT, cursive", "Comic Sans MS, cursive"];
exports.fonts = fonts;
const colors = {
  light: ["white", "silver", "red", "yellow", "lime", "aqua", "teal", "fuchsia"],
  dark: ["black", "red", "green", "teal", "navy", "purple", "maroon", "olive", "blue", "gray"]
};
exports.colors = colors;
const config = {
  defaultProps,
  chars,
  fonts,
  colors
};
exports.config = config;
var _default = config;
exports.default = _default;