import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchArtworks, fetchFilters } from "@/lib/artworks";
import ArtworkCard from "@/components/ArtworkCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const MEDIUM_LABELS: Record<string, string> = {
  watercolour: "Watercolour",
  palette_painting: "Palette Painting",
};

export default function Gallery() {
  const [medium, setMedium] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  const [series, setSeries] = useState<string>("");

  const { data: filters } = useQuery({
    queryKey: ["artwork-filters"],
    queryFn: fetchFilters,
  });

  const { data: artworks, isLoading } = useQuery({
    queryKey: ["artworks", medium, theme, series],
    queryFn: () =>
      fetchArtworks({
        medium: medium || undefined,
        theme: theme || undefined,
        series: series || undefined,
      }),
  });

  const activeFilters = [medium, theme, series].filter(Boolean).length;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="container py-10 md:py-16">
        <div className="mb-10">
          <p className="text-sm font-medium tracking-widest uppercase text-primary mb-2">
            Browse
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            The Gallery
          </h1>
        </div>

        {/* Filters */}
        {filters && (
          <div className="flex flex-wrap gap-3 mb-8">
            {/* Medium filter */}
            <select
              value={medium}
              onChange={(e) => setMedium(e.target.value)}
              className="rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="">All Mediums</option>
              {filters.mediums.map((m) => (
                <option key={m} value={m}>
                  {MEDIUM_LABELS[m] || m}
                </option>
              ))}
            </select>

            {/* Theme filter */}
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="">All Themes</option>
              {filters.themes.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>

            {/* Series filter */}
            {filters.series.length > 0 && (
              <select
                value={series}
                onChange={(e) => setSeries(e.target.value)}
                className="rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="">All Series</option>
                {filters.series.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            )}

            {activeFilters > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full text-muted-foreground"
                onClick={() => {
                  setMedium("");
                  setTheme("");
                  setSeries("");
                }}
              >
                Clear filters
              </Button>
            )}
          </div>
        )}

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        ) : artworks && artworks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {artworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-2xl border border-border">
            <p className="text-muted-foreground text-lg">
              No artworks found{activeFilters > 0 ? " with these filters" : ""}.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
