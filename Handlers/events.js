const fs = require("fs");
const eventsSize = [];
const wait = require("node:timers/promises").setTimeout;
module.exports = (client) => {
  const eventFiles = fs
    .readdirSync(`./Events`)
    .filter((file) => file.endsWith(".js"));
  for (const file of eventFiles) {
    const event = require(`../Events/${file}`);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(client, ...args));
      eventsSize.push(event.length)
    } else {
      client.on(event.name, (...args) => event.execute(client, ...args));
      eventsSize.push(event.length);
      continue;
    }
}
    wait(2000).then(() => console.log(`there are ${eventsSize.length} event(s) are working ...`));
    
};
