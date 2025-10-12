import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onImageSelect: (files: File[]) => void;
  selectedImages: File[];
  onClearImages: () => void;
  onRemoveImage: (index: number) => void;
}

export const ImageUploader = ({ onImageSelect, selectedImages, onClearImages, onRemoveImage }: ImageUploaderProps) => {
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
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      onImageSelect(imageFiles);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onImageSelect(Array.from(files));
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        {selectedImages.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                Selected Images ({selectedImages.length})
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={onClearImages}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square overflow-hidden rounded-lg border bg-muted">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Retinal image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => onRemoveImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="mt-1 text-xs text-center">
                    <p className="text-muted-foreground truncate">{image.name}</p>
                    <p className="text-muted-foreground">
                      {(image.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              ))}
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
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};