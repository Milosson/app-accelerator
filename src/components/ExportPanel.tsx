import { useState } from "react";
import { Download, FileText, Calendar, FileJson } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Week } from "@/data/scheduleData";
import jsPDF from "jspdf";

interface ExportPanelProps {
  weeks: Week[];
}

export function ExportPanel({ weeks }: ExportPanelProps) {
  const [isExporting, setIsExporting] = useState(false);

  const exportToJSON = () => {
    const dataStr = JSON.stringify(weeks, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const link = document.createElement('a');
    link.setAttribute('href', dataUri);
    link.setAttribute('download', 'studieplan.json');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('JSON exporterad!');
  };

  const exportToPDF = async () => {
    setIsExporting(true);
    try {
      const pdf = new jsPDF();
      let y = 20;
      const lineHeight = 7;
      const pageHeight = pdf.internal.pageSize.height;

      pdf.setFontSize(20);
      pdf.text('Power Apps & Azure Studieplan', 20, y);
      y += 15;

      for (const week of weeks) {
        // Check for page break
        if (y > pageHeight - 40) {
          pdf.addPage();
          y = 20;
        }

        pdf.setFontSize(14);
        pdf.setTextColor(0, 100, 100);
        pdf.text(`Vecka ${week.id}: ${week.title}`, 20, y);
        y += lineHeight;

        pdf.setFontSize(10);
        pdf.setTextColor(100, 100, 100);
        pdf.text(`${week.dateRange} | ${week.totalHours} | ${week.focus}`, 20, y);
        y += lineHeight;

        pdf.setFontSize(11);
        pdf.setTextColor(0, 0, 0);
        const goalLines = pdf.splitTextToSize(`Mål: ${week.goal}`, 170);
        pdf.text(goalLines, 20, y);
        y += goalLines.length * lineHeight;

        for (const day of week.days) {
          if (y > pageHeight - 30) {
            pdf.addPage();
            y = 20;
          }

          pdf.setFontSize(11);
          pdf.setTextColor(50, 50, 50);
          pdf.text(`${day.day} (${day.date}) - ${day.title} (${day.duration})`, 25, y);
          y += lineHeight;

          pdf.setFontSize(9);
          pdf.setTextColor(80, 80, 80);
          for (const activity of day.activities.slice(0, 3)) {
            const actLines = pdf.splitTextToSize(`• ${activity}`, 160);
            pdf.text(actLines, 30, y);
            y += actLines.length * 5;
          }
          y += 3;
        }
        y += 10;
      }

      pdf.save('studieplan.pdf');
      toast.success('PDF exporterad!');
    } catch (error) {
      toast.error('Kunde inte skapa PDF');
    } finally {
      setIsExporting(false);
    }
  };

  const exportToICS = () => {
    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Studieplan//Power Apps & Azure//SV
CALSCALE:GREGORIAN
METHOD:PUBLISH
`;

    const baseYear = new Date().getFullYear();
    
    for (const week of weeks) {
      for (const day of week.days) {
        // Parse date (e.g., "9 dec" -> December 9)
        const [dayNum, monthStr] = day.date.split(' ');
        const monthMap: Record<string, string> = {
          'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04',
          'maj': '05', 'jun': '06', 'jul': '07', 'aug': '08',
          'sep': '09', 'okt': '10', 'nov': '11', 'dec': '12'
        };
        const month = monthMap[monthStr] || '01';
        const dayPadded = dayNum.padStart(2, '0');
        const dateStr = `${baseYear}${month}${dayPadded}`;
        
        const uid = `${dateStr}-${week.id}-${day.day}@studieplan`;
        const summary = `${day.title} (Vecka ${week.id})`;
        const description = day.activities.join('\\n').replace(/,/g, '\\,');
        
        icsContent += `BEGIN:VEVENT
UID:${uid}
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART;VALUE=DATE:${dateStr}
SUMMARY:${summary}
DESCRIPTION:${description}
END:VEVENT
`;
      }
    }

    icsContent += 'END:VCALENDAR';

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'studieplan.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Kalender exporterad! Importera i din kalender-app.');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Exportera</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportToPDF} disabled={isExporting}>
          <FileText className="mr-2 h-4 w-4" />
          Exportera som PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToICS}>
          <Calendar className="mr-2 h-4 w-4" />
          Exportera till kalender (ICS)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToJSON}>
          <FileJson className="mr-2 h-4 w-4" />
          Exportera som JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
