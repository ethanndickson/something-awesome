# COMP6841 Something Awesome Project

For my Something Awesome project I've created a novelty chrome extension that doubles as a keylogger / user data collector. 

There are two main parts to the project, the user-facing novelty aspect and the hidden malicious aspect. 

## Novelty (Social Engineering)
As an asynchronous social engineering attack, the premise of the extension aims to convince the user to provide it with full browser permissions.

This extension claims it's sole purpose is replacing a list of basic ASCII smileys with their unicode emoji replacements on all websites visited.

It's expected that the novelty of this extension will wear off, and the user will want to disable the extension. The easiest way to do that is via a popup box that resides when the extension icon is clicked, this has been purposefully placed as to ensure users keep the extension installed for as long as possible.

## Malicious (Keylogger & Data Collection Server)
The goal of this section is to harvest user keystrokes and form input, including emails, passwords, phone numbers, and instant messaging chat boxes.

This data will then be sent to a remote server, also included in this project, where it is categorised and stored, such that multiple victims of the attack can be tracked easily.

If a user were to disable the novelty aspect of the extension via the popup, the extension will continue to track and send user input back to the server.


# Credits
Twemoji by Twitter are open source emoji. 

Copyright 2020 Twitter, Inc and other contributors

Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/