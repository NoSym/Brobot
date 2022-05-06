import { MessageEmbed, MessageSelectMenu, SelectMenuInteraction } from 'discord.js'
import fs from 'fs'
import { CustomClient } from '../classes/CustomClient'
import { SelectMenu } from '../types/SelectMenu'

const name = 'helpMenu'
const getMenu = (client: CustomClient) => {
    const menu = new MessageSelectMenu()
        .setCustomId(name)
        .setPlaceholder('Nothing selected')

    for (const command of client.commands) {
        const [key, value] = command
        const helpPath = `${__dirname}/../markdown/help/${key}.md`

        if (value.enabled && fs.existsSync(helpPath)) {
            menu.addOptions([
                {
                    label: key,
                    description: value.data.description,
                    value: key
                }
            ])
        }
    }

    return menu
}
const handleSelection = async (interaction: SelectMenuInteraction) => {
    const client = interaction.client as CustomClient
    const command = client.commands.get(interaction.values[0])

    if (!command) {
        interaction.reply('Command not found')
        return
    }
    
    const helpPath = `${__dirname}/../markdown/help/${command.data.name}.md`
    const helpText = fs.existsSync(helpPath) ? fs.readFileSync(helpPath, 'utf8') : 'There is no help to give...'

    const embeddedResponse = new MessageEmbed()
        .setTitle(command.data.name)
        .setDescription(helpText)

    interaction.reply({ embeds: [embeddedResponse] })
}

const helpMenu: SelectMenu = {
    name,
    getMenu,
    handleSelection
}

export default helpMenu