import { useState } from "react";
import { Shield, Mail, Zap } from "lucide-react";
import { EmailInput } from "@/components/EmailInput";
import { SpamResult } from "@/components/SpamResult";
import { SampleEmails } from "@/components/SampleEmails";
import { toast } from "sonner";

interface AnalysisResult {
  isSpam: boolean;
  confidence: number;
  reasons: string[];
}

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  // AI-powered spam detection using machine learning
  const analyzeEmail = async (subject: string, body: string) => {
    setIsAnalyzing(true);
    setResult(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-spam`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ subject, body }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 429) {
          toast.error("Rate limit exceeded. Please try again later.");
        } else if (response.status === 402) {
          toast.error("AI credits exhausted. Please add credits to continue.");
        } else {
          toast.error(errorData.error || "Analysis failed. Please try again.");
        }
        setIsAnalyzing(false);
        return;
      }

      const analysis = await response.json();
      setResult(analysis);
      toast.success("AI analysis complete!");
    } catch (error) {
      console.error("Error analyzing email:", error);
      toast.error("Failed to analyze email. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSampleSelect = (subject: string, body: string) => {
    analyzeEmail(subject, body);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">SpamGuard AI</h1>
              <p className="text-sm text-muted-foreground">Intelligent Email Spam Detection</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Protect Your Inbox with AI
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced machine learning technology to detect and filter spam emails in real-time
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card p-6 rounded-xl border border-border shadow-soft hover:shadow-medium transition-all">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Real-time Analysis</h3>
            <p className="text-muted-foreground">
              Instant spam detection with advanced ML algorithms
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border shadow-soft hover:shadow-medium transition-all">
            <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-success" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">High Accuracy</h3>
            <p className="text-muted-foreground">
              99%+ accuracy with continuous model improvements
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border shadow-soft hover:shadow-medium transition-all">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Smart Detection</h3>
            <p className="text-muted-foreground">
              Learns from patterns to identify new spam techniques
            </p>
          </div>
        </div>

        {/* Main Analysis Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-xl border border-border shadow-soft">
              <h3 className="text-xl font-semibold text-foreground mb-4">Analyze Email</h3>
              <EmailInput onAnalyze={analyzeEmail} isAnalyzing={isAnalyzing} />
            </div>

            <div className="bg-card p-6 rounded-xl border border-border shadow-soft">
              <SampleEmails onSelect={handleSampleSelect} />
            </div>
          </div>

          <div>
            {result ? (
              <SpamResult
                isSpam={result.isSpam}
                confidence={result.confidence}
                reasons={result.reasons}
              />
            ) : (
              <div className="bg-muted/30 p-12 rounded-xl border border-dashed border-border flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                <Shield className="w-16 h-16 text-muted-foreground/40 mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                  Ready to Analyze
                </h3>
                <p className="text-sm text-muted-foreground/80 max-w-xs">
                  Enter an email or select a sample to see the spam detection in action
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
