import {
  InteractionType,
  InteractionResponseType,
  MessageComponentTypes,
  ButtonStyleTypes,
} from 'discord-interactions';

export default {
  head: {
    name: "testbot",
    description: "testing bot",
    options: []
  },
  async body(msg, req, res) {
    if (msg.type === InteractionType.APPLICATION_COMMAND) {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: 'Server Aktif',
          // Buttons are inside of action rows
          components: [{
            type: MessageComponentTypes.ACTION_ROW,
            components: [{
              type: MessageComponentTypes.BUTTON,
              // Value for your app to identify the button
              custom_id: 'my_button',
              label: 'time',
              style: ButtonStyleTypes.PRIMARY,
            },
            ],
          },
          ],
        }})
    }
    console.log(msg.type === InteractionType.MESSAGE_COMPONENT)
    if (msg.type == InteractionType.MESSAGE_COMPONENT) {
      const componentId = msg.data.custom_id;
      const userId = req.body.member.user.id;
      if (componentId === 'my_button') {
        console.log(req.body);
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `MASIH DIBUAT`
          }
        })
      }
    }
  }
}
