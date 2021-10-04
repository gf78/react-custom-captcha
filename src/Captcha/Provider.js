import PropTypes from "prop-types";
import { useState } from "react";
import { CaptchaContext } from "./Context.js";
import { defaultProps } from "./config.js";
import { generate } from "./code.js";
import { getColor } from "./utils.js";

CaptchaProvider.propTypes = {
  title: PropTypes.string,
  length: PropTypes.number,
  format: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  bgcolor: PropTypes.string,
  colors: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
    PropTypes.number,
  ]),
  fonts: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
    PropTypes.number,
  ]),
  resize: PropTypes.bool,
  rotate: PropTypes.bool,
  vertical: PropTypes.bool,
  horizontal: PropTypes.bool,
  shadow: PropTypes.bool,
  lines: PropTypes.number,
  circles: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

function CaptchaProvider({
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
  children,
  ...props
}) {
  const [code, setCode] = useState(generate(length, format));

  const refresh = () => {
    setCode(generate(length, format));
    return true;
  };

  const captchaValue = {
    code: {
      value: code,
      length: Number.isInteger(length) ? length : defaultProps.length,
      format: typeof format === "string" ? format : defaultProps.format,
      refresh,
    },
    stage: {
      title: title !== undefined ? title : defaultProps.title,
      width: Number.isInteger(width) ? width : defaultProps.width,
      height: Number.isInteger(height) ? height : defaultProps.height,
      bgcolor: getColor(bgcolor, defaultProps.bgcolor),
    },
    style: {
      colors:
        Number.isInteger(colors) ||
        typeof colors === "string" ||
        Array.isArray(colors)
          ? colors
          : defaultProps.colors,
      fonts:
        Number.isInteger(fonts) ||
        typeof fonts === "string" ||
        Array.isArray(fonts)
          ? fonts
          : defaultProps.fonts,
      resize: typeof resize === "boolean" ? resize : defaultProps.resize,
      rotate: typeof rotate === "boolean" ? rotate : defaultProps.rotate,
      vertical:
        typeof vertical === "boolean" ? vertical : defaultProps.vertical,
      horizontal:
        typeof horizontal === "boolean" ? horizontal : defaultProps.horizontal,
      shadow: typeof shadow === "boolean" ? shadow : defaultProps.shadow,
    },
    elements: {
      lines: Number.isInteger(lines) ? lines : defaultProps.lines,
      circles: Number.isInteger(circles) ? circles : defaultProps.circles,
    },
  };

  return (
    <CaptchaContext.Provider value={captchaValue} {...props}>
      {children}
    </CaptchaContext.Provider>
  );
}

export { CaptchaProvider };
export default CaptchaProvider;
