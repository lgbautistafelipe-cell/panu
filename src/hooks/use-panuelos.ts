import { useState, useEffect } from "react";
import type { Panuelo } from "@/data/panuelos";
import { panuelosData } from "@/data/panuelos";
import { fetchFromGoogleSheets, isSheetConfigured } from "@/lib/google-sheets";

interface UsePanuelosResult {
  panuelos: Panuelo[];
  isLoading: boolean;
  error: string | null;
  source: "sheets" | "local";
}

export function usePanuelos(): UsePanuelosResult {
  const [panuelos, setPanuelos] = useState<Panuelo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<"sheets" | "local">("local");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      // Si Google Sheets está configurado, intentar cargar de ahí
      if (isSheetConfigured()) {
        try {
          const data = await fetchFromGoogleSheets();
          if (!cancelled) {
            setPanuelos(data);
            setSource("sheets");
            setIsLoading(false);
            return;
          }
        } catch (err) {
          console.warn("No se pudo cargar de Google Sheets, usando datos locales:", err);
          if (!cancelled) {
            setError("Google Sheets no disponible, mostrando datos locales");
          }
        }
      }

      // Fallback a datos locales
      if (!cancelled) {
        setPanuelos(panuelosData);
        setSource("local");
        setIsLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { panuelos, isLoading, error, source };
}
