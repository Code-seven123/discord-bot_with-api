import {
  InteractionType,
  InteractionResponseType,
  MessageComponentTypes,
  ButtonStyleTypes,
} from 'discord-interactions';
import fetch from 'node-fetch'
import ytdl from 'youtube-dl'
import fs from 'fs'
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const fakeName = `${generateRandomNumber(1200000, 10000000)}.mp4`
const output = `../../temp/${fakeName}`
export default {
  type: 'yt_modal',
  head: {
    name: "yt",
    description: "testing bot",
    options: []
  },
  async body(msg, req, res) {
    if (msg.type === InteractionType.APPLICATION_COMMAND) {
      return res.send({
        type: InteractionResponseType.MODAL,
        data: {
          content: 'A message with a button',
          // Selects are inside of action rows
          custom_id: 'yt_modal',
          title: 'youtube_modal',
          components: [
            {
              // Text inputs must be inside of an action component
              type: MessageComponentTypes.ACTION_ROW,
              components: [
                {
                  // See https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-structure
                  type: MessageComponentTypes.INPUT_TEXT,
                  custom_id: 'url',
                  style: 1,
                  label: 'your URL video',
                },
              ],
            },
          ],
        },
      })
    }
    if (msg.type === InteractionType.MODAL_SUBMIT) {
      const modalId = msg.data.custom_id;
    // user ID of member who filled out modal
    const userId = req.body.member.user.id;

    if (modalId === 'yt_modal') {
      let modalValues = '';
      // Get value of text inputs
      for (let action of msg.data.components) {
        let inputComponent = action.components[0];
        modalValues = inputComponent.value;
      }
      console.log(modalValues)
      const data = await ytdl(modalValues)
      
      data.pipe(fs.createWriteStream(output, { flags: 'a' }))
      
      data.on('end', async () => {
       await ytdl.getInfo(modalValues, (err, info) => {
          const embed = {
             title: info.title,
 	     thumbnail: {
               url: info.thumbnail,
             },
             url: info.url
          }
          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `Your <@${userId}> video`,
              embeds: [embed],
              files: [{
                 attachment: output,
                 name: fakeName
              }]
            },
          });
        })
     })
    }
    }
  },
}
