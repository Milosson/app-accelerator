import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface AddActivityFormProps {
  onAdd: (activity: string) => void;
}

export const AddActivityForm = ({ onAdd }: AddActivityFormProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onAdd(value.trim());
      setValue("");
      setIsAdding(false);
    }
  };

  if (!isAdding) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="w-full justify-start text-muted-foreground hover:text-foreground mt-2"
        onClick={() => setIsAdding(true)}
      >
        <Plus className="w-4 h-4 mr-2" />
        Lägg till aktivitet
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Beskriv aktiviteten..."
        className="flex-1 text-sm h-8"
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setIsAdding(false);
            setValue("");
          }
        }}
      />
      <Button type="submit" size="sm" className="h-8">
        Lägg till
      </Button>
      <Button
        type="button"
        size="sm"
        variant="ghost"
        className="h-8"
        onClick={() => {
          setIsAdding(false);
          setValue("");
        }}
      >
        Avbryt
      </Button>
    </form>
  );
};
