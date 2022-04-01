# Server

## src

`app.js` - contains all the backend code, recieving data from clients, and forwarding it to our database.
Connects to a locally hosted PostgresQL database called `server`, assumes the database exists.

`package-lock.json` & `package.json` - Node package info for the webserver, including required modules

`schema.sql` - The schema for the PostgresQL database