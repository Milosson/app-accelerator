import { useState } from "react";
import { DayActivity } from "@/data/scheduleData";
import { DayProgress } from "@/hooks/useScheduleStorage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { Clock, Lightbulb, CheckCircle2, Trash2 } from "lucide-react";
import { ActivityItem } from "./ActivityItem";
import { AddActivityForm } from "./AddActivityForm";
import { NotesEditor } from "./NotesEditor";
import { ResourcePanel } from "./ResourcePanel";

interface DayCardEnhancedProps {
  day: DayActivity;
  weekId: number;
  dayIndex: number;
  progress?: DayProgress;
  notes: string;
  onToggleActivity: (activityIndex: number) => void;
  onUpdateActivity: (activityIndex: number, newActivity: string) => void;
  onDeleteActivity: (activityIndex: number) => void;
  onAddActivity: (activity: string) => void;
  onUpdateNotes: (notes: string) => void;
  onDeleteDay: () => void;
}

const weekColors = {
  1: { accent: "week-1-accent", bg: "week-1-bg", border: "border-[hsl(173,58%,39%)]" },
  2: { accent: "week-2-accent", bg: "week-2-bg", border: "border-[hsl(221,83%,53%)]" },
  3: { accent: "week-3-accent", bg: "week-3-bg", border: "border-[hsl(262,83%,58%)]" },
  4: { accent: "week-4-accent", bg: "week-4-bg", border: "border-[hsl(38,92%,50%)]" },
};

export const DayCardEnhanced = ({
  day,
  weekId,
  dayIndex,
  progress,
  notes,
  onToggleActivity,
  onUpdateActivity,
  onDeleteActivity,
  onAddActivity,
  onUpdateNotes,
  onDeleteDay,
}: DayCardEnhancedProps) => {
  const colors = weekColors[weekId as keyof typeof weekColors];
  const completedCount = progress?.completedActivities.length || 0;
  const totalCount = day.activities.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div
      className="bg-card rounded-xl border border-border shadow-card overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300"
      style={{ animationDelay: `${dayIndex * 75}ms` }}
    >
      <Accordion type="single" collapsible>
        <AccordionItem value="details" className="border-none">
          <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3 w-full text-left">
              <div
                className={`w-12 h-12 rounded-lg ${colors.bg} flex flex-col items-center justify-center shrink-0 relative`}
              >
                {progress?.isCompleted && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                )}
                <span className={`text-xs font-medium ${colors.accent}`}>
                  {day.day.slice(0, 3)}
                </span>
                <span className={`text-sm font-bold ${colors.accent}`}>
                  {day.date.split(" ")[0]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground text-sm md:text-base">
                  {day.title}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {day.duration}
                  </Badge>
                  {totalCount > 0 && (
                    <span className="text-xs text-muted-foreground">
                      {completedCount}/{totalCount} klara
                    </span>
                  )}
                </div>
                {totalCount > 0 && (
                  <Progress value={progressPercent} className="h-1 mt-2" />
                )}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4 pt-2">
              {/* Aktiviteter med CRUD */}
              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Aktiviteter
                </h5>
                <ul className="space-y-1">
                  {day.activities.map((activity, i) => (
                    <ActivityItem
                      key={i}
                      activity={activity}
                      index={i}
                      weekId={weekId}
                      isCompleted={progress?.completedActivities.includes(i) || false}
                      onToggleComplete={() => onToggleActivity(i)}
                      onUpdate={(newActivity) => onUpdateActivity(i, newActivity)}
                      onDelete={() => onDeleteActivity(i)}
                    />
                  ))}
                </ul>
                <AddActivityForm onAdd={onAddActivity} />
              </div>

              {/* Resurser */}
              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Resurser
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {day.resources.map((resource, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {resource}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Vad du lär dig */}
              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
                  <Lightbulb className="w-3 h-3" />
                  Vad du lär dig
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {day.learnings.map((learning, i) => (
                    <Badge
                      key={i}
                      className={`text-xs ${colors.bg} ${colors.accent} border-none`}
                    >
                      {learning}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Output */}
              <div
                className={`p-3 rounded-lg ${colors.bg} border-l-2 ${colors.border}`}
              >
                <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Output
                </h5>
                <p className={`text-sm font-medium ${colors.accent}`}>
                  {day.output}
                </p>
              </div>

              {/* Smarta resurslänkar */}
              <ResourcePanel dayTitle={day.title} activities={day.activities} />

              {/* Anteckningar */}
              <NotesEditor notes={notes} onUpdate={onUpdateNotes} />

              {/* Delete Day */}
              <div className="pt-2 border-t border-border">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="w-3 h-3 mr-2" />
                      Ta bort dag
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Ta bort {day.title}?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Detta kommer permanent ta bort dagen och alla dess aktiviteter. Du kan inte ångra detta.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Avbryt</AlertDialogCancel>
                      <AlertDialogAction onClick={onDeleteDay} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Ta bort
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
