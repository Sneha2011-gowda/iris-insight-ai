import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line, PieChart, Pie, Legend } from "recharts";
import { TrendingUp, Activity, Target, Award } from "lucide-react";

export const ClassificationReportTab = () => {
  const overallMetrics = {
    accuracy: 94.2,
    precision: 92.8,
    recall: 93.5,
    f1Score: 93.1,
  };

  const metricsData = [
    { name: "Accuracy", value: overallMetrics.accuracy },
    { name: "Precision", value: overallMetrics.precision },
    { name: "Recall", value: overallMetrics.recall },
    { name: "F1-Score", value: overallMetrics.f1Score },
  ];

  const diseasePerformance = [
    { disease: "Normal", accuracy: 96.5, samples: 450 },
    { disease: "Diabetic Retinopathy", accuracy: 93.2, samples: 380 },
    { disease: "Glaucoma", accuracy: 91.8, samples: 320 },
    { disease: "Cataract", accuracy: 94.7, samples: 290 },
    { disease: "AMD", accuracy: 89.3, samples: 210 },
  ];

  const genderDistribution = [
    { gender: "Male", value: 52, fill: "hsl(var(--primary))" },
    { gender: "Female", value: 48, fill: "hsl(var(--primary) / 0.7)" },
  ];

  const trainingHistory = [
    { epoch: 1, accuracy: 65.2, loss: 0.85 },
    { epoch: 5, accuracy: 78.5, loss: 0.62 },
    { epoch: 10, accuracy: 86.3, loss: 0.42 },
    { epoch: 15, accuracy: 91.2, loss: 0.28 },
    { epoch: 20, accuracy: 94.2, loss: 0.18 },
  ];

  const getColor = (value: number) => {
    if (value >= 90) return "hsl(var(--primary))";
    if (value >= 80) return "hsl(var(--primary) / 0.8)";
    if (value >= 70) return "hsl(var(--primary) / 0.6)";
    return "hsl(var(--primary) / 0.4)";
  };

  return (
    <div className="space-y-6">
      {/* Overall Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Accuracy</CardTitle>
              <Target className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{overallMetrics.accuracy}%</div>
            <p className="text-xs text-muted-foreground mt-1">Overall accuracy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Precision</CardTitle>
              <Award className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{overallMetrics.precision}%</div>
            <p className="text-xs text-muted-foreground mt-1">Prediction accuracy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Recall</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{overallMetrics.recall}%</div>
            <p className="text-xs text-muted-foreground mt-1">Detection rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">F1-Score</CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{overallMetrics.f1Score}%</div>
            <p className="text-xs text-muted-foreground mt-1">Balanced metric</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Metrics Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Overall model performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metricsData}>
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
                    {metricsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getColor(entry.value)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Gender Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Gender Distribution</CardTitle>
            <CardDescription>Training data distribution by gender</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    fill="hsl(var(--primary))"
                    dataKey="value"
                  >
                    {genderDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                      color: "hsl(var(--foreground))",
                    }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Disease-wise Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Disease-wise Performance</CardTitle>
            <CardDescription>Accuracy by disease category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={diseasePerformance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    type="number"
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: '12px' }}
                    domain={[0, 100]}
                  />
                  <YAxis 
                    dataKey="disease"
                    type="category"
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: '11px' }}
                    width={120}
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
                  <Bar dataKey="accuracy" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Training History */}
        <Card>
          <CardHeader>
            <CardTitle>Training History</CardTitle>
            <CardDescription>Model accuracy progression over epochs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trainingHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="epoch"
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: '12px' }}
                    label={{ value: 'Epochs', position: 'insideBottom', offset: -5 }}
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
                  />
                  <Line 
                    type="monotone" 
                    dataKey="accuracy" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dataset Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Dataset Summary</CardTitle>
          <CardDescription>Overview of training data by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-foreground">Disease Category</th>
                  <th className="text-right py-3 px-4 font-medium text-foreground">Samples</th>
                  <th className="text-right py-3 px-4 font-medium text-foreground">Accuracy</th>
                </tr>
              </thead>
              <tbody>
                {diseasePerformance.map((item, index) => (
                  <tr key={index} className="border-b border-border/50">
                    <td className="py-3 px-4 text-foreground">{item.disease}</td>
                    <td className="text-right py-3 px-4 text-muted-foreground">{item.samples}</td>
                    <td className="text-right py-3 px-4">
                      <span className="font-medium text-primary">{item.accuracy}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
