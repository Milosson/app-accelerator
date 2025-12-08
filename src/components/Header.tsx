import { Calendar, Rocket } from "lucide-react";
export const Header = () => {
  return <header className="text-center mb-8 md:mb-12">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
        <Calendar className="w-4 h-4" />
        4 veckor • 9 dec – 6 jan
      </div>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 tracking-tight">
        Power Apps & Azure
        <span className="gradient-hero bg-clip-text text-transparent"> Studieplan</span>
      </h1>
      <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
        Bli en Power Apps-ninja och Azure-samtalsproffs. Hands-on lärande med demo-appar. 
      </p>
      <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
        <Rocket className="w-4 h-4 text-primary" />
        <span>~75-90 timmar totalt</span>
      </div>
    </header>;
};