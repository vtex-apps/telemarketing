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

## Usage

This app uses our store builder with the blocks architecture. To know more about the Store Builder [click here](https://help.vtex.com/en/tutorial/understanding-storebuilder-and-stylesbuilder#structuring-and-configuring-our-store-with-object-object).

To use this app you need to import it in your `dependencies` on `manifest.json` file.

```json
  dependencies: {
    "vtex.telemarketing": "2.x"
  }
```

Then, add the `telemarketing` block into our app theme, like we do in our [Dreamstore app](https://github.com/vtex-apps/dreamstore/blob/master/store/blocks.json).

:loudspeaker: **Disclaimer:** This component will only be displayed if the user has the role of `2 - Televendas (Call center operator)` in its profile access.

To give an user the permission of call center operator you need to follow these steps on VTEX admin management page:

- Access the page: Account Management -> Access Profiles -> Click in New Profile -> Select `2 - Televendas (Call center operator)`
- Add the email of the users that are responsable for impersonating customers(call center operators).

### Blocks API
:construction: :construction: :construction:

This app has an interface that describes what are the rules that the blocks must implement when you want to use the telemarketing block. 

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
:construction: :construction: :construction:

## Troubleshooting
You can check if others are passing through similar issues [here](https://github.com/vtex-apps/telemarketing/issues). Also feel free to [open issues](https://github.com/vtex-apps/telemarketing/issues/new) or contribute with pull requests.
