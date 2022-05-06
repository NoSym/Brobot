import { ButtonInteraction, MessageButton } from "discord.js"
import { Button } from "../types/Button"

const name = 'sampleButton'
const button = new MessageButton()
    .setCustomId(name)
    .setLabel('Sample')
    .setStyle('PRIMARY')
const handleClick = async (interaction: ButtonInteraction) => {
    await interaction.update({ components: []})

    await interaction.channel?.send(`You clicked ${name}`)
}

const sampleButton: Button = {
    name,
    button,
    handleClick
}

export default sampleButton