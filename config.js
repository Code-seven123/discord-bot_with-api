import 'dotenv/config'
const APPLICATION_ID = process.env.APPLICATION_ID 
const TOKEN = process.env.TOKEN 
const PUBLIC_KEY = process.env.PUBLIC_KEY || 'not set'
const GUILD_ID = process.env.GUILD_ID 

const config = {
  APPLICATION_ID,
  TOKEN,
  PUBLIC_KEY,
  GUILD_ID
}

export default config
