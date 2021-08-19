📢 Use this project, [contribute](https://github.com/vtex-apps/telemarketing) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Telemarketing

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

The Telemarketing app is a store component that enables a call center operator to represent a customer in the store and shop on their behalf.

![telemarketing](https://user-images.githubusercontent.com/52087100/71182442-dab34380-2254-11ea-8a86-e8ef4d3f09f1.png)

## Configuration

1. In your theme's `manifest.json`, add the Telemarketing app as a dependency:

```diff
  dependencies: {
+   "vtex.telemarketing": "2.x"
  }
```

2. Add the `telemarketing` block in your store's header. For example:

```json
{
  "header": {
    "blocks": ["header-layout.desktop", "header-layout.mobile"]
  },
  "header.full": {
    "blocks": ["header-layout.desktop", "header-layout.mobile"]
  },
  "header-layout.desktop": {
    "children": [
      "flex-layout.row#1-desktop",
      "flex-layout.row#2-desktop",
      "flex-layout.row#3-desktop",
      "sticky-layout#4-desktop"
    ]
  },

  "flex-layout.row#1-desktop": {
    "children": ["telemarketing"],
    "props": {
      "fullWidth": true
    }
  },
```

Once you added it to the header, no further actions are needed once the block does not require props. In other words, the Telemarketing component is ready to be rendered. 


### Props

| Prop name                   | Type                              | Description                                                                                                             | Default value                                   |
| --------------------------  | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `feedbackForNonexistentUser`| `Boolean`                         | Give a feedback message when the user to be personated was not found.                                                   | `false`                                         |


## Modus Operandi

**This component will only be displayed and properly work for users whose role is `2 - Televendas (Call center operator)` in their access profile.**

To understand how the permissions work for your account, including the call center operator permission, access the learning track on [Accounts & Permissions](https://help.vtex.com/tracks/contas-e-permissoes--5PxyAgZrtiYlaYZBTlhJ2A/4T2vusW9RRUmVjGSuKNO2H) on VTEX Help Center.

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles | 
| `clientName`              |
| `clientNameBar`           | 
| `container`               | 
| `emailInput`              | 
| `login`                   | 
| `loginForm`               |                                                                                               
| `loginFormMessage`        | 
| `logout`                  |
| `logoutForm`              | 
| `popoverArrowUp`          |                                                                                               
| `popoverBox`              | 
| `popoverContentContainer` |                                                                                               
| `popoverContainer`        | 
| `popoverHeaderIcon`       | 
| `popoverHeaderEmail`      | 


<!-- DOCS-IGNORE:start -->

## Contributors ✨

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

<!-- DOCS-IGNORE:end -->

