import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, Share2 } from "lucide-react";
import type { Panuelo } from "@/data/panuelos";

interface PanueloModalProps {
  panuelos: Panuelo[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const PanueloModal = ({ panuelos, currentIndex, isOpen, onClose, onNavigate }: PanueloModalProps) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const panuelo = panuelos[currentIndex];
  if (!panuelo) return null;

  const images = panuelo.images?.length ? panuelo.images : [panuelo.image];

  const shareUrl = `${window.location.origin}/#grupo=${panuelo.groupNumber}`;
  const shareText = `Mira este pañuelo scout 🏕️\nGrupo: ${panuelo.groupName}`;

  const share = (type: string) => {
    const encoded = encodeURIComponent(shareText + "\n" + shareUrl);
    const urls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encoded}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    };
    window.open(urls[type], "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-foreground/70 p-4 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="relative grid max-h-[90vh] w-full max-w-5xl grid-cols-1 overflow-hidden rounded-xl bg-card shadow-2xl md:grid-cols-2"
          >
            {/* Breadcrumbs */}
            <div className="col-span-full flex items-center gap-2 border-b border-border bg-muted px-6 py-3 text-xs text-muted-foreground">
              <span>Inicio</span>
              <span>›</span>
              <span>Zona {panuelo.zoneNumber}</span>
              <span>›</span>
              <span className="font-semibold text-primary">{panuelo.groupName}</span>
            </div>

            {/* Left - Info */}
            <div className="overflow-y-auto border-r border-border p-6 md:p-8">
              <h2 className="mb-5 text-2xl font-black text-primary">{panuelo.groupName}</h2>

              <div className="mb-6 grid grid-cols-3 gap-3">
                {[
                  { label: "Grupo #", value: panuelo.groupNumber },
                  { label: "Zona #", value: panuelo.zoneNumber },
                  { label: "Distrito", value: panuelo.district },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg border-l-4 border-l-accent bg-muted p-3">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </span>
                    <span className="text-xl font-black text-primary">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-5">
                <div>
                  <h3 className="mb-2 border-b-2 border-accent pb-2 text-sm font-bold text-foreground">
                    ✨ Significado del Pañuelo
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {panuelo.meaning || "Sin descripción"}
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 border-b-2 border-accent pb-2 text-sm font-bold text-foreground">
                    📖 Historia del Grupo
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {panuelo.history || "Sin descripción"}
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Image */}
            <div className="relative flex flex-col bg-gradient-scout">
              <div className="relative flex flex-1 items-center justify-center p-4">
                <img
                  src={images[imageIndex]}
                  alt={panuelo.groupName}
                  className={`max-h-[50vh] max-w-[90%] object-contain transition-transform ${zoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"}`}
                  onClick={() => setZoomed(!zoomed)}
                />

                {/* Share buttons */}
                <div className="absolute right-3 top-3 flex gap-2">
                  {["whatsapp", "facebook", "twitter"].map((s) => (
                    <button
                      key={s}
                      onClick={() => share(s)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/20 text-sm text-primary-foreground transition-all hover:bg-primary-foreground/40 hover:scale-110"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  ))}
                </div>

                {/* Gallery navigation */}
                {images.length > 1 && (
                  <>
                    {imageIndex > 0 && (
                      <button
                        onClick={() => setImageIndex((i) => i - 1)}
                        className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary-foreground/20 text-primary-foreground transition-all hover:bg-primary-foreground/40"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                    )}
                    {imageIndex < images.length - 1 && (
                      <button
                        onClick={() => setImageIndex((i) => i + 1)}
                        className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary-foreground/20 text-primary-foreground transition-all hover:bg-primary-foreground/40"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    )}
                  </>
                )}

                {/* Close */}
                <button
                  onClick={onClose}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-card text-foreground shadow-md transition-all hover:rotate-90 md:right-auto md:left-3"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto bg-foreground/50 p-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setImageIndex(idx)}
                      className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                        idx === imageIndex ? "border-accent shadow-glow" : "border-transparent"
                      }`}
                    >
                      <img src={img} alt={`Foto ${idx + 1}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation bar */}
            <div className="col-span-full flex items-center justify-between bg-muted px-6 py-3">
              <button
                onClick={() => { setImageIndex(0); onNavigate(currentIndex - 1); }}
                disabled={currentIndex === 0}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-scout text-primary-foreground transition-all hover:scale-110 hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-sm font-semibold text-muted-foreground">
                {currentIndex + 1} de {panuelos.length}
              </span>
              <button
                onClick={() => { setImageIndex(0); onNavigate(currentIndex + 1); }}
                disabled={currentIndex === panuelos.length - 1}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-scout text-primary-foreground transition-all hover:scale-110 hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PanueloModal;
