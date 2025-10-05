import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";

export default function Models() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "toys", "tools", "art", "home", "games", "accessories"];

  const models = [
    { id: 1, name: "Dragon Sculpture", category: "art", image: "🐉", description: "Detailed dragon model" },
    { id: 2, name: "Gear System", category: "tools", image: "⚙️", description: "Functional gear mechanism" },
    { id: 3, name: "Phone Stand", category: "accessories", image: "📱", description: "Adjustable phone holder" },
    { id: 4, name: "Chess Piece", category: "games", image: "♟️", description: "King chess piece" },
    { id: 5, name: "Vase Design", category: "home", image: "🏺", description: "Modern decorative vase" },
    { id: 6, name: "Robot Toy", category: "toys", image: "🤖", description: "Articulated robot figure" },
    { id: 7, name: "Tool Holder", category: "tools", image: "🔧", description: "Wall-mounted organizer" },
    { id: 8, name: "Plant Pot", category: "home", image: "🪴", description: "Geometric planter" },
    { id: 9, name: "Action Figure", category: "toys", image: "🦸", description: "Poseable character" },
    { id: 10, name: "Dice Set", category: "games", image: "🎲", description: "Polyhedral dice" },
    { id: 11, name: "Wall Art", category: "art", image: "🎨", description: "Abstract wall decoration" },
    { id: 12, name: "Cable Organizer", category: "accessories", image: "🔌", description: "Desktop cable manager" },
  ];

  const filteredModels = models.filter((model) => {
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || model.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8 space-y-6">
          <h1 className="text-5xl font-bold text-gradient">3D Model Library</h1>
          <p className="text-xl text-muted-foreground">Browse our collection of open-source 3D printable models</p>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className="cursor-pointer capitalize"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Models Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredModels.map((model) => (
            <Card key={model.id} className="glass-effect overflow-hidden group cursor-pointer hover:glow-primary transition-all duration-500">
              <div className="aspect-square bg-secondary/50 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-500">
                {model.image}
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-lg mb-1">{model.name}</h3>
                  <p className="text-sm text-muted-foreground">{model.description}</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="capitalize">{model.category}</Badge>
                </div>
                <Button className="w-full glow-primary">Print This Model</Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredModels.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No models found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
