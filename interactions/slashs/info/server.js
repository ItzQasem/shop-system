const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions } = require("discord.js");
const discord = require("discord.js");
const config = require("../../../jsons/config.json");
const logs = require("../../../jsons/logs.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Get information about the server"),
    /**
     * @param {discord.Client} client 
     * @param {discord.CommandInteraction} interaction 
     */
  async execute(client, interaction) {
    const server = interaction.guild;

    const embed = new MessageEmbed()
      .setTitle(`Server Information for ${server.name}`)
      .addField("Server ID", `${server.id}`, false)
      .addField("Owner", `${server.ownerId}`, false)
      .addField("Members Count", `${server.memberCount}`, false)
      .addField("Humans", `${server.members.cache.filter((m) => !m.user.bot).size}`, false)
      .addField("Bots", `${server.members.cache.filter((m) => m.user.bot).size}`, false)
      .addField("Verification Level", `${server.verificationLevel}`, false)
      .addField("Created At", `<t:${Math.floor(server.createdTimestamp / 1000)}:D>`, false)
      .setColor(config.embedcolor);

    return interaction.reply({ embeds: [embed] });
  },
};