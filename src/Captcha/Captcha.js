import PropTypes from "prop-types";
import { useContext, useEffect, useCallback, useRef, useMemo } from "react";
import { CaptchaContext } from "./Context.js";
import { drawStage, drawText, drawLines, drawCircles } from "./draw.js";
import { getColor } from "./utils.js";
import "./style.css";

Captcha.propTypes = {
  title: PropTypes.string,
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
  className: PropTypes.string,
};

function Captcha({
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
  className,
  ...props
}) {
  const providerValue = useContext(CaptchaContext);
  const canvasRef = useRef(null);
  const stage = useRef({});
  const style = useRef({});
  const elements = useRef({});

  useMemo(() => {
    stage.current = {
      width: Number.isInteger(width) ? width : providerValue.stage.width,
      height: Number.isInteger(height) ? height : providerValue.stage.height,
      bgcolor: getColor(bgcolor, providerValue.stage.bgcolor),
      title: title !== undefined ? title : providerValue.stage.title,
    };
  }, [title, width, height, bgcolor, providerValue.stage]);

  useMemo(() => {
    style.current = {
      colors:
        Number.isInteger(colors) ||
        typeof colors === "string" ||
        Array.isArray(colors)
          ? colors
          : providerValue.style.colors,
      fonts:
        Number.isInteger(fonts) ||
        typeof fonts === "string" ||
        Array.isArray(fonts)
          ? fonts
          : providerValue.style.fonts,
      resize: typeof resize === "boolean" ? resize : providerValue.style.resize,
      rotate: typeof rotate === "boolean" ? rotate : providerValue.style.rotate,
      vertical:
        typeof vertical === "boolean" ? vertical : providerValue.style.vertical,
      horizontal:
        typeof horizontal === "boolean"
          ? horizontal
          : providerValue.style.horizontal,
      shadow: typeof shadow === "boolean" ? shadow : providerValue.style.shadow,
    };
  }, [
    colors,
    fonts,
    resize,
    rotate,
    shadow,
    vertical,
    horizontal,
    providerValue.style,
  ]);

  useMemo(() => {
    elements.current = {
      lines: Number.isInteger(lines) ? lines : providerValue.elements.lines,
      circles: Number.isInteger(circles)
        ? circles
        : providerValue.elements.circles,
    };
  }, [lines, circles, providerValue.elements]);

  const draw = useCallback(() => {
    if (canvasRef.current) {
      const context = canvasRef.current?.getContext("2d");
      drawStage(context, stage.current);
      drawCircles(context, stage.current, style.current, elements.current);
      drawLines(context, stage.current, style.current, elements.current);
      drawText(context, stage.current, style.current, providerValue.code.value);
    }
  }, [stage, style, providerValue.code.value]);

  const onClickHandler = useCallback(() => {
    providerValue.code.refresh();
  }, [providerValue.code]);

  useEffect(() => {
    draw();
  }, [providerValue.code.value, draw]);

  return (
    <canvas
      title={stage.current.title}
      ref={canvasRef}
      width={stage.current.width}
      height={stage.current.height}
      className={"captcha" + (className ? " " + className : "")}
      onClick={onClickHandler}
    />
  );
}

export { Captcha };
export default Captcha;
