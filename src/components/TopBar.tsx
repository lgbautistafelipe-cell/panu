import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TopBarProps {
  totalGroups: number;
  onOpenAbout: () => void;
  onOpenAdmin: () => void;
}

const TopBar = ({ totalGroups, onOpenAbout, onOpenAdmin }: TopBarProps) => {
  const [count, setCount] = useState(0);
  const animated = useRef(false);

  useEffect(() => {
    if (animated.current || totalGroups === 0) return;
    animated.current = true;
    const increment = Math.ceil(totalGroups / 30);
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= totalGroups) {
        current = totalGroups;
        clearInterval(interval);
      }
      setCount(current);
    }, 30);
    return () => clearInterval(interval);
  }, [totalGroups]);

  return (
    <div className="sticky top-0 z-50 border-b border-border bg-card shadow-sm backdrop-blur-sm">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-2 text-sm font-bold text-primary">
          <span>📊</span>
          <span>Grupos:</span>
          <motion.span
            key={count}
            className="text-lg font-black text-accent"
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            {count}
          </motion.span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAbout}
            className="rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            📖 Quiénes Somos
          </button>
          <button
            onClick={onOpenAdmin}
            className="rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            ⚙️ Gestionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
