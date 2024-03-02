const { Client, Message, Permissions, MessageEmbed } = require("discord.js");
const config = require("../../jsons/config.json");

let colors = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];

module.exports = {
  name: "color",
  aliases: ["لون"],
  /**
   * @param {Client} client
   * @param {Message} message
   */
  async execute(client, message) {
      if(!message.guild || message.author.bot)return;
    let args = message.content.split(" ");

    if (args.length !== 2 || !colors.includes(args[1])) {
      return message.reply({ content: "يرجى ادخال رقم من 1 الى 20" });
    }

    let roleColor = message.guild.roles.cache.find((r) => r.name === args[1]);

    if (!roleColor) {
      return message.reply("عذرا هذا اللون غير موجود في السيرفر");
    }

    // Check if the member already has a color role
    const memberColorRole = message.member.roles.cache.filter((r) => colors.includes(r.name));

    // Remove the existing color role if one exists
    if (memberColorRole) {
      await message.member.roles.remove(memberColorRole);
    }

    // Add the new color role
     await message.member.roles.add(roleColor);
     const embed = new MessageEmbed()
      .setTitle(`Color has been changed successfully to ${roleColor.name}.`)
      .setColor(config.embedcolor)
      .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))
    message.reply({embeds: [embed]});
  },
};
