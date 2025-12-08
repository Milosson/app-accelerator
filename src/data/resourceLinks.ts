export interface ResourceLink {
  id: string;
  title: string;
  url: string;
  type: "youtube" | "learn" | "docs" | "tool";
  author?: string;
  duration?: string;
}

export interface TopicResources {
  topic: string;
  keywords: string[];
  links: ResourceLink[];
}

export const resourceDatabase: TopicResources[] = [
  {
    topic: "Power Apps Intro",
    keywords: ["power apps", "canvas app", "gallery", "form", "intro", "beginner", "grunderna"],
    links: [
      {
        id: "pa-intro-1",
        title: "Power Apps in 20 Minutes - Beginner Tutorial",
        url: "https://www.youtube.com/watch?v=ZrsWsurjnpM",
        type: "youtube",
        author: "Shane Young",
        duration: "20 min"
      },
      {
        id: "pa-intro-2",
        title: "Get started with Power Apps",
        url: "https://learn.microsoft.com/en-us/training/modules/get-started-with-powerapps/",
        type: "learn",
        duration: "1 h"
      },
      {
        id: "pa-intro-3",
        title: "Power Apps Documentation",
        url: "https://learn.microsoft.com/en-us/power-apps/",
        type: "docs"
      }
    ]
  },
  {
    topic: "Data och Offline",
    keywords: ["sharepoint", "connector", "data source", "offline", "cache", "sync"],
    links: [
      {
        id: "pa-data-1",
        title: "Power Apps Data Sources and Connectors",
        url: "https://www.youtube.com/watch?v=V0MhMw5VlS4",
        type: "youtube",
        author: "Reza Dorrani",
        duration: "35 min"
      },
      {
        id: "pa-data-2",
        title: "Work with data in Power Apps",
        url: "https://learn.microsoft.com/en-us/training/modules/work-with-data-powerapps/",
        type: "learn"
      },
      {
        id: "pa-data-3",
        title: "SharePoint Integration Guide",
        url: "https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/connections/connection-sharepoint-online",
        type: "docs"
      }
    ]
  },
  {
    topic: "Power Automate",
    keywords: ["power automate", "flow", "automate", "trigger", "workflow", "automation"],
    links: [
      {
        id: "pa-auto-1",
        title: "Power Apps and Power Automate Integration",
        url: "https://www.youtube.com/watch?v=JY8r46HnHoI",
        type: "youtube",
        author: "Shane Young",
        duration: "25 min"
      },
      {
        id: "pa-auto-2",
        title: "Get started with Power Automate",
        url: "https://learn.microsoft.com/en-us/training/modules/get-started-flows/",
        type: "learn"
      },
      {
        id: "pa-auto-3",
        title: "Power Automate Documentation",
        url: "https://learn.microsoft.com/en-us/power-automate/",
        type: "docs"
      }
    ]
  },
  {
    topic: "Mobil och Kamera",
    keywords: ["mobile", "camera", "photo", "field service", "mobil", "kamera", "foto"],
    links: [
      {
        id: "pa-mob-1",
        title: "Building Field Service Apps with Power Apps",
        url: "https://www.youtube.com/watch?v=AJGlYJfPqNI",
        type: "youtube",
        author: "Reza Dorrani",
        duration: "40 min"
      },
      {
        id: "pa-mob-2",
        title: "Camera control in Power Apps",
        url: "https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-camera",
        type: "docs"
      }
    ]
  },
  {
    topic: "Dataverse",
    keywords: ["dataverse", "tables", "database", "security", "backend"],
    links: [
      {
        id: "dv-1",
        title: "Introduction to Dataverse",
        url: "https://www.youtube.com/watch?v=JNf-wLmBpJo",
        type: "youtube",
        author: "Microsoft",
        duration: "30 min"
      },
      {
        id: "dv-2",
        title: "Get started with Dataverse",
        url: "https://learn.microsoft.com/en-us/training/modules/get-started-with-powerapps-common-data-service/",
        type: "learn"
      },
      {
        id: "dv-3",
        title: "Dataverse Documentation",
        url: "https://learn.microsoft.com/en-us/power-apps/maker/data-platform/",
        type: "docs"
      }
    ]
  },
  {
    topic: "HubSpot",
    keywords: ["hubspot", "crm", "deals", "contacts", "integration"],
    links: [
      {
        id: "hs-1",
        title: "Power Apps HubSpot Connector",
        url: "https://www.youtube.com/watch?v=kCm_-m8P9bk",
        type: "youtube",
        author: "PowerApps911"
      },
      {
        id: "hs-2",
        title: "HubSpot API Documentation",
        url: "https://developers.hubspot.com/docs/api/overview",
        type: "docs"
      },
      {
        id: "hs-3",
        title: "HubSpot Academy - Free Courses",
        url: "https://academy.hubspot.com/",
        type: "tool"
      }
    ]
  },
  {
    topic: "Azure Intro",
    keywords: ["azure", "cloud", "fundamentals", "az-900", "intro", "opex", "capex"],
    links: [
      {
        id: "az-1",
        title: "Azure Fundamentals in 30 Minutes",
        url: "https://www.youtube.com/watch?v=NKEFWyqJ5XA",
        type: "youtube",
        author: "John Savill",
        duration: "30 min"
      },
      {
        id: "az-2",
        title: "Introduction to Azure Fundamentals",
        url: "https://learn.microsoft.com/en-us/training/modules/intro-to-azure-fundamentals/",
        type: "learn",
        duration: "2 h"
      },
      {
        id: "az-3",
        title: "AZ-900 Study Guide",
        url: "https://learn.microsoft.com/en-us/certifications/exams/az-900/",
        type: "docs"
      }
    ]
  },
  {
    topic: "Azure Services",
    keywords: ["blob storage", "functions", "sql", "services", "storage", "azure function"],
    links: [
      {
        id: "azs-1",
        title: "Top 10 Azure Services",
        url: "https://www.youtube.com/watch?v=RNrhwGa7J8A",
        type: "youtube",
        author: "Adam Marczak"
      },
      {
        id: "azs-2",
        title: "Azure Blob Storage Tutorial",
        url: "https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction",
        type: "docs"
      },
      {
        id: "azs-3",
        title: "Azure Functions Overview",
        url: "https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview",
        type: "docs"
      }
    ]
  },
  {
    topic: "Azure Security",
    keywords: ["security", "entra", "identity", "scalability", "sla", "säkerhet"],
    links: [
      {
        id: "azsec-1",
        title: "Azure Scalability and Security",
        url: "https://www.youtube.com/watch?v=u3M-eXQqNEo",
        type: "youtube",
        author: "John Savill"
      },
      {
        id: "azsec-2",
        title: "Microsoft Entra ID Overview",
        url: "https://learn.microsoft.com/en-us/entra/fundamentals/whatis",
        type: "docs"
      }
    ]
  },
  {
    topic: "AZ-900 Prep",
    keywords: ["az-900", "exam", "certification", "prep", "quiz", "frågor"],
    links: [
      {
        id: "azprep-1",
        title: "Prepare for AZ-900",
        url: "https://learn.microsoft.com/en-us/training/paths/az-900-describe-cloud-concepts/",
        type: "learn",
        duration: "2 h"
      },
      {
        id: "azprep-2",
        title: "Whizlabs AZ-900 Practice Tests",
        url: "https://www.whizlabs.com/microsoft-azure-certification-az-900/",
        type: "tool"
      },
      {
        id: "azprep-3",
        title: "Tutorials Dojo AZ-900",
        url: "https://tutorialsdojo.com/microsoft-azure-fundamentals-az-900-free-practice-exams/",
        type: "tool"
      }
    ]
  }
];

export function findResourcesForTopic(title: string, activities: string[]): ResourceLink[] {
  const searchText = `${title} ${activities.join(" ")}`.toLowerCase();
  
  const matchedTopics = resourceDatabase.filter((topic) =>
    topic.keywords.some((keyword) => searchText.includes(keyword.toLowerCase()))
  );

  const allLinks: ResourceLink[] = [];
  matchedTopics.forEach((topic) => {
    topic.links.forEach((link) => {
      if (!allLinks.find((l) => l.id === link.id)) {
        allLinks.push(link);
      }
    });
  });

  return allLinks.slice(0, 6);
}
