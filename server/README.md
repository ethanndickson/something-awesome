# Server

## src

`app.js` - contains all the backend code, recieving data from clients, and forwarding it to our database.

Connects to a locally hosted PostgresQL database called `server`, assumes the database exists.

No particular reason for choosing Fastify over any other framework, server is too simple for this to matter. 

Choosing Node over Python was purposeful, however, I wanted to keep working in JS as a learning experience.

`package-lock.json` & `package.json` - Node package info for the webserver, including required modules

`schema.sql` - The schema for the PostgresQL database. Used postgres just because I'm familiar with it.