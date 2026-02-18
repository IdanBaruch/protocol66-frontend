/// <reference types="vite/client" />

interface ImportMetaEnv {
  // כאן מגדירים את משתני הסביבה שלך כדי ש-TS יכיר אותם
  readonly VITE_API_URL: string;
  // הוסף כאן משתנים נוספים אם יש לך, למשל:
  // readonly VITE_OTHER_VAR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}