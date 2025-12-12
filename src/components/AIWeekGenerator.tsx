import { useState } from "react";
import { Sparkles, Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Week } from "@/data/scheduleData";

interface AIWeekGeneratorProps {
  existingWeeks: Week[];
  onWeekGenerated: (week: Week) => void;
}

export function AIWeekGenerator({ existingWeeks, onWeekGenerated }: AIWeekGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Ange ett ämne för veckan');
      return;
    }

    setIsGenerating(true);

    try {
      const { data, error } = await supabase.functions.invoke('generate-week', {
        body: {
          prompt: prompt.trim(),
          weekNumber: existingWeeks.length + 1,
          existingWeeks: existingWeeks.map(w => ({ title: w.title, focus: w.focus })),
        },
      });

      if (error) {
        console.error('Edge function error:', error);
        if (error.message?.includes('429')) {
          toast.error('För många förfrågningar. Försök igen om en stund.');
        } else if (error.message?.includes('402')) {
          toast.error('Krediter krävs. Lägg till krediter i inställningarna.');
        } else {
          toast.error('Kunde inte generera vecka. Försök igen.');
        }
        return;
      }

      if (data?.week) {
        const newWeek: Week = {
          id: existingWeeks.length + 1,
          title: data.week.title,
          dateRange: data.week.dateRange || 'TBD',
          goal: data.week.goal || '',
          totalHours: data.week.totalHours || '20 h',
          focus: data.week.focus || '',
          keywords: data.week.keywords || [],
          replicas: data.week.replicas || [],
          days: data.week.days || [],
        };

        onWeekGenerated(newWeek);
        toast.success(`Vecka ${newWeek.id} skapad med AI!`);
        setIsOpen(false);
        setPrompt('');
      } else {
        toast.error('Inget innehåll genererades');
      }
    } catch (error) {
      console.error('Generation error:', error);
      toast.error('Något gick fel. Försök igen.');
    } finally {
      setIsGenerating(false);
    }
  };

  const suggestions = [
    'Power BI och datavisualisering',
    'Avancerad Power Automate och RPA',
    'Azure DevOps och CI/CD',
    'Microsoft 365 integration',
    'AI Builder i Power Platform',
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 border-dashed">
          <Sparkles className="h-4 w-4 text-accent" />
          Generera vecka med AI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            AI-genererad studievecka
          </DialogTitle>
          <DialogDescription>
            Beskriv vad du vill lära dig, så skapar AI:n en komplett veckoplan med aktiviteter och resurser.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prompt">Vad vill du lära dig?</Label>
            <Input
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="T.ex. 'Azure Logic Apps och integrationer'"
              disabled={isGenerating}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Förslag:</Label>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="secondary"
                  size="sm"
                  onClick={() => setPrompt(suggestion)}
                  disabled={isGenerating}
                  className="text-xs"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>

          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating || !prompt.trim()}
            className="w-full gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Genererar...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generera vecka
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
