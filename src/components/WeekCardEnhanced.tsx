import { Week } from "@/data/scheduleData";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Target, CheckCircle2 } from "lucide-react";

interface WeekCardEnhancedProps {
  week: Week;
  isActive: boolean;
  onClick: () => void;
  progressPercent: number;
}

const weekColors = {
  1: "week-1",
  2: "week-2",
  3: "week-3",
  4: "week-4",
};

export const WeekCardEnhanced = ({
  week,
  isActive,
  onClick,
  progressPercent,
}: WeekCardEnhancedProps) => {
  const colorClass = weekColors[week.id as keyof typeof weekColors];
  const isComplete = progressPercent === 100;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 md:p-5 rounded-xl transition-all duration-300 border-2 ${
        isActive
          ? `${colorClass}-bg border-current shadow-hover`
          : "bg-card border-border hover:border-muted-foreground/30 shadow-card"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`text-xs font-semibold uppercase tracking-wider ${colorClass}-accent`}
            >
              Vecka {week.id}
            </span>
            <Badge variant="secondary" className="text-xs">
              {week.dateRange}
            </Badge>
            {isComplete && (
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            )}
          </div>
          <h3 className="font-semibold text-foreground text-sm md:text-base leading-tight mb-2">
            {week.title}
          </h3>
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {week.totalHours}
            </span>
            <span className="flex items-center gap-1">
              <Target className="w-3 h-3" />
              {week.focus}
            </span>
          </div>
          <Progress value={progressPercent} className="h-1.5" />
          <span className="text-[10px] text-muted-foreground mt-1 block">
            {Math.round(progressPercent)}% klart
          </span>
        </div>
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClass}-bg shrink-0`}
        >
          <span className={`font-bold text-lg ${colorClass}-accent`}>
            {week.id}
          </span>
        </div>
      </div>
    </button>
  );
};
