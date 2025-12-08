import { useState, useEffect } from "react";
import { Week, DayActivity, scheduleData as initialData } from "@/data/scheduleData";

const STORAGE_KEY = "studyplan_data";
const PROGRESS_KEY = "studyplan_progress";
const NOTES_KEY = "studyplan_notes";

export interface DayProgress {
  weekId: number;
  dayIndex: number;
  completedActivities: number[];
  isCompleted: boolean;
}

export interface DayNotes {
  weekId: number;
  dayIndex: number;
  notes: string;
}

export function useScheduleStorage() {
  const [weeks, setWeeks] = useState<Week[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialData;
  });

  const [progress, setProgress] = useState<DayProgress[]>(() => {
    const saved = localStorage.getItem(PROGRESS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [notes, setNotes] = useState<DayNotes[]>(() => {
    const saved = localStorage.getItem(NOTES_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(weeks));
  }, [weeks]);

  useEffect(() => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  }, [notes]);

  // CRUD Operations
  const addActivity = (weekId: number, dayIndex: number, activity: string) => {
    setWeeks((prev) =>
      prev.map((week) =>
        week.id === weekId
          ? {
              ...week,
              days: week.days.map((day, idx) =>
                idx === dayIndex
                  ? { ...day, activities: [...day.activities, activity] }
                  : day
              ),
            }
          : week
      )
    );
  };

  const updateActivity = (
    weekId: number,
    dayIndex: number,
    activityIndex: number,
    newActivity: string
  ) => {
    setWeeks((prev) =>
      prev.map((week) =>
        week.id === weekId
          ? {
              ...week,
              days: week.days.map((day, idx) =>
                idx === dayIndex
                  ? {
                      ...day,
                      activities: day.activities.map((act, aIdx) =>
                        aIdx === activityIndex ? newActivity : act
                      ),
                    }
                  : day
              ),
            }
          : week
      )
    );
  };

  const deleteActivity = (
    weekId: number,
    dayIndex: number,
    activityIndex: number
  ) => {
    setWeeks((prev) =>
      prev.map((week) =>
        week.id === weekId
          ? {
              ...week,
              days: week.days.map((day, idx) =>
                idx === dayIndex
                  ? {
                      ...day,
                      activities: day.activities.filter(
                        (_, aIdx) => aIdx !== activityIndex
                      ),
                    }
                  : day
              ),
            }
          : week
      )
    );
  };

  const addDay = (weekId: number, newDay: DayActivity) => {
    setWeeks((prev) =>
      prev.map((week) =>
        week.id === weekId ? { ...week, days: [...week.days, newDay] } : week
      )
    );
  };

  const updateDay = (weekId: number, dayIndex: number, updatedDay: Partial<DayActivity>) => {
    setWeeks((prev) =>
      prev.map((week) =>
        week.id === weekId
          ? {
              ...week,
              days: week.days.map((day, idx) =>
                idx === dayIndex ? { ...day, ...updatedDay } : day
              ),
            }
          : week
      )
    );
  };

  const deleteDay = (weekId: number, dayIndex: number) => {
    setWeeks((prev) =>
      prev.map((week) =>
        week.id === weekId
          ? { ...week, days: week.days.filter((_, idx) => idx !== dayIndex) }
          : week
      )
    );
  };

  // Progress Operations
  const toggleActivityComplete = (
    weekId: number,
    dayIndex: number,
    activityIndex: number
  ) => {
    setProgress((prev) => {
      const existing = prev.find(
        (p) => p.weekId === weekId && p.dayIndex === dayIndex
      );
      if (existing) {
        const newCompleted = existing.completedActivities.includes(activityIndex)
          ? existing.completedActivities.filter((i) => i !== activityIndex)
          : [...existing.completedActivities, activityIndex];
        
        const week = weeks.find((w) => w.id === weekId);
        const totalActivities = week?.days[dayIndex]?.activities.length || 0;
        
        return prev.map((p) =>
          p.weekId === weekId && p.dayIndex === dayIndex
            ? {
                ...p,
                completedActivities: newCompleted,
                isCompleted: newCompleted.length === totalActivities,
              }
            : p
        );
      } else {
        return [
          ...prev,
          {
            weekId,
            dayIndex,
            completedActivities: [activityIndex],
            isCompleted: false,
          },
        ];
      }
    });
  };

  const getProgress = (weekId: number, dayIndex: number): DayProgress | undefined => {
    return progress.find((p) => p.weekId === weekId && p.dayIndex === dayIndex);
  };

  const getWeekProgress = (weekId: number): number => {
    const week = weeks.find((w) => w.id === weekId);
    if (!week) return 0;

    let totalActivities = 0;
    let completedActivities = 0;

    week.days.forEach((day, dayIndex) => {
      totalActivities += day.activities.length;
      const dayProgress = progress.find(
        (p) => p.weekId === weekId && p.dayIndex === dayIndex
      );
      if (dayProgress) {
        completedActivities += dayProgress.completedActivities.length;
      }
    });

    return totalActivities > 0 ? (completedActivities / totalActivities) * 100 : 0;
  };

  // Notes Operations
  const updateNotes = (weekId: number, dayIndex: number, newNotes: string) => {
    setNotes((prev) => {
      const existing = prev.find(
        (n) => n.weekId === weekId && n.dayIndex === dayIndex
      );
      if (existing) {
        return prev.map((n) =>
          n.weekId === weekId && n.dayIndex === dayIndex
            ? { ...n, notes: newNotes }
            : n
        );
      } else {
        return [...prev, { weekId, dayIndex, notes: newNotes }];
      }
    });
  };

  const getNotes = (weekId: number, dayIndex: number): string => {
    return notes.find((n) => n.weekId === weekId && n.dayIndex === dayIndex)?.notes || "";
  };

  const resetToDefault = () => {
    setWeeks(initialData);
    setProgress([]);
    setNotes([]);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PROGRESS_KEY);
    localStorage.removeItem(NOTES_KEY);
  };

  return {
    weeks,
    addActivity,
    updateActivity,
    deleteActivity,
    addDay,
    updateDay,
    deleteDay,
    toggleActivityComplete,
    getProgress,
    getWeekProgress,
    updateNotes,
    getNotes,
    resetToDefault,
  };
}
