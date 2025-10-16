import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SingleImageAnalysis } from "@/components/SingleImageAnalysis";
import { BatchImageAnalysis } from "@/components/BatchImageAnalysis";
import { ModelTraining } from "@/components/ModelTraining";
import { ClassificationReportTab } from "@/components/ClassificationReportTab";
import { EyeDiseaseDictionary } from "@/components/EyeDiseaseDictionary";
import { Eye, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import sampleRetinalImage from "@/assets/sample-retinal-image.jpg";

const Analysis = () => {
  const [analysisMode, setAnalysisMode] = useState<"single" | "batch" | "train" | "report" | "dictionary">("single");
  const navigate = useNavigate();

  const handleUseSample = () => {
    fetch(sampleRetinalImage)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], "sample-retinal-image.jpg", { type: "image/jpeg" });
      });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="mr-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="p-2 rounded-lg bg-primary">
                <Eye className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">AI Retinal Disease Detection</h1>
                <p className="text-xs text-muted-foreground">Advanced Retinal Image Analysis</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Analysis Mode Tabs */}
          <Tabs value={analysisMode} onValueChange={(v) => setAnalysisMode(v as "single" | "batch" | "train" | "report" | "dictionary")} className="w-full">
            <TabsList className="grid w-full grid-cols-5 h-auto p-2 bg-muted/50">
              <TabsTrigger 
                value="single" 
                className="text-base py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Single Image
              </TabsTrigger>
              <TabsTrigger 
                value="batch" 
                className="text-base py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Batch Analysis
              </TabsTrigger>
              <TabsTrigger 
                value="train" 
                className="text-base py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Train Model
              </TabsTrigger>
              <TabsTrigger 
                value="report" 
                className="text-base py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Classification Report
              </TabsTrigger>
              <TabsTrigger 
                value="dictionary" 
                className="text-base py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Disease Dictionary
              </TabsTrigger>
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
            
            <TabsContent value="dictionary" className="mt-8">
              <EyeDiseaseDictionary />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Analysis;
