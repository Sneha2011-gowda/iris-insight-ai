import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SingleImageAnalysis } from "@/components/SingleImageAnalysis";
import { BatchImageAnalysis } from "@/components/BatchImageAnalysis";
import { ModelTraining } from "@/components/ModelTraining";
import { ClassificationReportTab } from "@/components/ClassificationReportTab";
import { Eye, Stethoscope, Brain, Shield } from "lucide-react";
import sampleRetinalImage from "@/assets/sample-retinal-image.jpg";

const Index = () => {
  const [analysisMode, setAnalysisMode] = useState<"single" | "batch" | "train" | "report">("single");

  const handleUseSample = () => {
    // Create a file object from the sample image
    fetch(sampleRetinalImage)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], "sample-retinal-image.jpg", { type: "image/jpeg" });
        // This will be handled by the respective component
      });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary">
              <Eye className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">AI Retinal Disease Detection</h1>
              <p className="text-sm text-muted-foreground">Advanced Retinal Image Analysis</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Hero Section */}
          <Card className="text-center bg-card border-primary/30">
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
                    <h3 className="font-semibold text-foreground">Clinical Grade</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Professional-level analysis comparable to clinical standards
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <Brain className="h-8 w-8 text-primary" />
                    <h3 className="font-semibold text-foreground">AI-Powered</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Advanced machine learning trained on thousands of retinal images
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <Shield className="h-8 w-8 text-primary" />
                    <h3 className="font-semibold text-foreground">Secure & Private</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Your images are processed securely and never stored
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Mode Tabs */}
          <Tabs value={analysisMode} onValueChange={(v) => setAnalysisMode(v as "single" | "batch" | "train" | "report")} className="w-full">
            <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-4">
              <TabsTrigger value="single">Single Image</TabsTrigger>
              <TabsTrigger value="batch">Batch Analysis</TabsTrigger>
              <TabsTrigger value="train">Train Model</TabsTrigger>
              <TabsTrigger value="report">Classification Report</TabsTrigger>
            </TabsList>
            
            <TabsContent value="single" className="mt-8">
              <SingleImageAnalysis onUseSample={handleUseSample} />
            </TabsContent>
            
            <TabsContent value="batch" className="mt-8">
              <BatchImageAnalysis onUseSample={handleUseSample} />
            </TabsContent>
            
            <TabsContent value="train" className="mt-8">
              <ModelTraining />
            </TabsContent>
            
            <TabsContent value="report" className="mt-8">
              <ClassificationReportTab />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Index;