import { useContext } from "react";
import { CaptchaContext } from "./Context.js";

const useCaptcha = () => {
  const providerValue = useContext(CaptchaContext);
  return {
    refresh: providerValue.code.refresh,
    validate: (code) => {
      const isValid = code === providerValue.code.value;
      providerValue.code.refresh();
      return isValid;
    },
  };
};

export { useCaptcha };
export default useCaptcha;
