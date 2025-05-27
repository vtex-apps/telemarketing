📢 Use this project, [contribute](https://github.com/vtex-apps/telemarketing) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Telemarketing

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

The Telemarketing app is a store component that enables a [call center operator](https://help.vtex.com/pt/tutorial/como-criar-um-usuario-de-televendas--frequentlyAskedQuestions_4227) to represent a customer in the store and shop on their behalf.

![telemarketing](https://user-images.githubusercontent.com/52087100/71182442-dab34380-2254-11ea-8a86-e8ef4d3f09f1.png)

>⚠️ Warning
> 
> Learn more about this feature in our [Telesales toolbar](https://help.vtex.com/en/tutorial/toolbar-de-televendas--tutorials_5500) article.

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

Once you have added the block to the header, the Telemarketing component is ready to be rendered, since it does not require props. 

>⚠️ Warning
> 
> The telemarketing bar is accessed via browser by the following URL, where `{accountName}` should be replaced by the name of your account: `{accountName}.myvtex.com` 

## Modus Operandi

This component will only be displayed and properly work for users whose role is `2 - Televendas (Call center operator)` in their access profile.

To understand how the permissions work for your account, including the call center operator permission, access the learning track on [Accounts & Permissions](https://help.vtex.com/tracks/contas-e-permissoes--5PxyAgZrtiYlaYZBTlhJ2A/4T2vusW9RRUmVjGSuKNO2H) on VTEX Help Center.

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles | 
| ---------- |
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

## Related articles

- [Telesales toolbar](https://help.vtex.com/en/tutorial/toolbar-de-televendas--tutorials_5500)
- [Telesales features](https://help.vtex.com/en/tutorial/funcionalidades-de-televendas--UqhiccIRIK2KD0OqkzJaS)
- [Configuring telesales features](https://help.vtex.com/en/tutorial/como-configurar-as-funcionalidades-de-televendas--76FNgQP2Glc4umMJ5Yr50R)
- [Accounts & Permissions](https://help.vtex.com/tracks/contas-e-permissoes--5PxyAgZrtiYlaYZBTlhJ2A/4T2vusW9RRUmVjGSuKNO2H)

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

