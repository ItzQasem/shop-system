const {Client, Message, MessageEmbed, Permissions} = require('discord.js');
const config = require("../../jsons/config.json");
const {Database, JSONDriver} =  require("st.db")
const database = new Database({driver: new JSONDriver(`./database`)})
 module.exports = {
    name: "ازالة-نقاط",
    permission: [Permissions.FLAGS.ADMINISTRATOR],
    /**
     * @param {Client} client 
     * @param {Message} message
     */
    async execute(client, message) {
        if(!message.guild || message.author.bot)return;
        let args = message.content.split(' ')[2]
        if(!args || isNaN(args) && args != "all")  return message.reply("يجب وضع عدد صحيح");
      
        let member;
if(message.mentions.users.size > 0){
    member = message.mentions.users.first()
} else {
  const userId = message.content.split(' ')[1]
  if(userId){
    member = await client.users.fetch(userId).catch(() => "no one");
  }else {
    member = message.author
  }
if(!member) {
    return message.reply(`**عذرا لم اعثر على هذا الشخص 🙄**`);
  }
}
        
        let points = await database.get(`feedback_points_${member.id}`);

        if(points == null)return message.reply(`العضو ليس لديه نقاط تقييم!`)
        if(args > points)return message.reply(`ليس لديه هذا العدد من النقاط`);
        
        const calucate = points - args;
        
        let embed = new MessageEmbed()
        .setAuthor({name: member.username, iconURL: member.displayAvatarURL({dynamic: true})})
        .setDescription(`${member} تم حذف: ${args} نقطة`)
        .setColor(config.embedcolor)
        if(args == "all"){
            database.set(`feedback_points_${member.id}`, 0)
            return message.reply({embeds: [embed.setDescription(`تم ازاله كل النقاط (${points}) من ${member}`)]})
       }
       if(points) database.set(`feedback_points_${member.id}`, calucate)
        message.reply({embeds: [embed]})
    },
};