# VTEX Telemarketing

## Description
The VTEX Telemarketing app is a store component that enables a call center operator impersonate a costumer in the store, and this app is used by store theme.

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
    - [CSS namespaces](#css-namespaces)
- [Troubleshooting](#troubleshooting)
- [Tests](#tests)

## Usage

This app uses our store builder with the blocks architecture. To know more about the Store Builder [click here](https://help.vtex.com/en/tutorial/understanding-storebuilder-and-stylesbuilder#structuring-and-configuring-our-store-with-object-object).

We add the telemarketing as a block in our [Store Header](https://github.com/vtex-apps/store-header/blob/master/store/interfaces.json).

To configure or customize this app, you need to import it in your dependencies in `manifest.json`.

```json
  dependencies: {
    "vtex.telemarketing": "2.x"
  }
```

Then, add `telemarketing` block into your app theme as we do in our [Store theme app](https://github.com/vtex-apps/store-theme/blob/master/store/blocks.json). 

:loudspeaker: **Disclaimer:** This component will only be displayed for the users that have the role of `2 - Televendas (Call center operator)` in their access profile.

To give an user the permission of call center operator you need to follow these steps on VTEX admin management page:

- Access the page: Account Management -> Access Profiles -> Click in New Profile -> Select `2 - Televendas (Call center operator)`
- Add the email of the users that are responsable for impersonating customers(call center operators).

### Blocks API

When implementing this app as a block, various inner blocks may be available. The following interface lists the available blocks within telemarketing and describes if they are required or optional.

```json
{
  "telemarketing": {
    "component": "index"
  }
}
```

As you can see, this app has no required or optional block.

#### Configuration 
Configuration NDA.

### Styles API

This app provides some CSS classes as an API for style customization.

To use this CSS API, you must add the `styles` builder and create an app styling CSS file.

1. Add the `styles` builder to your `manifest.json`:

```json
  "builders": {
    "styles": "1.x"
  }
```

2. Create a file called `vtex.telemarketing.css` inside the `styles/css` folder. Add your custom styles:

```css
.container {
  margin-top: 10px;
}
```

#### CSS namespaces

Below, we describe the namespaces that are defined in the telemarketing.

| Class name         | Description          | Component Source                                            |
| ------------------ | ----------         |------------------------------------------------------- |
| `container`        | The main container of telemarketing| [index](https://github.com/vtex-apps/telemarketing/blob/master/react/Telemarketing.tsx)                                  |
| `popoverArrowUp`          | Popover arrow up  | [Popover](https://github.com/vtex-apps/telemarketing/blob/master/react/components/Popover.tsx)                                               |
| `popoverBox`          | Popover box         | [Popover](https://github.com/vtex-apps/telemarketing/blob/master/react/components/Popover.tsx)            |
| `popoverContentContainer`     |  Popover content container      | [Popover](https://github.com/vtex-apps/telemarketing/blob/master/react/components/Popover.tsx)            | 
| `popoverContainer` |  Main container of the popover  | [Popover](https://github.com/vtex-apps/telemarketing/blob/master/react/components/Popover.tsx)   |
| `login`        | Login container   | [LoginAsCustomer](https://github.com/vtex-apps/telemarketing/blob/master/react/components/LoginAsCustomer.tsx)                                  |
| `loginForm`    | Login form container  | [LoginAsCustomer](https://github.com/vtex-apps/telemarketing/blob/master/react/components/LoginAsCustomer.tsx)                     |
| `loginFormMessage`     | Login form message container  | [LoginAsCustomer](https://github.com/vtex-apps/telemarketing/blob/master/react/components/LoginAsCustomer.tsx)                     |
| `emailInput`   | Container of the email input | [LoginAsCustomer](https://github.com/vtex-apps/telemarketing/blob/master/react/components/LoginAsCustomer.tsx)               | 
| `clientName`                 | Client name container    | [LogoutCustomerSession](https://github.com/vtex-apps/telemarketing/blob/master/react/components/LogoutCustomerSession.tsx)                             | 
| `clientNameBar`          | Client name container that appear in the bar    | [LogoutCustomerSession](https://github.com/vtex-apps/telemarketing/blob/master/react/components/LogoutCustomerSession.tsx)                       |
| `logout`    | Container of the logout  | [LogoutCustomerSession](https://github.com/vtex-apps/telemarketing/blob/master/react/components/LogoutCustomerSession.tsx)       |
| `logoutForm`    | Container of the logout form   | [LogoutCustomerSession](https://github.com/vtex-apps/telemarketing/blob/master/react/components/LogoutCustomerSession.tsx)                     |
| `popoverHeaderIcon`        | Container of the icon that appear in the popover header          | [LoginAsCustomer](https://github.com/vtex-apps/telemarketing/blob/master/react/components/LoginAsCustomer.tsx), [LogoutCustomerSession](https://github.com/vtex-apps/telemarketing/blob/master/react/components/LogoutCustomerSession.tsx)                    |
| `popoverHeaderEmail`     | Container of the email that appear in the popover header             | [LoginAsCustomer](https://github.com/vtex-apps/telemarketing/blob/master/react/components/LoginAsCustomer.tsx), [LogoutCustomerSession](https://github.com/vtex-apps/telemarketing/blob/master/react/components/LogoutCustomerSession.tsx)                      |

## Troubleshooting
You can check if others are passing through similar issues [here](https://github.com/vtex-apps/telemarketing/issues). Also feel free to [open issues](https://github.com/vtex-apps/telemarketing/issues/new) or contribute with pull requests.

## Tests
:construction: :construction: :construction: