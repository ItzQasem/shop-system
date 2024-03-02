const fs = require('fs');
module.exports = (client) => {
        const menusFiles = fs.readdirSync('./interactions/menus').filter((file) => file.endsWith('.js'));
        for(const file of menusFiles){
             const menus = require(`../interactions/menus/${file}`);
        if (menus.menu){
            client.menus.set(menus.menu, menus);
        } else {
            continue;
        }
    }   
}