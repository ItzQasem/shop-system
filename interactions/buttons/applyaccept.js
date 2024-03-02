const discord = require("discord.js");
let config = require("../../jsons/config.json");
module.exports = {
  btn: "accept",
  /**
   * @param {discord.Client} client
   * @param {discord.ButtonInteraction} interaction
   */
  async execute(client, interaction) {
    let member = interaction.guild.members.cache.get(interaction.message.embeds[0].footer.text)
    if(!config.apply.ModerationRoles.includes(interaction.member.roles.cache.first().id)) return interaction.reply({content: `لا تمتلك صلاحيات`, ephemeral: true})
    const embed = new discord.MessageEmbed()
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({dynamic: true})})
        .setColor("GREEN")
        .setTimestamp()
        .setDescription(`**تم قبول ${member}\n الاداري: ${interaction.member}**`)
        .setFooter({text: client.user.username, iconURL: client.user.displayAvatarURL({dynamic: true})})
     let role = interaction.guild.roles.cache.get(config.apply.acceptedRole)
     member.roles.add(role.id)
    interaction.reply({embeds: [embed]})
    interaction.message.edit({components: []})
    await member.send({embeds: [new discord.MessageEmbed().setDescription(`تم قبولك ك اداري في سيرفر: ${interaction.guild.name}`)]})
  },
};
