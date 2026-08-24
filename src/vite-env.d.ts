/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COUNTER_API_URL?: string;
  readonly VITE_VISITOR_COUNTER_API?: string;
  readonly VITE_GROQ_API_URL?: string;
  readonly VITE_CHAT_API_URL?: string;
  readonly VITE_GROQ_MODEL?: string;
  readonly VITE_CAREER_APPLY_API_URL?: string;
  readonly VITE_CAREER_ADMIN_API_URL?: string;
  readonly VITE_CAREER_RESUME_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
