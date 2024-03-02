require('dotenv').config()
const fs = require('fs');
const express = require('express');

const discord = require('discord.js');
const client = new discord.Client({
    intents:32767, 
    partials: ['CHANNEL', 'GUILD_MEMBER', 'GUILD_SCHEDULED_EVENT', 'MESSAGE', 'USER','REACTION']
});
client.setMaxListeners(999_999_999);
client.SlashCommands = new discord.Collection();
client.commands = new discord.Collection();
client.buttons = new discord.Collection();
client.menus = new discord.Collection();
client.modals = new discord.Collection();
module.exports = client;

process.on("uncaughtException" , error => {
return console.log("error", error);
})

process.on("unhandledRejection" , error => {
return console.log("error", error);;
})

process.on("rejectionHandled", error => {
return console.log("error", error);;
});

fs.readdirSync("express").forEach(ex => {
    require(`./express/${ex}`)(express);
});
fs.readdirSync("Handlers").forEach(file => {
    require(`./Handlers/${file}`)(client);
});


client.login(process.env.token).catch(e => console.log(e));