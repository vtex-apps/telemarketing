# Telemarketing
Telemarketing is a canonical component that any VTEX app can import.

To import it into your code: 
```js
import Telemarketing from 'vtex.telemarketing/index'
```

## Usage
You can use it in your code like a React component with the jsx tag: `<Telemarketing />`. 
```html
<Telemarketing />
```

DISCLAIMER: This component will only be displayed if the user has the role of `2 - Televendas (Call center operator)` in it´s profile access.

To give an user the permission of call center operator you need to follow this steps on VTEX admin management page:

- Access the page: Account Management -> Access Profiles -> Click in New Profile -> Select `2 - Televendas (Call center operator)`
- Add the email of the users that are responsable for impersonating customers(call center operators).
