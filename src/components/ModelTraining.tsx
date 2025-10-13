import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Upload, Play, StopCircle, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TrainingImage {
  file: File;
  diseaseLabel: string;
  gender: string;
}

export const ModelTraining = () => {
  const [trainingImages, setTrainingImages] = useState<TrainingImage[]>([]);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [epochs, setEpochs] = useState("10");
  const [batchSize, setBatchSize] = useState("32");
  const [learningRate, setLearningRate] = useState("0.001");
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages: TrainingImage[] = Array.from(files).map(file => ({
      file,
      diseaseLabel: "",
      gender: ""
    }));

    setTrainingImages(prev => [...prev, ...newImages]);
    toast({
      title: "Images Added",
      description: `Added ${files.length} images for training`,
    });
  };

  const updateImageLabel = (index: number, field: 'diseaseLabel' | 'gender', value: string) => {
    setTrainingImages(prev => prev.map((img, i) => 
      i === index ? { ...img, [field]: value } : img
    ));
  };

  const startTraining = () => {
    const unlabeledImages = trainingImages.filter(img => !img.diseaseLabel || !img.gender);
    
    if (trainingImages.length === 0) {
      toast({
        title: "No Training Data",
        description: "Please upload images first",
        variant: "destructive"
      });
      return;
    }

    if (unlabeledImages.length > 0) {
      toast({
        title: "Incomplete Labels",
        description: `${unlabeledImages.length} images need labels`,
        variant: "destructive"
      });
      return;
    }

    setIsTraining(true);
    setTrainingProgress(0);

    // Simulate training progress
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          toast({
            title: "Training Complete",
            description: "Model trained successfully with your data",
          });
          return 100;
        }
        return prev + 2;
      });
    }, 500);
  };

  const stopTraining = () => {
    setIsTraining(false);
    setTrainingProgress(0);
    toast({
      title: "Training Stopped",
      description: "Training process interrupted",
    });
  };

  return (
    <div className="space-y-6">
      {/* Training Parameters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Training Configuration
          </CardTitle>
          <CardDescription>Configure model training parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="epochs">Epochs</Label>
              <Input
                id="epochs"
                type="number"
                value={epochs}
                onChange={(e) => setEpochs(e.target.value)}
                disabled={isTraining}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="batchSize">Batch Size</Label>
              <Input
                id="batchSize"
                type="number"
                value={batchSize}
                onChange={(e) => setBatchSize(e.target.value)}
                disabled={isTraining}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="learningRate">Learning Rate</Label>
              <Input
                id="learningRate"
                type="number"
                step="0.0001"
                value={learningRate}
                onChange={(e) => setLearningRate(e.target.value)}
                disabled={isTraining}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload Training Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Training Data
          </CardTitle>
          <CardDescription>Upload retinal images and label them for training</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              disabled={isTraining}
              className="cursor-pointer"
            />
          </div>

          {trainingImages.length > 0 && (
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              <p className="text-sm font-medium">
                Total Images: {trainingImages.length}
              </p>
              {trainingImages.map((img, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  <span className="text-sm font-medium min-w-[150px] truncate">
                    {img.file.name}
                  </span>
                  <Select
                    value={img.diseaseLabel}
                    onValueChange={(value) => updateImageLabel(index, 'diseaseLabel', value)}
                    disabled={isTraining}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Disease Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="diabetic_retinopathy">Diabetic Retinopathy</SelectItem>
                      <SelectItem value="glaucoma">Glaucoma</SelectItem>
                      <SelectItem value="cataract">Cataract</SelectItem>
                      <SelectItem value="amd">AMD</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={img.gender}
                    onValueChange={(value) => updateImageLabel(index, 'gender', value)}
                    disabled={isTraining}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Training Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Training Control</CardTitle>
          <CardDescription>Start or stop model training</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            {!isTraining ? (
              <Button onClick={startTraining} className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Start Training
              </Button>
            ) : (
              <Button onClick={stopTraining} variant="destructive" className="flex items-center gap-2">
                <StopCircle className="h-4 w-4" />
                Stop Training
              </Button>
            )}
          </div>

          {isTraining && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Training Progress</span>
                <span>{trainingProgress}%</span>
              </div>
              <Progress value={trainingProgress} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
