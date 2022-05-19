# COMP6841 Something Awesome Project

A novelty chrome extension that doubles as a keylogger / user data collector. The extension also relays all stolen data to the backend webserver such that it can be collected, categorised and used by an attacker remotely.

# Installing

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