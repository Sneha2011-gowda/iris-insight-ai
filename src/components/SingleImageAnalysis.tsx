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

interface SingleImageAnalysisProps {
  onUseSample: () => void;
}

export const SingleImageAnalysis = ({ onUseSample }: SingleImageAnalysisProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [findings, setFindings] = useState<Finding[]>([]);
  const [overallRisk, setOverallRisk] = useState<"low" | "medium" | "high">("low");
  const [metrics, setMetrics] = useState<{
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
  } | null>(null);

  const handleImageSelect = (files: File[]) => {
    if (files.length > 0) {
      setSelectedImage(files[0]);
      setAnalysisComplete(false);
      toast.success("Image uploaded successfully!");
    }
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setAnalysisComplete(false);
    setFindings([]);
    setMetrics(null);
  };

  const handleRemoveImage = () => {
    handleClearImage();
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis with realistic delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock analysis results
    const mockFindings: Finding[] = [
      {
        condition: "Diabetic Retinopathy",
        confidence: 85,
        severity: "mild",
        description: "Mild signs of diabetic retinopathy detected. Early intervention and monitoring recommended."
      },
      {
        condition: "Macular Degeneration",
        confidence: 12,
        severity: "normal",
        description: "No significant signs of age-related macular degeneration observed."
      },
      {
        condition: "Glaucoma",
        confidence: 8,
        severity: "normal",
        description: "Optic nerve appears healthy with no signs of glaucomatous damage."
      },
      {
        condition: "Hypertensive Retinopathy",
        confidence: 23,
        severity: "normal",
        description: "Blood vessels appear normal with no signs of hypertensive changes."
      }
    ];

    setFindings(mockFindings);
    setOverallRisk("low");
    setMetrics({
      accuracy: 94.5,
      precision: 92.3,
      recall: 89.7,
      f1Score: 90.9
    });
    setIsAnalyzing(false);
    setAnalysisComplete(true);
    toast.success("Analysis completed!");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column - Image Upload */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Upload Retinal Image</h3>
          <p className="text-muted-foreground">
            Upload a high-quality retinal fundus photograph for AI analysis.
          </p>
        </div>
        
        <ImageUploader
          onImageSelect={handleImageSelect}
          selectedImages={selectedImage ? [selectedImage] : []}
          onClearImages={handleClearImage}
          onRemoveImage={handleRemoveImage}
        />

        {!selectedImage && (
          <Card className="bg-muted/30">
            <CardContent className="pt-4">
              <div className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  Don't have a retinal image? Try our sample
                </p>
                <Button variant="outline" onClick={onUseSample}>
                  Use Sample Image
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {selectedImage && !analysisComplete && (
          <Button 
            onClick={handleAnalyze} 
            disabled={isAnalyzing}
            className="w-full"
            size="lg"
          >
            {isAnalyzing ? "Analyzing..." : "Start AI Analysis"}
          </Button>
        )}
      </div>

      {/* Right Column - Results */}
      <div className="space-y-6">
        {(isAnalyzing || analysisComplete) && (
          <>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Analysis Results</h3>
              <p className="text-muted-foreground">
                AI-powered detection of retinal conditions and abnormalities.
              </p>
            </div>
            
            <AnalysisResults
              findings={findings}
              overallRisk={overallRisk}
              isAnalyzing={isAnalyzing}
              metrics={metrics || undefined}
            />
          </>
        )}

        {!selectedImage && !isAnalyzing && !analysisComplete && (
          <Card className="h-full flex items-center justify-center bg-muted/20">
            <CardContent className="text-center py-12">
              <Eye className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                Upload an image to begin analysis
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
