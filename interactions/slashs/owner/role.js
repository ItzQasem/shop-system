const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions } = require("discord.js");
const discord = require("discord.js");
const config = require("../../../jsons/config.json");
const logs = require("../../../jsons/logs.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("role")
    .setDescription("Give a role to a member")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The member you want to give the role to")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("The role you want to give to the member")
        .setRequired(true)
    ),
     /**
     * @param {discord.Client} client 
     * @param {discord.CommandInteraction} interaction 
    */
  async execute(client, interaction) {
    const member = interaction.options.getMember("user") ?? interaction.member;
    const role = interaction.options.getRole("role");
    const logchannel1 = interaction.guild.channels.cache.get(logs.roleGive);
    const logchannel2 = interaction.guild.channels.cache.get(logs.roleRemove);

    if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
      return interaction.reply({ content: "You do not have permission to manage roles.", ephemeral: true });
    }

    if (!member) {
      return interaction.reply({ content: "Please provide a valid member to give the role to.", ephemeral: true });
    }
    if (!logchannel1 || !logchannel2) {
        return interaction.reply({ content: "logchannel required", ephemeral: true });
      }

    if (!role) {
      return interaction.reply({ content: "Please provide a valid role to give to the member.", ephemeral: true });
    }

    try {
      if(!member.roles.cache.has(role.id)){
          await member.roles.add(role.id);
         interaction.reply({ content: `You have been given the role \`${role.name}\` to ${member}.`});
          const embed = new MessageEmbed()
          .setTitle("**Role added**")
          .setDescription(`
            > **Member** | ${member} (${member.id})
            > **Role** | ${role} (${role.id})
            > **Moderator** | ${interaction.user} (${interaction.user.id})
          `)
          .setColor(config.embedcolor)
          .setTimestamp()
          logchannel2.send({embeds: [embed]})
        } else {
        await member.roles.remove(role.id);
        interaction.reply({ content: `You have been removed the role \`${role.name}\` from ${member}.`});
        const embed = new MessageEmbed()
        .setTitle("**Role Removed**")
        .setDescription(`
        > **Member** | ${member} (${member.id})
        > **Role** | ${role} (${role.id})
        > **Moderator** | ${interaction.user} (${interaction.user.id})
        `)
        .setColor(config.embedcolor)
        .setTimestamp()
        logchannel2.send({embeds: [embed]})
    }
    } catch (error) {
        if (error.code === 50013) {
            return interaction.reply({ content: `I cannot give the role \`${role.name}\` to ${member} because I am missing the permission \`Manage Roles\`.`, ephemeral: true });
          }
      return interaction.reply({ content: `An error occurred while trying to give the role ${role} to ${member}. Error: \`\`\`${error}\`\`\``, ephemeral: true });
    }
  },
};