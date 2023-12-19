import { dirname } from 'path';
import path from 'path'
import { fileURLToPath } from 'url';
import fs from 'fs'
import importFile from './import.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commands = []

const foldersPath = path.join(__dirname, 'plugins');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = await importFile(filePath)
    if ('head' in command && 'body' in command) {
      commands.push(command);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "head" or "body" property.`);
    }

  }
}

export default commands
