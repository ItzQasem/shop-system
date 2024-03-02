const { Collection, Client, Message } = require('discord.js');
const config = require("../jsons/config.json")
const {Database, JSONDriver} =  require("st.db")
const database = new Database({driver: new JSONDriver(`./database`)})
module.exports = {
    name: 'messageCreate',
    on: true,
    /**
     * @param {Client} client 
     * @param {Message} message 
     */
    async execute(client, message) {
        if(!message.guild) return;
        let filter = message.member.roles.cache.filter(r => config.pointsUpRole.includes(r.id))
        if(!filter) return;
        if(!config.GeneralChannels.includes(message.channel.id)) return;
        if(message.author.bot) return;
        let messageFetch = await message.channel.messages.fetch(message.id)
        let messages = messageFetch.author.id
        try {
            if(messageFetch){
                let points = database.get(`message_points_${messages}`)
                if(!points){
                    database.set(`message_points_${messages}`, 1)
                } else {
                    database.add(`message_points_${messages}`, 1)
                }
            } 
        } catch (error) {
            console.log(error)
        }
    }
}