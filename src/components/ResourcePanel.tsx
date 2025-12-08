import { ResourceLink, findResourcesForTopic } from "@/data/resourceLinks";
import { ExternalLink, Youtube, BookOpen, FileText, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ResourcePanelProps {
  dayTitle: string;
  activities: string[];
}

const typeIcons = {
  youtube: Youtube,
  learn: BookOpen,
  docs: FileText,
  tool: Wrench,
};

const typeColors = {
  youtube: "bg-red-500/10 text-red-600 border-red-200",
  learn: "bg-blue-500/10 text-blue-600 border-blue-200",
  docs: "bg-green-500/10 text-green-600 border-green-200",
  tool: "bg-amber-500/10 text-amber-600 border-amber-200",
};

const typeLabels = {
  youtube: "Video",
  learn: "Kurs",
  docs: "Docs",
  tool: "Verktyg",
};

export const ResourcePanel = ({ dayTitle, activities }: ResourcePanelProps) => {
  const resources = findResourcesForTopic(dayTitle, activities);

  if (resources.length === 0) return null;

  return (
    <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
      <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1">
        <ExternalLink className="w-3 h-3" />
        Relevanta Resurser
      </h5>
      <div className="grid gap-2 sm:grid-cols-2">
        {resources.map((resource) => {
          const Icon = typeIcons[resource.type];
          return (
            <a
              key={resource.id}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 p-3 bg-card rounded-lg border border-border hover:border-primary/30 hover:shadow-sm transition-all duration-200"
            >
              <div
                className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${
                  resource.type === "youtube"
                    ? "bg-red-500/10"
                    : resource.type === "learn"
                    ? "bg-blue-500/10"
                    : resource.type === "docs"
                    ? "bg-green-500/10"
                    : "bg-amber-500/10"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    resource.type === "youtube"
                      ? "text-red-600"
                      : resource.type === "learn"
                      ? "text-blue-600"
                      : resource.type === "docs"
                      ? "text-green-600"
                      : "text-amber-600"
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {resource.title}
                </p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${typeColors[resource.type]}`}
                  >
                    {typeLabels[resource.type]}
                  </Badge>
                  {resource.author && (
                    <span className="text-[10px] text-muted-foreground">
                      {resource.author}
                    </span>
                  )}
                  {resource.duration && (
                    <span className="text-[10px] text-muted-foreground">
                      • {resource.duration}
                    </span>
                  )}
                </div>
              </div>
              <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary shrink-0 mt-1" />
            </a>
          );
        })}
      </div>
    </div>
  );
};
