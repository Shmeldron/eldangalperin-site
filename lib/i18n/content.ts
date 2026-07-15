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

export type ProjectCopy = {
  kicker: string;
  tagline: string;
  role: string;
  /** Hebrew proof points shown on the card — value + label (mirrors projects.ts). */
  highlights?: { value: string; label: string }[];
};

/** Hebrew project copy, by slug. English equivalents come from lib/projects.ts. */
export const HE_PROJECT: Record<string, ProjectCopy> = {
  stayyoung: {
    kicker: "אפליקציית רווחה מבוססת AI",
    role: "מהנדס פולסטאק מייסד ומוביל",
    tagline:
      "אפליקציית רווחה חיה מבוססת AI — בנייה מקצה לקצה: מחוויית המשתמש, דרך טובי (מאמן ה‑AI שבתוך האפליקציה), ועד הפלטפורמה שמאחורי הקלעים.",
    highlights: [
      { value: "iOS + Android", label: "חי בפרודקשן" },
      { value: "24/7", label: "מאמן AI באפליקציה" },
    ],
  },
  "stayyoung-platform": {
    kicker: "מרכז עסקי וצמיחה",
    role: "בנייה עצמאית",
    tagline:
      "הפלטפורמה הפנימית שמריצה את העסק — משפכי מכירה, מנויים וחיובים, סוכני AI, פיננסים והזמנות, באפליקציית Next.js אחת.",
    highlights: [
      { value: "5,000+", label: "לקוחות" },
      { value: "11", label: "משפכי מכירה" },
    ],
  },
  "whatsapp-assistant": {
    kicker: "סוכן LLM על וואטסאפ",
    role: "בנייה עצמאית",
    tagline: "עוזר אישי שחי בתוך וואטסאפ — הודעה קולית נכנסת, פעולה אמיתית יוצאת.",
    highlights: [
      { value: "קול ← פעולה", label: "נייטיב בוואטסאפ" },
      { value: "MCP", label: "שימוש אמיתי בכלים" },
    ],
  },
  "spaceship-simulator-jarvis": {
    kicker: "סימולציה מרובת‑סוכנים",
    role: "בנייה עצמאית",
    tagline:
      "סימולטור תפעול חללית מרובה‑סוכנים: אורקסטרטור וסוכני ship‑AI שמתאמים ביניהם דרך פרוטוקול אדפטרים נקי.",
    highlights: [
      { value: "מרובה‑סוכנים", label: "מתואם" },
      { value: "TDD", label: "מבוסס contract‑tests" },
    ],
  },
};

export type Dict = {
  toggleLabel: string; // label on the toggle = the OTHER language
  home: {
    greeting: string;
    intro2pre: string; intro2sy: string; intro2mid: string;
    intro2platform: string; intro2post: string;
    ctaLead: string; ctaBook: string; ctaMid: string;
    ctaLinkedin: string; ctaPost: string;
    projectsLabel: string; moreLabel: string;
    elsewhereLabel: string; elsewhereSub: string; emailLabel: string;
  };
  notFound: { code: string; title: string; body: string; back: string };
  caseStudy: {
    back: string;
    problem: string;
    built: string;
    impact: string;
    stack: string;
    nextProject: string;
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
    toggleLabel: "עברית",
    home: {
      greeting: "Hi, I'm Eldan — a full-stack product engineer based in Israel.",
      intro2pre: "I design, build, and ship products end to end. Recently: ",
      intro2sy: "StayYoung",
      intro2mid: ", an AI wellness app, and its ",
      intro2platform: "growth platform",
      intro2post: ".",
      ctaLead: "Want to work together? ",
      ctaBook: "Book a call",
      ctaMid: " or reach out on ",
      ctaLinkedin: "LinkedIn",
      ctaPost: ".",
      projectsLabel: "Projects",
      moreLabel: "More",
      elsewhereLabel: "Elsewhere",
      elsewhereSub: "Where to find me online",
      emailLabel: "Email",
    },
    notFound: {
      code: "404",
      title: "Page not found",
      body: "That page doesn’t exist (or moved). Let’s get you back.",
      back: "Back home",
    },
    caseStudy: {
      back: "back to work",
      problem: "The problem",
      built: "What I built",
      impact: "Impact",
      stack: "Stack",
      nextProject: "next project",
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
    toggleLabel: "EN",
    home: {
      greeting: "היי, אני אלדן — מהנדס מוצר Full-Stack מישראל.",
      intro2pre: "אני מעצב, בונה ומשיק מוצרים מקצה לקצה. לאחרונה: ",
      intro2sy: "StayYoung",
      intro2mid: ", אפליקציית בריאות מבוססת AI, ו",
      intro2platform: "פלטפורמת הצמיחה",
      intro2post: " שלה.",
      ctaLead: "רוצים לעבוד יחד? ",
      ctaBook: "קבעו שיחה",
      ctaMid: " או פנו אליי ב",
      ctaLinkedin: "LinkedIn",
      ctaPost: ".",
      projectsLabel: "פרויקטים",
      moreLabel: "עוד",
      elsewhereLabel: "איפה למצוא אותי",
      elsewhereSub: "קישורים ורשתות",
      emailLabel: "אימייל",
    },
    notFound: {
      code: "404",
      title: "הדף לא נמצא",
      body: "הדף הזה לא קיים (או שעבר למקום אחר). בואו נחזיר אתכם הביתה.",
      back: "חזרה לדף הבית",
    },
    caseStudy: {
      back: "חזרה לעבודות",
      problem: "האתגר",
      built: "מה בניתי",
      impact: "תוצאות",
      stack: "סטאק",
      nextProject: "הפרויקט הבא",
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
