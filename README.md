# VTEX Telemarketing

## Description
The VTEX Telemarketing app enables a call center operator impersonate a custumer in the store. This is a VTEX app that is used by the Dreamstore.

:loudspeaker: **Disclaimer:** Don't fork this project, use, contribute, or open issue with your feature request.

## Release schedule
| Release  | Status              | Initial Release | Maintenance LTS Start | End-of-life | Dreamstore Compatibility
| :--:     | :---:               |  :---:          | :---:                 | :---:       | :---: 
| [1.x]    | **Maintenance LTS** |  2018-08-15     | 2018-11-08            | March 2019  | 1.x
| [2.x]    | **Current Release** |  2018-11-08     |                       |             | 2.x

See our [LTS policy](https://github.com/vtex-apps/awesome-io#lts-policy) for more information.

## Table of Contents
- [Usage](#usage)
  - [Blocks API](#blocks-api)
    - [Configuration](#configuration)
  - [Styles API](#styles-api)
- [Troubleshooting](#troubleshooting)
- [Tests](#tests)

## Usage

This app uses our store builder with the blocks architecture. To know more about the Store Builder [click here](https://help.vtex.com/en/tutorial/understanding-storebuilder-and-stylesbuilder#structuring-and-configuring-our-store-with-object-object).

To use this app you need to add it in your `dependencies` in the `manifest.json` file.

```json
  dependencies: {
    "vtex.telemarketing": "2.x"
  }
```

Then, add the `telemarketing` block into our app theme, like we do in our [Dreamstore app](https://github.com/vtex-apps/dreamstore/blob/master/store/blocks.json).

:loudspeaker: **Disclaimer:** This component will only be displayed for the users that have the role of `2 - Televendas (Call center operator)` in their access profile.

To give an user the permission of call center operator you need to follow these steps on VTEX admin management page:

- Access the page: Account Management -> Access Profiles -> Click in New Profile -> Select `2 - Televendas (Call center operator)`
- Add the email of the users that are responsable for impersonating customers(call center operators).

### Blocks API
This app has an interface that describes what rules must be implemented by a block when you want to use the telemarketing app.

```json
{
  "telemarketing": {
    "component": "index"
  }
}
```

#### Configuration 
Configuration NDA.

### Styles API
This app has CSS customization through `CSS Modules`. CSS Modules is a CSS file in which all class names and animation names are scoped locally by default. You can read more about CSS Modules [here](https://github.com/css-modules/css-modules) .

We use it `css-loader` to generate a CSS token on a HTML element. For example, the builder generate a CSS token based on app vendor, name and major version. Like `container` token declared in telemarketing, generate the classname `vtex.telemarketing-2-x-container`.

To override the default CSS, you need to add it in the `manifest.json` as described in the [Usage](#usage) section. Also, you need to import `styles` on your manifest:

```json
  "builders": {
    "styles": "1.x"
  }
```

Also, create a `vtex.telemarketing.css` file in `styles/css` for your handlers customization.

Below, we describe the tokens, their explanation and the component where it is located.

| Token name         | Component          | Description                                            |
| ------------------ | ----------         |------------------------------------------------------- |
| `container`        | [index](https://github.com/vtex-apps/telemarketing/blob/master/react/Telemarketing.tsx)           | The main container of telemarketing                         |
| `popoverArrowUp`            | [Popover](https://github.com/vtex-apps/telemarketing/blob/master/react/components/Popover.tsx)            | Popover arrow up                                   |
| `popoverBox`            | [Popover](https://github.com/vtex-apps/telemarketing/blob/master/react/components/Popover.tsx)            | Popover box        |
| `popoverContentContainer`          | [Popover](https://github.com/vtex-apps/telemarketing/blob/master/react/components/Popover.tsx)            | Popover content container                                        |
| `popoverContainer`    | [Popover](https://github.com/vtex-apps/telemarketing/blob/master/react/components/Popover.tsx)   | Main container of the popover                     |
| `login`          | [LoginAsCustomer](https://github.com/vtex-apps/telemarketing/blob/master/react/components/LoginAsCustomer.tsx)           | Login container                        |
| `loginForm`     | [LoginAsCustomer](https://github.com/vtex-apps/telemarketing/blob/master/react/components/LoginAsCustomer.tsx)   | Login form container                   |
| `loginFormMessage`     | [LoginAsCustomer](https://github.com/vtex-apps/telemarketing/blob/master/react/components/LoginAsCustomer.tsx)  | Login form message container                     |
| `emailInput`  | [LoginAsCustomer](https://github.com/vtex-apps/telemarketing/blob/master/react/components/LoginAsCustomer.tsx)   | Container of the email input             | 
| `clientName`              | [LogoutCustomerSession](https://github.com/vtex-apps/telemarketing/blob/master/react/components/LogoutCustomerSession.tsx)            | Client name container                        | 
| `clientNameBar`    | [LogoutCustomerSession](https://github.com/vtex-apps/telemarketing/blob/master/react/components/LogoutCustomerSession.tsx)           | Client name container that appear in the bar                      |
| `logout`     | [LogoutCustomerSession](https://github.com/vtex-apps/telemarketing/blob/master/react/components/LogoutCustomerSession.tsx)   | Container of the logout     |
| `logoutForm`    | [LogoutCustomerSession](https://github.com/vtex-apps/telemarketing/blob/master/react/components/LogoutCustomerSession.tsx)   | Container of the logout form                     |
| `popoverHeaderIcon`      | [LoginAsCustomer](https://github.com/vtex-apps/telemarketing/blob/master/react/components/LoginAsCustomer.tsx), [LogoutCustomerSession](https://github.com/vtex-apps/telemarketing/blob/master/react/components/LogoutCustomerSession.tsx)          | Container of the icon that appear in the popover header                      |
| `popoverHeaderEmail`          | [LoginAsCustomer](https://github.com/vtex-apps/telemarketing/blob/master/react/components/LoginAsCustomer.tsx), [LogoutCustomerSession](https://github.com/vtex-apps/telemarketing/blob/master/react/components/LogoutCustomerSession.tsx)  | Container of the email that appear in the popover header                            |

## Troubleshooting
You can check if others are passing through similar issues [here](https://github.com/vtex-apps/telemarketing/issues). Also feel free to [open issues](https://github.com/vtex-apps/telemarketing/issues/new) or contribute with pull requests.

## Tests
:construction: :construction: :construction: