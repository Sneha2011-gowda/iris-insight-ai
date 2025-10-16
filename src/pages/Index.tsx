import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Stethoscope, Brain, Shield, Upload, BarChart3, BookOpen, GraduationCap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

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

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/analysis")}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-primary/10 w-fit">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">Single Image Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Upload and analyze individual retinal images for instant disease detection
                    </p>
                  </div>
                  <Button variant="ghost" className="w-full group">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/analysis")}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-primary/10 w-fit">
                    <BarChart3 className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">Batch Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Process multiple retinal images simultaneously for efficient screening
                    </p>
                  </div>
                  <Button variant="ghost" className="w-full group">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/analysis")}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-primary/10 w-fit">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">Train Model</h3>
                    <p className="text-sm text-muted-foreground">
                      Train custom AI models with your own labeled retinal image datasets
                    </p>
                  </div>
                  <Button variant="ghost" className="w-full group">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/analysis")}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-primary/10 w-fit">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">Disease Dictionary</h3>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive guide to eye diseases with symptoms and treatments
                    </p>
                  </div>
                  <Button variant="ghost" className="w-full group">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button size="lg" onClick={() => navigate("/analysis")} className="text-lg px-8 py-6">
              Start Analysis Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;