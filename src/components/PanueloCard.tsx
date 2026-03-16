import { motion } from "framer-motion";
import type { Panuelo } from "@/data/panuelos";

interface PanueloCardProps {
  panuelo: Panuelo;
  index: number;
  onClick: () => void;
}

const PanueloCard = ({ panuelo, index, onClick }: PanueloCardProps) => {
  const imgSrc = panuelo.images?.[0] || panuelo.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-t-[3px] hover:border-t-accent hover:shadow-lg"
    >
      <div className="h-56 overflow-hidden bg-muted">
        <img
          src={imgSrc}
          alt={panuelo.groupName}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='280' height='220'%3E%3Crect fill='%23e0e0e0' width='280' height='220'/%3E%3Ctext x='140' y='110' text-anchor='middle' fill='%23999' font-size='14'%3ESin imagen%3C/text%3E%3C/svg%3E";
          }}
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 text-lg font-bold text-primary">
          {panuelo.groupName}
        </h3>
        <div className="mb-3 flex flex-col gap-1 text-sm text-muted-foreground">
          <span>
            <strong className="text-foreground">Grupo:</strong> #{panuelo.groupNumber}
          </span>
          <span>
            <strong className="text-foreground">Zona:</strong> {panuelo.zoneNumber}
          </span>
        </div>
        <span className="mt-auto inline-block self-start rounded bg-gradient-gold px-3 py-1.5 text-xs font-bold text-accent-foreground">
          Distrito {panuelo.district}
        </span>
      </div>
    </motion.div>
  );
};

export default PanueloCard;
