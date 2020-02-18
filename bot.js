/* 
    BotName:    Hootenanny Watchdog

    Purpose:    This bot allows players to query a Minecraft server to get information on its online/offline status
                and on who is currently playing on the server.  Future plans include adding ability to start and stop
                server via chat commands.

    The foundations for this bot were taken from a tutorial by Davao JS on Medium:
    https://medium.com/davao-js/2019-tutorial-creating-your-first-simple-discord-bot-47fc836a170b

    Authors & Contributors:
        John McGorey - February 2020
*/
require('dotenv').config(); // Load the configuration file

// Import libraries
const fetch = require('node-fetch');
const Discord = require('discord.js');
const client = new Discord.Client();

// Event listener for bot initialization.  This is a required event handler
client.on('ready', () => {
    // This function runs when the bot logs into the discord server
    console.log(`Logged in as ${client.user.tag}!`);
});

// Event listener for user posting a message
client.on('message', msg => {
    // This function runs when any user posts a message in the chat (including this or another bot)
    if (msg.content === '!po3 status') {
        ReportMinecraftServerStatus(msg, process.env.PO3_SERVER_HOSTNAME);
    }
    // TODO Implement command w/ arguments pattern found here: https://discordjs.guide/creating-your-bot/commands-with-user-input.html#basic-arguments 
});


function ReportMinecraftServerStatus(msg, hostname) {
    /*  
    Function:   ReportServerStatus
    Purpose:    Send a request to the mcsrvstat.us API to get information about the status of a Minecraft 
                Server.  The response containing the server's status information is then aggregated into a 
                string and posted to the Discord chat. 
    
    Inputs:     msg - The Message object from the user's command input
                hostname - The hostname of the Minecraft server to inquire about

    Output:     The server's status is reported to the Discord chat in the channel the command came from 
    
    Notes:      More information about the mcsrvstat.us API and the structure of the response object can be 
                found at https://api.mcsrvstat.us/.
    */
    let url = 'https://api.mcsrvstat.us/2/' + hostname; // Put the URL for the API request together
    
    // Send the request to the API using url and pull out the data portion of the response
    fetch(url)
        .then(response => response.json())
        .then(data => {

            // Parse response data into variables so it's easier to work with
            let isServerOnline = data.online;
            let arePlayersOnline = (data.players && data.players.list ? true : false);

            // Aggregate the server's status into a string so it can be posted in the Discord chat
            let reply = 'Server: ' + hostname;
            reply += '\nStatus: ' + (isServerOnline ? 'Online!' : 'Offline');

            // If the server is online, add additional details about how many players are playing
            if (isServerOnline) {
                reply += '\nPlayers: ' + data.players.online + ' / ' + data.players.max;  // Ex:  Players: 2 / 20
                // Display a list of the players who are logged in, if any
                if (arePlayersOnline) {
                    reply += '\nCurrently Playing: ';
                    for (let i = 0; i < data.players.list.length; i++) {
                        reply += data.players.list[i] + ' ';
                    }
                    // Ex:  Currently Playing: PlayerA PlayerB
                }
            }

            // Post the reply in the channel the command came from
            msg.channel.send(reply);
        })
        .catch(err => console.error(err)); // Log any errors from this promise chain
}

// Initialize the bot by connecting to the server
client.login(process.env.DISCORD_TOKEN);