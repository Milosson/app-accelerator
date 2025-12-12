import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, weekNumber, existingWeeks } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Generating week content for:', prompt);

    // Calculate dates for the new week (starting next Monday)
    const today = new Date();
    const daysUntilMonday = (8 - today.getDay()) % 7 || 7;
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + daysUntilMonday + ((weekNumber - 1) * 7));
    
    const formatDate = (date: Date) => {
      const day = date.getDate();
      const months = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
      return `${day} ${months[date.getMonth()]}`;
    };

    const getDayName = (dayIndex: number) => {
      const days = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag'];
      return days[dayIndex];
    };

    // Generate dates for the week
    const weekDates: { day: string; date: string }[] = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      weekDates.push({
        day: getDayName(i),
        date: formatDate(date)
      });
    }

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 4);
    const dateRange = `${formatDate(startDate)}–${formatDate(endDate)}`;

    const systemPrompt = `Du är en expert på att skapa studieplaner för Power Apps och Azure. 
Generera en detaljerad veckoplan baserat på användarens prompt.
Använd dessa EXAKTA datum för dagarna:
${weekDates.map((d, i) => `Dag ${i + 1}: ${d.day}, ${d.date}`).join('\n')}

Svara ENDAST med ett JSON-objekt i detta format (ingen markdown, inga kodblock):
{
  "title": "Veckans titel",
  "goal": "Veckans mål",
  "totalHours": "X h",
  "focus": "Veckans fokus",
  "keywords": ["nyckelord1", "nyckelord2"],
  "replicas": ["Replik 1", "Replik 2"],
  "days": [
    {
      "day": "${weekDates[0]?.day || 'Måndag'}",
      "date": "${weekDates[0]?.date || ''}",
      "title": "Dagens titel",
      "duration": "X h",
      "activities": ["Aktivitet 1", "Aktivitet 2"],
      "resources": ["Resurs 1", "Resurs 2"],
      "learnings": ["Lärdom 1", "Lärdom 2"],
      "output": "Förväntat resultat"
    }
  ]
}
Inkludera 3-5 dagar. Var specifik med YouTube-tutorials och Microsoft Learn-resurser.`;

    const userPrompt = `Vecka ${weekNumber}: ${prompt}
${existingWeeks ? `Befintliga veckor handlar om: ${existingWeeks.map((w: any) => w.title).join(', ')}` : ''}
Generera en ny vecka som bygger vidare på dessa kunskaper. Använd exakt dessa datum: ${dateRange}`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'Payment required. Please add credits.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    console.log('Raw AI response:', content);
    
    // Parse the JSON response
    let weekData;
    try {
      // Remove potential markdown code blocks
      const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      weekData = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      throw new Error('Failed to parse AI response');
    }

    // Add the calculated dateRange to the response
    weekData.dateRange = dateRange;

    return new Response(JSON.stringify({ week: weekData }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-week function:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
