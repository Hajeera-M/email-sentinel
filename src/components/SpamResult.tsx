import { CheckCircle2, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SpamResultProps {
  isSpam: boolean;
  confidence: number;
  reasons: string[];
}

export const SpamResult = ({ isSpam, confidence, reasons }: SpamResultProps) => {
  const getConfidenceColor = () => {
    if (confidence >= 90) return "text-success";
    if (confidence >= 70) return "text-primary";
    return "text-warning";
  };

  const getRiskLevel = () => {
    if (isSpam) {
      if (confidence >= 85) return { level: "High Risk", color: "text-destructive" };
      if (confidence >= 70) return { level: "Medium Risk", color: "text-warning" };
      return { level: "Low Risk", color: "text-muted-foreground" };
    }
    return { level: "Safe", color: "text-success" };
  };

  const risk = getRiskLevel();

  return (
    <Card className="p-6 animate-fade-in shadow-medium border-2 transition-all hover:shadow-elegant">
      <div className="space-y-6">
        {/* Result Header */}
        <div className="flex items-center gap-4">
          {isSpam ? (
            <div className="w-20 h-20 rounded-full bg-gradient-danger flex items-center justify-center shadow-glow animate-pulse">
              <AlertTriangle className="w-10 h-10 text-destructive-foreground" />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-gradient-success flex items-center justify-center shadow-soft">
              <CheckCircle2 className="w-10 h-10 text-success-foreground" />
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-3xl font-bold text-foreground">
                {isSpam ? "⚠️ Spam Detected" : "✓ Legitimate Email"}
              </h3>
            </div>
            <p className={`text-sm font-semibold ${risk.color}`}>
              {risk.level}
            </p>
            <p className="text-muted-foreground mt-1">
              {isSpam
                ? "This email exhibits multiple spam characteristics"
                : "This email appears to be safe and trustworthy"}
            </p>
          </div>
        </div>

        {/* Confidence Score */}
        <div className="space-y-3 bg-muted/20 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-foreground">Confidence Level</span>
            <span className={`text-3xl font-bold ${getConfidenceColor()}`}>{confidence}%</span>
          </div>
          <Progress
            value={confidence}
            className="h-4 shadow-inner"
            indicatorClassName={isSpam ? "bg-gradient-danger" : "bg-gradient-success"}
          />
          <p className="text-xs text-muted-foreground">
            {confidence >= 90 ? "Very high confidence" : confidence >= 70 ? "High confidence" : "Moderate confidence"}
          </p>
        </div>

        {/* Analysis Reasons */}
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground flex items-center gap-2">
            <span className="w-1 h-5 bg-primary rounded-full" />
            Detection Factors:
          </h4>
          <ul className="space-y-3">
            {reasons.map((reason, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-sm text-foreground bg-card/50 p-3 rounded-lg border border-border/50 hover:border-primary/30 transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0 animate-pulse" />
                <span className="leading-relaxed">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};
