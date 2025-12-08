import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { StickyNote } from "lucide-react";

interface NotesEditorProps {
  notes: string;
  onUpdate: (notes: string) => void;
}

export const NotesEditor = ({ notes, onUpdate }: NotesEditorProps) => {
  const [value, setValue] = useState(notes);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setValue(notes);
  }, [notes]);

  const handleBlur = () => {
    setIsFocused(false);
    if (value !== notes) {
      onUpdate(value);
    }
  };

  return (
    <div className="mt-4">
      <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
        <StickyNote className="w-3 h-3" />
        Mina Anteckningar
      </h5>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        placeholder="Skriv egna anteckningar för den här dagen..."
        className={`min-h-[80px] text-sm resize-none transition-all ${
          isFocused ? "border-primary" : ""
        }`}
      />
      {value && !isFocused && (
        <p className="text-[10px] text-muted-foreground mt-1">
          Anteckningar sparas automatiskt
        </p>
      )}
    </div>
  );
};
