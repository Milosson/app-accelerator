import { useState } from "react";
import { DayActivity } from "@/data/scheduleData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

interface AddDayDialogProps {
  weekId: number;
  onAdd: (day: DayActivity) => void;
}

export const AddDayDialog = ({ weekId, onAdd }: AddDayDialogProps) => {
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("4 h");
  const [activities, setActivities] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newDay: DayActivity = {
      day,
      date,
      title,
      duration,
      activities: activities.split("\n").filter((a) => a.trim()),
      resources: ["Egen byggtid"],
      learnings: [title.split(" ")[0]],
      output,
    };

    onAdd(newDay);
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setDay("");
    setDate("");
    setTitle("");
    setDuration("4 h");
    setActivities("");
    setOutput("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full border-dashed">
          <Plus className="w-4 h-4 mr-2" />
          Lägg till ny dag
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Lägg till ny dag i Vecka {weekId}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="day">Dag</Label>
              <Input
                id="day"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="t.ex. Lördag"
                required
              />
            </div>
            <div>
              <Label htmlFor="date">Datum</Label>
              <Input
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="t.ex. 14 dec"
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="title">Titel</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="t.ex. Extra övning Power Automate"
              required
            />
          </div>
          <div>
            <Label htmlFor="duration">Tid</Label>
            <Input
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="t.ex. 3 h"
            />
          </div>
          <div>
            <Label htmlFor="activities">Aktiviteter (en per rad)</Label>
            <Textarea
              id="activities"
              value={activities}
              onChange={(e) => setActivities(e.target.value)}
              placeholder="Titta på video om...&#10;Bygg en enkel app för...&#10;Testa funktionen..."
              className="min-h-[100px]"
              required
            />
          </div>
          <div>
            <Label htmlFor="output">Förväntat resultat</Label>
            <Input
              id="output"
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              placeholder="t.ex. Fungerande Flow för notiser"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Avbryt
            </Button>
            <Button type="submit">Lägg till dag</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
