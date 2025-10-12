import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ImageUploader } from "@/components/ImageUploader";
import { AnalysisResults } from "@/components/AnalysisResults";
import { Eye } from "lucide-react";
import { toast } from "sonner";

interface Finding {
  condition: string;
  confidence: number;
  severity: "normal" | "mild" | "moderate" | "severe";
  description: string;
}

interface ImageAnalysis {
  file: File;
  findings: Finding[];
  overallRisk: "low" | "medium" | "high";
  metrics: {
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
  };
  isAnalyzing: boolean;
  analysisComplete: boolean;
}

interface BatchImageAnalysisProps {
  onUseSample: () => void;
}

export const BatchImageAnalysis = ({ onUseSample }: BatchImageAnalysisProps) => {
  const [imageAnalyses, setImageAnalyses] = useState<ImageAnalysis[]>([]);

  const handleImageSelect = (files: File[]) => {
    const newAnalyses: ImageAnalysis[] = files.map(file => ({
      file,
      findings: [],
      overallRisk: "low" as const,
      metrics: {
        accuracy: 0,
        precision: 0,
        recall: 0,
        f1Score: 0
      },
      isAnalyzing: false,
      analysisComplete: false
    }));
    setImageAnalyses(prev => [...prev, ...newAnalyses]);
    toast.success(`${files.length} image${files.length > 1 ? 's' : ''} uploaded successfully!`);
  };

  const handleClearImages = () => {
    setImageAnalyses([]);
  };

  const handleRemoveImage = (index: number) => {
    setImageAnalyses(prev => prev.filter((_, i) => i !== index));
  };

  const handleAnalyze = async () => {
    if (imageAnalyses.length === 0) return;

    // Mark all images as analyzing
    setImageAnalyses(prev => prev.map(analysis => ({
      ...analysis,
      isAnalyzing: true
    })));

    toast.info(`Analyzing ${imageAnalyses.length} image${imageAnalyses.length > 1 ? 's' : ''}...`);

    // Analyze each image with a delay
    for (let i = 0; i < imageAnalyses.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate varied mock results for each image
      const variance = Math.random() * 20 - 10; // -10 to +10
      const mockFindings: Finding[] = [
        {
          condition: "Diabetic Retinopathy",
          confidence: Math.max(0, Math.min(100, 85 + variance)),
          severity: variance > 5 ? "moderate" : variance > -5 ? "mild" : "normal",
          description: "Signs of diabetic retinopathy detected. Monitoring recommended."
        },
        {
          condition: "Macular Degeneration",
          confidence: Math.max(0, Math.min(100, 12 + variance)),
          severity: "normal",
          description: "No significant signs of age-related macular degeneration observed."
        },
        {
          condition: "Glaucoma",
          confidence: Math.max(0, Math.min(100, 8 + variance)),
          severity: "normal",
          description: "Optic nerve appears healthy with no signs of glaucomatous damage."
        },
        {
          condition: "Hypertensive Retinopathy",
          confidence: Math.max(0, Math.min(100, 23 + variance)),
          severity: "normal",
          description: "Blood vessels appear normal with no signs of hypertensive changes."
        }
      ];

      const overallRisk: "low" | "medium" | "high" = 
        variance > 8 ? "high" : variance > 0 ? "medium" : "low";

      setImageAnalyses(prev => prev.map((analysis, idx) => 
        idx === i ? {
          ...analysis,
          findings: mockFindings,
          overallRisk,
          metrics: {
            accuracy: Math.max(85, Math.min(98, 94.5 + variance * 0.3)),
            precision: Math.max(85, Math.min(98, 92.3 + variance * 0.3)),
            recall: Math.max(85, Math.min(98, 89.7 + variance * 0.3)),
            f1Score: Math.max(85, Math.min(98, 90.9 + variance * 0.3))
          },
          isAnalyzing: false,
          analysisComplete: true
        } : analysis
      ));
    }

    toast.success("Batch analysis completed!");
  };

  const hasUnanalyzedImages = imageAnalyses.some(a => !a.analysisComplete);
  const isAnyAnalyzing = imageAnalyses.some(a => a.isAnalyzing);
  const hasCompletedAnalyses = imageAnalyses.some(a => a.analysisComplete);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column - Image Upload */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Upload Multiple Images</h3>
          <p className="text-muted-foreground">
            Upload multiple retinal fundus photographs for bulk AI analysis.
          </p>
        </div>
        
        <ImageUploader
          onImageSelect={handleImageSelect}
          selectedImages={imageAnalyses.map(a => a.file)}
          onClearImages={handleClearImages}
          onRemoveImage={handleRemoveImage}
        />

        {imageAnalyses.length === 0 && (
          <Card className="bg-muted/30">
            <CardContent className="pt-4">
              <div className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  Don't have retinal images? Try our sample
                </p>
                <Button variant="outline" onClick={onUseSample}>
                  Use Sample Image
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {imageAnalyses.length > 0 && hasUnanalyzedImages && (
          <Button 
            onClick={handleAnalyze} 
            disabled={isAnyAnalyzing}
            className="w-full"
            size="lg"
          >
            {isAnyAnalyzing 
              ? `Analyzing ${imageAnalyses.filter(a => a.isAnalyzing).length} of ${imageAnalyses.length}...` 
              : `Analyze ${imageAnalyses.filter(a => !a.analysisComplete).length} Image${imageAnalyses.filter(a => !a.analysisComplete).length > 1 ? 's' : ''}`
            }
          </Button>
        )}
      </div>

      {/* Right Column - Results */}
      <div className="space-y-6">
        {hasCompletedAnalyses && (
          <>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Batch Analysis Results ({imageAnalyses.filter(a => a.analysisComplete).length}/{imageAnalyses.length})
              </h3>
              <p className="text-muted-foreground">
                AI-powered detection of retinal conditions and abnormalities.
              </p>
            </div>
            
            {imageAnalyses.map((analysis, index) => (
              analysis.analysisComplete && (
                <div key={index} className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="aspect-square w-16 h-16 overflow-hidden rounded border">
                      <img
                        src={URL.createObjectURL(analysis.file)}
                        alt={`Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{analysis.file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Image {index + 1} of {imageAnalyses.length}
                      </p>
                    </div>
                  </div>
                  <AnalysisResults
                    findings={analysis.findings}
                    overallRisk={analysis.overallRisk}
                    isAnalyzing={analysis.isAnalyzing}
                    metrics={analysis.metrics}
                  />
                </div>
              )
            ))}
          </>
        )}

        {imageAnalyses.length === 0 && (
          <Card className="h-full flex items-center justify-center bg-muted/20">
            <CardContent className="text-center py-12">
              <Eye className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                Upload images to begin batch analysis
              </h3>
              <p className="text-sm text-muted-foreground">
                Results will appear here after image processing
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
