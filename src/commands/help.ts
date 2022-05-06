import { CustomCommand } from "../types/CustomCommand"
import { CommandInteraction, MessageActionRow } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import helpMenu from "../menus/helpMenu";
import { CustomClient } from "../classes/CustomClient";

const execute = async (interaction:CommandInteraction) => {
    const row = new MessageActionRow()
        .addComponents(helpMenu.getMenu(interaction.client as CustomClient))
        
    await interaction.reply({content: 'Select a command', components: [row] })
}

const help: CustomCommand = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get learned on'),
    enabled: false,
    execute
}

export default help