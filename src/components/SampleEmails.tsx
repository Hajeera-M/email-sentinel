import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface SampleEmail {
  id: string;
  subject: string;
  body: string;
  isSpam: boolean;
}

const sampleEmails: SampleEmail[] = [
  {
    id: "1",
    subject: "Team Meeting Tomorrow at 10 AM",
    body: "Hi team,\n\nJust a reminder about our weekly sync tomorrow at 10 AM. We'll be discussing the Q4 roadmap and project updates.\n\nBest regards,\nSarah",
    isSpam: false,
  },
  {
    id: "2",
    subject: "URGENT: Claim Your $1,000,000 Prize NOW!!!",
    body: "CONGRATULATIONS!!! You have been selected as our GRAND PRIZE WINNER! Click here immediately to claim your $1,000,000 cash prize. This offer expires in 24 hours! ACT NOW!!!",
    isSpam: true,
  },
  {
    id: "3",
    subject: "Your Monthly Statement is Ready",
    body: "Dear Customer,\n\nYour monthly account statement for November 2025 is now available. You can view it by logging into your account.\n\nThank you for your business.\n\nCustomer Service Team",
    isSpam: false,
  },
];

interface SampleEmailsProps {
  onSelect: (subject: string, body: string) => void;
}

export const SampleEmails = ({ onSelect }: SampleEmailsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Try Sample Emails</h3>
      <div className="grid gap-3">
        {sampleEmails.map((email) => (
          <Card
            key={email.id}
            className="p-4 hover:shadow-medium transition-all cursor-pointer group"
            onClick={() => onSelect(email.subject, email.body)}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <h4 className="font-medium text-foreground truncate">
                    {email.subject}
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {email.body}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Test
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
