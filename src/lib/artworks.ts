import { supabase } from "@/integrations/supabase/client";

export type Artwork = {
  id: string;
  title: string;
  description: string | null;
  medium: "watercolour" | "palette_painting";
  theme: string;
  series: string | null;
  width_cm: number | null;
  height_cm: number | null;
  year_created: number | null;
  is_original_available: boolean | null;
  original_price: number | null;
  print_price: number | null;
  print_available: boolean | null;
  image_path: string;
  display_order: number | null;
  featured: boolean | null;
  created_at: string;
};

export function getImageUrl(imagePath: string) {
  const { data } = supabase.storage.from("artworks").getPublicUrl(imagePath);
  return data.publicUrl;
}

export async function fetchArtworks(filters?: {
  medium?: string;
  theme?: string;
  series?: string;
}) {
  let query = supabase
    .from("artworks")
    .select("*")
    .order("display_order", { ascending: true });

  if (filters?.medium) {
    query = query.eq("medium", filters.medium as "watercolour" | "palette_painting");
  }
  if (filters?.theme) {
    query = query.eq("theme", filters.theme);
  }
  if (filters?.series) {
    query = query.eq("series", filters.series);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as Artwork[];
}

export async function fetchArtwork(id: string) {
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as Artwork;
}

export async function fetchFilters() {
  const { data, error } = await supabase
    .from("artworks")
    .select("medium, theme, series");
  if (error) throw error;

  const mediums = [...new Set(data.map((d) => d.medium))];
  const themes = [...new Set(data.map((d) => d.theme))];
  const seriesList = [...new Set(data.map((d) => d.series).filter(Boolean))] as string[];

  return { mediums, themes, series: seriesList };
}
