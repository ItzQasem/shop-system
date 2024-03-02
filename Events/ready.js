const {Client} = require("discord.js");
const {Database, JSONDriver} =  require("st.db")
const database = new Database({driver: new JSONDriver(`./database`)})
  module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Client} client
     */
    async execute(client) {
      return new Promise((resolve, reject) => {
        try {
          console.log(client.user.username, "Ready!");
          client.user.setPresence({activities: [{name: "Source v13", type: "WATCHING"}], status: "idle" })
          resolve(client)
            client.users.cache.forEach(user => {
              setInterval(async() => {
              let points = await database.get(`message_points_${user.id}`)
                  if(points){
                    if(points >= 200){
                      database.add(`messages_points_${user.id}`, 1)
                      database.delete(`message_points_${user.id}`)
                    }
                }
              }, 1000)
            })
        
        } catch(error){
          reject(error);
        }
      })
    }
  };
  