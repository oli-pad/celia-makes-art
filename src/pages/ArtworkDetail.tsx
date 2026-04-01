import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { fetchArtwork, getImageUrl } from "@/lib/artworks";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

const MEDIUM_LABELS: Record<string, string> = {
  watercolour: "Watercolour",
  palette_painting: "Palette Painting",
};

export default function ArtworkDetail() {
  const { id } = useParams<{ id: string }>();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const { data: artwork, isLoading, error } = useQuery({
    queryKey: ["artwork", id],
    queryFn: () => fetchArtwork(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container py-16 flex-1">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="aspect-[4/5] rounded-lg bg-muted animate-pulse" />
            <div className="space-y-4">
              <div className="h-8 w-2/3 bg-muted rounded animate-pulse" />
              <div className="h-4 w-1/3 bg-muted rounded animate-pulse" />
              <div className="h-20 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !artwork) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container py-16 flex-1 text-center">
          <p className="text-muted-foreground text-lg">Artwork not found.</p>
          <Button asChild variant="outline" className="mt-4 rounded-full">
            <Link to="/gallery">Back to Gallery</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="container py-10 md:py-16">
        <Link
          to="/gallery"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Gallery
        </Link>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Image */}
          <div className="rounded-lg overflow-hidden bg-muted border border-border">
            <img
              src={getImageUrl(artwork.image_path)}
              alt={artwork.title}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <p className="text-sm font-medium tracking-widest uppercase text-primary mb-2">
              {MEDIUM_LABELS[artwork.medium] || artwork.medium}
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {artwork.title}
            </h1>
            <p className="text-muted-foreground text-sm mt-2">
              {artwork.theme}
              {artwork.series && ` · ${artwork.series}`}
              {artwork.year_created && ` · ${artwork.year_created}`}
            </p>

            {artwork.description && (
              <p className="mt-6 text-muted-foreground leading-relaxed">
                {artwork.description}
              </p>
            )}

            {(artwork.width_cm && artwork.height_cm) && (
              <p className="mt-4 text-sm text-muted-foreground">
                Dimensions: {artwork.width_cm} × {artwork.height_cm} cm
              </p>
            )}

            <div className="mt-8 space-y-4 border-t border-border pt-8">
              {artwork.print_available && artwork.print_price && (
                <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                  <div>
                    <p className="font-medium text-foreground">Print</p>
                    <p className="text-sm text-muted-foreground">High-quality giclée print</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-lg font-semibold text-foreground">
                      £{artwork.print_price}
                    </p>
                    <Button
                      size="sm"
                      className="mt-2 rounded-full"
                      disabled={checkoutLoading}
                      onClick={async () => {
                        setCheckoutLoading(true);
                        try {
                          const { data, error } = await supabase.functions.invoke("create-checkout", {
                            body: {
                              artworkId: artwork.id,
                              artworkTitle: artwork.title,
                              printPrice: artwork.print_price,
                              imageUrl: getImageUrl(artwork.image_path),
                            },
                          });
                          if (error) throw error;
                          if (data?.url) {
                            window.open(data.url, "_blank");
                          }
                        } catch (e: any) {
                          toast.error("Could not start checkout. Please try again.");
                          console.error(e);
                        } finally {
                          setCheckoutLoading(false);
                        }
                      }}
                    >
                      {checkoutLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Order Print"}
                    </Button>
                  </div>
                </div>
              )}

              {artwork.is_original_available && artwork.original_price && (
                <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                  <div>
                    <p className="font-medium text-foreground">Original</p>
                    <p className="text-sm text-muted-foreground">One-of-a-kind artwork</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-lg font-semibold text-foreground">
                      £{artwork.original_price}
                    </p>
                    <Button size="sm" variant="outline" className="mt-2 rounded-full">
                      Enquire
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
