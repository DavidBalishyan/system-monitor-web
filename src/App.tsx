import { Layout } from './components/layout/Layout';
import { Terminal } from './components/terminal/Terminal';
import { Dashboard } from './components/dashboard/Dashboard';
import { useUIStore } from './store';
import { useEffect } from 'react';

function App() {
  const { theme } = useUIStore();

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  // Prevent default context menu for "hacker" feel
  useEffect(() => {
    const handleContext = (e: MouseEvent) => e.preventDefault();
    window.addEventListener('contextmenu', handleContext);
    return () => window.removeEventListener('contextmenu', handleContext);
  }, []);

  return (
    <Layout
      terminal={<Terminal />}
      dashboard={<Dashboard />}
    />
  );
}

export default App;
