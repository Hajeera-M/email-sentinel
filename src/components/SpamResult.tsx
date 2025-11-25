import { CheckCircle2, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SpamResultProps {
  isSpam: boolean;
  confidence: number;
  reasons: string[];
}

export const SpamResult = ({ isSpam, confidence, reasons }: SpamResultProps) => {
  return (
    <Card className="p-6 animate-fade-in shadow-medium">
      <div className="space-y-6">
        {/* Result Header */}
        <div className="flex items-center gap-4">
          {isSpam ? (
            <div className="w-16 h-16 rounded-full bg-gradient-danger flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-destructive-foreground" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-success flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-success-foreground" />
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-foreground">
              {isSpam ? "Spam Detected" : "Legitimate Email"}
            </h3>
            <p className="text-muted-foreground">
              {isSpam
                ? "This email shows characteristics of spam"
                : "This email appears to be safe"}
            </p>
          </div>
        </div>

        {/* Confidence Score */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-foreground">Confidence Score</span>
            <span className="text-2xl font-bold text-foreground">{confidence}%</span>
          </div>
          <Progress
            value={confidence}
            className="h-3"
            indicatorClassName={isSpam ? "bg-gradient-danger" : "bg-gradient-success"}
          />
        </div>

        {/* Analysis Reasons */}
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground">Key Indicators:</h4>
          <ul className="space-y-2">
            {reasons.map((reason, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};
