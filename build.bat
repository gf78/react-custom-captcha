@echo off
rmdir /s /q dist
set NODE_ENV=production
npx babel src/Captcha --out-dir dist --copy-files