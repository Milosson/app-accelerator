import {
  BookOpen,
  Brain,
  Focus,
  HelpCircle,
  LineChart,
  Sparkles,
} from "lucide-react";

export const TipsSection = () => {
  const tips = [
    {
      icon: BookOpen,
      title: "Struktur",
      description:
        "Följ schemat slaviskt – 4–5 h på förmiddagen, pausa för lunch, 1 h repetition på kvällen.",
    },
    {
      icon: Sparkles,
      title: "Hands-on",
      description:
        "Bygg något varje dag, även om det är litet. Skärmdumpa allt – det blir din portfolio.",
    },
    {
      icon: Focus,
      title: "Fokus",
      description:
        "Stäng av notiser, sätt mobilen på flygplansläge under studiepassen.",
    },
    {
      icon: HelpCircle,
      title: "Fråga",
      description: "Om du fastnar, posta i Microsoft Learn-forum eller fråga.",
    },
    {
      icon: LineChart,
      title: "Mät framsteg",
      description:
        "Efter varje vecka, testa att förklara vad du lärt för en kompis – det cementerar kunskapen.",
    },
  ];

  return (
    <section className="mt-12 mb-8">
      <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
        <Brain className="w-5 h-5 text-primary" />
        Hur du ska plugga
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tips.map((tip, i) => (
          <div
            key={i}
            className="bg-card rounded-xl border border-border p-4 shadow-card hover:shadow-hover transition-shadow duration-300"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <tip.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground text-sm mb-1">
              {tip.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {tip.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
