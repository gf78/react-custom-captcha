const isHexColor = (color) =>
  new RegExp("^#(?:[0-9a-fA-F]{3}){1,2}$").test(color);

const isColor = (strColor) => {
  const s = new Option().style;
  s.color = strColor;
  return s.color !== "";
};

const getColor = (strColor, defaultColor = null) => {
  try {
    if (typeof strColor === "string") {
      if (new RegExp("^--.*$").test(strColor)) {
        strColor = getComputedStyle(document.documentElement).getPropertyValue(
          strColor
        );
      }
      return isColor(strColor) ? strColor : defaultColor;
    }
  } catch (e) {}
  return defaultColor;
};

const randomNum = (m, n) => {
  return Math.floor(Math.random() * (n - m + 1) + m);
};

const isDarkColor = (color) => {
  try {
    var r, g, b;

    if (color.match(/^rgb/)) {
      color = color.match(
        /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
      );
      r = color[1];
      g = color[2];
      b = color[3];
    } else {
      color = +(
        "0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&")
      );
      r = color >> 16;
      g = (color >> 8) & 255;
      b = color & 255;
    }

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
    return hsp > 127.5 ? false : true;
  } catch (e) {
    return false;
  }
};

export { randomNum, isDarkColor, isHexColor, isColor, getColor };
