import type { ReactNode } from 'react';
import { Background } from './Background';
import { clsx } from 'clsx';
import { useUIStore } from '../../store';
import { motion } from 'framer-motion';

interface LayoutProps {
    terminal: ReactNode;
    dashboard: ReactNode;
}

export const Layout = ({ terminal, dashboard }: LayoutProps) => {
    const { isTerminalOpen } = useUIStore();

    return (
        <div className="relative h-screen w-screen overflow-hidden flex items-center justify-center p-4 md:p-8 bg-black">
            <Background />

            <div className="z-10 w-full h-full max-w-7xl mx-auto flex flex-col md:flex-row gap-6 relative">
                <motion.div
                    layout
                    className={clsx(
                        "flex-1 h-full min-w-0 transition-all duration-300",
                        isTerminalOpen ? "md:w-1/2" : "hidden"
                    )}
                >
                    {terminal}
                </motion.div>

                <motion.div
                    layout
                    className="flex-1 h-full min-w-0"
                >
                    {dashboard}
                </motion.div>
            </div>
        </div>
    );
};
