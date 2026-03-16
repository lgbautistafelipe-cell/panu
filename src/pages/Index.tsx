import { useState, useMemo, useEffect } from "react";
import { usePanuelos } from "@/hooks/use-panuelos";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";
import PanueloCard from "@/components/PanueloCard";
import PanueloModal from "@/components/PanueloModal";
import AboutModal from "@/components/AboutModal";
import AdminModal from "@/components/AdminModal";
import Footer from "@/components/Footer";

const ITEMS_PER_PAGE = 20;

function removeAccents(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const Index = () => {
  const { panuelos: allPanuelos, isLoading, error: dataError, source } = usePanuelos();
  const [zone, setZone] = useState("");
  const [district, setDistrict] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalIndex, setModalIndex] = useState(-1);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  const filtered = useMemo(() => {
    const s = removeAccents(search.toLowerCase().trim());
    return allPanuelos
      .filter((p) => {
        const zoneMatch = !zone || p.zoneNumber.toString() === zone;
        const districtMatch = !district || p.district.toString() === district;
        const searchMatch =
          !s ||
          removeAccents(p.groupName.toLowerCase()).includes(s) ||
          p.groupNumber.toString().includes(s);
        return zoneMatch && districtMatch && searchMatch;
      })
      .sort((a, b) => a.groupNumber - b.groupNumber);
  }, [zone, district, search, allPanuelos]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const pageItems = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // Reset page on filter change
  useEffect(() => setPage(1), [zone, district, search]);

  // Check hash for deep link
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("grupo=")) {
      const groupNum = parseInt(hash.split("=")[1]);
      const idx = filtered.findIndex((p) => p.groupNumber === groupNum);
      if (idx !== -1) setModalIndex(idx);
    }
  }, []);

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (modalIndex < 0) return;
      if (e.key === "Escape") setModalIndex(-1);
      if (e.key === "ArrowRight" && modalIndex < filtered.length - 1) setModalIndex((i) => i + 1);
      if (e.key === "ArrowLeft" && modalIndex > 0) setModalIndex((i) => i - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [modalIndex, filtered.length]);

  return (
    <div className="flex min-h-screen flex-col">
      <TopBar
        totalGroups={allPanuelos.length}
        onOpenAbout={() => setAboutOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
      />
      <Header />

      {/* Source indicator */}
      {!isLoading && (
        <div className="container pt-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-[10px] font-semibold text-muted-foreground">
            {source === "sheets" ? "📊 Google Sheets" : "💾 Datos locales"}
            {dataError && <span className="text-destructive"> • {dataError}</span>}
          </span>
        </div>
      )}

      <FilterBar
        panuelos={allPanuelos}
        zone={zone}
        district={district}
        search={search}
        onZoneChange={(v) => { setZone(v); setDistrict(""); }}
        onDistrictChange={setDistrict}
        onSearchChange={setSearch}
      />

      <main className="container flex-1 py-12">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-muted border-t-primary" />
            <p className="mt-4 text-sm font-semibold text-muted-foreground">Cargando pañuelos...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg font-semibold text-muted-foreground">Sin resultados</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {pageItems.map((p, i) => {
                const globalIdx = filtered.findIndex((f) => f.groupNumber === p.groupNumber);
                return (
                  <PanueloCard
                    key={p.groupNumber}
                    panuelo={p}
                    index={i}
                    onClick={() => setModalIndex(globalIdx)}
                  />
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
                {page > 1 && (
                  <button
                    onClick={() => { setPage(page - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="rounded-md border border-border bg-card px-3 py-2 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                  >
                    ← Anterior
                  </button>
                )}
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => { setPage(i + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className={`rounded-md px-3 py-2 text-sm font-semibold transition-all ${
                      page === i + 1
                        ? "bg-primary text-primary-foreground"
                        : "border border-border bg-card text-primary hover:bg-primary hover:text-primary-foreground"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                {page < totalPages && (
                  <button
                    onClick={() => { setPage(page + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="rounded-md border border-border bg-card px-3 py-2 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                  >
                    Siguiente →
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />

      <PanueloModal
        panuelos={filtered}
        currentIndex={modalIndex}
        isOpen={modalIndex >= 0}
        onClose={() => setModalIndex(-1)}
        onNavigate={setModalIndex}
      />
      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
      <AdminModal isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
    </div>
  );
};

export default Index;
