import { Link } from "react-router-dom";
import type { Artwork } from "@/lib/artworks";
import { getImageUrl } from "@/lib/artworks";

interface Props {
  artwork: Artwork;
}

export default function ArtworkCard({ artwork }: Props) {
  const mediumLabel = artwork.medium === "watercolour" ? "Watercolour" : "Palette Painting";

  return (
    <Link
      to={`/artwork/${artwork.id}`}
      className="group block overflow-hidden rounded-lg bg-card border border-border hover:shadow-lg transition-all duration-300"
    >
      <div className="aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={getImageUrl(artwork.image_path)}
          alt={artwork.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors">
          {artwork.title}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          {mediumLabel} · {artwork.theme}
          {artwork.series && ` · ${artwork.series}`}
        </p>
        {artwork.print_price && (
          <p className="text-sm font-medium text-primary mt-2">
            Prints from £{artwork.print_price}
          </p>
        )}
      </div>
    </Link>
  );
}
