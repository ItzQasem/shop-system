const fs = require('fs');
module.exports = (client) => {
        const buttonFiles = fs.readdirSync('./interactions/buttons').filter((file) => file.endsWith('.js'));
        for(const file of buttonFiles){
             const buttons = require(`../interactions/buttons/${file}`);
        if (buttons.btn){
            client.buttons.set(buttons.btn, buttons);
        } else {
            continue;
        }
    }   
}