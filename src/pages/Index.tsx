import { useState } from "react";
import { useScheduleStorage } from "@/hooks/useScheduleStorage";
import { Header } from "@/components/Header";
import { WeekCardEnhanced } from "@/components/WeekCardEnhanced";
import { DayCardEnhanced } from "@/components/DayCardEnhanced";
import { KeywordsSection } from "@/components/KeywordsSection";
import { TipsSection } from "@/components/TipsSection";
import { AddDayDialog } from "@/components/AddDayDialog";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AuthDialog } from "@/components/AuthDialog";
import { GamificationPanel } from "@/components/GamificationPanel";
import { ExportPanel } from "@/components/ExportPanel";
import { AIWeekGenerator } from "@/components/AIWeekGenerator";
import { Button } from "@/components/ui/button";
import { Target, RotateCcw } from "lucide-react";
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
import { toast } from "sonner";
import { Week } from "@/data/scheduleData";

const Index = () => {
  const [activeWeek, setActiveWeek] = useState(1);
  const storage = useScheduleStorage();
  const {
    weeks,
    addActivity,
    updateActivity,
    deleteActivity,
    addDay,
    deleteDay,
    addWeek,
    deleteWeek,
    toggleActivityComplete,
    getProgress,
    getWeekProgress,
    updateNotes,
    getNotes,
    resetToDefault,
  } = storage;

  const handleAddWeek = (newWeek: Week) => {
    addWeek(newWeek);
  };

  const handleDeleteWeek = (weekId: number) => {
    deleteWeek(weekId);
    // If deleted week was active, switch to week 1
    if (activeWeek === weekId) {
      setActiveWeek(1);
    }
    toast.success("Vecka borttagen!");
  };

  const currentWeek = weeks.find((w) => w.id === activeWeek)!;

  const handleReset = () => {
    resetToDefault();
    toast.success("Schemat har återställts till original!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl mx-auto px-4 py-8 md:py-12">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <GamificationPanel />
          </div>
          <div className="flex items-center gap-2">
            <ExportPanel weeks={weeks} />
            <ThemeToggle />
            <AuthDialog />
          </div>
        </div>
        
        <Header />

        {/* Week Selector */}
        <section className="mb-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {weeks.map((week) => (
              <WeekCardEnhanced
                key={week.id}
                week={week}
                isActive={activeWeek === week.id}
                onClick={() => setActiveWeek(week.id)}
                progressPercent={getWeekProgress(week.id)}
                onDelete={() => handleDeleteWeek(week.id)}
                canDelete={week.id > 4} // Only allow deleting AI-generated weeks (id > 4)
              />
            ))}
          </div>
          <div className="mt-4">
            <AIWeekGenerator existingWeeks={weeks} onWeekGenerated={handleAddWeek} />
          </div>
        </section>

        {/* Active Week Content */}
        <section>
          <div className="flex items-center justify-between gap-3 mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              Vecka {currentWeek.id}: {currentWeek.title}
            </h2>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Återställ
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Återställ schemat?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Detta tar bort alla dina ändringar, anteckningar och progress. Schemat återställs till originalversionen.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Avbryt</AlertDialogCancel>
                  <AlertDialogAction onClick={handleReset}>
                    Återställ
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {/* Week Goal */}
          <div className="bg-card rounded-xl border border-border p-4 md:p-5 mb-6 shadow-card">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm mb-1">
                  Veckans mål
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {currentWeek.goal}
                </p>
              </div>
            </div>
          </div>

          {/* Days Grid */}
          <div className="space-y-3">
            {currentWeek.days.map((day, index) => (
              <DayCardEnhanced
                key={`${currentWeek.id}-${index}-${day.day}`}
                day={day}
                weekId={currentWeek.id}
                dayIndex={index}
                progress={getProgress(currentWeek.id, index)}
                notes={getNotes(currentWeek.id, index)}
                onToggleActivity={(activityIndex) =>
                  toggleActivityComplete(currentWeek.id, index, activityIndex)
                }
                onUpdateActivity={(activityIndex, newActivity) =>
                  updateActivity(currentWeek.id, index, activityIndex, newActivity)
                }
                onDeleteActivity={(activityIndex) =>
                  deleteActivity(currentWeek.id, index, activityIndex)
                }
                onAddActivity={(activity) =>
                  addActivity(currentWeek.id, index, activity)
                }
                onUpdateNotes={(notes) => updateNotes(currentWeek.id, index, notes)}
                onDeleteDay={() => deleteDay(currentWeek.id, index)}
              />
            ))}
            
            {/* Add Day Button */}
            <AddDayDialog
              weekId={currentWeek.id}
              onAdd={(newDay) => {
                addDay(currentWeek.id, newDay);
                toast.success(`${newDay.title} har lagts till!`);
              }}
            />
          </div>

          {/* Keywords & Replicas */}
          <KeywordsSection
            keywords={currentWeek.keywords}
            replicas={currentWeek.replicas}
            weekId={currentWeek.id}
          />
        </section>

        {/* Tips Section */}
        <TipsSection />

        {/* Footer */}
        <footer className="text-center pt-8 border-t border-border mt-8">
          <p className="text-sm text-muted-foreground">
            Starta idag – bygg din första app innan lunch! 🚀
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
