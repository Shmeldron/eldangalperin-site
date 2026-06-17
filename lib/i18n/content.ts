/**
 * Bilingual content for the homepage + chrome (EN/HE), used by the language
 * toggle demo. Project copy is keyed by the real project slug; English project
 * copy is read from lib/projects.ts directly, so only Hebrew lives here.
 */

export type Locale = "en" | "he";

export const DIR: Record<Locale, "ltr" | "rtl"> = { en: "ltr", he: "rtl" };
export const OTHER: Record<Locale, Locale> = { en: "he", he: "en" };

// Lives here (a non-"use client" module) so the server layout and the client
// provider both import the real string — importing a const from a "use client"
// module into a Server Component yields a client reference, not the value.
export const LOCALE_COOKIE = "locale";

export type ProjectCopy = { kicker: string; tagline: string; role: string };

/** Hebrew project copy, by slug. English equivalents come from lib/projects.ts. */
export const HE_PROJECT: Record<string, ProjectCopy> = {
  stayyoung: {
    kicker: "אפליקציית רווחה מבוססת AI",
    role: "מהנדס פולסטאק מייסד ומוביל",
    tagline:
      "אפליקציית רווחה חיה מבוססת AI — בנייה מקצה לקצה: מחוויית המשתמש, דרך טובי (מאמן ה‑AI שבתוך האפליקציה), ועד הפלטפורמה שמאחורי הקלעים.",
  },
  "stayyoung-platform": {
    kicker: "מרכז עסקי וצמיחה",
    role: "בנייה עצמאית",
    tagline:
      "הפלטפורמה הפנימית שמריצה את העסק — משפכי מכירה, מנויים וחיובים, סוכני AI, פיננסים והזמנות, באפליקציית Next.js אחת.",
  },
  "whatsapp-assistant": {
    kicker: "סוכן LLM על וואטסאפ",
    role: "בנייה עצמאית",
    tagline: "עוזר אישי שחי בתוך וואטסאפ — הודעה קולית נכנסת, פעולה אמיתית יוצאת.",
  },
  "spaceship-simulator-jarvis": {
    kicker: "סימולציה מרובת‑סוכנים",
    role: "בנייה עצמאית",
    tagline:
      "סימולטור תפעול חללית מרובה‑סוכנים: אורקסטרטור וסוכני ship‑AI שמתאמים ביניהם דרך פרוטוקול אדפטרים נקי.",
  },
};

type StackCol = { group: string; items: string[] };

export type Dict = {
  nav: { work: string; about: string; contact: string };
  toggleLabel: string; // label on the toggle = the OTHER language
  status: string[];
  hero: { line1: string; accent: string; sub: string; cta1: string; cta2: string };
  work: { label: string; intro: string };
  about: {
    label: string;
    paras: string[];
    ctaLead: string;
    ctaLink: string;
    stack: StackCol[];
  };
  contact: { label: string; intro: string; reveal: string };
  footer: { builtBy: string };
};

