import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileUp, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function CustomPrint() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [material, setMaterial] = useState("");
  const [color, setColor] = useState("#0088ff");
  const [infill, setInfill] = useState([20]);
  const [quantity, setQuantity] = useState(1);
  const [delivery, setDelivery] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 50 * 1024 * 1024; // 50MB
      const allowedFormats = ['.stl', '.step', '.obj'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

      if (file.size > maxSize) {
        toast.error("File size exceeds 50MB limit");
        return;
      }

      if (!allowedFormats.includes(fileExtension)) {
        toast.error("Invalid file format. Please upload STL, STEP, or OBJ files");
        return;
      }

      setUploadedFile(file);
      toast.success("File uploaded successfully!");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedFile || !material || !delivery) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Order submitted! Awaiting price estimate from owner.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 space-y-4">
            <h1 className="text-5xl font-bold text-gradient">Custom Print Order</h1>
            <p className="text-xl text-muted-foreground">Upload your 3D model and customize printing parameters</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* File Upload */}
            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold mb-6">Upload Your Design</h2>
              <div className="space-y-4">
                <Label>3D Model File (STL, STEP, OBJ)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    accept=".stl,.step,.obj"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {uploadedFile ? (
                    <div className="space-y-4">
                      <CheckCircle className="mx-auto h-16 w-16 text-primary" />
                      <div>
                        <p className="font-bold text-lg">{uploadedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <Button type="button" variant="outline" size="sm">Change File</Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="mx-auto h-16 w-16 text-muted-foreground" />
                      <div>
                        <p className="text-lg font-medium">Drag & drop your file here</p>
                        <p className="text-sm text-muted-foreground mt-2">or click to browse</p>
                        <p className="text-xs text-muted-foreground mt-2">Max file size: 50MB</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Printing Parameters */}
            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold mb-6">Printing Parameters</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="material">Material *</Label>
                  <Select value={material} onValueChange={setMaterial}>
                    <SelectTrigger id="material" className="bg-input">
                      <SelectValue placeholder="Select material" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pla">PLA (Biodegradable, Easy)</SelectItem>
                      <SelectItem value="petg">PETG (Strong, Flexible)</SelectItem>
                      <SelectItem value="abs">ABS (Durable, Heat-resistant)</SelectItem>
                      <SelectItem value="tpu">TPU (Flexible, Rubber-like)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Filament Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="color"
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-20 h-10 cursor-pointer"
                    />
                    <Input value={color} readOnly className="bg-input flex-1" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Infill Density: {infill[0]}%</Label>
                  <Slider
                    value={infill}
                    onValueChange={setInfill}
                    max={100}
                    step={5}
                    className="py-4"
                  />
                  <p className="text-xs text-muted-foreground">
                    Higher infill = stronger but longer print time
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max="100"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="bg-input"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="delivery">Delivery Option *</Label>
                  <Select value={delivery} onValueChange={setDelivery}>
                    <SelectTrigger id="delivery" className="bg-input">
                      <SelectValue placeholder="Select delivery speed" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard (5-7 days)</SelectItem>
                      <SelectItem value="express">Express (2-3 days) - +$10</SelectItem>
                      <SelectItem value="rush">Rush (24 hours) - +$25</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Submit */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" size="lg">Save as Draft</Button>
              <Button type="submit" size="lg" className="glow-primary">
                Submit for Quote
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
