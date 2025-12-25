import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface StatPanelProps {
    title: string;
    value: number;
    color?: 'green' | 'blue' | 'yellow' | 'red';
    unit?: string;
}

export const StatPanel = ({ title, value, color = 'green', unit = '%' }: StatPanelProps) => {
    const getColor = () => {
        switch (color) {
            case 'green': return 'bg-terminal-green shadow-[0_0_10px_#00ff00]';
            case 'blue': return 'bg-terminal-blue shadow-[0_0_10px_#0066ff]';
            case 'yellow': return 'bg-terminal-yellow shadow-[0_0_10px_#ffff00]';
            case 'red': return 'bg-terminal-red shadow-[0_0_10px_#ff0000]';
            default: return 'bg-terminal-green';
        }
    };

    const getTextColor = () => {
        switch (color) {
            case 'green': return 'text-terminal-green';
            case 'blue': return 'text-terminal-blue';
            case 'yellow': return 'text-terminal-yellow';
            case 'red': return 'text-terminal-red';
            default: return 'text-terminal-green';
        }
    };

    return (
        <div className="bg-neutral-900/80 border border-white/10 p-4 rounded-lg flex flex-col gap-2">
            <div className="flex justify-between items-end">
                <h3 className="text-gray-400 font-bold uppercase text-xs tracking-wider">{title}</h3>
                <span className={clsx("font-mono text-xl font-bold", getTextColor())}>
                    {value.toFixed(1)}{unit}
                </span>
            </div>

            <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                    className={clsx("h-full rounded-full transition-all duration-500", getColor())}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
                />
            </div>

            <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>0{unit}</span>
                <span>50{unit}</span>
                <span>100{unit}</span>
            </div>
        </div>
    );
};
