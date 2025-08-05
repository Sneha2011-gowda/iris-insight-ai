import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUploader } from "@/components/ImageUploader";
import { AnalysisResults } from "@/components/AnalysisResults";
import { Eye, Stethoscope, Brain, Shield } from "lucide-react";
import { toast } from "sonner";
import sampleRetinalImage from "@/assets/sample-retinal-image.jpg";

interface Finding {
  condition: string;
  confidence: number;
  severity: "normal" | "mild" | "moderate" | "severe";
  description: string;
}

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [findings, setFindings] = useState<Finding[]>([]);
  const [overallRisk, setOverallRisk] = useState<"low" | "medium" | "high">("low");

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setAnalysisComplete(false);
    toast.success("Image uploaded successfully!");
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setAnalysisComplete(false);
    setFindings([]);
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
    setIsAnalyzing(false);
    setAnalysisComplete(true);
    toast.success("Analysis completed!");
  };

  const handleUseSample = () => {
    // Create a file object from the sample image
    fetch(sampleRetinalImage)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], "sample-retinal-image.jpg", { type: "image/jpeg" });
        handleImageSelect(file);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary">
              <Eye className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Iris Insight AI</h1>
              <p className="text-sm text-muted-foreground">Advanced Retinal Image Analysis</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Hero Section */}
          {!selectedImage && (
            <Card className="text-center bg-gradient-to-r from-card to-primary/5 border-primary/20">
              <CardContent className="pt-8 pb-8">
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="p-4 rounded-full bg-primary">
                      <Brain className="h-12 w-12 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-foreground">AI-Powered Retinal Analysis</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                      Upload your retinal images for instant AI-powered analysis. Our advanced machine learning 
                      models can detect early signs of diabetic retinopathy, glaucoma, and other eye conditions.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
                    <div className="flex flex-col items-center space-y-2">
                      <Stethoscope className="h-8 w-8 text-primary" />
                      <h3 className="font-semibold">Clinical Grade</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        Professional-level analysis comparable to clinical standards
                      </p>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <Brain className="h-8 w-8 text-primary" />
                      <h3 className="font-semibold">AI-Powered</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        Advanced machine learning trained on thousands of retinal images
                      </p>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <Shield className="h-8 w-8 text-primary" />
                      <h3 className="font-semibold">Secure & Private</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        Your images are processed securely and never stored
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

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
                selectedImage={selectedImage}
                onClearImage={handleClearImage}
              />

              {!selectedImage && (
                <Card className="bg-muted/30">
                  <CardContent className="pt-4">
                    <div className="text-center space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Don't have a retinal image? Try our sample
                      </p>
                      <Button variant="outline" onClick={handleUseSample}>
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
        </div>
      </main>
    </div>
  );
};

export default Index;