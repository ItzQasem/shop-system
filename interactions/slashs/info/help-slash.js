const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js')
const config = require("../../../jsons/config.json")
const fs  = require('fs')
module.exports = {
data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('show your avatar or someone\'s banner'),
    /**
     * @param {discord.Client} client 
     * @param {discord.CommandInteraction} interaction 
     */
    async execute(client, interaction) {
        if(!interaction.guild) return;
        const embed  = new discord.MessageEmbed()
        .setAuthor(interaction.user.username, interaction.user.displayAvatarURL({dynamic: true, size: 2048}))
        .setColor(config.embedcolor)
        .setTimestamp()
        .setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}));
        fs.readdirSync('./interactions/slashs').forEach((folder) => {
            const commandFiles = fs.readdirSync(`./interactions/slashs/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../../../interactions/slashs/${folder}/${file}`);
                if (command.data.name) {
                    embed.addFields({name: `**/${command.data.name}:**`, value: `**${command.data.description}**`});
                } else {
                    continue;
                }
            }
        });
        
        interaction.reply({embeds: [embed]});
    }
};