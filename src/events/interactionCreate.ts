import { ButtonInteraction, CommandInteraction, DMChannel, Interaction, SelectMenuInteraction } from 'discord.js'
import { CustomClient } from '../classes/CustomClient';
import { DiscordEvent } from '../types/DiscordEvent'

const handleButton = async (interaction: ButtonInteraction) => {
    if (interaction.channel instanceof DMChannel || interaction.channel?.partial) return

    const client = interaction.client as CustomClient
    const button = client.buttons.get(interaction.customId)

    if (!button) return
    
    console.log(`${interaction.user.tag} in #${interaction.channel?.name} clicked ${button.name}`)

    try {
        await button.handleClick(interaction)
    } catch (error) {
        console.error(error)
        await interaction.reply({ content: 'There was an error while processing selection', ephemeral: true })
    }
}

const handleCommand = async (interaction: CommandInteraction) => {
    if (interaction.channel instanceof DMChannel || interaction.channel?.partial) return

    const client = interaction.client as CustomClient
    const command = client.commands.get(interaction.commandName)

    if (!command) return

    const optionMsg = `${interaction.options.data.length > 0 ? ' with options: '
        + JSON.stringify(interaction.options.data) : ''}`
    
    console.log(`${interaction.user.tag} in #${interaction.channel?.name} triggered ${command.data.name}${optionMsg}`)

    try {
        await command.execute(interaction)
    } catch (error) {
        console.error(error)
        await interaction.reply({ content: `There was an error while executing ${command.data.name}`, ephemeral: true })
    }
}

const handleSelectMenu = async (interaction: SelectMenuInteraction) => {
    if (interaction.channel instanceof DMChannel || interaction.channel?.partial) return

    const client = interaction.client as CustomClient
    const menu = client.menus.get(interaction.customId)

    if (!menu) return

    console.log(`${interaction.user.tag} in #${interaction.channel?.name} 
        selected ${interaction.values} in menu ${menu.name}`)

    try {
        await menu.handleSelection(interaction)
    } catch (error) {
        console.error(error)
        await interaction.reply({ content: 'There was an error while processing selection', ephemeral: true })
    }
}

const interactionCreate: DiscordEvent = {
    name: 'interactionCreate',
    once: false,
    async execute (interaction: Interaction) {
        if (interaction.channel instanceof DMChannel || interaction.channel?.partial) return

        if (interaction.isButton()) return handleButton(interaction)
        if (interaction.isCommand()) return handleCommand(interaction)
        if (interaction.isSelectMenu()) return handleSelectMenu(interaction)
    }
}

export default interactionCreate