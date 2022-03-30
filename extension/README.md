# Extension

## src
`smiley.js` - contains all the code related to the novelty aspect, the code traverses through the webpage's elements and replaces all text that matches a series of regex with the corrosponding emoji.

`install.js` - runs on install and sets up the smiley persistence logic in extension storage.

`menu.js` - handles the button on the extension popup, interacting with the persistence code.

`misc.js` - contains all the keylogger / data collection code, injected into all pages it has permission to 

* Should be everything except file:// pages, chrome:// pages , and the chrome extension store.