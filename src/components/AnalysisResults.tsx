import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, XCircle, Eye, Activity, BarChart3 } from "lucide-react";

interface Finding {
  condition: string;
  confidence: number;
  severity: "normal" | "mild" | "moderate" | "severe";
  description: string;
}

interface ClassificationMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
}

interface AnalysisResultsProps {
  findings: Finding[];
  overallRisk: "low" | "medium" | "high";
  isAnalyzing: boolean;
  metrics?: ClassificationMetrics;
}

export const AnalysisResults = ({ findings, overallRisk, isAnalyzing, metrics }: AnalysisResultsProps) => {
  const getSeverityIcon = (severity: Finding["severity"]) => {
    switch (severity) {
      case "normal":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "mild":
        return <Activity className="h-4 w-4 text-warning" />;
      case "moderate":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "severe":
        return <XCircle className="h-4 w-4 text-destructive" />;
    }
  };

  const getSeverityColor = (severity: Finding["severity"]) => {
    switch (severity) {
      case "normal":
        return "bg-success text-success-foreground";
      case "mild":
        return "bg-warning text-warning-foreground";
      case "moderate":
        return "bg-warning text-warning-foreground";
      case "severe":
        return "bg-destructive text-destructive-foreground";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-success text-success-foreground";
      case "medium":
        return "bg-warning text-warning-foreground";
      case "high":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (isAnalyzing) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Analyzing Retinal Image...
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Processing image...</span>
              <span>75%</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
          <p className="text-sm text-muted-foreground">
            Our AI is analyzing your retinal image for various conditions. This may take a few moments.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              Overall Risk Assessment
            </span>
            <Badge className={getRiskColor(overallRisk)}>
              {overallRisk.toUpperCase()} RISK
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Based on our AI analysis, your retinal image shows a {overallRisk} risk level for 
            various eye conditions. Please review the detailed findings below.
          </p>
        </CardContent>
      </Card>

      {/* Classification Metrics */}
      {metrics && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Classification Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Accuracy</div>
                <div className="text-2xl font-bold text-foreground">{metrics.accuracy}%</div>
                <Progress value={metrics.accuracy} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Precision</div>
                <div className="text-2xl font-bold text-foreground">{metrics.precision}%</div>
                <Progress value={metrics.precision} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Recall</div>
                <div className="text-2xl font-bold text-foreground">{metrics.recall}%</div>
                <Progress value={metrics.recall} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">F1-Score</div>
                <div className="text-2xl font-bold text-foreground">{metrics.f1Score}%</div>
                <Progress value={metrics.f1Score} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detailed Findings */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {findings.map((finding, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getSeverityIcon(finding.severity)}
                  <h4 className="font-semibold text-foreground">{finding.condition}</h4>
                </div>
                <Badge className={getSeverityColor(finding.severity)}>
                  {finding.severity.toUpperCase()}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Confidence</span>
                  <span className="text-sm font-medium">{finding.confidence}%</span>
                </div>
                <Progress value={finding.confidence} className="h-2" />
              </div>
              
              <p className="text-sm text-muted-foreground">{finding.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Medical Disclaimer */}
      <Card className="border-warning/20 bg-warning/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-semibold text-warning-foreground">Medical Disclaimer</h4>
              <p className="text-sm text-muted-foreground">
                This AI analysis is for educational purposes only and should not replace professional 
                medical diagnosis. Please consult with an ophthalmologist for proper medical evaluation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};