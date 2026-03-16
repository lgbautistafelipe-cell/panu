import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminModal = ({ isOpen, onClose }: AdminModalProps) => (
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

          <h2 className="mb-4 text-2xl font-black text-primary">⚙️ Panel Administrativo</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Accede a las herramientas de gestión de pañuelos scouts:
          </p>
          <div className="grid grid-cols-2 gap-3">
            <a
              href="#"
              className="rounded-lg bg-primary px-4 py-3 text-center text-sm font-bold text-primary-foreground transition-all hover:opacity-90"
            >
              🔐 Panel Admin
            </a>
            <a
              href="https://forms.gle/LINK"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border bg-muted px-4 py-3 text-center text-sm font-bold text-secondary-foreground transition-all hover:bg-border"
            >
              📋 Formulario
            </a>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default AdminModal;
