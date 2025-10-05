import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { FloatingCube } from "@/components/FloatingCube";
import { ArrowRight, Package, Zap, Shield, Upload } from "lucide-react";

const Index = () => {
  const featuredModels = [
    { id: 1, name: "Dragon Sculpture", category: "Art", image: "🐉" },
    { id: 2, name: "Gear System", category: "Tools", image: "⚙️" },
    { id: 3, name: "Phone Stand", category: "Accessories", image: "📱" },
    { id: 4, name: "Chess Piece", category: "Games", image: "♟️" },
    { id: 5, name: "Vase Design", category: "Home", image: "🏺" },
    { id: 6, name: "Robot Toy", category: "Toys", image: "🤖" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-in-up">
              <h1 className="text-6xl font-bold leading-tight">
                Bring Your Ideas to
                <span className="text-gradient block">Reality</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Professional 3D printing services for custom designs and open-source models. 
                Fast delivery, premium quality, competitive prices.
              </p>
              <div className="flex gap-4">
                <Link to="/custom-print">
                  <Button size="lg" className="gap-2 glow-primary">
                    Upload Design <Upload className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/models">
                  <Button size="lg" variant="outline" className="gap-2">
                    Browse Models <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative h-[500px] flex items-center justify-center">
              <FloatingCube size={250} className="floating-animation" />
              <div className="absolute top-10 right-10">
                <FloatingCube size={80} className="floating-animation" style={{ animationDelay: "1s" }} />
              </div>
              <div className="absolute bottom-10 left-10">
                <FloatingCube size={120} className="floating-animation" style={{ animationDelay: "2s" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-border/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Print3D Pro</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-effect p-8 hover:glow-primary transition-all duration-500">
              <Package className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-3">Premium Quality</h3>
              <p className="text-muted-foreground">
                Industrial-grade printers and materials for professional results every time.
              </p>
            </Card>

            <Card className="glass-effect p-8 hover:glow-accent transition-all duration-500">
              <Zap className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-3">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Multiple delivery options from standard to 24-hour rush printing.
              </p>
            </Card>

            <Card className="glass-effect p-8 hover:glow-primary transition-all duration-500">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-3">Quality Guarantee</h3>
              <p className="text-muted-foreground">
                100% satisfaction guarantee or we reprint your order for free.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Models Section */}
      <section className="py-20 border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold">Featured Models</h2>
            <Link to="/models">
              <Button variant="ghost" className="gap-2">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {featuredModels.map((model) => (
              <Card key={model.id} className="glass-effect overflow-hidden group cursor-pointer hover:glow-primary transition-all duration-500">
                <div className="aspect-square bg-secondary/50 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
                  {model.image}
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-1">{model.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{model.category}</p>
                  <Button size="sm" className="w-full">Print This</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border/30">
        <div className="container mx-auto px-4">
          <Card className="glass-effect p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-4xl font-bold">Ready to Start Printing?</h2>
              <p className="text-xl text-muted-foreground">
                Upload your custom design or choose from our library of open-source models.
              </p>
              <div className="flex gap-4 justify-center">
                <Link to="/custom-print">
                  <Button size="lg" className="glow-primary">Get Started</Button>
                </Link>
                <Link to="/auth">
                  <Button size="lg" variant="outline">Create Account</Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
