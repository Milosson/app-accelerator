import { useState } from "react";
import { scheduleData } from "@/data/scheduleData";
import { Header } from "@/components/Header";
import { WeekCard } from "@/components/WeekCard";
import { DayCard } from "@/components/DayCard";
import { KeywordsSection } from "@/components/KeywordsSection";
import { TipsSection } from "@/components/TipsSection";
import { Badge } from "@/components/ui/badge";
import { Target } from "lucide-react";

const Index = () => {
  const [activeWeek, setActiveWeek] = useState(1);
  const currentWeek = scheduleData.find((w) => w.id === activeWeek)!;

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl mx-auto px-4 py-8 md:py-12">
        <Header />

        {/* Week Selector */}
        <section className="mb-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {scheduleData.map((week) => (
              <WeekCard
                key={week.id}
                week={week}
                isActive={activeWeek === week.id}
                onClick={() => setActiveWeek(week.id)}
              />
            ))}
          </div>
        </section>

        {/* Active Week Content */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              Vecka {currentWeek.id}: {currentWeek.title}
            </h2>
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
              <DayCard
                key={`${currentWeek.id}-${day.day}`}
                day={day}
                weekId={currentWeek.id}
                index={index}
              />
            ))}
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
