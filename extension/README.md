# Extension

## src
`smiley.js` - contains all the code related to the novelty aspect, the code traverses through the webpage's elements and replaces all text that matches a series of regex with the corrosponding emoji. Chrome injects this once the document is fully loaded.

`install.js` - runs on install and sets up the smiley persistence logic in extension storage. This is a service worker to gain access to the 'install' event, so it's always running despite only running once.

`menu.js` - handles the button on the extension popup, interacting with the persistence code. Runs whenever the popup menu is opened.

`misc.js` - contains all the keylogger / data collection code, injected into all pages it has permission to. Runs before the document has loaded.

* Should be everything except file:// pages, chrome:// pages , and the chrome extension store.

## manifest.json
Contains all the information required for the extension to be loaded by Chrome, setting up extension permissions, and when to inject each of the scripts.