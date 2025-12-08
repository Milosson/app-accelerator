import { DayActivity } from "@/data/scheduleData";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Clock, BookOpen, Lightbulb, CheckCircle2 } from "lucide-react";

interface DayCardProps {
  day: DayActivity;
  weekId: number;
  index: number;
}

const weekColors = {
  1: { accent: "week-1-accent", bg: "week-1-bg", border: "border-[hsl(173,58%,39%)]" },
  2: { accent: "week-2-accent", bg: "week-2-bg", border: "border-[hsl(221,83%,53%)]" },
  3: { accent: "week-3-accent", bg: "week-3-bg", border: "border-[hsl(262,83%,58%)]" },
  4: { accent: "week-4-accent", bg: "week-4-bg", border: "border-[hsl(38,92%,50%)]" },
};

export const DayCard = ({ day, weekId, index }: DayCardProps) => {
  const colors = weekColors[weekId as keyof typeof weekColors];

  return (
    <div
      className="bg-card rounded-xl border border-border shadow-card overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300"
      style={{ animationDelay: `${index * 75}ms` }}
    >
      <Accordion type="single" collapsible>
        <AccordionItem value="details" className="border-none">
          <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3 w-full text-left">
              <div
                className={`w-12 h-12 rounded-lg ${colors.bg} flex flex-col items-center justify-center shrink-0`}
              >
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
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4 pt-2">
              {/* Aktiviteter */}
              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  Aktiviteter
                </h5>
                <ul className="space-y-2">
                  {day.activities.map((activity, i) => (
                    <li
                      key={i}
                      className="text-sm text-foreground/80 pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-primary/50"
                    >
                      {activity}
                    </li>
                  ))}
                </ul>
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
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
