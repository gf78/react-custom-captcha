# react-custom-captcha

A simple but powerfully and highly customizable captcha code component without a single package dependency, except React itself.

## Installation

Via npm:

    $ npm install react-custom-captcha

via yarn:

    $ yarn add react-custom-captcha

## Usage

### App.js: Add CaptchaProvider

```javascript
...
import { CaptchaProvider } from "react-custom-captcha";
...
    return(
        ...
            <CaptchaProvider length={...} format={...} {...moreOptions} >
                ...
            </CaptchaProvider>
        ...
        );
...
```

### MyComponent.js: Add Captcha and useCaptcha

```javascript
...
import { Captcha, useCaptcha } from "react-custom-captcha";
import { useState, useCallback } from "react";
...

const { validate, refresh } = useCaptcha();
const [captcha, setCaptcha] = useState("");
...
const onSubmitHandler = useCallback(
    (event) => {
      const isValidCaptcha = validate(captcha);
      setCaptcha("");
      ...
      event.preventDefault();
    },
    [captcha, validate]
  );
...
  const onRefreshHandler = useCallback(() => {
    refresh();
  }, [refresh]);
...
    return(
        ...
            <Captcha bgColor={...} width={...} height={...} {...moreOptions}/>
            ...
             <button onClick={onRefreshHandler}>Refresh captcha</button>
            ...
            <input
                type="text"
                required={true}
                placeholder="enter captcha code"
                value={captcha}
                onChange={(event) => setCaptcha(event.target.value)}
            />
            ...
            <button onClick={onSubmitHandler}>Submit</button>
        ...
        );
...
```

## Configuration Options

| Property   | README                                                  | CaptchaProvider | Captcha | Default Value |
| ---------- | ------------------------------------------------------- | --------------- | ------- | ------------- |
| length     | character count of code                                 | ✓               | -       | 5             |
| format     | charset to be used (see details below)                  | ✓               | -       | a1            |
| width      | canvas width (in px)                                    | ✓               | ✓       | 150           |
| height     | canvas height (in px)                                   | ✓               | ✓       | 50            |
| bgcolor    | bgcolor of canvas (see details below)                   | ✓               | ✓       | #eee          |
| title      | text displayed on mouse over (click to refresh)         | ✓               | ✓       | Refresh code  |
| colors     | color(s) of text, lines and circles (see details below) | ✓               | ✓       | 8             |
| fonts      | used font(s) (see details below)                        | ✓               | ✓       | 8             |
| resize     | vary font size of chars (boolean)                       | ✓               | ✓       | true          |
| rotate     | rotate characters (boolean)                             | ✓               | ✓       | true          |
| vertical   | move characters vertically (boolean)                    | ✓               | ✓       | true          |
| horizontal | move characters horizontally (boolean)                  | ✓               | ✓       | true          |
| shadow     | draw shadow for characters (boolean)                    | ✓               | ✓       | true          |
| lines      | number of lines in the background (integer)             | ✓               | ✓       | 5             |
| circles    | number of circles in the background (integer)           | ✓               | ✓       | 5             |
