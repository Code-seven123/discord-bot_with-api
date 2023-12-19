import {
  InteractionType,
  InteractionResponseType,
  MessageComponentTypes,
  ButtonStyleTypes,
} from 'discord-interactions';
import fetch from 'node-fetch'
console.log(InteractionType)
export default {
  type: 'waifu_select',
  head: {
    name: "waifu",
    description: "testing bot",
    options: []
  },
  async body(msg, req, res) {
    if (msg.type === InteractionType.APPLICATION_COMMAND) {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: 'your waifu set category',
          // Selects are inside of action rows
          components: [{
            type: MessageComponentTypes.ACTION_ROW,
            components: [{
              type: MessageComponentTypes.STRING_SELECT,
              // Value for your app to identify the select menu interactions
              custom_id: 'waifu_select',
              // Select options - see https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-option-structure
              options: [{
                label: 'blush',
                value: 'option_1',
                description: 'blush',
              },
                {
                  label: 'neko',
                  value: 'option_2',
                  description: 'neko',
                },
                {
                  label: 'waifu',
                  value: 'option_3',
                  description: 'waifu',
                },
              ],
            },
            ],
          },
          ],
        },
      })
    }
    if (msg.type === InteractionType.MESSAGE_COMPONENT) {
      const componentId = msg.data.custom_id;
      const userId = req.body.member.user.id;
      if (componentId === 'waifu_select') {
        const selectedOption = msg.data.values[0];
        const draw = async (type) => {
          try {
            let res = await fetch(`https://api.waifu.pics/sfw/${type}`)

            let json = await res.json()

            let url = await json.url
            return url
          } catch (e) {
            console.error(e)
            return e
          }
        }

        if (selectedOption == 'option_1') {
          let embed = {
            image: {
              url: await draw('blush')
            }
          }
          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              embeds: [embed],
              components: [{
                  type: MessageComponentTypes.ACTION_ROW,
                  components: [{
                    type: MessageComponentTypes.BUTTON,
                    // Value for your app to identify the button
                    custom_id: 'id_blowjob',
                    label: 'next',
                    style: ButtonStyleTypes.PRIMARY,
                  }],
                }],
            }
          })
        } else if (selectedOption == 'option_2') {
          let embed = {
            image: {
              url: await draw('neko')
            }
          }
          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              embeds: [embed],
              components: [{
                  type: MessageComponentTypes.ACTION_ROW,
                  components: [{
                    type: MessageComponentTypes.BUTTON,
                    // Value for your app to identify the button
                    custom_id: 'id_blowjob',
                    label: 'next',
                    style: ButtonStyleTypes.PRIMARY,
                  }],
                }],
            }
          })
        } else if (selectedOption == 'option_3') {
          let embed = {
            image: {
              url: await draw('waifu')
            }
          }
          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              embeds: [embed],
              components: [{
                  type: MessageComponentTypes.ACTION_ROW,
                  components: [{
                    type: MessageComponentTypes.BUTTON,
                    // Value for your app to identify the button
                    custom_id: 'id_blowjob',
                    label: 'next',
                    style: ButtonStyleTypes.PRIMARY,
                  }],
                }],
            }
          })
        } else {
          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `${selectedOption} error`
            }
          })
        }
      }
    }
  },
}
