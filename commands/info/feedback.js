const {Client, Message, MessageEmbed, Permissions} = require('discord.js');
const config = require("../../jsons/config.json");
const {Database, JSONDriver} =  require("st.db")
const database = new Database({driver: new JSONDriver(`./database`)})
 module.exports = {
    name: "تقيم",
    /**
     * @param {Client} client 
     * @param {Message} message
     */
    async execute(client, message) {
        if(!message.guild || message.author.bot)return;
        let args = message.content.split(' ')
        const channel = message.guild.channels.cache.get(config.feedbackChannel)
        let feedback = args.slice(2).join(" ")
        let member;
if(message.mentions.users.size > 0){
    member = message.mentions.users.first()
} else {
  const userId = message.content.split(' ')[1]
  if(userId){
    member = await client.users.fetch(userId).catch(() => "no one");
  }
if(!member) {
    return message.reply(`**عذرا لم اعثر على هذا الشخص**`);
  }
}
        if(member.id === message.author.id) return message.reply("مش فارغلك يله منا");
        if(member.bot) return message.reply(`الفد باك مو للبوتات عزيزي 😏`);
        let points = await database.get(`feedback_points_${member.id}`) ?? 0
        if(!member || !feedback) return message.reply(`الاستخدام: ${config.prefix}تقيم \`@Mention او ايدي  \` رأيك`)
        let embed = new MessageEmbed()
        .setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})})
        .setTitle(`${member.username}, feedback`)
        .setColor(config.embedcolor)
        .setThumbnail(message.member.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        .setDescription(`**${feedback}**`)
        .setFooter({text: member.username, iconURL: member.displayAvatarURL({dynamic: true})})
       await channel.send({content: `${message.author} شكرا لاعطاء رأيك الى ${member} 💛`,embeds: [embed]})
        if(!points){
            database.set(`feedback_points_${member.id}`, 1)
        } else {
            database.add(`feedback_points_${member.id}`, 1)
        }
    },
};