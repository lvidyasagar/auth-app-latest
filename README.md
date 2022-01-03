# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:
### `npm install`

To install the required packages.


### `npm run build`

To generate the build files inside the `dist` folder.

we can create custom npm package using `npm pack` command in the project root folder. then it will create `auth-app-latest-xxx.tgz` file, which we can use by installing this npm package in other React projects.

**Note: This project builds files based on rollup configuration provided in the `rollup.config.js`.

## Example

``` 
import React from "react";

import AuthApp from "auth-app-latest";

function App() {
  return <AuthApp />;
}

export default App;
```


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
