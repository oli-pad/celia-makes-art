-- Create enum for art mediums
CREATE TYPE public.art_medium AS ENUM ('watercolour', 'palette_painting');

-- Create artworks table
CREATE TABLE public.artworks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  medium art_medium NOT NULL,
  theme TEXT NOT NULL,
  series TEXT,
  width_cm NUMERIC,
  height_cm NUMERIC,
  year_created INTEGER,
  is_original_available BOOLEAN DEFAULT false,
  original_price NUMERIC,
  print_price NUMERIC,
  print_available BOOLEAN DEFAULT true,
  image_path TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.artworks ENABLE ROW LEVEL SECURITY;

-- Public read access for artworks
CREATE POLICY "Artworks are viewable by everyone"
ON public.artworks FOR SELECT
TO anon, authenticated
USING (true);

-- Create storage bucket for artwork images
INSERT INTO storage.buckets (id, name, public)
VALUES ('artworks', 'artworks', true);

-- Public read access for artwork images
CREATE POLICY "Artwork images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'artworks');

-- Authenticated users can upload artwork images (admin use)
CREATE POLICY "Authenticated users can upload artwork images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'artworks');

CREATE POLICY "Authenticated users can update artwork images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'artworks');

CREATE POLICY "Authenticated users can delete artwork images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'artworks');

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_artworks_updated_at
  BEFORE UPDATE ON public.artworks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();