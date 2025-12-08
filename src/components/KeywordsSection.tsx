import { Badge } from "@/components/ui/badge";
import { Hash, MessageSquareQuote } from "lucide-react";

interface KeywordsSectionProps {
  keywords: string[];
  replicas: string[];
  weekId: number;
}

const weekColors = {
  1: { accent: "week-1-accent", bg: "week-1-bg" },
  2: { accent: "week-2-accent", bg: "week-2-bg" },
  3: { accent: "week-3-accent", bg: "week-3-bg" },
  4: { accent: "week-4-accent", bg: "week-4-bg" },
};

export const KeywordsSection = ({
  keywords,
  replicas,
  weekId,
}: KeywordsSectionProps) => {
  const colors = weekColors[weekId as keyof typeof weekColors];

  return (
    <div className="space-y-6 mt-8">
      {/* Nyckelord */}
      <div className="bg-card rounded-xl border border-border p-4 md:p-5 shadow-card">
        <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Hash className="w-4 h-4 text-primary" />
          Nyckelord att droppa
        </h4>
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword, i) => (
            <Badge
              key={i}
              variant="outline"
              className="text-xs hover:bg-primary/10 transition-colors cursor-default"
            >
              {keyword}
            </Badge>
          ))}
        </div>
      </div>

      {/* Repliker */}
      <div className="bg-card rounded-xl border border-border p-4 md:p-5 shadow-card">
        <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <MessageSquareQuote className="w-4 h-4 text-primary" />
          Repliker
        </h4>
        <div className="space-y-3">
          {replicas.map((replica, i) => (
            <blockquote
              key={i}
              className={`text-sm text-foreground/80 pl-4 border-l-2 ${
                weekId === 1
                  ? "border-[hsl(173,58%,39%)]"
                  : weekId === 2
                  ? "border-[hsl(221,83%,53%)]"
                  : weekId === 3
                  ? "border-[hsl(262,83%,58%)]"
                  : "border-[hsl(38,92%,50%)]"
              } italic`}
            >
              "{replica}"
            </blockquote>
          ))}
        </div>
      </div>
    </div>
  );
};
