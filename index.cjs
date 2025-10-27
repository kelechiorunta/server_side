require('ignore-styles'); // Ignore CSS imports in Node.js
require('@babel/register')({
  ignore: [/(node_modules)/], // Ignore transpiling dependencies
  extensions: ['.js', '.jsx'],
  presets: ['@babel/preset-env', '@babel/preset-react'] // Transpile JSX + modern JS
});

require('./server.cjs'); // Now run the actual server file
