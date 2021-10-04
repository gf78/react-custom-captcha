import { defaultProps, chars } from "./config.js";
import { randomNum } from "./utils.js";

function escapeRegex(string) {
  return string.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
}

const getChars = (format = defaultProps.format) => {
  var codeChars = "";
  const codeFormat =
    typeof format === "string" && format.length >= 1
      ? format
      : defaultProps.format;

  for (var charSet in chars) {
    if (
      new RegExp(
        chars[charSet]
          .split("")
          .map((c) => escapeRegex(c))
          .join("|")
      ).test(codeFormat)
    ) {
      codeChars += chars[charSet];
    }
  }
  return codeChars;
};

const generate = (
  length = defaultProps.length,
  format = defaultProps.format
) => {
  var code = "";

  const codeLength = Number.isInteger(length) ? length : defaultProps.length;

  const codeChars =
    typeof format === "string" && format.length >= 5
      ? format
      : getChars(format);

  for (var i = 0; i < codeLength; i++) {
    code += codeChars[randomNum(0, codeChars.length - 1)];
  }
  return code;
};

export { generate };
export default generate;
