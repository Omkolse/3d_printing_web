import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Clock, CheckCircle, XCircle, MessageSquare } from "lucide-react";

export default function Dashboard() {
  const [userRole] = useState<"customer" | "owner">("customer");

  const customerOrders = [
    {
      id: "ORD-001",
      modelName: "Dragon Sculpture",
      status: "in_progress",
      orderDate: "2025-01-02",
      estimatedPrice: "$45.00",
      quantity: 1,
    },
    {
      id: "ORD-002",
      modelName: "Custom Gear System",
      status: "awaiting_quote",
      orderDate: "2025-01-03",
      estimatedPrice: "Pending",
      quantity: 2,
    },
    {
      id: "ORD-003",
      modelName: "Phone Stand",
      status: "completed",
      orderDate: "2024-12-28",
      estimatedPrice: "$25.00",
      quantity: 1,
    },
  ];

  const ownerOrders = [
    {
      id: "ORD-004",
      customer: "John Doe",
      modelName: "Tool Holder",
      status: "new",
      orderDate: "2025-01-04",
      material: "PLA",
      quantity: 3,
    },
    {
      id: "ORD-005",
      customer: "Jane Smith",
      modelName: "Custom Vase",
      status: "in_progress",
      orderDate: "2025-01-03",
      material: "PETG",
      quantity: 1,
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { label: "New Order", variant: "default" as const, icon: Package },
      awaiting_quote: { label: "Awaiting Quote", variant: "secondary" as const, icon: Clock },
      in_progress: { label: "In Progress", variant: "default" as const, icon: Package },
      completed: { label: "Completed", variant: "outline" as const, icon: CheckCircle },
      cancelled: { label: "Cancelled", variant: "destructive" as const, icon: XCircle },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8 space-y-4">
          <h1 className="text-5xl font-bold text-gradient">
            {userRole === "customer" ? "My Dashboard" : "Owner Dashboard"}
          </h1>
          <p className="text-xl text-muted-foreground">
            {userRole === "customer" 
              ? "Track your orders and manage your account" 
              : "Manage incoming orders and communicate with customers"}
          </p>
        </div>

        <Tabs defaultValue={userRole === "customer" ? "orders" : "queue"} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value={userRole === "customer" ? "orders" : "queue"}>
              {userRole === "customer" ? "My Orders" : "Order Queue"}
            </TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value={userRole === "customer" ? "orders" : "queue"} className="space-y-4">
            {userRole === "customer" ? (
              customerOrders.map((order) => (
                <Card key={order.id} className="glass-effect p-6 hover:glow-primary transition-all duration-500">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold">{order.modelName}</h3>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Order ID: {order.id}</p>
                        <p>Order Date: {order.orderDate}</p>
                        <p>Quantity: {order.quantity}</p>
                        <p className="text-lg font-bold text-primary">{order.estimatedPrice}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Message
                      </Button>
                      <Button size="sm">View Details</Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              ownerOrders.map((order) => (
                <Card key={order.id} className="glass-effect p-6 hover:glow-primary transition-all duration-500">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold">{order.modelName}</h3>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Customer: {order.customer}</p>
                        <p>Order ID: {order.id}</p>
                        <p>Material: {order.material} | Qty: {order.quantity}</p>
                        <p>Order Date: {order.orderDate}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Contact
                      </Button>
                      <Button size="sm">Send Quote</Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="profile">
            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Profile management features will be available here.</p>
                <p>This section will include:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Personal information update</li>
                  <li>Address management</li>
                  <li>Payment methods</li>
                  <li>Notification preferences</li>
                </ul>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
