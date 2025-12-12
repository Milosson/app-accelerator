import { Week } from "@/data/scheduleData";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Clock, Target, CheckCircle2, Trash2 } from "lucide-react";

interface WeekCardEnhancedProps {
  week: Week;
  isActive: boolean;
  onClick: () => void;
  progressPercent: number;
  onDelete?: () => void;
  canDelete?: boolean;
}

const weekColors: Record<number, string> = {
  1: "week-1",
  2: "week-2",
  3: "week-3",
  4: "week-4",
};

const getWeekColor = (weekId: number): string => {
  return weekColors[weekId] || "primary";
};

export const WeekCardEnhanced = ({
  week,
  isActive,
  onClick,
  progressPercent,
  onDelete,
  canDelete = false,
}: WeekCardEnhancedProps) => {
  const colorClass = getWeekColor(week.id);
  const bgClass = weekColors[week.id] ? `${colorClass}-bg` : "bg-primary/10";
  const accentClass = weekColors[week.id] ? `${colorClass}-accent` : "text-primary";
  const isComplete = progressPercent === 100;

  return (
    <div className="relative group">
      <button
        onClick={onClick}
        className={`w-full text-left p-4 md:p-5 rounded-xl transition-all duration-300 border-2 ${
          isActive
            ? `${bgClass} border-current shadow-hover`
            : "bg-card border-border hover:border-muted-foreground/30 shadow-card"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`text-xs font-semibold uppercase tracking-wider ${accentClass}`}
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
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${bgClass} shrink-0`}
          >
            <span className={`font-bold text-lg ${accentClass}`}>
              {week.id}
            </span>
          </div>
        </div>
      </button>
      
      {/* Delete button - appears on hover for deletable weeks */}
      {canDelete && onDelete && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Ta bort Vecka {week.id}?</AlertDialogTitle>
              <AlertDialogDescription>
                Detta kommer permanent ta bort "{week.title}" och alla dess dagar och aktiviteter. Du kan inte ångra detta.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Avbryt</AlertDialogCancel>
              <AlertDialogAction 
                onClick={onDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Ta bort
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};
