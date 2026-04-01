import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function OrderSuccess() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container flex-1 flex flex-col items-center justify-center py-16 text-center">
        <CheckCircle className="h-16 w-16 text-primary mb-6" />
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          Thank you for your order!
        </h1>
        <p className="text-muted-foreground max-w-md mb-8">
          Your print order has been received. You'll receive a confirmation email
          from Stripe shortly with your order details.
        </p>
        <Button asChild className="rounded-full">
          <Link to="/gallery">Continue Browsing</Link>
        </Button>
      </div>
      <Footer />
    </div>
  );
}
