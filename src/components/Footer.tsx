import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-3">
              Celia Makes Art
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Original watercolour & palette paintings to bring warmth and character to your home.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Explore</h4>
            <div className="space-y-2">
              <Link to="/gallery" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Gallery</Link>
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Get in Touch</h4>
            <p className="text-sm text-muted-foreground">
              Interested in a commission or have questions about prints?
            </p>
            <Link to="/contact" className="inline-block mt-2 text-sm text-primary font-medium hover:underline">
              Send a message →
            </Link>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Celia Makes Art. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
