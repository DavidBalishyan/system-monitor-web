import { create } from 'zustand';

export interface TerminalState {
    history: string[];
    output: { type: 'command' | 'response' | 'error'; content: string }[];
    currentInput: string;
    isFocused: boolean;
    addHistory: (command: string) => void;
    addOutput: (type: 'command' | 'response' | 'error', content: string) => void;
    setInput: (input: string) => void;
    setFocus: (focused: boolean) => void;
    clearOutput: () => void;
}

export interface SystemState {
    cpu: number;
    ram: number;
    disk: number;
    processes: { pid: number; name: string; cpu: number; mem: number; user: string }[];
    updateStats: () => void;
}

export interface UIState {
    theme: 'dark' | 'light';
    activePanels: string[];
    isTerminalOpen: boolean;
    setTheme: (theme: 'dark' | 'light') => void;
    togglePanel: (panel: string) => void;
    toggleTerminal: () => void;
}

// Placeholder for now, we will split if needed
export const useTerminalStore = create<TerminalState>((set) => ({
    history: [],
    output: [{ type: 'response', content: 'Welcome to Terminal Dashboard v1.0.0. Type "help" to start.' }],
    currentInput: '',
    isFocused: true,
    addHistory: (cmd) => set((state) => ({ history: [...state.history, cmd] })),
    addOutput: (type, content) => set((state) => ({ output: [...state.output, { type, content }] })),
    setInput: (input) => set({ currentInput: input }),
    setFocus: (focused) => set({ isFocused: focused }),
    clearOutput: () => set({ output: [] }),
}));

export const useUIStore = create<UIState>((set) => ({
    theme: 'dark',
    activePanels: ['stats', 'processes'],
    isTerminalOpen: true,
    setTheme: (theme) => {
        document.documentElement.classList.remove('dark', 'light');
        document.documentElement.classList.add(theme);
        set({ theme });
    },
    togglePanel: (panel) => set((state) => ({
        activePanels: state.activePanels.includes(panel)
            ? state.activePanels.filter((p) => p !== panel)
            : [...state.activePanels, panel]
    })),
    toggleTerminal: () => set((state) => ({ isTerminalOpen: !state.isTerminalOpen })),
}));

const COMMAND_NAMES = ['node', 'grep', 'python', 'docker', 'vim', 'code', 'htop', 'curl', 'git'];
const USERS = ['root', 'user', 'system'];

export const useSystemStore = create<SystemState>((set) => ({
    cpu: 0,
    ram: 0,
    disk: 45,
    processes: Array.from({ length: 10 }).map((_, i) => ({
        pid: 1000 + i,
        name: COMMAND_NAMES[Math.floor(Math.random() * COMMAND_NAMES.length)],
        cpu: Math.floor(Math.random() * 50),
        mem: Math.floor(Math.random() * 100),
        user: USERS[Math.floor(Math.random() * USERS.length)]
    })),
    updateStats: () => set((state) => ({
        cpu: Math.min(100, Math.max(0, state.cpu + (Math.random() * 10 - 5))),
        ram: Math.min(100, Math.max(0, state.ram + (Math.random() * 10 - 5))),
        processes: state.processes.map(p => ({
            ...p,
            cpu: Math.max(0, Math.min(100, p.cpu + (Math.random() * 5 - 2.5))),
            mem: Math.max(0, Math.min(100, p.mem + (Math.random() * 5 - 2.5))),
        }))
    })),
}));
