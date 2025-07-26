# Calculator_Task

## [Task]()

## [Demo](https://huevicalculator.netlify.app/)

## How to run the app:

1. Clone this repo

```
$git clone git@github.com:BogukEvgeny/Calculator.git
```

2. Open the directory in code editor
3. Run `$ npm install` to install all the dependencies
4. Run app with `$ npm run serve` to run the app in your browser

## Additional scripts

-   `$ npm run test` runs the tests
-   `$ npm run build` builds the app for production to the `dist` folder

## Folders structure

```
📦src                             # Contains all logic of the project
 ┣ 📂styles                       # Holds .css files with app styles
 ┃ ┗ 📜main.css
 ┣ 📂scripts                      # Holds .js files with app scripts
    ┗ 📜operations.test.js        # File for "Jest" to test all mathematical operations from operations.js
    ┗ 📜buttons.js                # Initializes all buttons and writing text on the screen
    ┗ 📜operation_functions.js    # Contains all functions to calcute what we write on screen by buttons
    ┗ 📜result.js                 # Realization of equall button
    
    
 index.hml
```

## Stack

-   HTML
-   CSS
-   JS
-   Jest
-   Webpack
-   ESlit
