import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Package, DollarSign, Clock, TrendingUp, Send } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function OwnerDashboard() {
  const [quotePrice, setQuotePrice] = useState("");
  const [quoteMessage, setQuoteMessage] = useState("");

  const stats = [
    { label: "Active Orders", value: "12", icon: Package, color: "text-primary" },
    { label: "Revenue (Month)", value: "$2,450", icon: DollarSign, color: "text-accent" },
    { label: "Avg. Completion", value: "3.5 days", icon: Clock, color: "text-primary" },
    { label: "Growth", value: "+18%", icon: TrendingUp, color: "text-accent" },
  ];

  const newOrders = [
    {
      id: "ORD-006",
      customer: "Alex Johnson",
      modelName: "Custom Bracket",
      material: "ABS",
      infill: "30%",
      quantity: 5,
      orderDate: "2025-01-05",
      estimatedHours: 8,
    },
    {
      id: "ORD-007",
      customer: "Sarah Williams",
      modelName: "Decorative Panel",
      material: "PLA",
      infill: "20%",
      quantity: 1,
      orderDate: "2025-01-05",
      estimatedHours: 6,
    },
  ];

  const handleSendQuote = () => {
    if (!quotePrice) {
      toast.error("Please enter a quote price");
      return;
    }
    toast.success("Quote sent to customer!");
    setQuotePrice("");
    setQuoteMessage("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8 space-y-4">
          <h1 className="text-5xl font-bold text-gradient">Owner Dashboard</h1>
          <p className="text-xl text-muted-foreground">Manage orders and grow your 3D printing business</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="glass-effect p-6 hover:glow-primary transition-all duration-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <Icon className={`h-10 w-10 ${stat.color}`} />
                </div>
              </Card>
            );
          })}
        </div>

        {/* New Orders Queue */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">New Order Requests</h2>
          {newOrders.map((order) => (
            <Card key={order.id} className="glass-effect p-6 hover:glow-primary transition-all duration-500">
              <div className="grid md:grid-cols-[1fr,auto] gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold">{order.modelName}</h3>
                    <Badge variant="default">New</Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <p><span className="text-muted-foreground">Customer:</span> <span className="font-medium">{order.customer}</span></p>
                      <p><span className="text-muted-foreground">Order ID:</span> <span className="font-medium">{order.id}</span></p>
                      <p><span className="text-muted-foreground">Order Date:</span> <span className="font-medium">{order.orderDate}</span></p>
                    </div>
                    <div className="space-y-2">
                      <p><span className="text-muted-foreground">Material:</span> <span className="font-medium">{order.material}</span></p>
                      <p><span className="text-muted-foreground">Infill:</span> <span className="font-medium">{order.infill}</span></p>
                      <p><span className="text-muted-foreground">Quantity:</span> <span className="font-medium">{order.quantity}</span></p>
                      <p><span className="text-muted-foreground">Est. Print Time:</span> <span className="font-medium">{order.estimatedHours}h</span></p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="glow-primary gap-2">
                        <DollarSign className="h-4 w-4" />
                        Send Quote
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="glass-effect">
                      <DialogHeader>
                        <DialogTitle>Send Price Quote</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="price">Quote Price ($)</Label>
                          <Input
                            id="price"
                            type="number"
                            placeholder="45.00"
                            value={quotePrice}
                            onChange={(e) => setQuotePrice(e.target.value)}
                            className="bg-input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message">Message to Customer (Optional)</Label>
                          <Textarea
                            id="message"
                            placeholder="Estimated completion time, special notes..."
                            value={quoteMessage}
                            onChange={(e) => setQuoteMessage(e.target.value)}
                            className="bg-input min-h-[100px]"
                          />
                        </div>
                        <Button onClick={handleSendQuote} className="w-full gap-2">
                          <Send className="h-4 w-4" />
                          Send Quote
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button variant="outline">View Details</Button>
                  <Button variant="outline">Message Customer</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
