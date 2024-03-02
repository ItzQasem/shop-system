const discord = require("discord.js");
const { MessageEmbed, Permissions } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../../../jsons/config.json");
const moment = require("moment");
function trimArray(arr, maxLen = 25) {
  if (Array.from(arr.values()).length > maxLen) {
    const len = Array.from(arr.values()).length - maxLen;
    arr = Array.from(arr.values())
      .sort((a, b) => b.rawPosition - a.rawPosition)
      .slice(0, maxLen);
    arr.map((role) => `<@&${role.id}>`);
    arr.push(`${len} more...`);
  }
  return arr.join(", ");
}
const statuses = {
  online: "🟢",
  idle: "🟠",
  dnd: "🔴",
  offline: "⚫️",
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Gives you information about a User")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("user to show his info")
        .setRequired(false)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    let user = interaction.options.getUser("user") ?? interaction.user;
    try {
      await interaction.guild.members.fetch();
      const member = interaction.guild.members.cache.get(user.id);
      const userBanner = await user.fetch(member)
      const roles = member.roles;
      const userFlags = user.flags.toArray();
      const activity = member.presence?.activities[0];
      //create the EMBED
      const embeduserinfo = new MessageEmbed();
      embeduserinfo.setAuthor(
        `Information about: ${member.user.username}`,
        member.displayAvatarURL({ dynamic: true })
      );
      embeduserinfo.setThumbnail(
        member.user.displayAvatarURL({ dynamic: true, size: 512 })
      );
      embeduserinfo.addField("**Username:**", `${member.user.username}`);
      embeduserinfo.addField("**ID:**", `\`${member.id}\``, true);
      embeduserinfo.addField(
        "**Joined Discord At:**",
        moment(member.user.createdTimestamp).format("DD/MM/YYYY") +" "+
          moment(member.user.createdTimestamp).format("hh:mm:ss")
      );
      embeduserinfo.addField(
        "**Joined Server At:**",
        moment(member.joinedTimestamp).format("DD/MM/YYYY") +" "+
          moment(member.joinedTimestamp).format("hh:mm:ss")
      );
      embeduserinfo.addField(
        "**Stats:**",
        `\`${statuses[member.presence.status]} ${member.presence.status}\``
      );
      embeduserinfo.addField(
        "**Is a Bot:**",
        `\`${member.user.bot ? "Yes" : "No"}\``
      );
      embeduserinfo.addField(
        `[${roles.cache.size}] Roles: `,
        roles.cache.size < 25
          ? Array.from(roles.cache.values())
              .sort((a, b) => b.rawPosition - a.rawPosition)
              .map((role) => `<@&${role.id}>`)
              .join(", ")
          : roles.cache.size > 25
          ? trimArray(roles.cache)
          : "Not have any role"
      );
      embeduserinfo.setColor(config.embedcolor);
      embeduserinfo.setFooter(
        client.user.username,
       client.user.displayAvatarURL({ dynamic: true, size: 512 })
      );
      if(userBanner.bannerURL()){
          embeduserinfo.setImage(userBanner.bannerURL({dynamic: true, size: 2048}));
      }
      embeduserinfo.setTimestamp();
      interaction.reply({ embeds: [embeduserinfo]});
    } catch (error) {
      if (error) console.error(error);
    }
  },
};
