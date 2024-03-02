const {Client, Message, MessageEmbed, Permissions} = require('discord.js');
const config = require("../../jsons/config.json");
const {Database, JSONDriver} =  require("st.db")
const database = new Database({driver: new JSONDriver(`./database`)})

 module.exports = {
    name: "نقاط",
    /**
     * @param {Client} client 
     * @param {Message} message
     */
    async execute(client, message) {
        if(!message.guild || message.author.bot)return;
        let args = message.content.split(' ')
      
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
    
        let points = await database.get(`feedback_points_${member.id}`) ?? 0
        let points2 = await database.get(`claim_points_${member.id}`) ?? 0
        let points3 = await database.get(`messages_points_${member.id}`) ?? 0

        let embed = new MessageEmbed()
        .setAuthor({name: member.username, iconURL: member.displayAvatarURL({dynamic: true})})
        .setDescription(`${member}\n الارأء: ${points} نقطة\n تذاكر:${points2} نقطة\n تفاعل: ${points3} نقطة\n الكل: ${points1 + points2 + points3}`)
        .setColor(config.embedcolor)
        message.reply({embeds: [embed]})
    }
}