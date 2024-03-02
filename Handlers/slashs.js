const fs = require("fs");
const config = require('../jsons/config.json')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const {id} = require('../Events/ready')
const SlashCommands = [];
module.exports = (client) => {
    fs.readdirSync('./interactions/slashs').forEach((folder) => {
        const commandFiles = fs.readdirSync(`./interactions/slashs/${folder}`).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`../interactions/slashs/${folder}/${file}`);
            SlashCommands.push(command.data.toJSON())
            if (command.data.name) {
                client.SlashCommands.set(command.data.name, command);
            } else {
                continue;
            }
        }
    });
        const rest = new REST({ version: '9' }).setToken(process.env.token);
        (async () => {
            try {
                await rest.put(Routes.applicationCommands(config.botID), { body: SlashCommands })
                 console.log(`there are ${SlashCommands.length} slash(s) are working ...`);
            } catch (error) {
                if (error) console.error(error.message);
            }
    })();
};


