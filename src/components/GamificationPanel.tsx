import { Flame, Trophy, Star, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGamification, Badge as BadgeType } from "@/hooks/useGamification";
import { useAuth } from "@/hooks/useAuth";
import { Progress } from "@/components/ui/progress";

export function GamificationPanel() {
  const { user } = useAuth();
  const { streak, totalPoints, badges, earnedBadges, loading } = useGamification();

  if (!user || loading) return null;

  const earnedCount = earnedBadges.length;
  const totalCount = badges.length;
  const progress = totalCount > 0 ? (earnedCount / totalCount) * 100 : 0;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-3 px-3 py-2 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-1 text-accent">
            <Flame className="w-4 h-4" />
            <span className="font-semibold text-sm">{streak}</span>
          </div>
          <div className="flex items-center gap-1 text-primary">
            <Star className="w-4 h-4" />
            <span className="font-semibold text-sm">{totalPoints}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Trophy className="w-4 h-4" />
            <span className="text-sm">{earnedCount}/{totalCount}</span>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Din progress</h4>
            <Badge variant="secondary">{totalPoints} poäng</Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-accent" />
                Streak
              </span>
              <span className="font-medium">{streak} dagar</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-primary" />
                Badges
              </span>
              <span className="font-medium">{earnedCount} av {totalCount}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="space-y-2">
            <h5 className="text-sm font-medium">Alla badges</h5>
            <div className="grid grid-cols-4 gap-2">
              {badges.map((badge) => {
                const isEarned = earnedBadges.some(eb => eb.id === badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`flex flex-col items-center p-2 rounded-lg border ${
                      isEarned 
                        ? 'bg-primary/10 border-primary/30' 
                        : 'bg-muted/30 border-border opacity-50'
                    }`}
                    title={`${badge.name}: ${badge.description}`}
                  >
                    <span className="text-2xl">{badge.icon}</span>
                    <span className="text-[10px] text-center mt-1 truncate w-full">
                      {badge.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
