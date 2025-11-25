import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface EmailInputProps {
  onAnalyze: (subject: string, body: string) => void;
  isAnalyzing: boolean;
}

export const EmailInput = ({ onAnalyze, isAnalyzing }: EmailInputProps) => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = () => {
    if (subject.trim() || body.trim()) {
      onAnalyze(subject, body);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium text-foreground">
          Email Subject
        </label>
        <input
          id="subject"
          type="text"
          placeholder="Enter email subject..."
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-4 py-2 bg-card border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="body" className="text-sm font-medium text-foreground">
          Email Body
        </label>
        <Textarea
          id="body"
          placeholder="Paste email content here..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="min-h-[200px] resize-none"
        />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={isAnalyzing || (!subject.trim() && !body.trim())}
        className="w-full"
        size="lg"
      >
        {isAnalyzing ? (
          <>
            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
            Analyzing...
          </>
        ) : (
          <>
            <Mail className="w-4 h-4 mr-2" />
            Analyze Email
          </>
        )}
      </Button>
    </div>
  );
};
