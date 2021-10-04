import { randomNum, isDarkColor, isColor, getColor } from "./utils.js";
import { fonts, colors, defaultProps } from "./config.js";

const filterText = "none";
const filterLines = "opacity(35%)";
const filterCirles = "opacity(20%)";

const getColors = (stage, style) => {
  if (typeof style.colors === "string" && isColor(getColor(style.colors))) {
    return [style.colors];
  } else if (Array.isArray(style.colors)) {
    return style.colors;
  } else {
    const _colors = isDarkColor(stage.bgcolor || defaultProps.bgcolor)
      ? colors.light
      : colors.dark;

    return Number.isInteger(style.colors)
      ? _colors.slice(0, style.colors)
      : _colors;
  }
};

const getFonts = (style) => {
  if (typeof style.fonts === "string") {
    return [style.fonts];
  } else if (Array.isArray(style.fonts)) {
    return style.fonts;
  } else {
    return Number.isInteger(style.fonts) ? fonts.slice(0, style.fonts) : fonts;
  }
};

const drawStage = (context, stage) => {
  try {
    context.clearRect(
      0,
      0,
      context.canvas.clientWidth,
      context.canvas.clientHeight
    );

    context.fillStyle = isColor(stage.bgcolor)
      ? stage.bgcolor
      : defaultProps.bgcolor;

    context.fillRect(
      0,
      0,
      context.canvas.clientWidth,
      context.canvas.clientHeight
    );

    return true;
  } catch (e) {}
  return false;
};

const drawText = (context, stage, style, text) => {
  try {
    var char, color, size, rotation, vertical, horizontal, fontSize, font;

    const maxFontSize = Math.ceil(
      Math.min(
        context.canvas.clientWidth / text.length,
        context.canvas.clientHeight
      )
    );

    const colors = getColors(stage, style);
    const fonts = getFonts(style);
    context.filter = filterText;

    for (var position = 1; position <= text.length; position++) {
      char = text[position - 1];
      size = style.resize ? Math.random() : 0.5;
      rotation = style.rotate ? Math.random() : 0.5;
      vertical = style.vertical ? Math.random() : 0.5;
      horizontal = style.horizontal ? Math.random() : 0.5;
      color = getColor(colors[randomNum(0, colors.length - 1)]);
      font = fonts[randomNum(0, fonts.length - 1)];
      fontSize =
        (maxFontSize / 3) * 2 + Math.round((maxFontSize / 3) * size, 0);
      context.font = fontSize + "px " + font;

      var maxLength = Math.ceil(
        Math.max(fontSize, context.measureText(char).width)
      );

      var y =
        (maxLength - fontSize) / 2 +
        vertical * (context.canvas.clientHeight - maxLength);
      var x =
        context.canvas.clientWidth *
          (position / text.length - 0.5 / text.length) -
        (context.canvas.clientWidth / text.length - maxLength) / 2 +
        horizontal * (context.canvas.clientWidth / text.length - maxLength);

      if (style.shadow) {
        context.shadowColor = color;
        context.shadowBlur = maxFontSize / 3;
      }
      context.fillStyle = color;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.save();
      context.translate(x, y);
      context.rotate(0.2 * Math.PI - 0.4 * Math.PI * rotation);
      context.fillText(char, 0, fontSize / 2);
      context.restore();
    }
    context.filter = "none";
    context.shadowBlur = 0;

    return true;
  } catch (e) {}
  return false;
};

const drawLines = (context, stage, style, elements) => {
  try {
    if (Number.isInteger(elements.lines) && elements.lines > 0) {
      var color, x1, x2, y1, y2;
      const colors = getColors(stage, style);

      context.filter = filterLines;

      for (var i = 1; i <= elements.lines; i++) {
        color = getColor(colors[randomNum(0, colors.length - 1)]);
        x1 = randomNum(0, context.canvas.clientWidth - 1);
        y1 = randomNum(0, context.canvas.clientHeight - 1);
        x2 = randomNum(0, context.canvas.clientWidth - 1);
        y2 = randomNum(0, context.canvas.clientHeight - 1);

        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.lineWidth = 1;
        context.strokeStyle = color;
        context.stroke();
      }
      context.filter = "none";

      return true;
    }
  } catch (e) {}
  return false;
};

const drawCircles = (context, stage, style, elements) => {
  try {
    if (Number.isInteger(elements.circles) && elements.circles > 0) {
      var color, x, y, r;
      const colors = getColors(stage, style);

      context.filter = filterCirles;
      for (var i = 1; i <= elements.circles; i++) {
        color = getColor(colors[randomNum(0, colors.length - 1)]);
        x = randomNum(0, context.canvas.clientWidth - 1);
        y = randomNum(0, context.canvas.clientHeight - 1);
        r = randomNum(
          0,
          Math.min(context.canvas.clientHeight, context.canvas.clientWidth) - 1
        );
        context.beginPath();
        context.arc(x, y, r, 0, 2 * Math.PI);

        context.lineWidth = 1;
        context.strokeStyle = color;
        context.stroke();
      }
      context.filter = "none";
      return true;
    }
  } catch (e) {}
  return false;
};

export { drawStage, drawText, drawLines, drawCircles };
