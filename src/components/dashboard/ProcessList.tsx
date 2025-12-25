import { useSystemStore } from '../../store';
import { motion, AnimatePresence } from 'framer-motion';

export const ProcessList = () => {
    const processes = useSystemStore((state) => state.processes);

    return (
        <div className="bg-neutral-900/80 border border-white/10 rounded-lg overflow-hidden flex flex-col h-full">
            <div className="bg-white/5 p-2 px-4 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Processes</h3>
                <span className="text-[10px] bg-terminal-blue/20 text-terminal-blue px-2 py-0.5 rounded">
                    {processes.length} Active
                </span>
            </div>

            <div className="overflow-auto custom-scrollbar flex-1 p-2">
                <table className="w-full text-left border-collapse text-xs font-mono">
                    <thead>
                        <tr className="text-gray-500 border-b border-white/5">
                            <th className="p-2">PID</th>
                            <th className="p-2">USER</th>
                            <th className="p-2">CPU%</th>
                            <th className="p-2">MEM%</th>
                            <th className="p-2">COMMAND</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                            {processes.map((p) => (
                                <motion.tr
                                    key={p.pid}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                                >
                                    <td className="p-2 text-terminal-yellow">{p.pid}</td>
                                    <td className="p-2 text-gray-400">{p.user}</td>
                                    <td className="p-2 text-termina-green">{p.cpu.toFixed(1)}</td>
                                    <td className="p-2 text-gray-400">{p.mem.toFixed(1)}</td>
                                    <td className="p-2 text-white font-bold">{p.name}</td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
