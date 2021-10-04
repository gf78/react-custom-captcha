"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getColor = exports.isColor = exports.isHexColor = exports.isDarkColor = exports.randomNum = void 0;

require("core-js/modules/es.regexp.constructor.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.string.match.js");

require("core-js/modules/es.string.replace.js");

const isHexColor = color => new RegExp("^#(?:[0-9a-fA-F]{3}){1,2}$").test(color);

exports.isHexColor = isHexColor;

const isColor = strColor => {
  const s = new Option().style;
  s.color = strColor;
  return s.color !== "";
};

exports.isColor = isColor;

const getColor = function getColor(strColor) {
  let defaultColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  try {
    if (typeof strColor === "string") {
      if (new RegExp("^--.*$").test(strColor)) {
        strColor = getComputedStyle(document.documentElement).getPropertyValue(strColor);
      }

      return isColor(strColor) ? strColor : defaultColor;
    }
  } catch (e) {}

  return defaultColor;
};

exports.getColor = getColor;

const randomNum = (m, n) => {
  return Math.floor(Math.random() * (n - m + 1) + m);
};

exports.randomNum = randomNum;

const isDarkColor = color => {
  try {
    var r, g, b;

    if (color.match(/^rgb/)) {
      color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
      r = color[1];
      g = color[2];
      b = color[3];
    } else {
      color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&"));
      r = color >> 16;
      g = color >> 8 & 255;
      b = color & 255;
    } // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html


    const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
    return hsp > 127.5 ? false : true;
  } catch (e) {
    return false;
  }
};

exports.isDarkColor = isDarkColor;