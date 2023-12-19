import axios from 'axios'
import express from 'express'
import config from './config.js'
import commands from './plugins.js'
import {
  InteractionType, 
  InteractionResponseType, 
  verifyKeyMiddleware 
  
} from 'discord-interactions'
const app = express()



const discord_api = axios.create({
  baseURL: 'https://discord.com/api',
  headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "Authorization",
        "Authorization": `Bot ${config.TOKEN}`
  }
});
app.post('/interactions', verifyKeyMiddleware(config.PUBLIC_KEY), async (req, res) => {
  const msg = req.body
  console.log(msg.type)
  for (const command of commands) {
    if (msg.data.name === command.head.name || msg.type === command.type) {
       const plant = await command.body(msg, req, res);
       return plant
    }
  }
})

app.get('/regis', async (req,res) =>{
  try {
    const head = []
    for(const command of commands){
      head.push(command.head)
    }
    let response = await discord_api.put(
      `/applications/${config.APPLICATION_ID}/guilds/${config.GUILD_ID}/commands`,
      head
    )
    console.log(response.data)
    return res.send(`commands have been registered || ${head.length}`)
  } catch(e){
    console.error(e.code)
    console.error(e.response?.data)
    return res.send(`${e} error from discord`)
  }
})

app.get("/", function (request, response) {
    response.send('Server starting');
});

let listener = app.listen(process.env.PORT || 3000, async () => {
    console.log("Your app is listening on port " + listener.address().port);
})