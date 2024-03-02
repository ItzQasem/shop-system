const config = require("../jsons/config.json");
module.exports = (express) => {
    const app = express()
    app.listen(config.port, () => console.log(`express is running on: http://localhost:${config.port}`));
    app.get("/", async (req, res) => {
        res.send(`Express Ready ${new Date}`)
    })

}