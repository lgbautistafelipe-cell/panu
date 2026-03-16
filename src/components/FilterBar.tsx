import { useMemo } from "react";
import type { Panuelo } from "@/data/panuelos";

interface FilterBarProps {
  panuelos: Panuelo[];
  zone: string;
  district: string;
  search: string;
  onZoneChange: (v: string) => void;
  onDistrictChange: (v: string) => void;
  onSearchChange: (v: string) => void;
}

const FilterBar = ({
  panuelos,
  zone,
  district,
  search,
  onZoneChange,
  onDistrictChange,
  onSearchChange,
}: FilterBarProps) => {
  const zones = useMemo(
    () => [...new Set(panuelos.map((p) => p.zoneNumber))].sort((a, b) => a - b),
    [panuelos]
  );

  const districts = useMemo(() => {
    const source = zone
      ? panuelos.filter((p) => p.zoneNumber.toString() === zone)
      : panuelos;
    return [...new Set(source.map((p) => p.district.toString()))].sort();
  }, [panuelos, zone]);

  return (
    <nav className="border-b border-border bg-card py-4 shadow-sm">
      <div className="container">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Filtrar:
          </span>
          <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-[150px_140px_1fr]">
            <select
              value={zone}
              onChange={(e) => onZoneChange(e.target.value)}
              className="rounded-md border border-input bg-card px-3 py-2.5 text-sm text-foreground transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              <option value="">Todas las zonas</option>
              {zones.map((z) => (
                <option key={z} value={z}>Zona {z}</option>
              ))}
            </select>
            <select
              value={district}
              onChange={(e) => onDistrictChange(e.target.value)}
              className="rounded-md border border-input bg-card px-3 py-2.5 text-sm text-foreground transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              <option value="">Todos los distritos</option>
              {districts.map((d) => (
                <option key={d} value={d}>Distrito {d}</option>
              ))}
            </select>
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar por nombre o número..."
              className="rounded-md border border-input bg-card px-3 py-2.5 text-sm text-foreground transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default FilterBar;
