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
  caseStudy: {
    back: string;
    roleLabel: string;
    problem: string;
    built: string;
    impact: string;
    stack: string;
    nextProject: string;
    startProject: string;
  };
  chat: {
    greeting: string;
    suggestions: string[];
    headerTitle: string;
    headerSub: string;
    placeholder: string;
    shareEmail: string;
    notePlaceholder: string;
    send: string;
    sending: string;
    cancel: string;
    errorSend: string;
    offline: string;
    sent: string;
    openAria: string;
    sendAria: string;
  };
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
    caseStudy: {
      back: "back to work",
      roleLabel: "role",
      problem: "The problem",
      built: "What I built",
      impact: "Impact",
      stack: "Stack",
      nextProject: "next project",
      startProject: "Start a project",
    },
    chat: {
      greeting: "Hi! I'm Eldan's AI assistant. Ask me about his work, skills, or availability.",
      suggestions: [
        "Can Eldan help with my AI product?",
        "What's he like to work with?",
        "Is he available for freelance?",
      ],
      headerTitle: "Ask about Eldan",
      headerSub: "AI assistant · scoped to his work",
      placeholder: "Ask a question…",
      shareEmail: "Share your email for Eldan",
      notePlaceholder: "One line about your project (optional)",
      send: "Send to Eldan",
      sending: "Sending…",
      cancel: "Cancel",
      errorSend: "Couldn't send — try the contact section on the site.",
      offline: "Reach Eldan directly via the contact section on the site.",
      sent: "Got it — Eldan will be in touch.",
      openAria: "Open AI assistant",
      sendAria: "Send",
    },
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
    caseStudy: {
      back: "חזרה לעבודות",
      roleLabel: "תפקיד",
      problem: "האתגר",
      built: "מה בניתי",
      impact: "תוצאות",
      stack: "סטאק",
      nextProject: "הפרויקט הבא",
      startProject: "בוא נתחיל פרויקט",
    },
    chat: {
      greeting: "היי! אני העוזר ה‑AI של אלדן. שאלו אותי על העבודה, היכולות או הזמינות שלו.",
      suggestions: [
        "אלדן יכול לעזור עם מוצר ה‑AI שלי?",
        "איך זה לעבוד איתו?",
        "הוא פנוי לעבודה עצמאית?",
      ],
      headerTitle: "שאלו על אלדן",
      headerSub: "עוזר AI · ממוקד בעבודה שלו",
      placeholder: "שאלו שאלה…",
      shareEmail: "השאירו אימייל לאלדן",
      notePlaceholder: "שורה אחת על הפרויקט (אופציונלי)",
      send: "שליחה לאלדן",
      sending: "שולח…",
      cancel: "ביטול",
      errorSend: "השליחה נכשלה — נסו את אזור יצירת הקשר באתר.",
      offline: "אפשר ליצור קשר עם אלדן ישירות דרך אזור יצירת הקשר באתר.",
      sent: "קיבלתי — אלדן יחזור אליכם.",
      openAria: "פתיחת העוזר החכם",
      sendAria: "שליחה",
    },
  },
};

/** Hebrew case-study body copy, by slug. English equivalents come from lib/projects.ts. */
export const HE_CASE: Record<
  string,
  { problem: string; build: string[]; impact: string[] }
