# COMP6841 Something Awesome Project

For my Something Awesome project I've created a novelty chrome extension that doubles as a keylogger / user data collector. 

There are two main parts to the project, the user-facing novelty aspect and the hidden malicious aspect. 

## Novelty (Social Engineering)
This extension claims it's sole purpose is replacing a list of basic ASCII smileys with their unicode emoji replacements on all websites visited. To do this it will, obviously, require permission to read and modify data on all websites, a reasonable request.

It's expected that the novelty of this extension will wear off, and the user will want to disable the extension. The easiest way to do that is via a popup box that appears when the extension icon is clicked, this has been purposefully placed as to ensure users keep the extension installed for as long as possible. The code makes use of Chrome extension storage to implement persistence of this state across sessions.

## Malicious (Keylogger & Data Collection Server)
The goal of this section is to harvest user keystrokes and form input, including emails, passwords, phone numbers, and instant messaging chat boxes.

This data will then be sent to a remote server, also included in this project, where it is categorised and stored in a PostgresQL database, such that multiple victims of the attack can be tracked easily. The result is effectively a read-only botnet - no commands are issued remotely.

If a user were to disable the novelty aspect of the extension via the popup menu, the extension will continue to track and send user input back to the server.

### Obfuscation

The code on this repo has not been concealed in any way. If this were being published and used to actually spy on users we would remove comments, obfuscate variables & minify the code.

Possible tools for this include [horrible.js](https://github.com/TShadwell/Horrible.js) and [Google's Closure Compiler](https://developers.google.com/closure/compiler)

### Uploading to the Webstore
The Google Chrome webstore policies do not allow concealed functionality, but [allow the removal of whitespace, newlines, and block delimiters](https://developer.chrome.com/docs/webstore/program_policies/#code-readability).

Ideally I would upload this extension, minified, to the Chrome webstore to figure out what it would take to bypass their checks.

However, I do not have (and will almost certainly not obtain) Google's explicit permission to upload malicious, albeit non-functional without a server, code to their webstore. 


# Rationale / Reflection
Going into this project I had no experience with JavaScript, no idea how the frontend of a webpage is structured, nor how to manipulate it, and especially no idea how to write a browser extension. 

## Browser Extensions
Designing the browser extension taught me a lot. The `manifest.json` file dictates how the browser handles the extension. There are content scripts, injected into the page and run once, and service workers / background scripts, which are always running. In the manifest we also set the popup menu html file, the icons, and the permissions.

## JavaScript & Node.js

By choosing to write the frontend & backend in JavaScript I gained an understanding of asynchronous programming using callbacks, promises, & async/await that I wouldn't have otherwise.

Likewise, I'd never used Node.js for a project before, so when I heard COMP1531 would be switching from Python to Node for it's backend I thought I would fill in the gaps in my knowledge and rewrite my backend using it.

Although I had experience with relational databases, connecting PostgreSQL to the Node webserver was a learning experience also.

## Frontend / HTML & CSS
This was also my first time writing HTML & CSS. Although a minor component, the button that appears on the extension menu, took me much longer than I had expected, especially when I then had to implement persistence for it's state.

By writing the code for the Smiley feature & logging input boxes I also familiarised myself with traversing and manipulating the DOM.

## Security Insights 

### Permissions
One thing that struck me as weird, and not ideal for when it comes to protecting users from malicious extensions like my own, is the permissions system that Chrome uses. 

If you were to install just the novelty aspect of this extension, you would be greeted with the same permissions request as if you were installing the malicious aspect - "Read and change all your data on all websites". 

Whilst the onus to check for malicious code is on the user & Google checks these extensions themselves, I really do believe Google could help it's users in this matter by restricting certain document events (i.e. In my code I used 'keydown') to individual permissions, and present the user with a message accordingly.

### View Source Code
I'm sure there's a reason for this, but there's no "View source" button for any extensions in Chrome. Doesn't mean you can't view the files, you really have to go out of your way to find them.




# Installing

Once you've cloned the repo:

## Server
1. Install PostgreSQL 11 or later - create a DB called `server` - insert the schema: `psql server -f src/server/schema.sql`
2. Modify `server/src/app.js:59` to use whatever port you would like - 3000 by default.
3. From `server/src` run `npm install` to install node modules
4. From `server/src` run `node app.js` to start the server

## Extension
1. Go to `chrome://extensions` in Google Chrome
2. Toggle 'Developer Mode' on in settings
3. Select 'Load Unpacked Extension' and select the `extension` folder.

Will throw errors in the `chrome://extensions` page if it can't fetch a client ID from the server, presumably if the server doesn't exist.

# Credits

### **Visuals**

[Twemoji](https://twemoji.twitter.com/)
- Copyright 2020 Twitter, Inc and other contributors

- Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/

[Roboto by Google Fonts](https://fonts.google.com/specimen/Roboto#license)
- Licensed under the Apache License, Version 2.0.

### **Node Modules Used** 

[Fastify](https://github.com/fastify/fastify)
- Licensed under the MIT License

[fastify-cors](https://github.com/fastify/fastify-cors)
- Licensed under the MIT License

[node-postgres](https://github.com/brianc/node-postgres)
- Licensed under the MIT License

And their respective dependencies...

# License

Licensed under the [MIT License](https://github.com/ethanndickson/something-awesome/blob/master/LICENSE) 