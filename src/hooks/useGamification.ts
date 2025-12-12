import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  requirement_type: string;
  requirement_value: number;
  earned_at?: string;
}

export interface GamificationState {
  streak: number;
  totalPoints: number;
  badges: Badge[];
  earnedBadges: Badge[];
  loading: boolean;
  checkAndAwardBadges: (stats: { activitiesCompleted: number; weeksCompleted: number; notesCount: number; allCompleted: boolean }) => Promise<void>;
  updateStreak: () => Promise<void>;
}

export function useGamification(): GamificationState {
  const { user } = useAuth();
  const [streak, setStreak] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);

  // Load badges and user data
  useEffect(() => {
    const loadData = async () => {
      // Load all badges
      const { data: allBadges } = await supabase
        .from('badges')
        .select('*');
      
      if (allBadges) {
        setBadges(allBadges);
      }

      if (user) {
        // Load user profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('streak_count, total_points')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          setStreak(profile.streak_count || 0);
          setTotalPoints(profile.total_points || 0);
        }

        // Load earned badges
        const { data: userBadges } = await supabase
          .from('user_badges')
          .select('badge_id, earned_at, badges(*)')
          .eq('user_id', user.id);
        
        if (userBadges) {
          const earned = userBadges.map(ub => ({
            ...(ub.badges as unknown as Badge),
            earned_at: ub.earned_at
          }));
          setEarnedBadges(earned);
        }
      }
      
      setLoading(false);
    };

    loadData();
  }, [user]);

  const updateStreak = useCallback(async () => {
    if (!user) return;

    const today = new Date().toISOString().split('T')[0];
    
    const { data: profile } = await supabase
      .from('profiles')
      .select('last_active_date, streak_count')
      .eq('id', user.id)
      .single();

    if (profile) {
      const lastActive = profile.last_active_date;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      let newStreak = profile.streak_count || 0;
      
      if (lastActive === yesterdayStr) {
        newStreak += 1;
      } else if (lastActive !== today) {
        newStreak = 1;
      }

      await supabase
        .from('profiles')
        .update({ 
          streak_count: newStreak, 
          last_active_date: today 
        })
        .eq('id', user.id);

      setStreak(newStreak);
    }
  }, [user]);

  const checkAndAwardBadges = useCallback(async (stats: { 
    activitiesCompleted: number; 
    weeksCompleted: number; 
    notesCount: number; 
    allCompleted: boolean 
  }) => {
    if (!user) return;

    const earnedIds = earnedBadges.map(b => b.id);
    const newBadges: Badge[] = [];

    for (const badge of badges) {
      if (earnedIds.includes(badge.id)) continue;

      let shouldAward = false;
      switch (badge.requirement_type) {
        case 'activities_completed':
          shouldAward = stats.activitiesCompleted >= badge.requirement_value;
          break;
        case 'weeks_completed':
          shouldAward = stats.weeksCompleted >= badge.requirement_value;
          break;
        case 'notes_count':
          shouldAward = stats.notesCount >= badge.requirement_value;
          break;
        case 'streak':
          shouldAward = streak >= badge.requirement_value;
          break;
        case 'all_completed':
          shouldAward = stats.allCompleted;
          break;
      }

      if (shouldAward) {
        newBadges.push(badge);
      }
    }

    // Award new badges
    for (const badge of newBadges) {
      const { error } = await supabase
        .from('user_badges')
        .insert({ user_id: user.id, badge_id: badge.id });

      if (!error) {
        // Update points
        const newPoints = totalPoints + badge.points;
        await supabase
          .from('profiles')
          .update({ total_points: newPoints })
          .eq('id', user.id);
        
        setTotalPoints(newPoints);
        setEarnedBadges(prev => [...prev, badge]);
        
        toast.success(`🎉 Ny badge: ${badge.icon} ${badge.name}!`, {
          description: `+${badge.points} poäng`,
          duration: 5000,
        });
      }
    }
  }, [user, badges, earnedBadges, streak, totalPoints]);

  return {
    streak,
    totalPoints,
    badges,
    earnedBadges,
    loading,
    checkAndAwardBadges,
    updateStreak,
  };
}
