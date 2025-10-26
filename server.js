const express = require('express');
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router');
const React = require('react');
const { sendFile, readFile } = require('fs');
const path = require('path');
const App = require('./src/App').default;
const Loader = require('./src/loader/Loader').default;
const app = express();
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'build')));

console.log(process.env.NAME);
// app.get("*", (req, res) => {
//   const appHtml = renderToString(
//     <StaticRouter location={req.url}>
//         <App/>
//     </StaticRouter>
//     //React.createElement(StaticRouter, { location: req.url }, React.createElement(App))
//   );

//   const loaderHtml = renderToString(
//     React.createElement(StaticRouter, { location: req.url }, React.createElement(Loader))
//   );

//   const html = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="utf-8" />
//         <link rel="icon" href="/favicon.ico" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <meta name="theme-color" content="#000000" />
//         <meta
//         name="description"
//         content="Web site created using create-react-app"
//         />
//         <link rel="apple-touch-icon" href="logo192.png" />
//         <link rel="manifest" href="/manifest.json" />
//         <title>Server Side Rendered App</title>
//     </head>
//     <body>
//         <div id='root'>
//             <h1>Server Side Rendered React App</h1>
//             ${appHtml}
//             ${loaderHtml}
//         </div>
//     </body>
//     </html>
//   `;

//   res.send(html);
// });

// Handle all requests by rendering React
app.get('/*', (req, res) => {
  // Read the base HTML template (your index.html)
  const indexFile = path.resolve('build/index.html');
  readFile(indexFile, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('Error reading index.html', err);
      return res.status(500).send('Internal Server Error');
    }

    // Convert the React App to an HTML string
    // const appHtml = renderToString(
    //   <StaticRouter location={req.url}>
    //     {/* <h1>Server Rendered React App</h1> */}
    //     <App />
    //   </StaticRouter>
    // );

    // Inject the rendered HTML into the template
    // const finalHtml =
    //   //htmlData.replace(

    //   //`<div id="root"></div>`,
    //   `<div id="root">${appHtml}</div>`;
    //);

    res.send(htmlData);
  });
});

const PORT = process.env.PORT || 7700;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
