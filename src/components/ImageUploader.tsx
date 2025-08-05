import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  selectedImage: File | null;
  onClearImage: () => void;
}

export const ImageUploader = ({ onImageSelect, selectedImage, onClearImage }: ImageUploaderProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      onImageSelect(imageFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        {selectedImage ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Selected Image</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={onClearImage}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
            <div className="aspect-square w-full max-w-md mx-auto overflow-hidden rounded-lg border bg-muted">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected retinal image"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm font-medium text-foreground">{selectedImage.name}</p>
              <p className="text-xs text-muted-foreground">
                {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
        ) : (
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
              isDragOver 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/50 hover:bg-primary/5"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-primary/10">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">Upload Retinal Image</h3>
                <p className="text-sm text-muted-foreground">
                  Drag and drop your retinal image here, or click to select
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports JPG, PNG files up to 10MB
                </p>
              </div>
              <Button variant="outline" className="mt-4">
                <ImageIcon className="h-4 w-4 mr-2" />
                Select Image
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};