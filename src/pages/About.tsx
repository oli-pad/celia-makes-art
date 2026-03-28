import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="container py-16 md:py-24 max-w-3xl">
        <p className="text-sm font-medium tracking-widest uppercase text-primary mb-2">
          About
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">
          The Story Behind the Art
        </h1>

        <div className="prose prose-lg text-muted-foreground leading-relaxed space-y-6">
          <p>
            Hi, I'm Celia — a painter working across two beautiful mediums: the translucent fluidity 
            of watercolour and the rich, tactile depth of acrylic palette painting.
          </p>
          <p>
            My work is inspired by the things that make a house feel like a home — the bowl of lemons 
            on the kitchen counter, a glass of wine catching the evening light, fresh flowers in a 
            favourite vase. I believe art should feel as comfortable and inviting as the space it lives in.
          </p>
          <p>
            Each piece is organised by theme and series, making it easy to find art that speaks to your 
            space. Whether you're drawn to the delicate washes of watercolour or the bold texture of 
            palette work, there's something here for you.
          </p>

          <h2 className="font-display text-2xl font-bold text-foreground !mt-12">
            Prints & Originals
          </h2>
          <p>
            Every artwork in the gallery is available as a high-quality giclée print, professionally 
            produced on archival paper. Select originals are also available for purchase — look for the 
            "Original Available" tag on individual pieces.
          </p>

          <h2 className="font-display text-2xl font-bold text-foreground !mt-12">
            Commissions
          </h2>
          <p>
            Want something made just for you? I'd love to create a bespoke piece tailored to your 
            home and taste. Get in touch to discuss your ideas.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/gallery">
              Explore the Gallery <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8">
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
