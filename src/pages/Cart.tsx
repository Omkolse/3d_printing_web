import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Minus } from "lucide-react";
import { useState } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Dragon Sculpture",
      material: "PLA",
      color: "Blue",
      quantity: 1,
      price: 45.00,
    },
    {
      id: 2,
      name: "Phone Stand",
      material: "PETG",
      color: "Black",
      quantity: 2,
      price: 25.00,
    },
  ]);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 10.00;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gradient mb-8">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <Card className="glass-effect p-12 text-center">
              <p className="text-xl text-muted-foreground">Your cart is empty</p>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Cart Items */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="glass-effect p-6">
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 bg-secondary/50 rounded-lg flex items-center justify-center text-4xl">
                        🖨️
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <h3 className="text-xl font-bold">{item.name}</h3>
                        <div className="flex gap-2">
                          <Badge variant="outline">Material: {item.material}</Badge>
                          <Badge variant="outline">Color: {item.color}</Badge>
                        </div>
                        <p className="text-lg font-bold text-primary">${item.price.toFixed(2)} each</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-bold">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <Card className="glass-effect p-6">
                <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
                <Button className="w-full glow-primary" size="lg">
                  Proceed to Checkout
                </Button>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
