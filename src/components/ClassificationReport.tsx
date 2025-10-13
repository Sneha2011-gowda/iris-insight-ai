import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface ClassificationMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
}

interface ClassificationReportProps {
  metrics: ClassificationMetrics;
}

export const ClassificationReport = ({ metrics }: ClassificationReportProps) => {
  const chartData = [
    { name: "Accuracy", value: metrics.accuracy },
    { name: "Precision", value: metrics.precision },
    { name: "Recall", value: metrics.recall },
    { name: "F1-Score", value: metrics.f1Score },
  ];

  const getColor = (value: number) => {
    if (value >= 90) return "hsl(var(--primary))";
    if (value >= 80) return "hsl(var(--primary) / 0.8)";
    if (value >= 70) return "hsl(var(--primary) / 0.6)";
    return "hsl(var(--primary) / 0.4)";
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Classification Report
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                  color: "hsl(var(--foreground))",
                }}
                formatter={(value: number) => `${value.toFixed(1)}%`}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColor(entry.value)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {chartData.map((metric) => (
            <div
              key={metric.name}
              className="p-4 rounded-lg bg-muted/30 border border-border"
            >
              <div className="text-sm text-muted-foreground mb-1">
                {metric.name}
              </div>
              <div className="text-2xl font-bold text-primary">
                {metric.value.toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
