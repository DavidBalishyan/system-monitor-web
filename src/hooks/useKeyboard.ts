import { useEffect } from 'react';
import { useTerminalStore } from '../store';


export const useKeyboard = (inputRef: React.RefObject<HTMLInputElement | null>) => {
    const { isFocused, setFocus } = useTerminalStore();
    // Using a ref to track history index locally to avoid re-renders on every keypress just for navigation
    // But for simplicity/Zustand we might keep it simple.
    // Actually, for history navigation usually we need local state or store state for "historyIndex".

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setFocus(!isFocused);
            }

            if (e.key === 'l' && e.ctrlKey) {
                e.preventDefault();
                useTerminalStore.getState().clearOutput();
            }

            if (isFocused && inputRef.current) {
                inputRef.current.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFocused, inputRef, setFocus]);

    return {};
};
