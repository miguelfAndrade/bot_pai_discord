# Bot do Pai

This is a discord bot that joins to your voice channel and plays the "SIIIUUU!" of the one and only PAI. Once finished the bot leaves.
You can add the bot to your discord server [here](https://discord.com/api/oauth2/authorize?client_id=1033426866943557684&permissions=2150632448&scope=bot%20applications.commands).

## Bot commands

+ `/convocar` The bot enters in the user voice chat and play SIIUUUUUU and then leaves
+ `/banco` The bot enters in this specific voice channel and plays a sound on loop
+ `/desconvocar` Disconnect the bot from the **banco** channel and the user voice channel

## Local Setup

First, follow [this guide](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token), saving the **token** and **clientID** for later use.

+ Install Node.js ( version >= 16.9.0)
+ Clone this repository `git clone https://github.com/miguelfAndrade/bot_pai_discord.git`
+ Rename the file `.env.local` to `.env`
+ Modify the variables in the `.env` to the correct ones `CLIENT_ID=YourClintID` `TOKEN=YourTOKEN`
+ In the root of the project run `npm install`
+ Run the command `npm run start`

## License

[MIT License](./LICENSE.md)
