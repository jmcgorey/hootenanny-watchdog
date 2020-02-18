# What is hootenanny-watchdog?
```hootenanny-watchdog``` is a Discord bot that was put together to help my friends and I manage the status of our modded Minecraft server. It is able to query for the status of a Minecraft server using the [mcsrvstat.us API](https://api.mcsrvstat.us/) provided by Anders G. Jørgensen ([Spirit55555](https://github.com/Spirit55555)).  Future plans include being able to start and stop an AWS instance that is running a Minecraft server using commands in Discord chat.  It could also be expanded to manage other types of game servers as well.

Please feel free to take this code and modify it for your purposes.

# Setting Up Your Development Environment
## Installing Node
The Discord bot runs on top of Node JS, so the first thing you should do is verify that you have Node JS installed on your machine.  If you type in the command
```
node -v
```
into your terminal, and you get any version above v8.0.0, you should be good to go.

If you get an error while running the above command, then it's likely you don't have Node installed on your computer.  Please refer to [The Node JS Website](https://nodejs.org/en/) for information on how to install Node on your respective machine.

## Setting Up Your Project
Once you have Node installed, the next thing that you will want to do is create a directory for your bot to live in and navigate into it. For example: 
```
mkdir hootenanny-watchdog-bot
cd hootenanny-watchdog-bot
```
 Once inside your new directory, run the following command to initialize a new Node package for your Discord bot.    
```
npm init
```
This will take you through the package initialization wizard. The details of what to fill out are mainly up to you.  However, when you are asked to specify an entry point, use 'bot.js' instead of the default.


Once you've initialized your package, run the following command in your terminal to install the Node packages that you will need to run the bot:  
 ```
 npm install --save discord.js dotenv node-fetch
 ```
This will install the following Node packages:
* Discord.js - Provides the functionality for running the Discord bot
* dotenv - Used to allow for importing a configuration file
* Fetch - Used to make web requests  

Once you have done the above, place ```bot.js``` and ```.env``` from this repository into the directory that you made.  The ```bot.js``` file contains the functionality of the Discord bot, and the ```.env``` file contains a set of configuration values that are used to run the bot.  You will have to edit the ```.env``` file to meet your needs. It follows this structure:
```
--.env----------------------------------
DISCORD_TOKEN= #YOUR DISCORD BOT TOKEN
PO3_SERVER_HOSTNAME= #THE HOSTNAME OF YOUR MINECRAFT SERVER ex: play.myMinecraftServer.com
```

For details on how to obtains your Discord token, follow the "Generating Token Key" section of [this Medium article](https://medium.com/davao-js/2019-tutorial-creating-your-first-simple-discord-bot-47fc836a170b).  You will also want to connect your bot to a Discord server.  Instructions on how to do that can be found in that same Medium article.

That's it!  Once you've placed your Discord Token and Server Hostname into the ```.env``` file, you should be able to run your bot by calling
```
node bot.js
```
The bot should log into the Discord server you've added it to and it should start responding to your commands.

___

# Credits
The foundations of this project are built on [this tutorial](https://medium.com/davao-js/2019-tutorial-creating-your-first-simple-discord-bot-47fc836a170b) by Davao JS on Medium, which goes through everything from building a basic bot to registering it to be added to a Discord server.  
Also, many thanks to Anders G. Jørgensen ([Spirit55555](https://github.com/Spirit55555)) for providing the mcsrvstat.us API.  It made it very easy to get all of the information I needed about my Minecraft server.


Thanks to everyone to this project:
* John McGorey