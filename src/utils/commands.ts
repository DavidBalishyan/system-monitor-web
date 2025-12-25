import { useTerminalStore, useUIStore } from '../store';

export type CommandHandler = (args: string[]) => string | void;

export interface Command {
    name: string;
    description: string;
    usage: string;
    action: CommandHandler;
}

const commands: Command[] = [
    {
        name: 'help',
        description: 'List all available commands',
        usage: 'help',
        action: () => {
            const { addOutput } = useTerminalStore.getState();
            const helpText = commands.map(c => `  ${c.name.padEnd(12)} ${c.description}`).join('\n');
            addOutput('response', `Available commands:\n${helpText}`);
        }
    },
    {
        name: 'clear',
        description: 'Clear the terminal output',
        usage: 'clear',
        action: () => {
            useTerminalStore.getState().clearOutput();
        }
    },
    {
        name: 'theme',
        description: 'Set application theme',
        usage: 'theme <dark|light>',
        action: (args) => {
            const { addOutput } = useTerminalStore.getState();
            const theme = args[0];
            if (theme === 'dark' || theme === 'light') {
                useUIStore.getState().setTheme(theme);
                addOutput('response', `Theme set to ${theme}`);
            } else {
                addOutput('error', 'Usage: theme <dark|light>');
            }
        }
    },
    {
        name: 'open',
        description: 'Open a dashboard panel',
        usage: 'open <stats|processes|info>',
        action: (args) => {
            const { addOutput } = useTerminalStore.getState();
            const panel = args[0];
            const validPanels = ['stats', 'processes', 'info'];

            if (validPanels.includes(panel)) {
                useUIStore.getState().togglePanel(panel);
                addOutput('response', `Toggled panel: ${panel}`);
            } else {
                addOutput('error', `Unknown panel. Available: ${validPanels.join(', ')}`);
            }
        }
    },
    {
        name: 'stats',
        description: 'Toggle system stats panel',
        usage: 'stats',
        action: () => {
            useUIStore.getState().togglePanel('stats');
            useTerminalStore.getState().addOutput('response', 'Toggled stats panel');
        }
    },
    {
        name: 'processes',
        description: 'Show running processes panel',
        usage: 'processes',
        action: () => {
            useUIStore.getState().togglePanel('processes');
            useTerminalStore.getState().addOutput('response', 'Toggled processes panel');
        }
    },
    {
        name: 'about',
        description: 'Show project information',
        usage: 'about',
        action: () => {
            useTerminalStore.getState().addOutput('response',
                'Terminal Dashboard v1.0.0\n' +
                'Built with React, TypeScript, Tailwind, zustand and framer-motion.\n' +
                'Developed by David.'
            );
        }
    },
    {
        name: 'exit',
        description: 'Close the terminal session',
        usage: 'exit',
        action: () => {
            useUIStore.getState().toggleTerminal();
        }
    }
];

export const executeCommand = (input: string) => {
    const { addOutput, addHistory } = useTerminalStore.getState();

    const trimmed = input.trim();
    if (!trimmed) return;

    addHistory(trimmed);
    addOutput('command', trimmed);

    const [cmdName, ...args] = trimmed.split(/\s+/);
    const command = commands.find(c => c.name === cmdName);

    if (command) {
        command.action(args);
    } else {
        addOutput('error', `Command not found: ${cmdName}. Type "help" for a list of commands.`);
    }
};