export const DICT: Record<Locale, Dict> = {
  en: {
    nav: { work: "Work", about: "About", contact: "Contact" },
    toggleLabel: "עברית",
    status: [
      "available for select freelance & consulting work",
      "shipping AI products with next.js + claude",
      "from first commit to production",
    ],
    hero: {
      line1: "I build digital products",
      accent: "end to end.",
      sub: "A full-stack product engineer who designs, builds, and ships web apps, AI products, and automations — from the first commit to production.",
      cta1: "View selected work",
      cta2: "Let’s work together",
    },
    work: {
      label: "Selected work",
      intro:
        "A few products I’ve taken from idea to production. Fewer, deeper case studies — the work is the proof.",
    },
    about: {
      label: "About",
      paras: [
        "I’m Eldan Galperin, a full-stack product engineer. I like owning a product from the messy first idea all the way to something real people use — the data model, the API, the interface, and increasingly the AI that sits inside it.",
        "Before going independent, I spent four years at Body Vision Medical — a medical-AI and computer-vision startup — where I went from leading QA to engineering its real-time lung-navigation software.",
        "Lately that’s meant building AI-powered products: an in-app assistant on Claude, multi-tenant content pipelines, and agents that take real actions. I care about the unglamorous parts too — auth, performance, security, and making things fast on a mid-range phone.",
      ],
      ctaLead:
        "I take on a small number of freelance and consulting engagements where I can do my best work.",
      ctaLink: "Let’s talk →",
      stack: [
        { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"] },
        { group: "Backend", items: ["Node.js", "PostgreSQL", "Supabase", "Edge Functions", "REST"] },
        { group: "AI / LLM", items: ["Anthropic Claude", "OpenAI", "Function calling", "RAG", "Prompt design"] },
        { group: "Ship", items: ["Vercel", "CI/CD", "Performance", "Analytics", "Security / RLS"] },
      ],
    },
    contact: {
      label: "Let’s work together",
      intro:
        "Have a product to build or an AI feature to ship? I’m open to a small number of freelance and consulting engagements.",
      reveal: "click to reveal email",
    },
    footer: { builtBy: "built by eldan galperin" },
  },
  he: {
    nav: { work: "עבודות", about: "אודות", contact: "יצירת קשר" },
    toggleLabel: "EN",
    status: [
      "פנוי לפרויקטים נבחרים בעבודה עצמאית וייעוץ",
      "בונה מוצרי AI עם Next.js ו‑Claude",
      "מהקומיט הראשון ועד הפרודקשן",
    ],
    hero: {
      line1: "אני בונה מוצרים דיגיטליים",
      accent: "מקצה לקצה.",
      sub: "מהנדס מוצר פולסטאק שמתכנן, בונה ומשגר אפליקציות ווב, מוצרי AI ואוטומציות — מהקומיט הראשון ועד הפרודקשן.",
      cta1: "לעבודות נבחרות",
      cta2: "בוא נעבוד יחד",
    },
    work: {
      label: "עבודות נבחרות",
      intro:
        "כמה מוצרים שליוויתי מרעיון ועד פרודקשן. פחות פרויקטים, יותר עומק — העבודה היא ההוכחה.",
    },
    about: {
      label: "אודות",
      paras: [
        "אני אלדן גלפרין, מהנדס מוצר פולסטאק. אני אוהב לקחת מוצר מהרעיון הראשון והמבולגן ועד משהו שאנשים אמיתיים משתמשים בו — מודל הנתונים, ה‑API, הממשק, ויותר ויותר גם ה‑AI שיושב בתוכו.",
        "לפני שיצאתי לעצמאות ביליתי ארבע שנים ב‑Body Vision Medical — סטארט-אפ של AI רפואי וראייה ממוחשבת — שם התקדמתי מהובלת צוות QA להנדסת מערכת הניווט הריאתי בזמן אמת של החברה.",
        "בזמן האחרון זה אומר בניית מוצרים מבוססי AI: עוזר בתוך האפליקציה על Claude, צינורות תוכן מרובי‑דיירים, וסוכנים שמבצעים פעולות אמיתיות. אכפת לי גם מהחלקים הפחות זוהרים — הרשאות, ביצועים, אבטחה, ולגרום לדברים לרוץ מהר גם על טלפון בינוני.",
      ],
      ctaLead:
        "אני לוקח מספר מצומצם של פרויקטים בעבודה עצמאית וייעוץ, שם אני יכול לעשות את העבודה הכי טובה שלי.",
      ctaLink: "← בוא נדבר",
      stack: [
        { group: "פרונטאנד", items: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"] },
        { group: "בקאנד", items: ["Node.js", "PostgreSQL", "Supabase", "Edge Functions", "REST"] },
        { group: "AI / LLM", items: ["Anthropic Claude", "OpenAI", "Function calling", "RAG", "Prompt design"] },
        { group: "שילוח לפרודקשן", items: ["Vercel", "CI/CD", "ביצועים", "אנליטיקס", "אבטחה / RLS"] },
      ],
    },
    contact: {
      label: "בוא נעבוד יחד",
      intro:
        "יש לכם מוצר לבנות או יכולת AI לשגר? אני פנוי למספר מצומצם של פרויקטים בעבודה עצמאית וייעוץ.",
      reveal: "לחצו לחשיפת האימייל",
    },
    footer: { builtBy: "נבנה על ידי אלדן גלפרין" },
  },
};

/** Latin-script detection — true when a stack item should NOT be wrapped LTR. */
export const isHebrew = (s: string) => /^[֐-׿]/.test(s);
