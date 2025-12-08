import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Check, X } from "lucide-react";

interface ActivityItemProps {
  activity: string;
  index: number;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onUpdate: (newActivity: string) => void;
  onDelete: () => void;
  weekId: number;
}

export const ActivityItem = ({
  activity,
  index,
  isCompleted,
  onToggleComplete,
  onUpdate,
  onDelete,
  weekId,
}: ActivityItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(activity);

  const handleSave = () => {
    if (editValue.trim()) {
      onUpdate(editValue.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(activity);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className="flex items-center gap-2 py-1">
        <Input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="flex-1 text-sm h-8"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") handleCancel();
          }}
        />
        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={handleSave}>
          <Check className="w-3 h-3 text-green-600" />
        </Button>
        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={handleCancel}>
          <X className="w-3 h-3 text-destructive" />
        </Button>
      </li>
    );
  }

  return (
    <li className="group flex items-start gap-3 py-1">
      <Checkbox
        checked={isCompleted}
        onCheckedChange={onToggleComplete}
        className="mt-1 shrink-0"
      />
      <span
        className={`flex-1 text-sm transition-all ${
          isCompleted
            ? "text-muted-foreground line-through"
            : "text-foreground/80"
        }`}
      >
        {activity}
      </span>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6"
          onClick={() => setIsEditing(true)}
        >
          <Pencil className="w-3 h-3 text-muted-foreground" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6"
          onClick={onDelete}
        >
          <Trash2 className="w-3 h-3 text-destructive" />
        </Button>
      </div>
    </li>
  );
};
