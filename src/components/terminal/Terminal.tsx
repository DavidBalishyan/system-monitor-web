import React, { useEffect, useRef, useState } from 'react';
import { useTerminalStore } from '../../store';
import { executeCommand } from '../../utils/commands';
import { useKeyboard } from '../../hooks/useKeyboard';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

const Prompt = () => (
    <span className="flex items-center gap-2 text-terminal-green font-bold shrink-0">
        <span>user@dashboard:~$</span>
    </span>
);

export const Terminal = () => {
    const { history, output, isFocused, setFocus } = useTerminalStore();
    const [localInput, setLocalInput] = useState('');
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useKeyboard(inputRef);

    // Auto-scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [output]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        executeCommand(localInput);
        setLocalInput('');
        setHistoryIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (history.length > 0) {
                const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
                setHistoryIndex(newIndex);
                setLocalInput(history[history.length - 1 - newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setLocalInput(history[history.length - 1 - newIndex]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setLocalInput('');
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            // Tab completion placeholder
        }
    };

    if (!useTerminalStore.getState()) return null; // Safety

    return (
        <div
            className={clsx(
                "flex flex-col h-full w-full bg-terminal-bg/90 backdrop-blur-md p-4 overflow-hidden border border-white/10 rounded-lg shadow-2xl transition-all duration-300",
                isFocused ? "ring-2 ring-terminal-blue/50" : "opacity-80 grayscale"
            )}
            onClick={() => {
                setFocus(true);
                inputRef.current?.focus();
            }}
        >
            <div className="flex-1 overflow-y-auto font-mono text-sm md:text-base space-y-1 custom-scrollbar pb-2">
                {output.map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.1 }}
                        className={clsx(
                            "break-words whitespace-pre-wrap",
                            line.type === 'command' && "text-white font-bold mt-2",
                            line.type === 'response' && "text-gray-300 pl-4 border-l-2 border-gray-700 ml-1",
                            line.type === 'error' && "text-terminal-red pl-4"
                        )}
                    >
                        {line.type === 'command' && <span className="text-terminal-green mr-2">$</span>}
                        {line.content}
                    </motion.div>
                ))}

                <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
                    <Prompt />
                    <input
                        ref={inputRef}
                        type="text"
                        value={localInput}
                        onChange={(e) => setLocalInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent border-none outline-none text-white caret-terminal-green"
                        autoFocus
                        spellCheck={false}
                        autoComplete="off"
                    />
                </form>
                <div ref={bottomRef} />
            </div>
        </div>
    );
};
