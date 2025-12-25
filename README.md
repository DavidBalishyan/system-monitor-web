# System Monitor Dashboard 🖥️_

A retro-futuristic terminal dashboard web application built with **React** and **TypeScript**. This project simulates a system monitoring interface with a "hacker" aesthetic, featuring a functional terminal emulator, real-time system statistics, and dynamic process tracking.

## 🚀 Features

- **Interactive Terminal Emulator**: A command-line interface where you can type commands, view history, and receive outputs. Type `help` to see what you can do!
- **Real-time System Monitoring**: Visualizes simulated CPU, RAM, and Disk usage with dynamic updates.
- **Process Manager**: detailed list of active "processes" with fluctuating resource consumption.
- **Customizable Layout**: Toggle visibility of different dashboard panels and the terminal window itself.
- **Theming**: Switch between Dark 🌙 and Light ☀️ modes (though we all know a real hacker uses dark mode).
- **Immersive Experience**: Context menu disabled for a more authentic app-like feel.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 📦 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd system-monitor-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open in Browser**
   Navigate to `http://localhost:5173` to view the dashboard.

## 🎮 Usage

Once the application is running, you can interact with the dashboard:

- **Terminal**: Click on the terminal area to focus. Type commands like `help`, `clear`, or others to interact.
- **Panels**: Use the UI controls (if available) or terminal commands to toggle the `stats` and `processes` panels.
- **Theme**: Toggle the theme to fit your environment.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
