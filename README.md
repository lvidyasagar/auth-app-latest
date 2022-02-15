# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `npm install auth-app-latest`

To install the `auth-app-latest` library.

## Usage

_package.json_

```{
        ....,
        "dependencies":{
            .....,
            "react": "^17.0.2",
            "react-dom": "^17.0.2",
            "react-router": "^5.2.1",
            "react-router-dom": "^5.3.0",
            "react-scripts": "^4.0.3"
        }
    }
```

as these dependencies are `peerDependencies` to this library, so these four dependencies must be installed with same version to use the `auth-app-latest` library.

## Example

_App.tsx_

```
import React from "react";

import {AuthApp,AuthConfig} from "auth-app-latest";
import { BrowserRouter } from "react-router-dom";

const config: AuthConfig = {
  config: {
    clientId: "xxxxxxxxxxxxxx",
    issuer: "https://{your-domain-id}.okta.com/oauth2/default",
    redirectUri: "http://localhost:3000/login/callback",
    scopes: ["openid", "profile", "email"],
    pkce: true,
  },
  roles: {
    ADMIN_GROUP: "admin",
    USER_GROUP: "local",
  },
};
function App() {
  return <BrowserRouter>
        <AuthApp {...config} />
      </BrowserRouter>;
}

export default App;
```

_index.scss_

```
@import "~auth-app-latest/dist/index";

```

if you use above config in css stylesheets may throw error, please use in scss stylesheets only

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