> = {
  stayyoung: {
    problem:
      "ייעוץ רווחה הוא לרוב גנרי וקל לנטוש. ב‑StayYoung יצאנו לבנות חוויה אישית ושיחתית שפוגשת אנשים בעברית, על המובייל, ומשתפרת לאורך זמן — שעונה על השאלות שלהם ברגע, לא אחרי חיפוש. זה אומר לבנות מוצר אמיתי, לא דף נחיתה.",
    build: [
      "אחריות מלאה על כל הסטאק מקצה לקצה — אפליקציית המשתמש, טובי (מאמן ה‑AI שבתוך האפליקציה), ופלטפורמת המנויים, החיובים והמשפכים שמריצה את הצד העסקי.",
      "בניית טובי, מאמן ה‑AI: עיצוב פרומפטים ממוקדים, תשובות בעברית בסטרימינג, הקשר אישי לכל משתמש שנשמר על פני MongoDB ו‑MySQL, ומעקות בטיחות ששומרים על תשובות בטוחות ונאמנות למותג.",
      "עיצוב מערכת UI עברית‑first, נכונה ל‑RTL, על React + Tailwind + shadcn — שנשארת מהירה גם על טלפון בינוני.",
      "מידול הנתונים ב‑PostgreSQL עם row‑level security ו‑RPCs מסוג SECURITY DEFINER; תהליכי ההרשאות, ה‑OTP וההתראות רצים דרך Supabase Edge Functions.",
    ],
    impact: [
      "חי ב‑App Store וב‑Google Play, עם משתמשים אמיתיים שמשתמשים בו מדי יום בעברית.",
      "טובי עונה על מאות שאלות של משתמשים בשבוע — 24/7, עם מעקות נוקשים לעלות ולקצב.",
      "מערכת עיצוב עברית‑first שומרת על חוויית מובייל מהירה ועקבית.",
    ],
  },
  "stayyoung-platform": {
    problem:
      "להריץ עסק מבוסס מנויים אומר לתמרן בין משפכים, תשלומים, גבייה חוזרת, פרסום, פיננסים ותמיכה — בדרך כלל על פני עשרות כלי SaaS מנותקים. הפלטפורמה הזו מאחדת את כל זה למקום אחד, בנויה בהתאמה אישית לאופן שבו העסק באמת עובד.",
    build: [
      "מנוע משפכים רב‑שלבי (optin → מכירה → upsell → downsell → תודה) עם בונה שלבים ויזואלי ועריכה בעזרת AI.",
      "חיובי מנויים על PayPlus עם גבייה חוזרת אוטומטית, ניסיונות חיוב חוזרים והתאמות מבוססות cron — לצד מסלול הגירה מ‑WooCommerce.",
      "עוזרי AI ייעודיים לכל סוכן (בסיס ידע, sandbox ואנליטיקס משלהם), דשבורד פיננסי (תזרים, רווח והפסד, מע\"מ, תחזיות), קביעת פגישות מובנית, ואינטגרציית Meta Ads.",
    ],
    impact: [
      "מפעילה עסק מנויים חי — מעל 5,000 לקוחות ומנויים על פני 11 משפכי מכירה.",
      "שומרת על המסלול הקריטי לכסף פועל ללא התערבות — חיובים חוזרים, גבייה, ניסיונות חוזרים והתאמות.",
      "משפכים, פרסום, פיננסים והזמנות חיים במקום אחד, בנויים סביב האופן שבו העסק באמת עובד.",
    ],
  },
  "whatsapp-assistant": {
    problem:
      "רציתי עוזר שבאמת אשתמש בו מדי יום — בלי אפליקציה חדשה לפתוח, פשוט הצ'אט שאני כבר נמצא בו. וואטסאפ הוא המקום שבו ההודעות כבר נמצאות.",
    build: [
      "גישור בין וואטסאפ ל‑LLM באמצעות whatsapp-web.js — תמלול הודעות קוליות, תשובות מדוברות, וזיכרון לכל איש קשר באמצעות embeddings.",
      "הוספת תזכורות, משימות cron, סיכום ערב ותדריך יומי — הכול נמסר דרך וואטסאפ.",
      "אינטגרציה של Google APIs ושרתי כלים מסוג MCP כך שהעוזר מבצע פעולות אמיתיות, לא רק מנהל שיחה.",
    ],
    impact: [
      "עוזר לשימוש יומיומי שזמין מכל צ'אט — עם קול וזיכרון.",
      "מדגים תשתית tool‑use / MCP מבוססת LLM על ערוץ הודעות אמיתי.",
    ],
  },
  "spaceship-simulator-jarvis": {
    problem:
      "איך כמה סוכנים אוטונומיים מתאמים ביניהם כדי להריץ מערכת מורכבת — בלי לכבול אותם לחומרה אמיתית? הסימולטור הזה הוא שדה הניסוי.",
    build: [
      "שלושה תהליכי סוכן ארוכי‑ריצה — אורקסטרטור Merlin ושני סוכני ship‑AI — שמתקשרים דרך פרוטוקולי אדפטרים.",
      "שכבת mock‑adapter מלאה עם contract tests משותפים, כך שאדפטרים אמיתיים יוכלו להיכנס בהמשך בלי לגעת בלוגיקת הסוכנים.",
      "דשבורד אופרטור מבוסס FastAPI ו‑runner מסוג bot‑bench להרצת המערכת כולה.",
    ],
    impact: [
      "ארכיטקטורה נקייה, test‑first, לתיאום בין סוכנים מרובים.",
      "עיצוב מבוסס adapter ו‑contract‑test שומר על הסוכנים ניתנים להחלפה ולאימות.",
    ],
  },
};

/** Latin-script detection — true when a stack item should NOT be wrapped LTR. */
export const isHebrew = (s: string) => /^[֐-׿]/.test(s);
