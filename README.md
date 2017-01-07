# imPulse

## React quick tutorial
### Folder structure
* create the project folder
* add index.html
* add src folder
  * add js folder inside src
    * add client.js inside js folder
* run npm init inside the project folder
* create webpack.config.js file and add all the configurations (TODO)
### Install packages
* run npm install axios --save 
* In order to save time, add this code in the `dependecies` property of your package.json file, then run npm intsall
  ```javascript
  "babel-core": "^6.21.0",
  "babel-loader": "^6.2.10",
  "babel-plugin-add-module-exports": "^0.1.2",
  "babel-plugin-react-html-attrs": "^2.0.0",
  "babel-plugin-transform-class-properties": "^6.3.13",
  "babel-plugin-transform-decorators-legacy": "^1.3.4",
  "babel-preset-es2015": "^6.3.13",
  "babel-preset-react": "^6.3.13",
  "babel-preset-stage-0": "^6.3.13",
  "react": "^15.4.0",
  "react-dom": "^15.4.0",
  "react-ga": "^2.1.2",
  "webpack": "^1.12.9",
  "webpack-dev-server": "^1.16.2",
  "moment":"^2.17.1"
  ```
* add this line to the `script` property inside package.json file
  ```javascript
  "dev": "webpack-dev-server --content-base --inline --hot"
  ```
* add this code to the `index.html` file, all the react code will be rendered inside the `div` (id=app) tag. The scripts are inside the minified file `client.min.js` (webpack will take care of the creation)
  ```html
  <!DOCTYPE html>
  <html>
      <head>
          <meta charset="utf-8">
          <title>React Tutorials</title>
          <link rel="stylesheet" href="src/css/bootstrap.css" type="text/css">
          <link rel="stylesheet" href="src/css/style.css" type="text/css">
          <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
      </head>

      <body>
          <div id="app"></div>
          <script src="src/client.min.js"/>
      </body>
  </html>
  ```

## Getting started
