import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal = ({ isOpen, onClose }: AboutModalProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[2000] flex items-center justify-center bg-foreground/60 p-5 backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.95, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: -20 }}
          className="relative w-full max-w-lg rounded-xl bg-card p-10 shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-muted transition-all hover:rotate-90"
          >
            <X className="h-4 w-4" />
          </button>

          <h2 className="mb-4 text-2xl font-black text-primary">📖 Quiénes Somos</h2>
          <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
            Somos el Movimiento Scout de Argentina, una organización educativa sin fines de lucro dedicada a formar ciudadanos responsables a través de actividades y valores scout.
          </p>
          <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
            Los pañuelos de nuestros grupos representan la identidad y el espíritu de cada comunidad scout. Cada color, símbolo y diseño cuenta una historia única.
          </p>

          <h3 className="mb-3 text-lg font-bold text-primary">Nuestros Valores</h3>
          <ul className="space-y-2">
            {[
              { icon: "🤝", title: "Lealtad", desc: "Compromiso con nuestros ideales" },
              { icon: "👥", title: "Cooperación", desc: "Trabajo en equipo" },
              { icon: "🌍", title: "Respeto", desc: "Por la naturaleza y las personas" },
              { icon: "⭐", title: "Excelencia", desc: "Superación continua" },
            ].map((v) => (
              <li key={v.title} className="flex items-center gap-3 rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                <span className="text-lg">{v.icon}</span>
                <span>
                  <strong className="text-primary">{v.title}</strong> — {v.desc}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default AboutModal;
