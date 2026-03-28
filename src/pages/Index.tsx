import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchArtworks } from "@/lib/artworks";
import ArtworkCard from "@/components/ArtworkCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Index() {
  const { data: featured, isLoading } = useQuery({
    queryKey: ["artworks", "featured"],
    queryFn: () => fetchArtworks(),
  });

  const featuredArtworks = featured?.filter((a) => a.featured) ?? [];
  const displayArtworks = featuredArtworks.length > 0 ? featuredArtworks : (featured?.slice(0, 6) ?? []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container py-20 md:py-32 flex flex-col items-center text-center">
          <p className="text-sm font-medium tracking-widest uppercase text-primary mb-4">
            Original Art for Your Home
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight max-w-3xl">
            Celia Makes Art
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
            Watercolours and palette paintings inspired by everyday beauty — made to bring warmth and joy to your walls.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/gallery">
                Browse the Gallery
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link to="/contact">Commission a Piece</Link>
            </Button>
          </div>
        </div>

        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
      </section>

      {/* Featured Artworks */}
      <section className="container py-16 md:py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-medium tracking-widest uppercase text-primary mb-2">
              The Collection
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {featuredArtworks.length > 0 ? "Featured Works" : "Recent Works"}
            </h2>
          </div>
          <Link
            to="/gallery"
            className="hidden md:inline-flex text-sm font-medium text-primary hover:underline items-center gap-1"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        ) : displayArtworks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayArtworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-2xl border border-border">
            <p className="text-muted-foreground text-lg">
              The collection is being prepared — check back soon!
            </p>
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/gallery">View all works</Link>
          </Button>
        </div>
      </section>

      {/* About Snippet */}
      <section className="bg-card border-y border-border">
        <div className="container py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <p className="text-sm font-medium tracking-widest uppercase text-primary mb-2">
              The Artist
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Hi, I'm Celia
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              I create art that celebrates the warmth and beauty of everyday moments — from kitchen still lifes 
              to vibrant fruit arrangements. Working in both delicate watercolours and bold, textural palette 
              paintings, every piece is made to feel at home on your wall.
            </p>
            <Button asChild variant="link" className="px-0 text-primary">
              <Link to="/about">
                Learn more about my process <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="flex-1 aspect-square max-w-sm rounded-2xl bg-muted border border-border flex items-center justify-center">
            <p className="text-muted-foreground text-sm">Artist photo</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
