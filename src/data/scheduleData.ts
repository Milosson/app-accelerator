export interface DayActivity {
  day: string;
  date: string;
  title: string;
  duration: string;
  activities: string[];
  resources: string[];
  learnings: string[];
  output: string;
}

export interface Week {
  id: number;
  title: string;
  dateRange: string;
  goal: string;
  totalHours: string;
  focus: string;
  days: DayActivity[];
  keywords: string[];
  replicas: string[];
}

export const scheduleData: Week[] = [
  {
    id: 1,
    title: "Power Apps Grunderna + Första Appen",
    dateRange: "9–13 dec",
    goal: "Förstå Canvas Apps, connectors, och bygg en enkel arbetsorder-app.",
    totalHours: "20–25 h",
    focus: "Hands-on byggande, mindre teori",
    keywords: ["Canvas App", "Connectors", "Power Automate", "SharePoint", "Offline Mode", "Camera Control", "Gallery", "Form", "Mobile-First", "Dataverse"],
    replicas: [
      "Vi kan bygga en app där tekniker loggar arbetsordrar offline och synkar när de är tillbaka.",
      "Med Power Automate automatiserar vi notiser till teamet direkt från appen.",
      "Camera Control gör det enkelt att fota defekter och spara direkt till SharePoint."
    ],
    days: [
      {
        day: "Måndag",
        date: "9 dec",
        title: "Power Apps Intro",
        duration: "3 h",
        activities: [
          "Titta: 'Power Apps in 20 Minutes - Beginner Tutorial' (Shane Young, YouTube)",
          "Gör Microsoft Learn: 'Get started with Power Apps' (1 h)",
          "Skapa din första Canvas App: Lägg till en Gallery och Form, connecta till Excel"
        ],
        resources: ["Shane Young video", "Microsoft Learn"],
        learnings: ["Canvas App", "Connectors", "Gallery/Form"],
        output: "Enkel app med lista och formulär"
      },
      {
        day: "Tisdag",
        date: "10 dec",
        title: "Data och Offline",
        duration: "4 h",
        activities: [
          "Titta: 'Power Apps Data Sources and Connectors' (Reza Dorrani, YouTube)",
          "Gör labb: Connecta till SharePoint-lista (t.ex. 'Arbetsordrar' med kolumner: ID, Titel, Status)",
          "Testa offline-läge: Spara data lokalt, synka när online"
        ],
        resources: ["Reza Dorrani video", "SharePoint"],
        learnings: ["SharePoint Connector", "Offline Cache"],
        output: "App som sparar order offline"
      },
      {
        day: "Onsdag",
        date: "11 dec",
        title: "Power Automate",
        duration: "4 h",
        activities: [
          "Titta: 'Power Apps and Power Automate Integration' (Shane Young, YouTube)",
          "Skapa ett Flow: När en order submitas → skicka e-post/Teams-notis",
          "Testa: Lägg till en Button som triggar Flow"
        ],
        resources: ["Shane Young video", "Power Automate"],
        learnings: ["Power Automate", "Triggers"],
        output: "App med automatiserad notis"
      },
      {
        day: "Torsdag",
        date: "12 dec",
        title: "Mobil och Kamera",
        duration: "4 h",
        activities: [
          "Titta: 'Building Field Service Apps with Power Apps' (Reza Dorrani, YouTube)",
          "Lägg till Camera Control: Ta foto, spara till SharePoint",
          "Testa på mobil: Använd Power Apps-appen"
        ],
        resources: ["Reza Dorrani video", "Power Apps Mobile"],
        learnings: ["Camera", "Mobile-First UI"],
        output: "App med foto-uppladdning"
      },
      {
        day: "Fredag",
        date: "13 dec",
        title: "Projekt 1: Arbetsorder-MVP",
        duration: "5 h",
        activities: [
          "Bygg en app för L&T: Lista arbetsordrar, logga status, ta foto, skicka notis",
          "Testa och polera UI",
          "Spara som demo (ta skärmdump/video)"
        ],
        resources: ["Egen byggtid"],
        learnings: ["Projektledning", "Iteration"],
        output: "Färdig demo-app för L&T"
      }
    ]
  },
  {
    id: 2,
    title: "Power Apps Fördjupning + HubSpot Intro",
    dateRange: "16–20 dec",
    goal: "Lära dig Dataverse, HubSpot-integration, och bygga en mer avancerad app.",
    totalHours: "20–25 h",
    focus: "Integrationer och skalbarhet",
    keywords: ["Dataverse", "HubSpot Connector", "Variables", "Filtering", "Teams Integration", "UX Design", "Scalable Backend", "Real-Time Sync"],
    replicas: [
      "Dataverse gör att vi kan bygga skalbara appar utan att oroa oss för datalagring.",
      "HubSpot-integration låter oss dra in kunddata direkt i fältappen – hur använder ni HubSpot idag?",
      "Med filter och sök gör vi apparna superenkla för teknikerna att använda."
    ],
    days: [
      {
        day: "Måndag",
        date: "16 dec",
        title: "Dataverse Basics",
        duration: "4 h",
        activities: [
          "Titta: 'Introduction to Dataverse' (Microsoft, YouTube)",
          "Gör labb: Skapa en Dataverse-tabell för 'Serviceärenden'",
          "Bygg en app som läser/skriver till Dataverse"
        ],
        resources: ["Microsoft video", "Dataverse"],
        learnings: ["Dataverse", "Tables", "Security"],
        output: "App med Dataverse-backend"
      },
      {
        day: "Tisdag",
        date: "17 dec",
        title: "HubSpot i Power Apps",
        duration: "4 h",
        activities: [
          "Titta: 'Power Apps HubSpot Connector' (PowerApps911, YouTube)",
          "Gör labb: Connecta till HubSpot (t.ex. hämta kontakter, skapa deals)",
          "Testa: Lägg till en knapp som skapar en deal från appen"
        ],
        resources: ["PowerApps911 video", "HubSpot"],
        learnings: ["HubSpot Connector", "CRM"],
        output: "App som interagerar med HubSpot"
      },
      {
        day: "Onsdag",
        date: "18 dec",
        title: "Avancerad UI och Logik",
        duration: "4 h",
        activities: [
          "Titta: 'Power Apps Advanced Techniques' (Reza Dorrani, YouTube)",
          "Lägg till: Filter i Gallery, variabler för dynamisk UI",
          "Testa: Skapa en sökfunktion för order"
        ],
        resources: ["Reza Dorrani video", "Power Apps"],
        learnings: ["Variables", "Filtering", "UX"],
        output: "App med sök och dynamik"
      },
      {
        day: "Torsdag",
        date: "19 dec",
        title: "Projekt 2: Service-App",
        duration: "5 h",
        activities: [
          "Bygg en app: Lista serviceärenden från HubSpot, logga status i Dataverse",
          "Ta foto, skicka Teams-notis",
          "Testa offline och på mobil"
        ],
        resources: ["Egen byggtid"],
        learnings: ["Integration", "UX"],
        output: "Avancerad demo-app"
      },
      {
        day: "Fredag",
        date: "20 dec",
        title: "Repetition + Catch-up",
        duration: "4 h",
        activities: [
          "Gå igenom båda demo-apparna, förbättra UI",
          "Öva repliker: Förklara apparna för CTO",
          "Gör ett Microsoft Learn-quiz för Power Apps"
        ],
        resources: ["Microsoft Learn", "Egen repetition"],
        learnings: ["Konsolidering"],
        output: "Polerade demos, självsäkerhet"
      }
    ]
  },
  {
    id: 3,
    title: "Azure/AZ-900 Grunderna",
    dateRange: "27–31 dec",
    goal: "Förstå Azure core-koncept, klara AZ-900, och koppla till Power Apps.",
    totalHours: "16–20 h",
    focus: "Teori + lätta labb",
    keywords: ["Public Cloud", "Hybrid Cloud", "IaaS", "PaaS", "OpEx", "Scalability", "Elasticity", "Blob Storage", "Azure Functions", "Entra ID", "Region", "SLA"],
    replicas: [
      "Azure:s OpEx-modell gör att vi bara betalar för det vi använder – perfekt för projekt med varierande behov.",
      "Med Blob Storage kan vi lagra alla bilder från fältet skalbart och billigt.",
      "Azure Functions låter oss köra små kodsnuttar utan att hantera servrar – hur använder ni serverless idag?"
    ],
    days: [
      {
        day: "Måndag",
        date: "27 dec",
        title: "Azure Intro",
        duration: "4 h",
        activities: [
          "Titta: 'Azure Fundamentals in 30 Minutes' (John Savill, YouTube)",
          "Gör Microsoft Learn: 'Introduction to Azure Fundamentals' (2 h)",
          "Anteckna: Cloud-modeller, OpEx/CapEx, skalbarhet"
        ],
        resources: ["John Savill video", "Microsoft Learn"],
        learnings: ["Cloud Concepts", "Benefits"],
        output: "Anteckningar om AZ-900"
      },
      {
        day: "Tisdag",
        date: "28 dec",
        title: "Azure Services",
        duration: "4 h",
        activities: [
          "Titta: 'Top 10 Azure Services' (Adam Marczak, YouTube)",
          "Gör labb: Skapa en Blob Storage i Azure Portal, ladda upp en fil",
          "Läs: AZ-900 Study Guide (Microsoft)"
        ],
        resources: ["Adam Marczak video", "Azure Portal"],
        learnings: ["Blob Storage", "Functions", "SQL"],
        output: "Första Azure-resurs skapad"
      },
      {
        day: "Onsdag",
        date: "29 dec",
        title: "Skalbarhet och Säkerhet",
        duration: "4 h",
        activities: [
          "Titta: 'Azure Scalability and Security' (John Savill, YouTube)",
          "Gör labb: Skapa en Azure Function (enkel HTTP-trigger)",
          "Testa: Connecta Function till Power Apps"
        ],
        resources: ["John Savill video", "Azure Portal"],
        learnings: ["Scalability", "Entra ID"],
        output: "App som kallar Azure Function"
      },
      {
        day: "Torsdag",
        date: "30 dec",
        title: "AZ-900 Prep",
        duration: "3 h",
        activities: [
          "Gör Microsoft Learn: 'Prepare for AZ-900' (2 h)",
          "Gör 50 övningsfrågor (Whizlabs eller Tutorials Dojo)",
          "Öva repliker för Azure"
        ],
        resources: ["Microsoft Learn", "Whizlabs"],
        learnings: ["Exam Prep", "Confidence"],
        output: "Redo för AZ-900 (80%+)"
      }
    ]
  },
  {
    id: 4,
    title: "Repetition + Slutprojekt",
    dateRange: "2–6 jan",
    goal: "Konsolidera, bygga en final demo, och förbereda dig för praktiken.",
    totalHours: "16–20 h",
    focus: "Projekt och självsäkerhet",
    keywords: ["Integration", "Full Stack App", "Real-Time Data", "Automation", "Scalability", "User Adoption"],
    replicas: [
      "Den här appen kopplar HubSpot, Azure och Power Apps – vi får en hel workflow på plats på dagar.",
      "Jag byggde en demo som era tekniker kan testa direkt – vad är era största behov just nu?",
      "Med Azure och Power Apps kan vi iterera snabbt och skala när det behövs."
    ],
    days: [
      {
        day: "Torsdag",
        date: "2 jan",
        title: "Azure + Power Apps Integration",
        duration: "4 h",
        activities: [
          "Titta: 'Power Apps and Azure Integration' (Microsoft, YouTube)",
          "Gör labb: Bygg en app som hämtar data från Blob Storage, sparar till Dataverse",
          "Testa: Skicka data till HubSpot"
        ],
        resources: ["Microsoft video", "Azure Portal"],
        learnings: ["Full Integration"],
        output: "App med Azure/HubSpot"
      },
      {
        day: "Fredag",
        date: "3 jan",
        title: "Final Projekt: L&T Field App",
        duration: "5 h",
        activities: [
          "Bygg en app: Lista arbetsordrar från HubSpot, logga status/foton till Dataverse",
          "Trigga Azure Function för notis",
          "Spela in 2-min demo-video"
        ],
        resources: ["Egen byggtid"],
        learnings: ["Full Stack App"],
        output: "Killer demo för praktiken"
      },
      {
        day: "Måndag",
        date: "6 jan",
        title: "Repetition och Prep",
        duration: "4 h",
        activities: [
          "Gå igenom alla appar, öva att förklara dem",
          "Gör 50 till AZ-900-frågor",
          "Skriv ner 3 frågor till L&T"
        ],
        resources: ["Microsoft Learn", "Egen repetition"],
        learnings: ["Confidence", "Prep"],
        output: "Redo att börja praktiken!"
      }
    ]
  }
];
