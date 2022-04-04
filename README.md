# COMP6841 Something Awesome Project

For my Something Awesome project I've created a novelty chrome extension that doubles as a keylogger / user data collector. 

There are two main parts to the project, the user-facing novelty aspect and the hidden malicious aspect. 

## Novelty (Social Engineering)
As an asynchronous social engineering attack, the premise of the extension aims to convince the user to provide it with full browser permissions.

This extension claims it's sole purpose is replacing a list of basic ASCII smileys with their unicode emoji replacements on all websites visited.

It's expected that the novelty of this extension will wear off, and the user will want to disable the extension. The easiest way to do that is via a popup box that appears when the extension icon is clicked, this has been purposefully placed as to ensure users keep the extension installed for as long as possible. The code makes use of Chrome extension storage to implement persistence of this state across sessions.

## Malicious (Keylogger & Data Collection Server)
The goal of this section is to harvest user keystrokes and form input, including emails, passwords, phone numbers, and instant messaging chat boxes.

This data will then be sent to a remote server, also included in this project, where it is categorised and stored in a PostgresQL database, such that multiple victims of the attack can be tracked easily. The result is effectively a read-only botnet - no commands are issued remotely.

If a user were to disable the novelty aspect of the extension via the popup menu, the extension will continue to track and send user input back to the server.

### Obfuscation

The purpose of the extension code has not been concealed in any way. If this were being published and used to actually spy on users we would remove comments, obfuscate variables & minify the code.

Possible tools for this include [horrible.js](https://github.com/TShadwell/Horrible.js) and [Google's Closure Compiler](https://developers.google.com/closure/compiler)

### Uploading to the Webstore
The Google Chrome webstore policies do not allow concealed functionality, but [allow the removal of whitespace, newlines, and block delimiters](https://developer.chrome.com/docs/webstore/program_policies/#code-readability).

Ideally, I would like to upload this extension once minified to the chrome webstore, however I do not have (and will almost certainly not obtain) Google's explicit permission to upload malicious, albeit non-functional without a server, code to their webstore.


# Credits

### **Visuals**

[Twemoji](https://twemoji.twitter.com/)
- Copyright 2020 Twitter, Inc and other contributors

- Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/

[Roboto by Google Fonts](https://fonts.google.com/specimen/Roboto#license)
- Licensed under the Apache License, Version 2.0.

### **Node Modules** 

[Fastify](https://github.com/fastify/fastify)
- Licensed under the MIT License

[fastify-cors](https://github.com/fastify/fastify-cors)
- Licensed under the MIT License

[node-postgres](https://github.com/brianc/node-postgres)
- Licensed under the MIT License

And their respective dependencies...