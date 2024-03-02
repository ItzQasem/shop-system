const {Client, Message, MessageEmbed, Permissions} = require('discord.js');

module.exports = {
    name: "ping",
    aliases: ["pin", "بنق"],
    permissions:[Permissions.FLAGS.SEND_MESSAGES],
    cooldown: 3000,
    /**
     * @param {Client} client 
     * @param {Message} message
     */
    async execute(client, message) {
        const embed  = new MessageEmbed()
        .setAuthor(message.member.user.username,message.member.user.displayAvatarURL({dynamic: true}))
        .setDescription(`** - Bot api latencey is: ${client.ws.ping}ms**`)
        .setColor(`DARK_GREEN`)
        .setTimestamp()
        .setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}));
        message.reply({embeds: [embed]});
    },
};