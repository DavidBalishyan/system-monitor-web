import { useEffect } from 'react';
import { useSystemStore, useUIStore } from '../../store';
import { StatPanel } from './StatPanel';
import { ProcessList } from './ProcessList';
import { motion, AnimatePresence } from 'framer-motion';

export const Dashboard = () => {
    const { cpu, ram, disk, updateStats } = useSystemStore();
    const { activePanels } = useUIStore();

    useEffect(() => {
        const interval = setInterval(updateStats, 2000);
        return () => clearInterval(interval);
    }, [updateStats]);

    return (
        <div className="h-full flex flex-col gap-4 p-4 overflow-hidden">
            <AnimatePresence>
                {activePanels.includes('stats') && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0"
                    >
                        <StatPanel title="CPU Usage" value={cpu} color="green" />
                        <StatPanel title="Memory" value={ram} color="blue" />
                        <StatPanel title="Disk Space" value={disk} color="yellow" />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {activePanels.includes('processes') && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex-1 min-h-0"
                    >
                        <ProcessList />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
