import {
  InteractionType,
  InteractionResponseType,
  MessageComponentTypes,
  ButtonStyleTypes,
} from 'discord-interactions';
import fetch from 'node-fetch'
console.log(InteractionType)
console.log(InteractionResponseType)
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
        modalValues += `${inputComponent.custom_id}: ${inputComponent.value}\n`;
      }

      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `<@${userId}> typed the following (in a modal):\n\n${modalValues}`,
        },
      });
    }
    }
  },
}
