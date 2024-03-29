# Shimo CLI

A cli tool for [shimo](https://shimo.im)

It works both on cli and other clients(as node modules).

## How to use

Before use `shimo-cli`, you should get `APP_CLIENT_ID` and `APP_CLIENT_SECRET` first.

```shell
npm i -g shimo-cli
shimo-cli # initialize config at first running
shimo-cli login [--with-cookie]
shimo-cli me
```

### Login

Now login shimo always trigger a captcha. Shimo-cli can't support captcha easily.

You can get shimo auth cookie (shimo_sid) from browser and login with the cookie manually. e.g:

```shell
shimo cli login shimo_sid=xxxxx --with-cookie
```

## Known issues

- Import and export not works

## Features

- [x] Auth and keep user status

- [x] Watch Notification

- [x] File List (Dashboard / Desktop / Favorites / Shortcuts etc)

- [x] Output File content(It will output an unreadable text content which works for other tools)

- [x] Search File

- [x] Create / Delete File

- [x] Import words, excels, etc

- [x] Export file from shimo to disk

- [x] initialize config

- [ ] Friendly tip if no auth

- [ ] Friendly output

- [ ] Use as npm module
